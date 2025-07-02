// Portfolio Data
const portfolioItems = [
    {
        id: 'project1',
        title: 'Creative Brand Identity',
        description: 'Complete brand redesign for a tech startup',
        year: '2024',
        tools: 'Canva, Photoshop',
        category: 'design',
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        fullDescription: 'Complete brand redesign for a tech startup, including logo design, color palette, typography system, and brand guidelines. The project resulted in a 200% increase in brand recognition and significantly improved market positioning.'
    },
    {
        id: 'project2',
        title: 'Product Advertisement',
        description: '30-second promotional video for e-commerce brand',
        year: '2024',
        tools: 'CapCut, Photoshop',
        category: 'video',
        image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        fullDescription: '30-second promotional video for an e-commerce brand featuring dynamic product shots, motion graphics, and compelling storytelling. The video achieved over 1M views across social media platforms and increased product sales by 150%.'
    },
    {
        id: 'project3',
        title: 'Portrait Series',
        description: 'Professional headshots for corporate clients',
        year: '2023',
        tools: 'Camera, Photoshop',
        category: 'photography',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        fullDescription: 'Professional headshot series for corporate clients, featuring carefully crafted lighting and composition to capture each individual\'s personality and professional presence. All clients reported increased confidence and professional opportunities following their sessions.'
    },
    {
        id: 'project4',
        title: 'Social Media Campaign',
        description: 'Instagram post series for lifestyle brand',
        year: '2024',
        tools: 'Canva, Photoshop',
        category: 'design',
        image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        fullDescription: 'Instagram post series for a lifestyle brand, featuring cohesive visual design, engaging copy, and strategic hashtag usage. The campaign resulted in 300% increase in engagement and 50% growth in followers over 3 months.'
    },
    {
        id: 'project5',
        title: 'Event Promo Video',
        description: 'Dynamic promotional content for music festival',
        year: '2023',
        tools: 'CapCut',
        category: 'video',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        fullDescription: 'Dynamic promotional content for a music festival, featuring high-energy visuals, artist highlights, and engaging storytelling. The video contributed to selling out the event and establishing it as a premier music destination.'
    },
    {
        id: 'project6',
        title: 'Product Photography',
        description: 'E-commerce product shots for fashion brand',
        year: '2024',
        tools: 'Camera, Photoshop',
        category: 'photography',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        fullDescription: 'E-commerce product photography for a fashion brand, featuring clean backgrounds, perfect lighting, and attention to detail. The professional imagery increased online sales conversion rates by 80% and improved brand perception significantly.'
    }
];

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const portfolioGrid = document.getElementById('portfolio-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('portfolio-modal');
const modalClose = document.querySelector('.modal-close');
const contactForm = document.getElementById('contact-form');

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;

    navLinks.forEach(link => {
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const sectionTop = targetSection.offsetTop;
            const sectionHeight = targetSection.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

// Portfolio Functions
function renderPortfolioItems(items) {
    portfolioGrid.innerHTML = '';

    items.forEach(item => {
        const portfolioElement = document.createElement('div');
        portfolioElement.className = 'portfolio-item';
        portfolioElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="portfolio-image">
            <div class="portfolio-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="portfolio-meta">
                    <span>${item.year}</span>
                    <span>${item.tools}</span>
                </div>
            </div>
        `;

        portfolioElement.addEventListener('click', () => openModal(item));
        portfolioGrid.appendChild(portfolioElement);
    });
}

// Portfolio Filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active filter button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter items
        const filter = btn.getAttribute('data-filter');
        const filteredItems = filter === 'all' 
            ? portfolioItems 
            : portfolioItems.filter(item => item.category === filter);

        renderPortfolioItems(filteredItems);
    });
});

// Modal Functions
function openModal(item) {
    document.getElementById('modal-title').textContent = item.title;
    document.getElementById('modal-image').src = item.image;
    document.getElementById('modal-image').alt = item.title;
    document.getElementById('modal-description').textContent = item.fullDescription;
    document.getElementById('modal-tools').textContent = item.tools;
    document.getElementById('modal-year').textContent = item.year;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Modal Event Listeners
modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Skill Bar Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<div class="loading"></div> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        // Reset form
        contactForm.reset();

        // Show success message
        showToast('Message Sent!', 'Thank you for your message. I\'ll get back to you soon!', 'success');

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Toast Notification
function showToast(title, message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
        <button class="toast-close">&times;</button>
    `;

    // Add toast styles if not already added
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                top: 5rem;
                right: 1rem;
                background: white;
                border-radius: 0.5rem;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                border-left: 4px solid var(--primary);
                padding: 1rem;
                max-width: 400px;
                z-index: 3000;
                animation: slideInRight 0.3s ease;
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            .toast-success {
                border-left-color: #10b981;
            }

            .toast-content h4 {
                margin: 0 0 0.25rem 0;
                font-size: 1rem;
                color: var(--text-primary);
            }

            .toast-content p {
                margin: 0;
                font-size: 0.875rem;
                color: var(--text-secondary);
            }

            .toast-close {
                background: none;
                border: none;
                font-size: 1.25rem;
                cursor: pointer;
                color: var(--text-secondary);
                padding: 0;
                margin-left: auto;
            }

            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOutRight {
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // Close toast
    const closeToast = () => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    };

    toast.querySelector('.toast-close').addEventListener('click', closeToast);

    // Auto close after 5 seconds
    setTimeout(closeToast, 5000);
}

// Scroll Animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Initialize fade-in elements
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
}

// Typing Effect for Hero
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Parallax Effect
function handleParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Render initial portfolio
    renderPortfolioItems(portfolioItems);

    // Initialize scroll animations
    initScrollAnimations();

    // Animate skill bars when skills section is visible
    const skillsSection = document.getElementById('skills');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Add typing effect to hero title (optional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
});

// Event Listeners
window.addEventListener('scroll', () => {
    handleScrollAnimations();
    handleParallax();
});

window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    handleScrollAnimations();
    handleParallax();
}, 16)); // ~60fps

// Preload images for better performance
function preloadImages() {
    portfolioItems.forEach(item => {
        const img = new Image();
        img.src = item.image;
    });
}

// Call preload on page load
window.addEventListener('load', preloadImages);

// Add loading animation for page transitions
function showPageLoader() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loading"></div>
            <p>Loading...</p>
        </div>
    `;

    const loaderStyles = `
        #page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }

        .loader-content {
            text-align: center;
        }

        .loader-content p {
            margin-top: 1rem;
            color: var(--text-secondary);
        }
    `;

    const style = document.createElement('style');
    style.textContent = loaderStyles;
    document.head.appendChild(style);
    document.body.appendChild(loader);

    // Hide loader after page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
                document.head.removeChild(style);
            }, 500);
        }, 500);
    });
}

// Initialize page loader
// showPageLoader();

// Dark mode toggle (optional feature)
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');

    const darkModeStyles = `
        .dark-mode-toggle {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            background: var(--primary);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .dark-mode-toggle:hover {
            transform: scale(1.1);
        }

        body.dark-mode {
            --background: #1f2937;
            --text-primary: #f9fafb;
            --text-secondary: #d1d5db;
            --border: #374151;
        }

        body.dark-mode .navbar,
        body.dark-mode .about-content,
        body.dark-mode .skills-category,
        body.dark-mode .portfolio-item,
        body.dark-mode .timeline-content,
        body.dark-mode .education-item,
        body.dark-mode .certifications,
        body.dark-mode .contact-container,
        body.dark-mode .modal-content {
            background: #374151;
            color: var(--text-primary);
        }
    `;

    const style = document.createElement('style');
    style.textContent = darkModeStyles;
    document.head.appendChild(style);

    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('dark-mode', isDark);
    });

    // Load saved preference
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Uncomment to enable dark mode
// initDarkMode();