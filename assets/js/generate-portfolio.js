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

      // Isotope initialization and filter logic moved here
      imagesLoaded(portfolioContainer, function() {
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
        });

        let portfolioFilters = document.querySelectorAll('#portfolio-flters li');

        portfolioFilters.forEach(function(el) {
          el.addEventListener('click', function(e) {
            e.preventDefault();
            portfolioFilters.forEach(function(filterEl) {
              filterEl.classList.remove('filter-active');
            });
            this.classList.add('filter-active');

            portfolioIsotope.arrange({
              filter: this.getAttribute('data-filter')
            });
          });
        });
      });

    })
    .catch(error => console.error('Error al cargar los elementos del portafolio:', error));
});
