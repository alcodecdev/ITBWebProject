export function inicializarFormEnvioPorc() {
    let listado = {};

    // Selectores de botones
    const sendButton = document.getElementById('enviar');
    const cancelButton = document.getElementById('cancelar');

    if (sendButton) {
        sendButton.addEventListener('click', function (e) {
            e.preventDefault();

            // Ejecutamos todas las funciones de validación
            const v1 = validarNif();
            const v2 = validarPasswd();
            const v3 = validarEspecie();
            const v4 = validarOrigen();
            const v5 = validarDestino();
            const v6 = validarAccio();
            const v7 = validarMoviment();
            const v8 = validarCategoria();
            const v9 = validarFechas();
            const v10 = validarNomDelTransportista();
            const v11 = validarMatricula();
            const v12 = validarNifConductor();
            const v13 = validarAnimals();
            const v14 = validarsirCode();
            const v15 = agregarListadoAnimales();

            // Captura de datos Radios y Select (JS Puro)
            const radioMobilidad = document.querySelector("input[name='mobilitat']:checked");
            listado.mobilitat = radioMobilidad ? radioMobilidad.value : null;
            listado.medioTransporte = document.getElementById("selectMedioTransporte")?.value;

            if (v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8 && v9 && v10 && v11 && v12 && v13 && v14 && v15) {
                localStorage.setItem("listadoEnviadoPorc", JSON.stringify(listado));
                console.log("Objeto JSON generado:", listado);

                alert("¡Formulario enviado!");
                window.location.replace("../scanner/scannerStart.html");
            } else {
                alert("Revisa los campos marcados en rojo");
            }
        });
    }

    // --- FUNCIONES DE VALIDACIÓN (JS PURO) ---

    function validarNif() {
        const input = document.getElementById("inputNif");
        const nif = input.value.trim();
        if (nif === "") return marcarError(input, "#errorNif", "Usuario no encontrado");
        listado.nif = nif;
        return marcarExito(input, "#errorNif");
    }

    function validarPasswd() {
        const input = document.getElementById("inputPassw");
        const passwd = input.value.trim();
        if (passwd === "") return marcarError(input, "#errorPassw", "Clave de paso incorrecta");
        listado.passwd = passwd;
        return marcarExito(input, "#errorPassw");
    }

    function validarEspecie() {
        const input = document.getElementById("inputEspecie");
        const especie = input.value.trim();
        if (especie.length > 2 || isNaN(especie)) return marcarError(input, "#errorEspecie", "Máximo 2 dígitos");
        if (especie !== "02") return marcarError(input, "#errorEspecie", "Debe ser 02");
        listado.especie = especie;
        return marcarExito(input, "#errorEspecie");
    }

    function validarOrigen() {
        const input = document.getElementById("inputOrigen");
        const valor = input.value.trim();
        const destino = document.getElementById("inputDestino").value.trim();
        if (valor === "") return marcarError(input, "#errorExplotacio", "Campo obligatorio");
        if (valor.length > 14) return marcarError(input, "#errorExplotacio", "Máximo 14 caracteres");
        if (valor === destino) return marcarError(input, "#errorExplotacio", "Origen y destino son iguales");
        listado.origen = valor;
        return marcarExito(input, "#errorExplotacio");
    }

    function validarDestino() {
        const input = document.getElementById("inputDestino");
        const valor = input.value.trim();
        if (valor === "") return marcarError(input, "#errorDestino", "Campo obligatorio");
        if (valor.length > 14) return marcarError(input, "#errorDestino", "Máximo 14 caracteres");
        listado.destino = valor;
        return marcarExito(input, "#errorDestino");
    }

    function validarAccio() {
        const input = document.getElementById("inputAccio");
        const valor = input.value.trim().toLowerCase();
        if (valor !== "no") return marcarError(input, "#errorAccio", "Debe ser 'no'");
        listado.accio = valor;
        return marcarExito(input, "#errorAccio");
    }

    function validarMoviment() {
        const input = document.getElementById("inputMoviment");
        const valor = input.value.trim();
        if (valor !== "01" && valor !== "02") return marcarError(input, "#errorMoviment", "Debe ser 01 o 02");
        listado.moviment = valor;
        return marcarExito(input, "#errorMoviment");
    }

    function validarCategoria() {
        const input = document.getElementById("inputCategoria");
        const valor = input.value;
        if (!valor) return marcarError(input, "#errorCategoria", "Selecciona una categoría");
        listado.categoria = valor;
        return marcarExito(input, "#errorCategoria");
    }

    function validarAnimals() {
        const input = document.getElementById("inputAnimals");
        const animalesEscaneados = JSON.parse(localStorage.getItem("listaPorc")) || [];
        const total = animalesEscaneados.length;
        input.value = total;
        if (total > 999999) return marcarError(input, "#errorAnimals", "Máximo 6 dígitos");
        if (total <= 0) return marcarError(input, "#errorAnimals", "Debe ser mayor a 0");
        listado.numAnimals = total;
        return marcarExito(input, "#errorAnimals");
    }

    function validarFechas() {
        const inputSalida = document.getElementById("inputFechaSalida");
        const inputLlegada = document.getElementById("inputFechaLlegada");
        const sVal = inputSalida.value;
        const aVal = inputLlegada.value;
        const hoy = new Date();
        const fSalida = new Date(sVal);
        const fArribada = new Date(aVal);
        let ok = true;

        if (!sVal || fSalida < hoy.setHours(0,0,0,0)) {
            marcarError(inputSalida, "#errorFechaSalida", "Fecha inválida");
            ok = false;
        } else { marcarExito(inputSalida, "#errorFechaSalida"); }

        if (!aVal || fArribada <= fSalida) {
            marcarError(inputLlegada, "#errorFechaLlegada", "Debe ser posterior a salida");
            ok = false;
        } else { marcarExito(inputLlegada, "#errorFechaLlegada"); }

        listado.fechaSalida = sVal;
        listado.fechaLlegada = aVal;
        return ok;
    }

    function validarsirCode() {
        const input = document.getElementById("inputsirCode");
        const valor = input.value.trim();
        if (valor === "") return marcarError(input, "#errorsirCode", "Campo obligatorio");
        if (valor.length > 15) return marcarError(input, "#errorsirCode", "Máximo 15");
        listado.sirCode = valor;
        return marcarExito(input, "#errorsirCode");
    }

    function validarMatricula() {
        const input = document.getElementById("inputMatricula");
        const valor = input.value.trim();
        if (valor === "") return marcarError(input, "#errorMatricula", "Campo obligatorio");
        if (valor.length > 10) return marcarError(input, "#errorMatricula", "Máximo 10");
        listado.matricula = valor;
        return marcarExito(input, "#errorMatricula");
    }

    function validarNifConductor() {
        const input = document.getElementById("inputNifConductor");
        const valor = input.value.trim();
        if (valor === "") return marcarError(input, "#errorNifConductor", "Campo obligatorio");
        if (valor.length > 9) return marcarError(input, "#errorNifConductor", "Máximo 9");
        listado.nifConductor = valor;
        return marcarExito(input, "#errorNifConductor");
    }

    function validarNomDelTransportista() {
        const input = document.getElementById("inputNombreTransportista");
        const valor = input.value.trim();
        if (valor === "") return marcarError(input, "#errorNombreTransportista", "Campo obligatorio");
        listado.nombreTransportista = valor;
        return marcarExito(input, "#errorNombreTransportista");
    }

    function agregarListadoAnimales() {
        listado.animales = JSON.parse(localStorage.getItem("listaPorc")) || [];
        return true;
    }

    // --- HELPERS (JS PURO) ---
    function marcarError(inputElement, errorDivSelector, msg) {
        const errorDiv = document.querySelector(errorDivSelector);
        inputElement.classList.add("is-invalid");
        inputElement.classList.remove("is-valid");
        if (errorDiv) errorDiv.textContent = msg;
        return false;
    }

    function marcarExito(inputElement, errorDivSelector) {
        const errorDiv = document.querySelector(errorDivSelector);
        inputElement.classList.remove("is-invalid");
        inputElement.classList.add("is-valid");
        if (errorDiv) errorDiv.textContent = "";
        return true;
    }
}