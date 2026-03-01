document.addEventListener('DOMContentLoaded', function () {
    const modal    = document.getElementById('lightbox');
    const modalImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn  = document.querySelector('.prev-btn');
    const nextBtn  = document.querySelector('.next-btn');

    if (!modal || !modalImg || !closeBtn || !prevBtn || !nextBtn) {
        console.warn("Lightbox için gerekli bazı HTML elemanları eksik!");
        return;
    }

    let currentIndex = 0;
    let galleryItems = [];
    function collectImages() {
        galleryItems = Array.from(document.querySelectorAll('.gallery-item img'));
        galleryItems.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                currentIndex = index;
                openLightbox();
            });
        });
    }
    function openLightbox() {
        if (galleryItems.length === 0) return;
        const currentImg = galleryItems[currentIndex];
        modalImg.src = currentImg.src;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    function showNext() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        openLightbox();
    }
    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox();
    }


    closeBtn.addEventListener('click', closeLightbox);

    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeLightbox();
    });

    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    document.addEventListener('keydown', function (e) {
        if (!modal.classList.contains('show')) return;

        if (e.key === 'Escape' || e.key === 'Esc') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrev();
        } else if (e.key === 'ArrowRight') {
            showNext();
        }
    });

    let touchStartX = 0;
    modal.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    modal.addEventListener('touchend', function (e) {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 60) {
            if (diff > 0) {
                showNext();
            } else {
                showPrev();
            }
        }
    });
    collectImages();
});