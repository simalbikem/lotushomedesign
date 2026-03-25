document.addEventListener('DOMContentLoaded', initGallery);

async function initGallery() {
    const gallery = document.getElementById('image-gallery');
    if (!gallery) {
        console.error("Gallery container bulunamadı (#image-gallery).");
        return;
    }

    const jsonPath = gallery.dataset.json;
    const category = gallery.dataset.category;

    if (!jsonPath || !category) {
        console.error("data-json veya data-category eksik!");
        gallery.innerHTML = `<p style="color:red;text-align:center;">Kategori bilgisi eksik.</p>`;
        return;
    }

    const STORAGE_KEY = `gallery_images_${category}`;
    const VERSION_KEY = `gallery_version_${category}`;
    const STORAGE_VERSION = 2; 

    const savedVersion = parseInt(localStorage.getItem(VERSION_KEY));

    if (savedVersion !== STORAGE_VERSION) {
        console.warn(`[${category}] Versiyon farkı → LocalStorage temizlenecek.`);
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem(VERSION_KEY, STORAGE_VERSION);
    }

    let images = [];

    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {
            images = JSON.parse(stored);
            console.log(`[${category}] LocalStorage'dan yüklendi (${images.length} görsel).`);
        } else {
            const response = await fetch(jsonPath);
            if (!response.ok) {
                throw new Error(`JSON okunamadı: ${response.status}`);
            }

            images = await response.json();

            if (!Array.isArray(images)) {
                throw new Error("JSON formatı geçersiz.");
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
            console.log(`[${category}] JSON'dan çekildi ve kaydedildi.`);
        }

        renderImages(images, gallery);

    } catch (err) {
        console.error(`[${category}] Hata:`, err);
        gallery.innerHTML = `
            <p style="color: #d32f2f; text-align: center; padding: 2rem;">
                Görseller yüklenemedi. Lütfen sayfayı yenileyin.
            </p>`;
    }
}

function renderImages(imageArray, container) {
    container.innerHTML = '';

    imageArray.forEach(item => {
        const wrapper = document.createElement('div');
        wrapper.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.name || 'Görsel';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        }, { once: true });
        img.addEventListener('error', () => {
            img.classList.add('loaded');
            console.warn("Görsel yüklenemedi:", item.img);
        }, { once: true });

        wrapper.appendChild(img);
        container.appendChild(wrapper);
    });
}