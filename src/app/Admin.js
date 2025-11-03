document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('listaServiciosAdmin');
    const btnGuardar = document.getElementById('guardarServicio');
    const form = document.getElementById('formServicio');
    let editando = false;

    function obtenerServicios() {
        return JSON.parse(localStorage.getItem('servicios')) || [];
    }

    function guardarServicios(servicios) {
        localStorage.setItem('servicios', JSON.stringify(servicios));
    }

    function renderizarServicios() {
        const servicios = obtenerServicios();
        lista.innerHTML = '';

        if (servicios.length === 0) {
            lista.innerHTML = `<p class="text-muted text-center">No hay servicios registrados</p>`;
            return;
        }

        servicios.forEach(serv => {
            const col = document.createElement('div');
            col.classList.add('col-md-4');
            col.innerHTML = `
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h6 class="card-title">${serv.nombre}</h6>
            <p class="card-text text-muted small">${serv.descripcion}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="badge bg-${serv.estado === 'Activo' ? 'success' : 'secondary'}">${serv.estado}</span>
              <div>
                <button class="btn btn-sm btn-outline-primary me-1 btn-editar" data-id="${serv.id}">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${serv.id}">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>`;
            lista.appendChild(col);
        });
    }

    // Guardar o editar servicio
    btnGuardar.addEventListener('click', () => {
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const servicio = {
            id: editando || Date.now(),
            nombre: nombre.value,
            descripcion: descripcion.value,
            detalle: detalle.value,
            duracion: duracion.value,
            ubicacion: ubicacion.value,
            color: color.value,
            icono: icono.value || 'bi-heart',
            estado: estado.value
        };

        let servicios = obtenerServicios();

        if (editando) {
            servicios = servicios.map(s => s.id === editando ? servicio : s);
            editando = false;
        } else {
            servicios.push(servicio);
        }

        guardarServicios(servicios);
        renderizarServicios();
        form.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalServicio')).hide();
    });

    // Delegación: editar o eliminar
    lista.addEventListener('click', e => {
        if (e.target.closest('.btn-eliminar')) {
            const id = Number(e.target.closest('.btn-eliminar').dataset.id);
            let servicios = obtenerServicios().filter(s => s.id !== id);
            guardarServicios(servicios);
            renderizarServicios();
        }

        if (e.target.closest('.btn-editar')) {
            const id = Number(e.target.closest('.btn-editar').dataset.id);
            const serv = obtenerServicios().find(s => s.id === id);
            if (!serv) return;
            editando = id;

            nombre.value = serv.nombre;
            descripcion.value = serv.descripcion;
            detalle.value = serv.detalle;
            duracion.value = serv.duracion;
            ubicacion.value = serv.ubicacion;
            color.value = serv.color;
            icono.value = serv.icono;
            estado.value = serv.estado;

            new bootstrap.Modal(document.getElementById('modalServicio')).show();
        }
    });

    renderizarServicios();
});