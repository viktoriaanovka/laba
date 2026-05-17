const VARIANT_NUMBER = 17;

const reviewsList = document.getElementById('reviewsList');
const storageData = document.getElementById('storageData');
const themeToggleBtn = document.getElementById('themeToggle');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

function saveSystemInfo() {
    const systemInfo = {
        sys_platform: navigator.platform || 'Невідомо',
        sys_userAgent: navigator.userAgent,
        sys_language: navigator.language,
        sys_screen_width: String(window.screen.width),
        sys_screen_height: String(window.screen.height),
        sys_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        sys_saved_at: new Date().toISOString(),
    };

    Object.entries(systemInfo).forEach(([key, value]) => {
        localStorage.setItem(key, value);
    });
}

function renderLocalStorage() {
    storageData.innerHTML = '<h3>Дані localStorage</h3>';

    const selectedKeys = Object.keys(localStorage).filter((key) => {
        return key.startsWith('sys_') || key.startsWith('theme_');
    });

    if (selectedKeys.length === 0) {
        storageData.innerHTML += '<p>localStorage порожній.</p>';
        return;
    }

    const list = document.createElement('ul');

    selectedKeys.forEach((key) => {
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
    localStorage.setItem('theme_mode', theme);
    localStorage.setItem('theme_applied_at', new Date().toISOString());

    if (themeToggleBtn) {
        themeToggleBtn.textContent = theme === 'dark'
            ? 'Увімкнути денну тему'
            : 'Увімкнути нічну тему';
    }
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-mode')
        ? 'dark'
        : 'light';

    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    renderLocalStorage();
}

function setFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = type;
}

async function sendContactForm(event) {
    event.preventDefault();

    setFormStatus('Відправлення повідомлення...', '');

    const formData = new FormData(contactForm);

    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            setFormStatus(result.error || 'Помилка відправлення форми.', 'error');
            return;
        }

        setFormStatus(result.message || 'Повідомлення успішно відправлено.', 'success');
        contactForm.reset();
    } catch {
        setFormStatus('Не вдалося підключитися до сервера.', 'error');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    saveSystemInfo();
    renderLocalStorage();
    loadReviews();

    const savedTheme = localStorage.getItem('theme_mode');
    applyTheme(savedTheme || getAutomaticTheme());
    renderLocalStorage();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', sendContactForm);
    }
});