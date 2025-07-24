document.addEventListener('DOMContentLoaded', () => {
  fetch('data/clientes.json')
    .then(response => response.json())
    .then(clientes => {
      const clientReviewsContainer = document.getElementById('client-reviews-container');
      if (!clientReviewsContainer) {
        console.error('Contenedor de opiniones de clientes no encontrado.');
        return;
      }

      clientes.forEach(cliente => {
        const reviewHtml = `
          <div class="col-lg-6">
            <h3 class="resume-title">${cliente.name}</h3>
            <div class="resume-item pb-0">
              <div style="display: flex; align-items: center;">
                <span class="icon" style="background-image: url('${cliente.image}'); width: 50px; height: 50px; border-radius: 50%; margin-right: 20px;"></span>
                <h4 style="margin-bottom: 0;">
                  <span style="font-size: 30px; color: #f7d02c;">${'&#9733;'.repeat(cliente.rating)}</span>
                </h4>
              </div>
              <p><em>${cliente.review}</em></p>
              <p>
                <ul>
                  <li>Opiniòn En Google Negocio <a href="${cliente.google_link}" style="color:yellow; font-weight: bold;" target="_blank">(ver)</a></li>
                </ul>
              </p>
            </div>
          </div>
        `;
        clientReviewsContainer.insertAdjacentHTML('beforeend', reviewHtml);
      });
    })
    .catch(error => console.error('Error al cargar las opiniones de los clientes:', error));
});
