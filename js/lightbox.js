// lightbox.js

document.addEventListener('DOMContentLoaded', () => {
    const modal      = document.getElementById('lightbox');
    const modalImg   = document.getElementById('lightbox-img');
    const captionTxt = document.getElementById('lightbox-caption');
    const closeBtn   = document.querySelector('.close-btn');
    const prevBtn    = document.querySelector('.prev-btn');
    const nextBtn    = document.querySelector('.next-btn');

    let currentIndex = 0;
    let galleryItems = [];

    // Galerideki tüm resimleri topla
    function initLightbox() {
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
        captionTxt.textContent = currentImg.alt || '';

        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // arka plan kaydırmayı engelle
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

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLightbox();
    });

    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Klavye desteği
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('show')) return;

        if (e.key === 'Escape' || e.key === 'Esc') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrev();
        } else if (e.key === 'ArrowRight') {
            showNext();
        }
    });

    // Basit swipe desteği (mobil)
    let touchStartX = 0;
    modal.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    modal.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 60) {  // minimum kaydırma mesafesi
            if (diff > 0) showNext();
            else          showPrev();
        }
    });

    // Sayfa yüklendiğinde veya dinamik içerik eklendiğinde çalıştır
    initLightbox();

    // Eğer display.js ile resimler sonradan ekleniyorsa, observer ile dinleyebilirsin
    // Alternatif basit çözüm: display.js içindeki renderImages sonuna initLightbox() çağır
});