// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.toggle('light-mode', savedTheme === 'light');
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            if (body.classList.contains('light-mode')) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.3)';
            }
        } else {
            if (body.classList.contains('light-mode')) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            }
        }
    });

    // Typing animation for the name
    const nameElement = document.querySelector('.hero-content h1 span');
    if (nameElement) {
        const text = nameElement.textContent;
        nameElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                nameElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }

    // Text shuffling animation for titles
    const shuffleElement = document.getElementById('shuffleText');
    if (shuffleElement) {
        const titles = [
            'Software Engineer',
            'A Problem Solver',
            'Developer',
            'Creative Thinker'
        ];
        
        let currentIndex = 0;
        
        const shuffleText = () => {
            const currentText = titles[currentIndex];
            let charIndex = 0;
            
            // Clear the text first
            shuffleElement.textContent = '';
            
            // Type out the new text
            const typeNewText = () => {
                if (charIndex < currentText.length) {
                    shuffleElement.textContent += currentText.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeNewText, 100);
                } else {
                    // Wait before moving to next title
                    setTimeout(() => {
                        currentIndex = (currentIndex + 1) % titles.length;
                        shuffleText();
                    }, 2000); // Wait 2 seconds before next title
                }
            };
            
            typeNewText();
        };
        
        // Start the shuffling animation after the name typing is done
        setTimeout(shuffleText, 3000);
    }

    // Download CV button functionality
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Let the default download behavior work
            // The download attribute will handle the file download
        });
    }

    // Add hover effects for social icons
    const socialIcons = document.querySelectorAll('.social-links img, .nav-icons img');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Parallax effect for hero image
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px) scale(1.05)`;
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Mobile menu toggle (for future mobile menu implementation)
    const createMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');
        
        // Create hamburger menu for mobile
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Only show hamburger on mobile
        if (window.innerWidth <= 768) {
            navbar.insertBefore(hamburger, navLinks);
        }
    };

    // Initialize mobile menu
    createMobileMenu();
    
    // Reinitialize on window resize
    window.addEventListener('resize', createMobileMenu);
});

// Add some CSS for mobile menu (you can add this to your CSS file)
const mobileMenuCSS = `
    .hamburger {
        display: none;
        flex-direction: column;
        cursor: pointer;
        padding: 5px;
    }
    
    .hamburger span {
        width: 25px;
        height: 3px;
        background: #333;
        margin: 3px 0;
        transition: 0.3s;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .hamburger {
            display: flex;
        }
        
        .nav-links {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: rgba(255, 255, 255, 0.98);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: 0.3s;
        }
        
        .nav-links.active {
            left: 0;
        }
    }
`;

// Inject mobile menu CSS
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);
