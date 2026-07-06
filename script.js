document.addEventListener('DOMContentLoaded', function() {
    updateContactInfo();
    loadAnnouncement();

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            hamburger.classList.toggle("active");
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                scrollToSection(targetId.substring(1));
            }
        });
    });

    initializeTheme();

    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            let currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }

    const navMenu = document.querySelector(".nav-menu");
    const hamburger = document.querySelector(".hamburger");
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

function updateContactInfo() {
    const phone = '+380684312014';
    const address = 'м. Новояворівськ, вул. Степана Бандери, №1-A, приміщення 158';
    const schedule = 'Пн-Пт: 09:00-18:00 (перерва 13:00-14:00)';

    const phoneElem = document.getElementById('phone-text');
    const addressElem = document.getElementById('address-text');
    const scheduleElem = document.getElementById('schedule-text');

    if (phoneElem) phoneElem.textContent = phone;
    if (addressElem) addressElem.textContent = address;
    if (scheduleElem) scheduleElem.textContent = schedule;
}

function copyPhoneNumber() {
    const phoneNumber = '+380684312014';
    const copyMessage = document.getElementById('copyMessage');

    navigator.clipboard.writeText(phoneNumber).then(() => {
        if (copyMessage) {
            copyMessage.textContent = 'Номер скопійовано!';
            copyMessage.style.color = '#27ae60';
            setTimeout(() => { copyMessage.textContent = ''; }, 3000);
        }
    }).catch(err => {
        console.error('Помилка копіювання', err);
    });
}

function setTheme(theme) {
    const themeBtn = document.getElementById('themeBtn');
    const icon = themeBtn.querySelector('i');

    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        icon.className = 'fas fa-sun';
        themeBtn.style.backgroundColor = '#f5f6fa';
        themeBtn.style.color = '#2d3436';
    } else {
        document.body.classList.remove('dark-theme');
        icon.className = 'fas fa-moon';
        themeBtn.style.backgroundColor = '#ffffff';
        themeBtn.style.color = '#2d3436';
    }
    localStorage.setItem('theme', theme);
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

function loadAnnouncement() {
    const banner = document.getElementById('announcementBanner');
    const textElem = document.getElementById('announcementText');

    if (!banner || !textElem) return;

    fetch('announce.txt?t=' + Date.now())
        .then(response => {
            if (!response.ok) throw new Error('Файл оголошення не знайдено');
            return response.text();
        })
        .then(text => {
            const trimmed = text.trim();
            if (trimmed.length > 0) {
                textElem.textContent = trimmed;
                banner.classList.add('visible');
            } else {
                banner.classList.remove('visible');
            }
        })
        .catch(() => {
            banner.classList.remove('visible');
        });
}

window.scrollToSection = scrollToSection;
window.copyPhoneNumber = copyPhoneNumber;

document.addEventListener('click', function(event) {
    const navMenu = document.querySelector(".nav-menu");
    const hamburger = document.querySelector(".hamburger");

    if (navMenu.classList.contains('active') &&
        !event.target.closest('.nav-menu') &&
        !event.target.closest('.hamburger')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});
