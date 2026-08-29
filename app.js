document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Hamburger Menu Controller ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('mobile-open')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('mobile-open');
            menuToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
        });
    });


    // --- Dark/Light Theme Switching Engine Architecture ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const toggleIcon = themeToggleBtn.querySelector('i');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);

        if (theme === 'dark') {
            toggleIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            toggleIcon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    // Determine default initialization parameters
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (systemPrefersDark.matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    systemPrefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('portfolio-theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });


    // --- Intersection Observer (Reveal Elements & Nav Highlighting) ---
    const sections = document.querySelectorAll('.target-section');
    const navItems = document.querySelectorAll('.nav-item');
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "-10% 0px -40% 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { root: null, threshold: 0.05 });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- Tactile Clipboard Interaction Toolkit ---
    const clickableCards = document.querySelectorAll('.contact-card.clickable');

    clickableCards.forEach(card => {
        card.addEventListener('click', () => {
            const copyText = card.getAttribute('data-copy');
            const tooltip = card.querySelector('.tooltip');

            navigator.clipboard.writeText(copyText).then(() => {
                if (tooltip) {
                    const originalText = tooltip.innerText;
                    tooltip.innerText = 'Copied!';
                    card.style.borderColor = 'var(--primary-indigo)';

                    setTimeout(() => {
                        tooltip.innerText = originalText;
                        card.style.borderColor = '';
                    }, 2000);
                }
            }).catch(err => {
                console.error('Failed to execute clipboard copy operations: ', err);
            });
        });
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});