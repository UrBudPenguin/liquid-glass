document.addEventListener('DOMContentLoaded', () => {
    const glassCard = document.querySelector('.glass-card');
    const turbulence = document.querySelector('#liquid-distortion feTurbulence');
    let mouseX = 0;
    let mouseY = 0;

    // Get the current position of the mouse on the page
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate the SVG filter properties based on mouse position
    function animateLiquid() {
        const rect = glassCard.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from center, scaled to window size
        const deltaX = (mouseX - centerX) / window.innerWidth;
        const deltaY = (mouseY - centerY) / window.innerHeight;

        // Adjust the baseFrequency of the noise for a liquid-like deformation
        const baseFrequencyX = 0.01 + Math.abs(deltaX) * 0.05;
        const baseFrequencyY = 0.01 + Math.abs(deltaY) * 0.05;
        turbulence.setAttribute('baseFrequency', `${baseFrequencyX} ${baseFrequencyY}`);

        requestAnimationFrame(animateLiquid);
    }

    // Check for filter support before starting the animation
    if (CSS.supports('filter', 'url(#liquid-distortion)')) {
        animateLiquid();
    }
});
