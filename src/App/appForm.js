import Swal from 'sweetalert2';

export function inicializarFormEnvioPorc() {
    let listado = {};

    // Helper para formatear fechas a AAAAMMDDHHMM (Requisito Gencat Error 08/09)
    const formatearFechaGTR = (fechaStr) => {
        if (!fechaStr) return "";
        // Reemplazamos separadores T, -, : para limpiar el string del input datetime-local o date
        const limpia = fechaStr.replace(/[-T:]/g, '');
        // Si solo tiene fecha (8 chars), añadimos ceros para hora/minuto
        return limpia.length === 8 ? limpia + "0000" : limpia.padEnd(12, '0').substring(0, 12);
    };

    const sendButton = document.getElementById('enviar');

    if (sendButton) {
        // Usamos una función nombrada para poder removerla si fuera necesario
        sendButton.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Ejecución de validaciones
            const v1 = validarNif();
            const v2 = validarPasswd();
            const v3 = validarEspecie();
            const v4 = validarOrigen();
            const v5 = validarDestino();
            const v6 = validarAccio();
            const v7 = validarMoviment();
            const v8 = validarCategoria();
            const v9 = validarFechas();
            const v11 = validarMatricula();
            const v12 = validarNifConductor();
            const v13 = validarAnimals();
            const v14 = validarsirCode();
            const v15=validarNomDelTransportista();
            const v16=validarMedioTransporte();

            if (v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8 && v9 && v11 && v12 && v13 && v14 && v15 && v16) {
                const url = 'https://preproduccio.aplicacions.agricultura.gencat.cat/gtr/WSAltaguies/AppJava/WSAltaGuia';

                const datosFinales = {
                    nif: listado.nif,
                    password: listado.passwd,
                    tipusEspecie: "02",
                    tipusAccio: listado.accio.toUpperCase(),
                    tipusMoviment: listado.moviment,
                    explotacioSortida: listado.origen,
                    explotacioEntrada: listado.destino,
                    codiCategoria: listado.categoria,
                    numAnimals: listado.numAnimals,
                    dataSortida: formatearFechaGTR(listado.dataSortida),
                    dataArribada: formatearFechaGTR(listado.dataArribada),
                    codiSirentra: listado.sirCode || "",
                    mitjaTransport: document.getElementById("selectMedioTransporte")?.value || "01",
                    matricula: listado.matricula,
                    nifConductor: listado.nifConductor,
                    mobilitat: document.querySelector("input[name='mobilitat']:checked")?.value.toUpperCase() || "NO"
                };

                console.log("Enviando a Gencat:", datosFinales);

                fetch(url, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datosFinales)
                })
                    .then(async response => {
                        if (response.ok) {
                            await Swal.fire({
                                icon: 'success',
                                title: '¡Alta Tramitada!',
                                text: 'El formulari s\'ha enviat correctament.',
                                confirmButtonColor: '#2e7d32'
                            });
                            localStorage.removeItem('listaPorc');
                            window.location.href = "/form";
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: `Servidor va respondre amb codi ${response.status}. Revisa les dades.`,
                                confirmButtonColor: '#d33'
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error Fetch:", error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Fallada de la connexió',
                            text: 'No es pot connectar amb l\'API. Revisa la teva Internet o el servei GTR.',
                            confirmButtonColor: '#d33'
                        });
                    });
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Formulari incomplet\n',
                    text: 'Si us plau, corregiu els errors marcats en vermell.',
                    confirmButtonColor: '#ffc107'
                });
            }
        };
    }

    //FUNCIONES DE VALIDACIONES

    function obtenerValor(id) {
        const el = document.getElementById(id);
        return el ? el.value.trim() : "";
    }

    function validarNif() {
        const input = document.getElementById("inputNif");
        const val = obtenerValor("inputNif");
        if (!val || val.length===0 || val.length>9) return marcarError(input, "#nifError", "Error 36: Usuari no trobat");
        listado.nif = val;
        return marcarExito(input, "#nifError");
    }

    function validarPasswd() {
        const input = document.getElementById("inputPassword");
        const val = obtenerValor("inputPassword");
        if (!val) return marcarError(input, "#passwordError", "Error 35: Clau de pas incorrecte");
        listado.passwd = val;
        return marcarExito(input, "#passwordError");
    }

    function validarEspecie() {
        const input = document.getElementById("inputEspecie");
        const val = obtenerValor("inputEspecie");
        if (val !== "02") return marcarError(input, "#specieCodeError", "Error 15: L'espècie ha de ser 02");
        listado.especie = val;
        return marcarExito(input, "#specieCodeError");
    }

    function validarOrigen() {
        const input = document.getElementById("inputOrigen");
        const val = obtenerValor("inputOrigen");
        if (val.length===0 || val.length > 14) return marcarError(input, "#originCodeError", "Error 04: Máximo 14 caracteres");
        listado.origen = val;
        return marcarExito(input, "#originCodeError");
    }

    function validarDestino() {
        const input = document.getElementById("inputDestino");
        const val = obtenerValor("inputDestino");
        if (val.length===0 || val.length > 14) return marcarError(input, "#explotationCodeError", "Error 05: Máximo 14 caracteres");
        if (val === listado.origen) return marcarError(input, "#explotationCodeError", "Error 29: Origen y destino iguales");
        listado.destino = val;
        return marcarExito(input, "#explotationCodeError");
    }

    function validarAccio() {
        const input = document.getElementById("inputAccio");
        const val = obtenerValor("inputAccio").toLowerCase();
        if (val !== "si" && val !== "no") return marcarError(input, "#actionCodeError", "Error 16: Debe ser SI o NO");
        listado.accio = val;
        return marcarExito(input, "#actionCodeError");
    }

    function validarMoviment() {
        const input = document.getElementById("inputMoviment");
        const val = obtenerValor("inputMoviment");
        if (val !== "01" && val !== "02") return marcarError(input, "#movementCodeError", "Error 17: Debe ser 01 o 02");
        listado.moviment = val;
        return marcarExito(input, "#movementCodeError");
    }

    function validarCategoria() {
        const input = document.getElementById("inputCategoria");
        const val = input ? input.value : "";
        if (!val || parseInt(val) > 5) return marcarError(input, "#errorCategory", "Error 19: Categoría de 01 a 05");
        listado.categoria = val;
        return marcarExito(input, "#errorCategory");
    }

    function validarFechas() {
        const inputS = document.getElementById("inputFechaSalida");
        const inputL = document.getElementById("inputFechaLlegada");

        //Inicializamos variables de control
        let salidaOk = false;
        let llegadaOk = false;

        // Validar presencia de Fecha de Salida
        if (!inputS.value) {
            marcarError(inputS, "#exitError", "Error 08: La data de sortida és obligatòria");
            salidaOk = false;
        } else {
            salidaOk = true;
        }

        // Validar presencia de Fecha de Arribada
        if (!inputL.value) {
            marcarError(inputL, "#comeError", "Error 09: La data d'arribada és obligatòria");
            llegadaOk = false;
        } else {
            llegadaOk = true;
        }

        // Si alguno de los dos falta, cortamos aquí para que se vean los errores en rojo
        if (!salidaOk || !llegadaOk) return false;

        // Lógica de comparación si ambos existen
        const fS = new Date(inputS.value);
        const fL = new Date(inputL.value);
        const ahora = new Date();
        ahora.setSeconds(0, 0); // Limpiamos segundos para evitar desfases

        if (fS < ahora) {
            return marcarError(inputS, "#exitError", "Error 21: La data sortida ha de ser mes gran que l’actual");
        }

        if (fL <= fS) {
            return marcarError(inputL, "#comeError", "Error 24: La data arribada ha de ser major que la data sortida");
        }

        listado.dataSortida = inputS.value;
        listado.dataArribada = inputL.value;

        marcarExito(inputS, "#exitError");
        marcarExito(inputL, "#comeError");
        return true;
    }

    function validarAnimals() {
        const input = document.getElementById("inputAnimals");
        const val = obtenerValor("inputAnimals"); // Esto ya hace el .trim()

        // Validar si está vacío
        if (val === "") {
            return marcarError(input, "#AnimalNumberError", "Error 18: El número d’animals ha de ser més gran que 0");
        }

        //Validar que sea un número positivo
        const num = Number(val);
        if (isNaN(num) || num <= 0) {
            return marcarError(input, "#AnimalNumberError", "Error 18: El número d’animals ha de ser més gran que 0");
        }

        // Validar longitud máxima
        if (val.length > 6) {
            return marcarError(input, "#AnimalNumberError", "Error 07: El número d’animals no pot ser més gran de 6 caràcters");
        }

        listado.numAnimals = val;
        return marcarExito(input, "#AnimalNumberError");
    }

    function validarsirCode() {
        const input = document.getElementById("inputsirCode");
        const val = obtenerValor("inputsirCode");
        if (val && val.length > 15 || val.length===0) return marcarError(input, "#SIRCODEError", "Error 10: Máximo 15 caracteres");
        listado.sirCode = val;
        return marcarExito(input, "#SIRCODEError");
    }

    function validarMatricula() {
        const input = document.getElementById("inputMatricula");
        const val = obtenerValor("inputMatricula");
        if (val.length > 10 || val.length===0) return marcarError(input, "#MatriculaError", "Error 12: Matrícula máx 10");
        listado.matricula = val;
        return marcarExito(input, "#MatriculaError");
    }

    function validarNifConductor() {
        const input = document.getElementById("inputNifConductor");
        const val = obtenerValor("inputNifConductor");
        if (val.length > 9 || val.length===0) return marcarError(input, "#NIFError", "Error 13: NIF máx 9");
        listado.nifConductor = val;
        return marcarExito(input, "#NIFError");
    }

    function validarNomDelTransportista() {
        const input = document.getElementById("inputNombreTransportista");
        const val = obtenerValor("inputNombreTransportista");

        // Validación típica de campo obligatorio
        if (val === "") {
            return marcarError(input, "#nameTransportError", "Error: El nom del transportista és obligatori");
        }

        // Si la API tiene un límite
        if (val.length > 50) {
            return marcarError(input, "#nameTransportError", "Error: El nom és massa llarg");
        }

        listado.nombreTransportista = val;
        return marcarExito(input, "#nameTransportError");
    }

    function validarMedioTransporte() {
        const input = document.getElementById("selectMedioTransporte");
        const val = input ? input.value : "";

        if (val !== "01" && val !== "99") {
            return marcarError(input, "#errorTransport", "Error 37: El mitjà de transport ha de ser 01 o 99");
        }

        listado.medioTransporte = val;
        return marcarExito(input, "#errorTransport");
    }

    function marcarError(input, selector, msg) {
        const div = document.querySelector(selector);
        if (input) input.classList.add("is-invalid");
        if (div) div.textContent = msg;
        return false;
    }

    function marcarExito(input, selector) {
        const div = document.querySelector(selector);
        if (input) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
        if (div) div.textContent = "";
        return true;
    }
}