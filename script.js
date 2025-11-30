// Add smooth scrolling and interactive features
document.addEventListener('DOMContentLoaded', function() {
    
    // Create magical twinkling stars
    function createStars() {
        const numberOfStars = 100;
        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.top = Math.random() * 100 + '%';
            star.style.left = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            document.body.appendChild(star);
        }
    }

    // Create magical shooting stars
    function createShootingStars() {
        const numberOfShootingStars = 5;
        for (let i = 0; i < numberOfShootingStars; i++) {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            shootingStar.style.top = Math.random() * 50 + '%';
            shootingStar.style.left = Math.random() * 50 + '%';
            shootingStar.style.animationDelay = Math.random() * 8 + 's';
            document.body.appendChild(shootingStar);
        }
    }

    // Initialize magical starfield
    createStars();
    createShootingStars();
    
    // Animated counter for stats
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target === 100 ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
            }
        }, 16);
    }
    
    // Observe stats for animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number[data-target]');
                statNumbers.forEach(stat => animateCounter(stat));
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        statsObserver.observe(statsSection.parentElement);
    }
    
    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add hover effect to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add click-to-copy functionality for contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            navigator.clipboard.writeText(text).then(() => {
                // Show tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Copied!';
                tooltip.style.cssText = `
                    position: absolute;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 0.8rem;
                    margin-top: -30px;
                    animation: fadeOut 2s forwards;
                `;
                this.style.position = 'relative';
                this.appendChild(tooltip);
                
                setTimeout(() => {
                    tooltip.remove();
                }, 2000);
            }).catch(err => {
                console.log('Could not copy text: ', err);
            });
        });
    });

    // Add dynamic progress bars for skills (optional enhancement)
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            const tags = this.querySelectorAll('.skill-tag');
            tags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.opacity = '0';
                    setTimeout(() => {
                        tag.style.opacity = '1';
                    }, 50);
                }, index * 50);
            });
        });
    });

    // Add print functionality
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-download"></i> Download PDF';
    printButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #0f172a, #334155);
        color: white;
        border: 2px solid rgba(212, 175, 55, 0.5);
        padding: 15px 25px;
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(212, 175, 55, 0.2);
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.6), 0 0 40px rgba(212, 175, 55, 0.4)';
        this.style.borderColor = 'rgba(212, 175, 55, 0.8)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(212, 175, 55, 0.2)';
        this.style.borderColor = 'rgba(212, 175, 55, 0.5)';
    });
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printButton);

    // Add "Don't Panic" button - Hitchhiker's Guide Easter Egg
    const dontPanicButton = document.createElement('button');
    dontPanicButton.className = 'dont-panic';
    dontPanicButton.textContent = "DON'T PANIC";
    dontPanicButton.title = "The Hitchhiker's Guide to the Galaxy";
    
    const hitchhikerQuotes = [
        "Time is an illusion. Lunchtime doubly so.",
        "The ships hung in the sky in much the same way that bricks don't.",
        "Would it save you a lot of time if I just gave up and went mad now?",
        "Flying is learning how to throw yourself at the ground and miss.",
        "In the beginning the Universe was created. This has made a lot of people very angry.",
        "The Answer to Life, the Universe, and Everything is 42.",
        "So long, and thanks for all the fish!",
        "Forty-two. I checked it very thoroughly, and that quite definitely is the answer.",
        "There is a theory which states that if ever anyone discovers exactly what the Universe is for and why it is here, it will instantly disappear and be replaced by something even more bizarre and inexplicable.",
        "I'd far rather be happy than right any day."
    ];
    
    let quoteIndex = 0;
    
    dontPanicButton.addEventListener('click', function() {
        alert(hitchhikerQuotes[quoteIndex]);
        quoteIndex = (quoteIndex + 1) % hitchhikerQuotes.length;
        
        // Fun animation
        this.style.transform = 'scale(0.9) rotate(5deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    });
    
    document.body.appendChild(dontPanicButton);

    // Add CSS animation for tooltip
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            0% { opacity: 1; }
            70% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Add smooth reveal effect on load
    setTimeout(() => {
        document.querySelector('.container').style.opacity = '1';
    }, 100);

    console.log('Resume loaded successfully! 🚀');
    console.log('Created by Lizzie Johnson');
});
