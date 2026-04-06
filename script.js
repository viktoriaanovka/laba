const VARIANT_NUMBER = 17;

const reviewsList = document.getElementById('reviewsList');
const storageData = document.getElementById('storageData');
const feedbackModal = document.getElementById('feedbackModal');
const closeModalBtn = document.getElementById('closeModal');
const themeToggleBtn = document.getElementById('themeToggle');

function saveSystemInfo() {
    const systemInfo = {
        os_platform: navigator.platform || 'Невідомо',
        browser_userAgent: navigator.userAgent,
        browser_language: navigator.language,
        screen_width: String(window.screen.width),
        screen_height: String(window.screen.height),
    };

    Object.entries(systemInfo).forEach(([key, value]) => {
        localStorage.setItem(key, value);
    });
}

function renderLocalStorage() {
    storageData.innerHTML = '<h3>Дані localStorage</h3>';

    if (localStorage.length === 0) {
        storageData.innerHTML += '<p>localStorage порожній.</p>';
        return;
    }

    const list = document.createElement('ul');

    Object.keys(localStorage).forEach((key) => {
        const item = document.createElement('li');
        item.textContent = `${key}: ${localStorage.getItem(key)}`;
        list.appendChild(item);
    });

    storageData.appendChild(list);
}

async function loadReviews() {
    reviewsList.innerHTML = '<p>Завантаження відгуків...</p>';

    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${VARIANT_NUMBER}/comments`
        );

        if (!response.ok) {
            throw new Error('Не вдалося отримати відгуки.');
        }

        const reviews = await response.json();
        reviewsList.innerHTML = '';

        reviews.forEach((review) => {
            const card = document.createElement('div');
            card.className = 'review-card';

            card.innerHTML = `
                <h3>${review.name}</h3>
                <p><strong>Email:</strong> ${review.email}</p>
                <p>${review.body}</p>
            `;

            reviewsList.appendChild(card);
        });
    } catch (error) {
        reviewsList.innerHTML = `<p>Помилка: ${error.message}</p>`;
    }
}

function getAutomaticTheme() {
    const hour = new Date().getHours();
    return hour >= 7 && hour < 21 ? 'light' : 'dark';
}

function applyTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-mode')
        ? 'dark'
        : 'light';

    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function openModal() {
    feedbackModal.classList.add('show');
}

function closeModal() {
    feedbackModal.classList.remove('show');
    sessionStorage.setItem('feedbackClosed', 'true');
}

document.addEventListener('DOMContentLoaded', () => {
    saveSystemInfo();
    renderLocalStorage();
    loadReviews();

    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme || getAutomaticTheme());

    themeToggleBtn.addEventListener('click', toggleTheme);
    closeModalBtn.addEventListener('click', closeModal);

    feedbackModal.addEventListener('click', (event) => {
        if (event.target === feedbackModal) {
            closeModal();
        }
    });

    if (!sessionStorage.getItem('feedbackClosed')) {
        setTimeout(openModal, 60000);
    }
});
