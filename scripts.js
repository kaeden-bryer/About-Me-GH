document.addEventListener('DOMContentLoaded', function() {
    // Preserve scroll position on reload
    if (localStorage.getItem('scrollPosition')) {
        const scrollPos = localStorage.getItem('scrollPosition');
        document.querySelector('main').scrollTop = scrollPos;
        localStorage.removeItem('scrollPosition'); // Clean up after use
    }
    
    // Save scroll position before page unload
    window.addEventListener('beforeunload', function() {
        const scrollPos = document.querySelector('main').scrollTop;
        localStorage.setItem('scrollPosition', scrollPos);
    });

    const carousel = document.getElementById('image-carousel');
    const images = carousel.querySelectorAll('img');
    
    // Set initial positions for all images
    let imageWidth = 0;
    let containerWidth = 0;
    let imagePositions = []; // Store positions as numbers instead of parsing from DOM
    
    function initCarousel() {
        containerWidth = carousel.offsetWidth;
        
        // Calculate image width including margin
        if (images.length > 0) {
            imageWidth = images[0].offsetWidth + 32; // 32px = 2rem margin-right
        }
        
        // Position images in a row starting from the left edge of the container (all visible on screen)
        images.forEach((img, index) => {
            const position = index * imageWidth;
            imagePositions[index] = position;
            img.style.position = 'absolute';
            img.style.left = `${position}px`;
            img.style.transition = 'none';
        });
    }
    
    function animateCarousel() {
        images.forEach((img, index) => {
            // Move image using stored position
            imagePositions[index] += 0.5; // Now decimal values work!
            
            // If image has completely exited the right side, move it to the left side
            if (imagePositions[index] > containerWidth) {
                // Find the leftmost image position
                let minLeft = Math.min(...imagePositions);
                imagePositions[index] = minLeft - imageWidth;
            }
            
            img.style.left = `${imagePositions[index]}px`;
        });
        
        // Continue animation
        requestAnimationFrame(animateCarousel);
    }
    
    // Handle window resize
    function handleResize() {
        initCarousel();
    }
    
    // Initialize carousel
    initCarousel();
    
    // Start animation
    requestAnimationFrame(animateCarousel);
    
    // Handle window resize
    window.addEventListener('resize', handleResize);

    const animatedElements = document.querySelectorAll('.browser-window');

    // Browser window animation
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // Stop observing once animated
        }
    });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
        
        // Add hover effects with JavaScript
        element.addEventListener('mouseenter', function() {
            if (this.classList.contains('in-view')) {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.3s ease';
                element.style.cursor = 'pointer';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.classList.contains('in-view')) {
                this.style.transform = 'scale(1)';
                this.style.transition = 'transform 0.3s ease';
                element.style.cursor = 'default';
            }
        });
    });
});