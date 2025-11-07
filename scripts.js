document.addEventListener('DOMContentLoaded', function() {
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
});