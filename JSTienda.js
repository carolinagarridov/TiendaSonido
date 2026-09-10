// Validar correos permitidos
function esCorreoValido(correo) {
    const dominiosValidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    return dominiosValidos.some(dominio => correo.toLowerCase().endsWith(dominio));
}

// Cargar regiones y comunas dinámicamente
function inicializarRegionesYComunas(idRegionSelect, idComunaSelect) {
    const regionSelect = document.getElementById(idRegionSelect);
    const comunaSelect = document.getElementById(idComunaSelect);

    if (!regionSelect || !comunaSelect) return;

    regionesYComunas.forEach(item => {
        const option = document.createElement("option");
        option.value = item.region;
        option.textContent = item.region;
        regionSelect.appendChild(option);
    });

    regionSelect.addEventListener("change", function() {
        comunaSelect.innerHTML = '<option value="">-- Seleccione Comuna --</option>';
        const regionEncontrada = regionesYComunas.find(r => r.region === this.value);
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

// Validación Registro de Usuario / Nuevo Usuario
function validarRegistro(e) {
    e.preventDefault();
    const run = document.getElementById("run").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const clave = document.getElementById("clave").value;
    const confirmarClave = document.getElementById("confirmarClave").value;
    const direccion = document.getElementById("direccion").value.trim();

    // Validar RUN (sin puntos ni guión, min 7 max 9)
    const runRegex = /^[0-9]{7,8}[0-9kK]{1}$/;
    if (!runRegex.test(run)) {
        alert("El RUN debe ser sin puntos ni guión (ej: 19011022K) y tener entre 7 y 9 caracteres.");
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
        alert("El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com (Max 100 caracteres).");
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

    if (direccion.length === 0 || direccion.length > 300) {
        alert("La dirección es requerida (máximo 300 caracteres).");
        return false;
    }

    alert("Registro completado con éxito.");
    window.location.href = "login.html";
}

// Validación Inicio de Sesión
function validarLogin(e) {
    e.preventDefault();
    const correo = document.getElementById("login-correo").value.trim();
    const clave = document.getElementById("login-clave").value;

    if (!esCorreoValido(correo) || correo.length > 100) {
        alert("Correo no válido. Debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com.");
        return false;
    }

    if (clave.length < 4 || clave.length > 10) {
        alert("La contraseña debe tener entre 4 y 10 caracteres.");
        return false;
    }

    alert("Inicio de sesión exitoso.");
    window.location.href = "index.html";
}

// Validación Contacto
function validarContacto(e) {
    e.preventDefault();
    const nombre = document.getElementById("contacto-nombre").value.trim();
    const correo = document.getElementById("contacto-correo").value.trim();
    const mensaje = document.getElementById("contacto-mensaje").value.trim();

    if (nombre.length === 0 || nombre.length > 100) {
        alert("Nombre requerido (máximo 100 caracteres).");
        return false;
    }

    if (!esCorreoValido(correo) || correo.length > 100) {
        alert("Correo no válido.");
        return false;
    }

    if (mensaje.length === 0 || mensaje.length > 500) {
        alert("El mensaje es requerido y no debe superar los 500 caracteres.");
        return false;
    }

    alert("Mensaje enviado correctamente.");
    document.getElementById("form-contacto").reset();
}