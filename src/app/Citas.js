document.addEventListener('DOMContentLoaded', () => {

    // Simula usuario logueado
    const usuarioActual = sessionStorage.getItem('usuarioLogueado') ? JSON.parse(sessionStorage.getItem('usuarioLogueado')).id : null;

    // Elementos del DOM
    const tbody = document.querySelector('tbody');
    const totalCitasEl = document.querySelector('.card-body strong:nth-child(1)');
    const proximasEl = document.querySelector('.card-body strong:nth-child(3)');
    const completadasEl = document.querySelector('.card-body strong:nth-child(5)');
    const canceladasEl = document.querySelector('.card-body strong:nth-child(7)');
    const btnGuardar = document.querySelector('.modal-footer .btn-primary');
    const form = document.getElementById('formCita');

    // Campos del formulario
    const servicio = document.getElementById('servicio');
    const fecha = document.getElementById('fecha');
    const hora = document.getElementById('hora');
    const motivo = document.getElementById('motivo');
    const urgencia = document.getElementById('urgencia');

    // Obtener todas las citas guardadas
    function obtenerCitas() {
        return JSON.parse(localStorage.getItem('citas')) || [];
    }

    // Guardar citas
    function guardarCitas(citas) {
        localStorage.setItem('citas', JSON.stringify(citas));
    }

    // Filtrar citas del usuario logueado
    function citasUsuario() {
        const citas = obtenerCitas();
        return citas.filter(c => c.usuario === usuarioActual);
    }

    // Renderizar la tabla
    function renderizarCitas() {
        const citas = citasUsuario();
        tbody.innerHTML = '';

        if (citas.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No hay citas registradas</td></tr>`;
            actualizarResumen();
            return;
        }

        citas.forEach(cita => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <strong>${formatearFecha(cita.fecha)}</strong><br>
                    <small class="text-muted">${formatearHora(cita.hora)}</small>
                </td>
                <td>${cita.servicio}</td>
                <td>${cita.motivo}</td>
                <td><span class="badge ${estadoBadge(cita.estado)}">${cita.estado}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${cita.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        actualizarResumen();
    }

    // Formato de fecha
    function formatearFecha(fechaISO) {
        const fechaObj = new Date(fechaISO);
        const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
        return fechaObj.toLocaleDateString('es-ES', opciones);
    }

    // Formato de hora
    function formatearHora(hora) {
        const [h, m] = hora.split(':');
        const horaNum = parseInt(h, 10);
        const ampm = horaNum >= 12 ? 'PM' : 'AM';
        const hora12 = horaNum % 12 || 12;
        return `${hora12}:${m} ${ampm}`;
    }

    // Colores de estado
    function estadoBadge(estado) {
        switch (estado) {
            case 'Programada': return 'bg-warning';
            case 'Completada': return 'bg-success';
            case 'Cancelada': return 'bg-danger';
            default: return 'bg-secondary';
        }
    }

    // Actualizar resumen
    function actualizarResumen() {
        const citas = citasUsuario();
        const total = citas.length;
        const proximas = citas.filter(c => c.estado === 'Programada').length;
        const completadas = citas.filter(c => c.estado === 'Completada').length;
        const canceladas = citas.filter(c => c.estado === 'Cancelada').length;

        document.querySelectorAll('.card-body strong')[0].nextSibling.textContent = ` ${total}`;
        document.querySelectorAll('.card-body strong')[1].nextSibling.textContent = ` ${proximas}`;
        document.querySelectorAll('.card-body strong')[2].nextSibling.textContent = ` ${completadas}`;
        document.querySelectorAll('.card-body strong')[3].nextSibling.textContent = ` ${canceladas}`;
    }


    // Guardar nueva cita
    btnGuardar.addEventListener('click', () => {
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const citas = obtenerCitas();
        const nuevaCita = {
            id: Date.now(),
            usuario: usuarioActual,
            servicio: servicio.options[servicio.selectedIndex].text,
            fecha: fecha.value,
            hora: hora.value,
            motivo: motivo.value,
            urgencia: urgencia.checked,
            estado: 'Programada'
        };

        citas.push(nuevaCita);
        guardarCitas(citas);
        renderizarCitas();

        // Cerrar modal y limpiar formulario
        form.reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalCita'));
        modal.hide();
    });

    // Delegación de eventos para eliminar o editar
    tbody.addEventListener('click', e => {
        if (e.target.closest('.btn-eliminar')) {
            const id = Number(e.target.closest('.btn-eliminar').dataset.id);
            eliminarCita(id);
        }
    });

    function eliminarCita(id) {
        let citas = obtenerCitas();
        citas = citas.filter(c => c.id !== id);
        guardarCitas(citas);
        renderizarCitas();
    }

    renderizarCitas();
});

