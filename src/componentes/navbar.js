class NavBar extends HTMLElement {
  constructor() {
    super();
    const usuarioLogueado = sessionStorage.getItem("usuarioLogueado");
    const nombreUsuario = usuarioLogueado
      ? JSON.parse(usuarioLogueado).email
      : "Invitado";
    //Contenido
    this.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
        <div class="container">
            <a class="navbar-brand" href="inicio.html">
                <img src="../img/logoITCA.png" alt="ITCA" height="40" class="d-inline-block align-text-top me-2">
                Dr. ITCA
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="inicio.html">
                            <i class="bi bi-house-door me-1"></i>Inicio
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="citas.html">
                            <i class="bi bi-calendar-check me-1"></i>Mis Citas
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="servicios.html">
                            <i class="bi bi-heart-pulse me-1"></i>Servicios
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="perfil.html">
                            <i class="bi bi-person me-1"></i>Mi Perfil
                        </a>
                    </li>
                    <li class="nav-item" id="nav-item-admin">
                        <a class="nav-link" href="admin.html">
                            <i class="bi bi-gear me-1"></i>Administración
                        </a>
                    </li>
                </ul>
                
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            <i class="bi bi-person-circle me-1"></i>
                            <span id="userName">${nombreUsuario}</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="perfil.html"><i class="bi bi-person me-2"></i>Mi Perfil</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" id="salir" href="#"><i class="bi bi-box-arrow-right me-2"></i>Cerrar Sesión</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
        `;
  }

  // Este método se llama después de que el componente se añade al DOM
  connectedCallback() {
    // Oculta el elemento de administracion por defecto.
    const adminItem = this.querySelector("#nav-item-admin");
    if (adminItem) {
      adminItem.style.display = "none";
    }
  }
}
customElements.define("app-navbar", NavBar);
