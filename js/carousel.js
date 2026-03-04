fetch('./js/carousel.json')
    .then(response => response.json())
    .then(data => {
        const wrapper = document.querySelector('.swiper-wrapper');
        
        data.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = `Resim ${item.id}`;
        img.loading = "lazy"; 
        
        slide.appendChild(img);
        wrapper.appendChild(slide);
        });

        const swiper = new Swiper('.carousel', {
        effect: "coverflow",
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",          
        coverflowEffect: {
            rotate: 45,
            stretch: 0,
            depth: 125,
            modifier: 1.5,
            slideShadows: true,
        },
        pagination: {
            el: ".carousel-pagination",
            clickable: true,
            bulletClass: "carousel-pagination-bullet",
            bulletActiveClass: "carousel-pagination-bullet-active"
        },
        breakpoints: {
            320:  { slidesPerView: 1.4 },
            580:  { slidesPerView: 2.1 },
            767:  { slidesPerView: 3   },
            992:  { slidesPerView: 3.4 },
            1200: { slidesPerView: 4   },
            1400: { slidesPerView: 4.6 }
        }
        });
    })
    .catch(err => {
        console.error("JSON okunamadı:", err);
});