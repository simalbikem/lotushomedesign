document.addEventListener('DOMContentLoaded', initGallery);

async function initGallery() {
    const gallery = document.getElementById('image-gallery');
    if (!gallery) {
        console.error("Gallery container (#image-gallery) bulunamadı!");
        return;
    }

    const jsonPath = gallery.dataset.json;          
    const category  = gallery.dataset.category;     

    if (!jsonPath || !category) {
        console.error("data-json veya data-category attribute eksik!");
        gallery.innerHTML = '<p style="color:red; text-align:center;">Kategori bilgisi eksik.</p>';
        return;
    }

    const STORAGE_KEY = `gallery_images_${category}`;

    let images = [];

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        
        if (stored) {
            images = JSON.parse(stored);
            console.log(`[${category}] LocalStorage'dan ${images.length} görsel yüklendi`);
        } else {
            const response = await fetch(jsonPath);
            if (!response.ok) {
                throw new Error(`JSON okunamadı: ${response.status} (${jsonPath})`);
            }
            images = await response.json();
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
            console.log(`[${category}] JSON'dan çekildi ve kaydedildi: ${images.length} görsel`);
        }
        renderImages(images, gallery);

    } catch (err) {
        console.error(`[${category}] Hata:`, err);
        gallery.innerHTML = `
            <p style="color: #d32f2f; text-align: center; padding: 2rem;">
                Görseller yüklenemedi. Lütfen sayfayı yenileyin.
            </p>
        `;
    }
}

function renderImages(imageArray, container) {
    container.innerHTML = '';

    imageArray.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = item.img;                   
        img.alt = item.name || 'Görsel';
        img.loading = 'lazy';
        img.decoding = 'async';

        img.addEventListener('load', function onLoad() {
            img.classList.add('loaded');
            img.removeEventListener('load', onLoad);
        }, { once: true });

        img.addEventListener('error', () => {
            img.classList.add('loaded');
            console.warn('Görsel yüklenemedi:', item.img);
        }, { once: true });

        itemDiv.appendChild(img);
        container.appendChild(itemDiv);
    });

}