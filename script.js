document.addEventListener('DOMContentLoaded', function() {
    // Оновлюємо дані при завантаженні
    updateContactInfo();

    // Обробка мобільного меню (бургер)
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }
    
    // Обробка навігаційних посилань
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                scrollToSection(targetId.substring(1));
            }
        });
    });
});

// Функція для плавного скролу
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Закриваємо мобільне меню після кліку
    const navMenu = document.querySelector(".nav-menu");
    const hamburger = document.querySelector(".hamburger");
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
}

// Функція оновлення контактів (щоб дані завжди були актуальні)
function updateContactInfo() {
    const phone = '+38 098 431 33 16';
    const address = 'м. Новояворівськ, вул. Степана Бандери, №1-A, приміщення 158';
    const schedule = 'Пн-Пт: 09:00-18:00 (перерва 13:00-14:00)';

    const phoneElem = document.getElementById('phone-text');
    const addressElem = document.getElementById('address-text');
    const scheduleElem = document.getElementById('schedule-text');

    if (phoneElem) phoneElem.textContent = phone;
    if (addressElem) addressElem.textContent = address;
    if (scheduleElem) scheduleElem.textContent = schedule;
}

// Функція копіювання номера
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

// Експорт функцій у глобальну область
window.scrollToSection = scrollToSection;
window.copyPhoneNumber = copyPhoneNumber;

// Закриття мобільного меню при кліку поза ним
document.addEventListener('click', function(event) {
    const navMenu = document.querySelector(".nav-menu");
    const hamburger = document.querySelector(".hamburger");
    
    if (navMenu.classList.contains('active') && 
        !event.target.closest('.nav-menu') && 
        !event.target.closest('.hamburger')) {
        navMenu.classList.remove('active');
    }
});
