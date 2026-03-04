document.addEventListener('DOMContentLoaded', () => {
    const scenes = [
        { id: 1, img: "img/welcome-slide/kitchen.jpg",   name: "Contemporary Mutfak" },
        { id: 2, img: "img/welcome-slide/bedroom.jpg",   name: "Geleneksel Yatak Odası" },
        { id: 3, img: "img/welcome-slide/bathroom.jpg",  name: "Minimal Banyo" },
        { id: 4, img: "img/welcome-slide/attic.jpg",     name: "Teras Kat Çözümleri" }
    ];

    const landscape = document.querySelector('.landscape');
    const hero      = document.querySelector('.hero');

    scenes.forEach(scene => {
        const titleEl = document.createElement('div');
        titleEl.className = 'scene-title';
        titleEl.dataset.scene = scene.id;
        titleEl.textContent = scene.name;
        hero.appendChild(titleEl);
    });

    function updateBackground() {
        const checkedInput = document.querySelector('input[name="scene"]:checked');
        const currentId = checkedInput ? Number(checkedInput.value) : 1;
        
        const scene = scenes.find(s => s.id === currentId);
        if (scene) {
            landscape.style.backgroundImage = `url('${scene.img}')`;
        }
    }

    function getCurrentIndex() {
        const checked = document.querySelector('input[name="scene"]:checked');
        return checked ? Number(checked.value) : 1;
    }

    function goTo(index) {
        const safeIndex = Math.max(1, Math.min(scenes.length, index));
        const radio = document.getElementById(`scene-${safeIndex}`);
        if (radio) {
            radio.checked = true;
            updateBackground();
        }
    }

    document.querySelectorAll('input[name="scene"]').forEach(radio => {
        radio.addEventListener('change', updateBackground);
    });

    const prevBtn = document.querySelector('.nav-button.prev');
    const nextBtn = document.querySelector('.nav-button.next');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goTo(getCurrentIndex() - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goTo(getCurrentIndex() + 1);
        });
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') {
            prevBtn?.click();
        }
        if (e.key === 'ArrowRight') {
            nextBtn?.click();
        }
    });

    let autoSlideInterval;

    function startAutoSlide() {
        clearInterval(autoSlideInterval); 
        
        autoSlideInterval = setInterval(() => {
            let current = getCurrentIndex();
            let next = current + 1;
            if (next > scenes.length) next = 1; 
            goTo(next);
        }, 4000);
    }
    startAutoSlide();

    if (hero) {
        hero.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        hero.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
    updateBackground();
});