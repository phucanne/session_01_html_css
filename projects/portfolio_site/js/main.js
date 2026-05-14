/**
 * Main JavaScript for Portfolio Site
 * Bài 1.2: Skill bars animation on scroll
 * Bài 1.3: Portfolio filtering
 * Bài 1.4: Form validation
 */

(function() {
    'use strict';

    // ========== SKILL BARS ANIMATION (Bài 1.2) ==========
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    if (skillProgressBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressDiv = entry.target;
                    const parentSkill = progressDiv.closest('.skill-item');
                    if (parentSkill) {
                        const progressValue = parentSkill.getAttribute('data-progress');
                        if (progressValue && !progressDiv.style.width) {
                            progressDiv.style.width = `${progressValue}%`;
                        }
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        skillProgressBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // ========== PORTFOLIO FILTERING (Bài 1.3) ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterValue = btn.getAttribute('data-filter');
                
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ========== CONTACT FORM VALIDATION (Bài 1.4) ==========
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                nameInput.style.borderColor = 'var(--color-error)';
                isValid = false;
            } else {
                nameInput.style.borderColor = 'var(--color-success)';
            }
            
            if (!emailInput.value.trim() || !emailInput.validity.valid) {
                emailInput.style.borderColor = 'var(--color-error)';
                isValid = false;
            } else {
                emailInput.style.borderColor = 'var(--color-success)';
            }
            
            if (!messageInput.value.trim()) {
                messageInput.style.borderColor = 'var(--color-error)';
                isValid = false;
            } else {
                messageInput.style.borderColor = 'var(--color-success)';
            }
            
            if (isValid) {
                alert('✨ Thank you for your message! I will get back to you soon.');
                contactForm.reset();
                [nameInput, emailInput, messageInput].forEach(input => {
                    input.style.borderColor = '';
                });
            } else {
                alert('Please fill in all fields correctly.');
            }
        });
        
        // Real-time validation feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    if (input.type === 'email' && !input.validity.valid) {
                        input.style.borderColor = 'var(--color-error)';
                    } else {
                        input.style.borderColor = 'var(--color-success)';
                    }
                } else {
                    input.style.borderColor = '';
                }
            });
        });
    }

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
                // Close mobile menu if open
                const menuToggle = document.getElementById('menu-toggle');
                if (menuToggle && menuToggle.checked) {
                    menuToggle.checked = false;
                }
            }
        });
    });
})();