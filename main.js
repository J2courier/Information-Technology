document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-modal');
    const timelineImages = document.querySelectorAll('.timeline img');

    // Open modal when clicking an image
    timelineImages.forEach(img => {
        img.addEventListener('click', function() {
            modalImg.src = this.src;
            // Use setTimeout to ensure the image is loaded before transition
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    });

    // Close modal function with transition
    function closeModal() {
        modal.classList.remove('active');
        // Wait for transition to complete before clearing the image
        setTimeout(() => {
            modalImg.src = '';
        }, 300); // Match this with your CSS transition duration
    }

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
