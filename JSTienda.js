// ==========================================
// 1. BASE DE DATOS DE REGIONES Y COMUNAS
// ==========================================
const baseDatosRegiones = [
    {
        id: 1,
        region: "Región de Valparaíso",
        comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Concón", "San Antonio"]
    },
    {
        id: 2,
        region: "Región Metropolitana de Santiago",
        comunas: ["Santiago", "Providencia", "Las Condes", "Ñuñoa", "Maipú", "La Florida", "Puente Alto"]
    },
    {
        id: 3,
        region: "Región del Biobío",
        comunas: ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chiguayante", "Los Ángeles"]
    },
    {
        id: 4,
        region: "Región de La Araucanía",
        comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"]
    },
    {
        id: 5,
        region: "Región de Los Lagos",
        comunas: ["Puerto Montt", "Puerto Varas", "Osorno", "Castro"]
    }
];

// ==========================================
// 2. BASE DE DATOS DE PRODUCTOS
// ==========================================
const baseDatosProductos = [
    {
        codigo: "PROD01",
        nombre: "Guitarra Eléctrica Fender Stratocaster",
        categoria: "Guitarras",
        precio: 650000,
        stock: 5,
        descripcion: "Guitarra eléctrica de alta calidad, acabado Gloss Polyurethane.",
        imagen: "https://via.placeholder.com/200?text=Fender+Stratocaster"
    },
    {
        codigo: "PROD02",
        nombre: "Bajo Eléctrico Ibanez SR300E",
        categoria: "Bajos",
        precio: 380000,
        stock: 4,
        descripcion: "Bajo de 4 cuerdas con pastillas PowerSpan Dual Coil.",
        imagen: "https://via.placeholder.com/200?text=Bajo+Ibanez"
    },
    {
        codigo: "PROD03",
        nombre: "Batería Acústica Pearl Export",
        categoria: "Baterías",
        precio: 890000,
        stock: 2,
        descripcion: "Set de batería de 5 piezas con herrajes incluidos.",
        imagen: "https://via.placeholder.com/200?text=Bateria+Pearl"
    },
    {
        codigo: "PROD04",
        nombre: "Teclado Sintetizador Yamaha PSR-E373",
        categoria: "Teclados",
        precio: 210000,
        stock: 8,
        descripcion: "Teclado portátil de 61 teclas sensibles a la pulsación.",
        imagen: "https://via.placeholder.com/200?text=Teclado+Yamaha"
    },
    {
        codigo: "PROD05",
        nombre: "Micrófono Condensador Audio-Technica AT2020",
        categoria: "Accesorios",
        precio: 115000,
        stock: 12,
        descripcion: "Ideal para estudio en casa y grabaciones vocales.",
        imagen: "https://via.placeholder.com/200?text=Microfono+AT2020"
    }
];

// ==========================================
// 3. INICIALIZACIÓN DE STORAGE (MOCK DB)
// ==========================================
function inicializarBaseDatos() {
    if (!localStorage.getItem("db_productos")) {
        localStorage.setItem("db_productos", JSON.stringify(baseDatosProductos));
    }
    if (!localStorage.getItem("db_usuarios")) {
        localStorage.setItem("db_usuarios", JSON.stringify([]));
    }
    if (!localStorage.getItem("carrito")) {
        localStorage.setItem("carrito", JSON.stringify([]));
    }
}

// ==========================================
// 4. FUNCIONES DE REGIONES Y COMUNAS
// ==========================================
function inicializarRegionesYComunas(idRegionSelect, idComunaSelect) {
    const regionSelect = document.getElementById(idRegionSelect);
    const comunaSelect = document.getElementById(idComunaSelect);

    if (!regionSelect || !comunaSelect) return;

    regionSelect.innerHTML = '<option value="">-- Seleccione Región --</option>';
    comunaSelect.innerHTML = '<option value="">-- Seleccione Comuna --</option>';

    baseDatosRegiones.forEach(item => {
        const option = document.createElement("option");
        option.value = item.region;
        option.textContent = item.region;
        regionSelect.appendChild(option);
    });

    regionSelect.addEventListener("change", function () {
        comunaSelect.innerHTML = '<option value="">-- Seleccione Comuna --</option>';
        const regionEncontrada = baseDatosRegiones.find(r => r.region === this.value);
        if (regionEncontrada) {
            regionEncontrada.comunas.forEach(comuna => {
                const opt = document.createElement("option");
                opt.value = comuna;
                opt.textContent = comuna;
                comunaSelect.appendChild(opt);
            });
        }
    });
}

// ==========================================
// 5. VALIDACIÓN Y GUARDADO DE REGISTRO
// ==========================================
function esCorreoValido(correo) {
    const dominiosValidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    return dominiosValidos.some(dominio => correo.toLowerCase().endsWith(dominio));
}

function validarRegistro(e) {
    e.preventDefault();

    const run = document.getElementById("run").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const clave = document.getElementById("clave").value;
    const confirmarClave = document.getElementById("confirmarClave").value;
    const region = document.getElementById("region").value;
    const comuna = document.getElementById("comuna").value;
    const direccion = document.getElementById("direccion").value.trim();

    // Validaciones
    const runRegex = /^[0-9]{7,8}[0-9kK]{1}$/;
    if (!runRegex.test(run)) {
        alert("El RUN debe ser sin puntos ni guión (ej: 19011022K).");
        return false;
    }

    if (nombre.length === 0 || nombre.length > 50) {
        alert("El nombre es requerido y debe tener máximo 50 caracteres.");
        return false;
    }

    if (apellidos.length === 0 || apellidos.length > 100) {
        alert("El apellido es requerido y debe tener máximo 100 caracteres.");
        return false;
    }

    if (!esCorreoValido(correo) || correo.length > 100) {
        alert("El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com.");
        return false;
    }

    if (clave.length < 4 || clave.length > 10) {
        alert("La contraseña debe tener entre 4 y 10 caracteres.");
        return false;
    }

    if (clave !== confirmarClave) {
        alert("Las contraseñas no coinciden.");
        return false;
    }

    if (!region || !comuna) {
        alert("Debe seleccionar Región y Comuna.");
        return false;
    }

    if (direccion.length === 0 || direccion.length > 300) {
        alert("La dirección es requerida.");
        return false;
    }

    // Guardar nuevo usuario en la DB Local
    const usuarios = JSON.parse(localStorage.getItem("db_usuarios")) || [];
    const existe = usuarios.some(u => u.run === run || u.correo === correo);

    if (existe) {
        alert("El RUN o correo ya se encuentra registrado.");
        return false;
    }

    const nuevoUsuario = {
        run,
        nombre,
        apellidos,
        correo,
        clave,
        region,
        comuna,
        direccion,
        fechaRegistro: new Date().toISOString()
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("db_usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso. Datos almacenados en la base de datos local.");
    window.location.href = "login.html";
}

// ==========================================
// 6. GESTIÓN DEL CARRITO Y TIENDA
// ==========================================
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) {
        cartCountEl.innerText = totalItems;
    }
}

function agregarAlCarrito(codigo) {
    const productos = JSON.parse(localStorage.getItem("db_productos")) || [];
    const prod = productos.find(p => p.codigo === codigo);
    if (!prod) return;

    let carrito = obtenerCarrito();
    const itemExistente = carrito.find(item => item.codigo === codigo);

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({
            codigo: prod.codigo,
            nombre: prod.nombre,
            precio: prod.precio,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert(`"${prod.nombre}" añadido al carrito.`);
}

function renderizarProductos() {
    const container = document.getElementById("featured-products-container");
    if (!container) return;

    const productos = JSON.parse(localStorage.getItem("db_productos")) || [];
    container.innerHTML = "";

    productos.forEach(p => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${p.imagen}" alt="${p.nombre}">
                <h4>${p.nombre}</h4>
                <p>Categoría: <strong>${p.categoria}</strong></p>
                <p>${p.descripcion}</p>
                <p class="precio"><strong>$${p.precio.toLocaleString('es-CL')}</strong></p>
                <button class="btn-primary" onclick="agregarAlCarrito('${p.codigo}')">Añadir al Carrito</button>
            </div>
        `;
    });
}

// Inicialización automática en cada carga de página
document.addEventListener("DOMContentLoaded", () => {
    inicializarBaseDatos();
    actualizarContadorCarrito();
    renderizarProductos();
});
// ==========================================
// 7. AUTENTICACIÓN Y CONTROL DE SESIÓN
// ==========================================
function iniciarSesion(e) {
    e.preventDefault();
    
    const correoInput = document.getElementById("loginCorreo").value.trim();
    const claveInput = document.getElementById("loginClave").value;

    const usuarios = JSON.parse(localStorage.getItem("db_usuarios")) || [];

    // Buscar si existe el usuario con correo y contraseña
    const usuarioEncontrado = usuarios.find(u => u.correo.toLowerCase() === correoInput.toLowerCase() && u.clave === claveInput);

    if (usuarioEncontrado) {
        // Guardar sesión activa
        localStorage.setItem("usuarioSesion", JSON.stringify(usuarioEncontrado));
        alert(`¡Bienvenido/a ${usuarioEncontrado.nombre}!`);
        window.location.href = "TiendaSonido.html";
    } else {
        alert("Correo o contraseña incorrectos. Por favor, verifica tus datos.");
    }
}

function cerrarSesion() {
    localStorage.removeItem("usuarioSesion");
    alert("Has cerrado sesión.");
    window.location.reload();
}

function verificarEstadoSesion() {
    const usuarioSesion = JSON.parse(localStorage.getItem("usuarioSesion"));
    const nav = document.querySelector(".main-nav ul");

    if (usuarioSesion && nav) {
        // Si hay sesión iniciada, reemplazamos Login/Registro por el nombre del usuario y Cierre de Sesión
        const loginLink = nav.querySelector('a[href="login.html"]');
        const registroLink = nav.querySelector('a[href="registro.html"]');

        if (loginLink) loginLink.parentElement.remove();
        if (registroLink) registroLink.parentElement.remove();

        const userLi = document.createElement("li");
        userLi.innerHTML = `<span>Hola, <strong>${usuarioSesion.nombre}</strong></span>`;
        
        const logoutLi = document.createElement("li");
        logoutLi.innerHTML = `<a href="#" onclick="cerrarSesion()">Cerrar Sesión</a>`;

        nav.appendChild(userLi);
        nav.appendChild(logoutLi);
    }
}

// Ejecutar verificación de sesión al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    verificarEstadoSesion();
});