fetch('./js/services.json')
    .then(response => {
        if (!response.ok) {
        throw new Error('services.json dosyası yüklenemedi');
        }
        return response.json();
    })
    .then(services => {
        const grid = document.getElementById('servicesGrid');
        
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
        document.getElementById('servicesGrid').innerHTML = 
        '<p style="text-align:center; color:red;">Hizmetler yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>';
});