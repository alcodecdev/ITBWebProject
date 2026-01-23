export function inicializarFormEnvioPorc() {
    let listado = {};

    const sendButton = document.getElementById('enviar');

    if (sendButton) {
        sendButton.addEventListener('click', function (e) {
            e.preventDefault();

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

            const radioMobilidad = document.querySelector("input[name='mobilitat']:checked");
            listado.mobilitat = radioMobilidad ? radioMobilidad.value : null;
            listado.medioTransporte = document.getElementById("selectMedioTransporte")?.value;

            if (v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8 && v9 && v10 && v11 && v12 && v13 && v14 && v15) {
                localStorage.setItem("listadoEnviadoPorc", JSON.stringify(listado));
                alert("¡Formulario enviado!");
                window.location.href = "/home"; // Redirección tras éxito
            } else {
                alert("Revisa los campos marcados en rojo");
            }
        });
    }

    function validarNif() {
        const input = document.getElementById("inputNif");
        const nif = input.value.trim();
        if (nif === "") return marcarError(input, "#nifError", "Usuario no encontrado");
        if (nif.length !== 9) return marcarError(input, "#nifError", "El NIF debe contener 8 letras y un carácter")
        listado.nif = nif;
        return marcarExito(input, "#nifError");
    }

    function validarPasswd() {
        const input = document.getElementById("inputPassword");
        const passwd = input.value.trim();
        if (passwd === "") return marcarError(input, "#passwordError", "Clave de paso incorrecta");
        if (passwd.length !== 20) return marcarError(input, "#passwordError", "La contraseña debe contener 20 caracteres");
        listado.passwd = passwd;
        return marcarExito(input, "#passwordError");
    }


    //PONER QUE SEA READONLY FALTA HACER
    function validarEspecie() {
        const input = document.getElementById("inputEspecie");
        listado.especie = input.value.trim();
        return marcarExito(input, "#specieCodeError");
    }

    function validarOrigen() {
        const input = document.getElementById("inputOrigen");
        const valor = input.value.trim();
        const destino = document.getElementById("inputDestino").value.trim();
        if (valor === destino) return marcarError(input, "#originCodeError", "Origen inválido");
        listado.origen = valor;
        return marcarExito(input, "#originCodeError");
    }

    function validarDestino() {
        const input = document.getElementById("inputDestino");
        const valor = input.value.trim();
        if (valor === "") return marcarError(input, "#explotationCodeError", "Campo obligatorio");
        if (valor !== "") return marcarError(input, "#explotationCodeError", "El código de destino debe tener 14 caracteres");
        listado.destino = valor;
        return marcarExito(input, "#explotationCodeError");
    }

    function validarAccio() {
        const input = document.getElementById("inputAccio");
        const valor = input.value.trim().toLowerCase();
        if (valor !== "NO" || valor !== "SI") return marcarError(input, "#actionCodeError", "Debe ser 'NO' o 'SI'");
        listado.accio = valor;
        return marcarExito(input, "#actionCodeError");
    }

    function validarMoviment() {
        const input = document.getElementById("inputMoviment");
        listado.moviment = input.value.trim();
        return marcarExito(input, "#movementCodeError");
    }

    function validarCategoria() {
        const input = document.getElementById("inputCategoria");
        const valor = input.value;
        if (!valor) return marcarError(input, "#errorCategory", "Selecciona una categoría");
        listado.categoria = valor;
        return marcarExito(input, "#errorCategory");
    }

    function validarFechas() {
        const inputSalida = document.getElementById("inputFechaSalida");
        const inputLlegada = document.getElementById("inputFechaLlegada");
        if (!inputSalida.value) return marcarError(inputSalida, "#exitError", "Fecha inválida");
        marcarExito(inputSalida, "#exitError");
        if (!inputLlegada.value) return marcarError(inputLlegada, "#comeError", "Fecha inválida");

        const fechaSalida = new Date(inputSalida.value);
        const fechaLlegada = new Date(inputLlegada.value);

        if (fechaLlegada.getTime() < fechaSalida.getTime()) return marcarError(inputLlegada, "#comeError", "La fecha de llegada no puede ser anterior a la de salida");
        listado.dataSortida = inputSalida.value;
        listado.dataArribada = inputLlegada.value;
        return marcarExito(inputLlegada, "#comeError");
    }

    function validarNomDelTransportista() {
        const input = document.getElementById("inputNombreTransportista");
        const valor = input.value.trim();
        if (valor === "") return marcarError(input, "#nameTransportError", "Campo obligatorio");
        listado.nombreTransportista = valor;
        return marcarExito(input, "#nameTransportError");
    }

    function validarMatricula() {
        const input = document.getElementById("inputMatricula");
        const valor = input.value.trim();
        if (valor === "") return marcarError(input, "#MatriculaError", "Campo obligatorio");
        listado.matricula = valor;
        return marcarExito(input, "#MatriculaError");
    }

    function validarNifConductor() {
        const input = document.getElementById("inputNifConductor");
        const valor = input.value.trim();
        if (valor === "") return marcarError(input, "#NIFError", "Campo obligatorio");
        listado.nifConductor = valor;
        return marcarExito(input, "#NIFError");
    }

    function validarAnimals() {
        const input = document.getElementById("inputAnimals");
        const total = input.value.trim();
        if (total === "" || total <= 0) return marcarError(input, "#AnimalNumberError", "Cantidad inválida");
        if(total > 999999) return marcarError(input, "#AnimalNumberError", "Cantidad de animales demasiado alta");
        listado.numAnimals = total;
        return marcarExito(input, "#AnimalNumberError");
    }

    function validarsirCode() {
        const input = document.getElementById("inputsirCode");
        const valor = input.value.trim();
        if (valor !== null || valor !== "") {
            if (valor.length < 15 || valor.length > 15) {
                return marcarError(input, "inputsirCode", "El SIRcode debe contener 15 caracteres")
            }
        }
        listado.sirCode = valor;
        return marcarExito(input, "#SIRCODEError");
    }

    function agregarListadoAnimales() {
        listado.animales = JSON.parse(localStorage.getItem("listaPorc")) || [];
        return true;
    }

    function marcarError(inputElement, errorDivSelector, msg) {
        const errorDiv = document.querySelector(errorDivSelector);
        if (inputElement) inputElement.classList.add("is-invalid");
        if (errorDiv) errorDiv.textContent = msg;
        return false;
    }

    function marcarExito(inputElement, errorDivSelector) {
        const errorDiv = document.querySelector(errorDivSelector);
        if (inputElement) {
            inputElement.classList.remove("is-invalid");
            inputElement.classList.add("is-valid");
        }
        if (errorDiv) errorDiv.textContent = "";
        return true;
    }
}