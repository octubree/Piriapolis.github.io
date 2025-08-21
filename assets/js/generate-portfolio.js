document.addEventListener('DOMContentLoaded', () => {
  fetch('data/portfolio.json')
    .then(response => response.json())
    .then(portfolioItems => {
      const portfolioContainer = document.querySelector('.portfolio-container');
      if (!portfolioContainer) {
        console.error('Contenedor de portafolio no encontrado.');
        return;
      }

      portfolioItems.forEach(item => {
        const portfolioHtml = `
          <div class="col-lg-4 col-md-6 portfolio-item ${item.category}">
            <div class="portfolio-wrap">
              <img src="${item.src}" class="img-fluid" alt="${item.alt}">
              <div class="portfolio-info">
                <h4>${item.title}</h4>
                <p></p>
                <div class="portfolio-links">
                  <a href="${item.src}" data-gallery="portfolioGallery" class="portfolio-lightbox" title="${item.title}"><i class="bx bx-plus"></i></a>
                </div>
              </div>
            </div>
          </div>
        `;
        portfolioContainer.insertAdjacentHTML('beforeend', portfolioHtml);
      });

      // Re-initialize Isotope after dynamic content is loaded
      imagesLoaded(portfolioContainer, function() {
        new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
        });
      });

    })
    .catch(error => console.error('Error al cargar los elementos del portafolio:', error));
});
