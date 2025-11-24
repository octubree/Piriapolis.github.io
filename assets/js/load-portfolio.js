document.addEventListener('DOMContentLoaded', () => {
    const portfolioContainer = document.querySelector('.portfolio-container');
    if (!portfolioContainer) return;

    fetch('data/portfolio.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = `col-lg-4 col-md-6 portfolio-item ${item.category}`;
                div.innerHTML = `
          <div class="portfolio-wrap">
            <img src="${item.src}" class="img-fluid" alt="${item.alt}">
            <div class="portfolio-info">
              <h4>${item.title}</h4>
              <p>${item.category}</p>
              <div class="portfolio-links">
                <a href="${item.src}" data-gallery="portfolioGallery" class="portfolio-lightbox" title="${item.title}"><i class="bx bx-plus"></i></a>
              </div>
            </div>
          </div>
        `;
                portfolioContainer.appendChild(div);
            });

            // Initialize Isotope
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows'
            });

            // Trigger layout after each image loads to prevent overlap
            const images = portfolioContainer.querySelectorAll('img');
            images.forEach(img => {
                img.onload = () => portfolioIsotope.layout();
            });

            // Initialize GLightbox
            const portfolioLightbox = GLightbox({
                selector: '.portfolio-lightbox'
            });

            // Filter handlers
            const portfolioFilters = document.querySelectorAll('#portfolio-flters li');

            portfolioFilters.forEach(filter => {
                filter.addEventListener('click', function (e) {
                    e.preventDefault();
                    portfolioFilters.forEach(el => el.classList.remove('filter-active'));
                    this.classList.add('filter-active');

                    portfolioIsotope.arrange({
                        filter: this.getAttribute('data-filter')
                    });
                });
            });

        })
        .catch(error => console.error('Error loading portfolio:', error));
});
