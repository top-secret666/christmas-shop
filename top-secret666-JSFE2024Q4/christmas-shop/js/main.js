// ===== BURGER MENU =====
const burgerIcon = document.querySelector('.burger-icon');
const burgerMenu = document.querySelector('.burger-menu');
const burgerLinks = document.querySelectorAll('.burger-link');
const body = document.body;

if (burgerIcon && burgerMenu) {
    burgerIcon.addEventListener('click', () => {
        burgerIcon.classList.toggle('active');
        burgerMenu.classList.toggle('active');

        if (burgerMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });

    // Close burger menu when clicking on any link
    burgerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if it's an anchor link (smooth scroll) or page navigation
            const href = link.getAttribute('href');

            // Close the menu
            burgerIcon.classList.remove('active');
            burgerMenu.classList.remove('active');
            body.style.overflow = 'auto';

            // If it's an anchor link on the same page, handle smooth scroll
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // If it's a page navigation (like gifts.html or home.html), the default action continues
        });
    });

    // Close burger menu when clicking outside
    document.addEventListener('click', (e) => {
        if (burgerMenu.classList.contains('active') &&
            !burgerMenu.contains(e.target) &&
            !burgerIcon.contains(e.target)) {
            burgerIcon.classList.remove('active');
            burgerMenu.classList.remove('active');
            body.style.overflow = 'auto';
        }
    });

    // Hide burger menu and show nav when resizing to larger screen
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            burgerIcon.classList.remove('active');
            burgerMenu.classList.remove('active');
            body.style.overflow = 'auto';
        }
    });
}

// ===== MODAL =====
const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');
const cards = document.querySelectorAll('.card');

// Gift data with descriptions and superpowers
const gifts = {
    'console.log guru': {
        category: 'for work',
        description: 'Master the art of debugging with this essential gift for developers. Perfect for those who spend their days logging variables and finding solutions in the console.',
        superpowers: {
            live: { value: '+200', stars: 2 },
            create: { value: '+500', stars: 5 },
            love: { value: '+300', stars: 3 },
            dream: { value: '+400', stars: 4 }
        }
    },
    'hydration bot': {
        category: 'for health',
        description: 'Stay hydrated and healthy with this smart reminder. Your personal water intake companion for a better and healthier you.',
        superpowers: {
            live: { value: '+500', stars: 5 },
            create: { value: '+300', stars: 3 },
            love: { value: '+400', stars: 4 },
            dream: { value: '+200', stars: 2 }
        }
    },
    'merge master': {
        category: 'for work',
        description: 'Navigate complex code merges with confidence. A must-have for every developer managing multiple branches and resolving conflicts.',
        superpowers: {
            live: { value: '+200', stars: 2 },
            create: { value: '+500', stars: 5 },
            love: { value: '+300', stars: 3 },
            dream: { value: '+400', stars: 4 }
        }
    },
    'spontaneous coding philosopher': {
        category: 'for harmony',
        description: 'Find inner peace while coding. Learn to embrace the philosophical side of programming and find harmony in your work.',
        superpowers: {
            live: { value: '+500', stars: 5 },
            create: { value: '+300', stars: 3 },
            love: { value: '+400', stars: 4 },
            dream: { value: '+400', stars: 4 }
        }
    },
    'step master': {
        category: 'for health',
        description: 'Track your steps and achieve your fitness goals. The perfect companion for an active lifestyle and daily movement.',
        superpowers: {
            live: { value: '+400', stars: 4 },
            create: { value: '+300', stars: 3 },
            love: { value: '+200', stars: 2 },
            dream: { value: '+500', stars: 5 }
        }
    },
    'bug magnet': {
        category: 'for work',
        description: 'Find and fix bugs with precision. Every developer knows how to attract them; this helps you catch them all efficiently.',
        superpowers: {
            live: { value: '+500', stars: 5 },
            create: { value: '+200', stars: 2 },
            love: { value: '+300', stars: 3 },
            dream: { value: '+400', stars: 4 }
        }
    },
    'shortcut cheater': {
        category: 'for work',
        description: 'Master keyboard shortcuts and code like a pro. Speed up your workflow significantly and become a productivity wizard.',
        superpowers: {
            live: { value: '+500', stars: 5 },
            create: { value: '+400', stars: 4 },
            love: { value: '+200', stars: 2 },
            dream: { value: '+100', stars: 1 }
        }
    },
    'posture levitation': {
        category: 'for health',
        description: 'Improve your posture while working. A better sitting position leads to better health and increased productivity throughout the day.',
        superpowers: {
            live: { value: '+200', stars: 2 },
            create: { value: '+300', stars: 3 },
            love: { value: '+400', stars: 4 },
            dream: { value: '+300', stars: 3 }
        }
    },
    'bug acceptance guru': {
        category: 'for harmony',
        description: 'Learn to accept bugs as part of the journey. This gift teaches you to handle code failures with grace, wisdom, and inner peace.',
        superpowers: {
            live: { value: '+400', stars: 4 },
            create: { value: '+400', stars: 4 },
            love: { value: '+400', stars: 4 },
            dream: { value: '+500', stars: 5 }
        }
    },
    'snack resister': {
        category: 'for health',
        description: 'Resist unhealthy snacking habits. A willpower booster for maintaining a healthier lifestyle and better eating habits.',
        superpowers: {
            live: { value: '+400', stars: 4 },
            create: { value: '+300', stars: 3 },
            love: { value: '+300', stars: 3 },
            dream: { value: '+400', stars: 4 }
        }
    },
    'error laugher': {
        category: 'for harmony',
        description: 'Laugh at your errors instead of crying. Find humor in your mistakes and maintain a positive mindset throughout your journey.',
        superpowers: {
            live: { value: '+500', stars: 5 },
            create: { value: '+500', stars: 5 },
            love: { value: '+200', stars: 2 },
            dream: { value: '+200', stars: 2 }
        }
    },
    'joy charger': {
        category: 'for harmony',
        description: 'Recharge your happiness and positivity. A daily dose of joy to keep you motivated, energized, and optimistic about every day.',
        superpowers: {
            live: { value: '+500', stars: 5 },
            create: { value: '+400', stars: 4 },
            love: { value: '+500', stars: 5 },
            dream: { value: '+400', stars: 4 }
        }
    }
};

// Create star SVG
function createStarSVG(filled) {
    const filledClass = filled ? 'bright' : 'empty';
    if (filled) {
        return `<svg class="${filledClass}" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.1959 9.88162L11.6482 9.56542L13.1158 9.17219L12.8732 8.26704L10.5005 8.90278L9.38146 8.25667C9.39689 8.17336 9.40538 8.08765 9.40538 7.99997C9.40538 7.91229 9.39692 7.82655 9.38146 7.74327L10.5005 7.09716L12.8732 7.7329L13.1158 6.82775L11.6482 6.43452L12.1959 6.11831L14.546 5.97725L14.8921 4.02063L13.0246 3.34203L11.7274 5.30677L11.1797 5.62297L11.5729 4.15545L10.6678 3.91293L10.032 6.28561L8.91226 6.93211C8.78247 6.82103 8.63242 6.73313 8.4683 6.67494V5.3828L10.2052 3.64586L9.5426 2.98325L8.46827 4.05755V3.42515L9.51792 1.32584L7.99976 0L6.48157 1.3259L7.53122 3.42521V4.05761L6.45689 2.98332L5.79429 3.64592L7.53119 5.38286V6.675C7.36708 6.73319 7.21702 6.82109 7.08724 6.93217L5.96746 6.28568L5.33171 3.91299L4.42656 4.15551L4.81979 5.62304L4.27213 5.30684L2.9749 3.34209L1.10742 4.02069L1.45349 5.97731L3.80362 6.11838L4.35128 6.43458L2.88375 6.82781L3.1263 7.73296L5.49898 7.09722L6.61807 7.74333C6.60264 7.82664 6.59414 7.91235 6.59414 8.00003C6.59414 8.08771 6.60261 8.17345 6.61807 8.25673L5.49898 8.90285L3.1263 8.2671L2.88375 9.17226L4.35128 9.56548L3.80362 9.88169L1.45349 10.0227L1.10742 11.9793L2.97493 12.6579L4.27216 10.6932L4.81985 10.377L4.42662 11.8445L5.33177 12.087L5.96752 9.71435L7.0873 9.06786C7.21708 9.17894 7.36714 9.26684 7.53125 9.32503V10.6172L5.79435 12.3541L6.45696 13.0167L7.53129 11.9424V12.5748L6.48163 14.6741L7.99983 16L9.51802 14.6741L8.46837 12.5748V11.9424L9.5427 13.0167L10.2053 12.3541L8.4684 10.6172V9.32503C8.63251 9.26684 8.78257 9.17894 8.91235 9.06786L10.0321 9.71435L10.6679 12.087L11.573 11.8445L11.1798 10.377L11.7275 10.6932L13.0247 12.6579L14.8922 11.9793L14.5462 10.0227L12.1959 9.88162Z" fill="#FF4646"/>
        </svg>`;
    } else {
        return `<svg class="${filledClass}" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.1959 9.88162L11.6482 9.56542L13.1158 9.17219L12.8732 8.26704L10.5005 8.90278L9.38146 8.25667C9.39689 8.17336 9.40538 8.08765 9.40538 7.99997C9.40538 7.91229 9.39692 7.82655 9.38146 7.74327L10.5005 7.09716L12.8732 7.7329L13.1158 6.82775L11.6482 6.43452L12.1959 6.11831L14.546 5.97725L14.8921 4.02063L13.0246 3.34203L11.7274 5.30677L11.1797 5.62297L11.5729 4.15545L10.6678 3.91293L10.032 6.28561L8.91226 6.93211C8.78247 6.82103 8.63242 6.73313 8.4683 6.67494V5.3828L10.2052 3.64586L9.5426 2.98325L8.46827 4.05755V3.42515L9.51792 1.32584L7.99976 0L6.48157 1.3259L7.53122 3.42521V4.05761L6.45689 2.98332L5.79429 3.64592L7.53119 5.38286V6.675C7.36708 6.73319 7.21702 6.82109 7.08724 6.93217L5.96746 6.28568L5.33171 3.91299L4.42656 4.15551L4.81979 5.62304L4.27213 5.30684L2.9749 3.34209L1.10742 4.02069L1.45349 5.97731L3.80362 6.11838L4.35128 6.43458L2.88375 6.82781L3.1263 7.73296L5.49898 7.09722L6.61807 7.74333C6.60264 7.82664 6.59414 7.91235 6.59414 8.00003C6.59414 8.08771 6.60261 8.17345 6.61807 8.25673L5.49898 8.90285L3.1263 8.2671L2.88375 9.17226L4.35128 9.56548L3.80362 9.88169L1.45349 10.0227L1.10742 11.9793L2.97493 12.6579L4.27216 10.6932L4.81985 10.377L4.42662 11.8445L5.33177 12.087L5.96752 9.71435L7.0873 9.06786C7.21708 9.17894 7.36714 9.26684 7.53125 9.32503V10.6172L5.79435 12.3541L6.45696 13.0167L7.53129 11.9424V12.5748L6.48163 14.6741L7.99983 16L9.51802 14.6741L8.46837 12.5748V11.9424L9.5427 13.0167L10.2053 12.3541L8.4684 10.6172V9.32503C8.63251 9.26684 8.78257 9.17894 8.91235 9.06786L10.0321 9.71435L10.6679 12.087L11.573 11.8445L11.1798 10.377L11.7275 10.6932L13.0247 12.6579L14.8922 11.9793L14.5462 10.0227L12.1959 9.88162Z" fill="#D0D6DD"/>
        </svg>`;
    }
}

function openModal(title, category, imageSrc) {
    const giftKey = title.toLowerCase();
    const giftData = gifts[giftKey];

    const modalTitleEl = modal.querySelector('.modal-title');
    const modalCategoryEl = modal.querySelector('.modal-category');
    const modalImageEl = modal.querySelector('.modal-image img');
    const modalDescriptionEl = modal.querySelector('.modal-description');
    const modalSuperpowersList = modal.querySelector('.modal-superpowers-list');

    if (modalTitleEl) modalTitleEl.textContent = title;

    if (modalCategoryEl) {
        modalCategoryEl.textContent = category;
        // Set category color
        const categoryColorMap = {
            'for work': '#4361FF',
            'for health': '#06A44F',
            'for harmony': '#FF43F7'
        };
        modalCategoryEl.style.color = categoryColorMap[category.toLowerCase()] || '#4361FF';
    }

    if (modalImageEl) {
        modalImageEl.src = imageSrc;
        modalImageEl.alt = title;
    }

    if (modalDescriptionEl) {
        modalDescriptionEl.textContent = giftData?.description || 'A wonderful gift for the new year.';
    }

    // Update superpowers
    if (modalSuperpowersList && giftData?.superpowers) {
        modalSuperpowersList.innerHTML = '';

        Object.entries(giftData.superpowers).forEach(([name, data]) => {
            const item = document.createElement('div');
            item.className = 'superpower-item';

            const nameSpan = document.createElement('span');
            nameSpan.className = 'superpower-name';
            nameSpan.textContent = name.charAt(0).toUpperCase() + name.slice(1);

            const valueSpan = document.createElement('span');
            valueSpan.className = 'superpower-value';
            valueSpan.textContent = data.value;

            const starsDiv = document.createElement('div');
            starsDiv.className = 'superpower-stars';

            // Generate stars
            for (let i = 0; i < 5; i++) {
                starsDiv.innerHTML += createStarSVG(i < data.stars);
            }

            item.appendChild(nameSpan);
            item.appendChild(valueSpan);
            item.appendChild(starsDiv);
            modalSuperpowersList.appendChild(item);
        });
    }

    // Show modal
    if (modalOverlay) modalOverlay.classList.add('active');
    if (modal) modal.classList.add('active');
    body.style.overflow = 'hidden';
}

function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove('active');
    if (modal) modal.classList.remove('active');
    body.style.overflow = 'auto';
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
}

// Add click handlers to all cards
cards.forEach(card => {
    card.addEventListener('click', () => {
        const titleEl = card.querySelector('.card-details h3, .card-details h2');
        const categoryEl = card.querySelector('.card-category');
        const imageEl = card.querySelector('.image-container img');

        if (titleEl && categoryEl && imageEl) {
            const title = titleEl.textContent;
            const category = categoryEl.textContent;
            const imageSrc = imageEl.src;
            openModal(title, category, imageSrc);
        }
    });
});

// ===== SLIDER =====
const sliderLeftBtn = document.querySelector('.button__arrow-left');
const sliderRightBtn = document.querySelector('.button__arrow-right');
const sliderRow = document.querySelector('.slider__row');

let sliderPosition = 0;
let groupCount = 0;
let groupOffsets = [];
let sliderEl = sliderRow?.querySelector('.slider');

function getItemsPerView() {
    const width = window.innerWidth;
    if (width <= 768) return 2; // mobile/tablet
    return 3; // desktop
}

function calcGroups() {
    sliderEl = sliderRow?.querySelector('.slider');
    if (!sliderEl) {
        groupCount = 0;
        groupOffsets = [];
        return;
    }

    const children = Array.from(sliderEl.children);
    groupCount = Math.ceil(children.length / 2); // pair: text + image
    groupOffsets = [];

    for (let g = 0; g < groupCount; g++) {
        const el = children[g * 2];
        groupOffsets.push(el ? el.offsetLeft : 0);
    }
}

function updateSliderButtons() {
    if (!sliderLeftBtn || !sliderRightBtn) return;

    const itemsPerPage = getItemsPerView();
    const maxPosition = Math.max(0, groupCount - itemsPerPage);

    sliderLeftBtn.classList.toggle('inactive', sliderPosition === 0);
    sliderRightBtn.classList.toggle('inactive', sliderPosition >= maxPosition);
}

function updateSliderPosition() {
    if (!sliderRow) return;
    sliderEl = sliderRow.querySelector('.slider');
    if (!sliderEl) return;

    if (!groupOffsets.length) calcGroups();

    // Simple: shift slider so the selected group starts at left edge of visible area
    const offset = groupOffsets[sliderPosition] || 0;
    sliderEl.style.transform = `translateX(${-offset}px)`;
    sliderEl.style.transition = 'transform 0.36s ease';
}

function slideLeft() {
    if (sliderPosition > 0) {
        sliderPosition--;
        updateSliderPosition();
        updateSliderButtons();
    }
}

function slideRight() {
    const itemsPerPage = getItemsPerView();
    const maxPosition = Math.max(0, groupCount - itemsPerPage);
    if (sliderPosition < maxPosition) {
        sliderPosition++;
        updateSliderPosition();
        updateSliderButtons();
    }
}

sliderLeftBtn?.addEventListener('click', slideLeft);
sliderRightBtn?.addEventListener('click', slideRight);

window.addEventListener('resize', () => {
    calcGroups();
    sliderPosition = Math.min(sliderPosition, Math.max(0, groupCount - getItemsPerView()));
    updateSliderPosition();
    updateSliderButtons();
});

window.addEventListener('load', () => {
    setTimeout(() => {
        calcGroups();
        sliderPosition = 0;
        updateSliderPosition();
        updateSliderButtons();
    }, 120);
});

// initial calc
calcGroups();
updateSliderPosition();
updateSliderButtons();
// ===== TIMER =====
function updateTimer() {
    const timerSection = document.querySelector('.container__timer');
    if (!timerSection) return;

    const timerContainers = timerSection.querySelectorAll('.timer .container');
    if (timerContainers.length === 0) return;

    function calculateTimeLeft() {
        const now = new Date();
        let year = now.getFullYear();

        // If New Year has passed, calculate for next year
        let newYear = new Date(year, 0, 1, 0, 0, 0);
        if (now >= newYear) {
            newYear = new Date(year + 1, 0, 1, 0, 0, 0);
        }

        const diff = newYear - now;

        if (diff <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / 1000 / 60) % 60),
            seconds: Math.floor((diff / 1000) % 60)
        };
    }

    function updateDisplay() {
        const timeLeft = calculateTimeLeft();
        const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];

        timerContainers.forEach((container, index) => {
            const h2 = container.querySelector('h2');
            if (h2) {
                // Don't show leading zeros
                h2.textContent = values[index];
            }
        });
    }

    updateDisplay();
    setInterval(updateDisplay, 1000);
}

updateTimer();

// ===== RANDOM GIFTS =====
function displayRandomGifts() {
    const bestGiftsSection = document.querySelector('.best-gifts__section');
    if (!bestGiftsSection) return;

    const allGiftsData = [
        { title: 'console.log guru', category: 'for work', image: 'assets/img/gift-for-work.png' },
        { title: 'hydration bot', category: 'for health', image: 'assets/img/gift-for-health.png', categoryColor: '#06A44F' },
        { title: 'merge master', category: 'for work', image: 'assets/img/gift-for-work.png' },
        { title: 'spontaneous coding philosopher', category: 'for harmony', image: 'assets/img/gift-for-harmony.png', categoryColor: '#FF43F7' },
        { title: 'step master', category: 'for health', image: 'assets/img/gift-for-health.png', categoryColor: '#06A44F' },
        { title: 'bug magnet', category: 'for work', image: 'assets/img/gift-for-work.png' },
        { title: 'shortcut cheater', category: 'for work', image: 'assets/img/gift-for-work.png' },
        { title: 'posture levitation', category: 'for health', image: 'assets/img/gift-for-health.png', categoryColor: '#06A44F' },
        { title: 'bug acceptance guru', category: 'for harmony', image: 'assets/img/gift-for-harmony.png', categoryColor: '#FF43F7' },
        { title: 'snack resister', category: 'for health', image: 'assets/img/gift-for-health.png', categoryColor: '#06A44F' },
        { title: 'error laugher', category: 'for harmony', image: 'assets/img/gift-for-harmony.png', categoryColor: '#FF43F7' },
        { title: 'joy charger', category: 'for harmony', image: 'assets/img/gift-for-harmony.png', categoryColor: '#FF43F7' }
    ];

    function getRandomGifts(count) {
        const shuffled = [...allGiftsData].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    function updateBestGifts() {
        const cardsContainer = bestGiftsSection.querySelector('.container__cards');
        if (!cardsContainer) return;

        const randomGifts = getRandomGifts(4);
        const cards = cardsContainer.querySelectorAll('.card');

        cards.forEach((card, index) => {
            if (index < 4 && randomGifts[index]) {
                const gift = randomGifts[index];
                card.innerHTML = `
                    <div class="image-container">
                        <img src="${gift.image}" alt="${gift.title}">
                    </div>
                    <div class="card-details">
                        <p class="card-category" ${gift.categoryColor ? `style="color: ${gift.categoryColor}"` : ''}>${gift.category}</p>
                        <h3>${gift.title}</h3>
                    </div>
                `;

                // Re-attach click handler to card
                card.onclick = () => {
                    openModal(gift.title, gift.category, gift.image);
                };
            }
        });
    }

    updateBestGifts();
}

// Only display random gifts on home page
if (document.querySelector('.best-gifts__section')) {
    displayRandomGifts();
}

// ===== CATEGORY FILTERING =====
function initCategoryFilter() {
    const filterButtons = document.querySelectorAll('.filter, .filter-button');
    const giftItems = document.querySelectorAll('.gift-item .card');

    if (filterButtons.length === 0 || giftItems.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active state from all buttons
            filterButtons.forEach(btn => {
                btn.removeAttribute('disabled');
                btn.style.background = '';
                btn.classList.remove('inactive');
            });

            // Add active state to clicked button
            button.setAttribute('disabled', 'true');
            button.style.background = 'rgba(255, 255, 255, 0.2)';
            button.classList.add('inactive');

            const category = button.textContent.toLowerCase().trim();

            giftItems.forEach(item => {
                const itemCategory = item.querySelector('.card-category').textContent.toLowerCase().trim();

                if (category === 'all') {
                    item.style.display = 'flex';
                } else {
                    item.style.display = itemCategory === category ? 'flex' : 'none';
                }
            });
        });
    });
}

initCategoryFilter();

// ===== SCROLL TO TOP =====
const scrollToTopBtn = document.querySelector('.scroll-to-top');

if (scrollToTopBtn) {
    // Only show on mobile/tablet (768px and less)
    function checkScrollToTop() {
        if (window.innerWidth <= 768) {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }

    window.addEventListener('scroll', checkScrollToTop);
    window.addEventListener('resize', checkScrollToTop);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== KEYBOARD SUPPORT FOR MODAL =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===== BEST GIFTS HEADLINE ALIGNMENT =====
(function() {
    function alignBestHeadline() {
        const cards = Array.from(document.querySelectorAll('.container__cards .card'));
        const bestText = document.querySelector('.best__text');
        const parent = document.querySelector('.container__best');

        if (!cards.length || !bestText || !parent) return;

        // Reset styles first
        bestText.style.position = '';
        bestText.style.left = '';
        bestText.style.transform = '';
        bestText.style.top = '';
        bestText.style.width = '';
        bestText.style.maxWidth = '';
        bestText.style.margin = '';
    }

    window.addEventListener('load', alignBestHeadline);
    window.addEventListener('resize', alignBestHeadline);
})();
