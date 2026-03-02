document.addEventListener('DOMContentLoaded', () => {
    const scenes = [
        { id: 1, img: "img/welcome-slide/kitchen.jpg",   name: "Contemporary Mutfak" },
        { id: 2, img: "img/welcome-slide/bedroom.jpg",   name: "Geleneksel Yatak Odası" },
        { id: 3, img: "img/welcome-slide/bathroom.jpg",  name: "Minimal Banyo" },
        { id: 4, img: "img/welcome-slide/attic.jpg",     name: "Teras Kat Çözümleri" }
    ];

    const landscape = document.querySelector('.landscape');
    const hero = document.querySelector('.hero');

    scenes.forEach(scene => {
        const titleEl = document.createElement('div');
        titleEl.className = 'scene-title';
        titleEl.dataset.scene = scene.id;
        titleEl.textContent = scene.name;
        hero.appendChild(titleEl);
    });

    const updateBackground = () => {
        const current = document.querySelector('input[name="scene"]:checked')?.value || 1;
        const scene = scenes.find(s => s.id === Number(current));
        if (scene) {
        landscape.style.backgroundImage = `url('${scene.img}')`;
        }
    };

    document.querySelectorAll('input[name="scene"]').forEach(radio => {
        radio.addEventListener('change', updateBackground);
    });
    updateBackground();

    const prevBtn = document.querySelector('.nav-button.prev');
    const nextBtn = document.querySelector('.nav-button.next');

    function getCurrentIndex() {
        const checked = document.querySelector('input[name="scene"]:checked');
        return checked ? Number(checked.value) : 1;
    }

    function goTo(index) {
        const safeIndex = Math.max(1, Math.min(4, index));
        document.getElementById(`scene-${safeIndex}`).checked = true;
        updateBackground();
    }

    prevBtn.addEventListener('click', () => goTo(getCurrentIndex() - 1));
    nextBtn.addEventListener('click', () => goTo(getCurrentIndex() + 1));


    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });
});