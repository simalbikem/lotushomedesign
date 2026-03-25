document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('servicesGrid');
    
    if (!grid) {
        console.error('servicesGrid elementi bulunamadı! HTML içinde id="servicesGrid" olan bir div olduğundan emin olun.');
        return;
    }

    fetch('./js/services.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('services.json dosyası yüklenemedi');
            }
            return response.json();
        })
        .then(services => {
            grid.innerHTML = ''; 

            services.forEach(service => {
                const card = document.createElement('a');
                card.href = '#';  
                card.className = 'service-card';
                
                card.innerHTML = `
                    <img src="${service.img}" alt="${service.title}">
                    <div class="service-title">${service.title}</div>
                `;
                
                grid.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Hata:', error);
            grid.innerHTML = 
                '<p style="text-align:center; color:red;">Hizmetler yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>';
        });
});