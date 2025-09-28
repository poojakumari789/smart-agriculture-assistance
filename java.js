// Mobile menu toggle functionality
const menuBtn = document.querySelector("#menubtn");
const menu = document.querySelector(".nav-links");
const header = document.querySelector("header");

menuBtn.addEventListener('click', () => {
    if (menu.style.left === "0px") {
        menu.style.left = "-100%";
    } else {
        menu.style.left = "0";
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target) && menu.style.left === "0px") {
        menu.style.left = "-100%";
    }
});

// Form validation
document.addEventListener('DOMContentLoaded', () => {
    // Get all forms on the page
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Get all required inputs
            const requiredInputs = form.querySelectorAll('[required]');
            
            // Remove existing error messages
            const existingErrors = form.querySelectorAll('.error');
            existingErrors.forEach(error => error.remove());
            
            // Reset error styling
            const allInputs = form.querySelectorAll('input');
            allInputs.forEach(input => input.classList.remove('error-input'));
            
            // Check each required input
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error-input');
                    
                    // Create error message
                    const errorMsg = document.createElement('span');
                    errorMsg.className = 'error';
                    errorMsg.textContent = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required`;
                    
                    // Insert error message after input
                    input.parentNode.insertBefore(errorMsg, input.nextSibling);
                }
                
                // Email validation
                if (input.type === 'email' && input.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value)) {
                        isValid = false;
                        input.classList.add('error-input');
                        
                        const errorMsg = document.createElement('span');
                        errorMsg.className = 'error';
                        errorMsg.textContent = 'Please enter a valid email address';
                        
                        input.parentNode.insertBefore(errorMsg, input.nextSibling);
                    }
                }
                
                // Password validation (if needed)
                if (input.type === 'password' && input.value.trim()) {
                    if (input.value.length < 6) {
                        isValid = false;
                        input.classList.add('error-input');
                        
                        const errorMsg = document.createElement('span');
                        errorMsg.className = 'error';
                        errorMsg.textContent = 'Password must be at least 6 characters';
                        
                        input.parentNode.insertBefore(errorMsg, input.nextSibling);
                    }
                }
            });
            
            if (!isValid) {
                event.preventDefault();
            }
        });
    });
    
    // Toggle password visibility
    const showPasswordCheckboxes = document.querySelectorAll('#show-password');
    showPasswordCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const passwordField = this.closest('form').querySelector('input[type="password"]');
            if (passwordField) {
                passwordField.type = this.checked ? 'text' : 'password';
            }
        });
    });
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.irrigation-container, .pest-intro, .fertilizer-intro');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state for animations
    const elementsToAnimate = document.querySelectorAll('.irrigation-container, .pest-intro, .fertilizer-intro');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation check on load
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
});
