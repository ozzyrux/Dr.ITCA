document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('listaServicios');
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];

    // Filtrar solo los activos
    const activos = servicios.filter(s => s.estado === 'Activo');

    if (activos.length === 0) {
        lista.innerHTML = `<p class="text-muted text-center">No hay servicios disponibles en este momento.</p>`;
        return;
    }

    activos.forEach(serv => {
        const card = document.createElement('div');
        card.classList.add('col-md-6');
        card.innerHTML = `
      <div class="card service-card h-100 border-0 shadow-sm">
        <div class="card-body text-center">
          <div class="service-icon bg-${serv.color} text-white rounded-circle mx-auto mb-3" style="width:80px; height:80px; display:flex; align-items:center; justify-content:center;">
            <i class="bi ${serv.icono} display-6"></i>
          </div>
          <h4 class="card-title">${serv.nombre}</h4>
          <p class="card-text">${serv.detalle}</p>
          <div class="service-info">
            <p class="text-muted"><i class="bi bi-clock me-2"></i>Duración: ${serv.duracion}</p>
            <p class="text-muted"><i class="bi bi-geo-alt me-2"></i>${serv.ubicacion}</p>
          </div>
          <a href="citas.html" class="btn btn-${serv.color} mt-3 text-white">Agendar Cita</a>
        </div>
      </div>`;
        lista.appendChild(card);
    });
});
