import Swal from 'sweetalert2';
import axios from "axios";
import { useI18n } from 'vue-i18n'

export function inicializarFormEnvioPorc() {
    let listaAltas = JSON.parse(localStorage.getItem("listaAltas")) || [];
    let listado = {};
    const { t } = useI18n();

    // Helper para formatear fechas a AAAAMMDDHHMM (Requisito Gencat Error 08/09)
    const formatearFechaGTR = (fechaStr) => {
        if (!fechaStr) return "";
        // Reemplazamos separadores T, -, : para limpiar el string del input datetime-local o date
        const limpia = fechaStr.replace(/[-T:]/g, '');
        // Si solo tiene fecha (8 chars), añadimos ceros para hora/minuto
        return limpia.length === 8 ? limpia + "0000" : limpia.padEnd(12, '0').substring(0, 12);
    };

    const sendButton = document.getElementById('enviar');
    const buttonLogin = document.getElementById('buttonlogin');


    const peticion ={
        nif: "37370803N",
        password: "5Q62h4rP",
        tipusEspecie: "02",
        tipusAccio: "NO",
        tipusMoviment: "01",
        explotacioSortida: "1880AE",
        explotacioEntrada: "1000AM",
        codiCategoria: "4531",
        numAnimals: "200",
        dataSortida: "202601221303",
        dataArribada: "202601231630",
        codiSirentra: "0123456789ABCD",
        mitjaTransport: "01",
        matricula: "0123456789",
        nifConductor: "01234567B",
        mobilitat: "SI"
    }

    if (sendButton) {
        // Usamos una función nombrada para poder removerla si fuera necesario
        sendButton.onclick = async function (e) {
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
            const v15 = validarNomDelTransportista();
            const v16 = validarMedioTransporte();

            if (v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8 && v9 && v11 && v12 && v13 && v14 && v15 && v16) {

                // 1. Mostrar estado de carga
                Swal.fire({
                    title: 'Processant tramesa...',
                    text: 'Connectant amb el servidor de Gencat',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

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

                let alta = {
                    nif: listado.nif,
                    tipusEspecie: listado.tipusEspecie || "02",
                    password: listado.passwd,
                    tipoAccion: listado.accio.toUpperCase(),
                    tipoMovimiento: listado.moviment,
                    ExplotacionOrigen: listado.origen,
                    ExplotacionDestino: listado.destino,
                    codigoRega: listado.destino,
                    categoria: listado.categoria,
                    numAnimals: listado.numAnimals,
                    fechaSalida: listado.dataSortida,
                    fechaLlegada: listado.dataArribada,
                    sirCode: listado.sirCode,
                    medioTransporte: listado.medioTransporte,
                    matricula: listado.matricula,
                    nombreTransportista: document.getElementById("inputNombreTransportista").value ,
                    nifConductor: listado.nifConductor,
                    mobilitat: document.querySelector("input[name='mobilitat']:checked")?.value.toUpperCase() || "NO"
                }


                try {
                    console.log(alta);
                    //Llamada con Axios
                    const response = await axios.put(url, datosFinales);
                    let listaAltas = JSON.parse(localStorage.getItem("listaAltas")) || [];
                    listaAltas.push(alta);
                    localStorage.setItem("listaAltas", JSON.stringify(listaAltas));

                    await Swal.fire({
                        icon: 'success',
                        title: t('alertas.alta_tramitada'),
                        text: t('alertas.alta_ok'),
                        confirmButtonColor: '#2e7d32'
                    });

                    localStorage.removeItem('listaPorc');
                    window.location.href = "/form";

                } catch (error) {
                    //Manejo de errores centralizado
                    let titulo = t('alertas.error_connexio');
                    let mensaje = t('alertas.error_api');

                    if (error.response) {
                        // El servidor respondió con un código
                        titulo = `Error ${error.response.status}`;
                        mensaje = t('alertas.error_servidor');;
                    }

                    Swal.fire({
                        icon: 'error',
                        title: titulo,
                        text: mensaje,
                        confirmButtonColor: '#d33'
                    });
                }
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: t('alertas.form_incomplet'),
                    text: t('alertas.form_corregir'),
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
        if (!val || val.length===0 || val.length>9) return marcarError(input, "#nifError", t('alertas.gtr.e36'));
        listado.nif = val;
        return marcarExito(input, "#nifError");
    }

    function validarPasswd() {
        const input = document.getElementById("inputPassword");
        const val = obtenerValor("inputPassword");
        if (!val) return marcarError(input, "#passwordError", t('alertas.gtr.e35'));
        listado.passwd = val;
        return marcarExito(input, "#passwordError");
    }

    function validarEspecie() {
        const input = document.getElementById("inputEspecie");
        const val = obtenerValor("inputEspecie");
        if (val !== "02") return marcarError(input, "#specieCodeError", t('alertas.gtr.e15'));
        listado.tipusEspecie = val;
        return marcarExito(input, "#specieCodeError");
    }

    function validarOrigen() {
        const input = document.getElementById("inputOrigen");
        const val = obtenerValor("inputOrigen");
        if (val.length===0 || val.length > 14) return marcarError(input, "#originCodeError", t('alertas.gtr.e04'));
        listado.origen = val;
        return marcarExito(input, "#originCodeError");
    }

    function validarDestino() {
        const input = document.getElementById("inputDestino");
        const val = obtenerValor("inputDestino");
        if (val.length===0 || val.length > 14) return marcarError(input, "#explotationCodeError", t('alertas.gtr.e05'));
        if (val === listado.origen) return marcarError(input, "#explotationCodeError", t('alertas.gtr.e29'));
        listado.destino = val;
        return marcarExito(input, "#explotationCodeError");
    }

    function validarAccio() {
        const input = document.getElementById("inputAccio");
        const val = obtenerValor("inputAccio").toLowerCase();
        if (val !== "si" && val !== "no") return marcarError(input, "#actionCodeError", t('alertas.gtr.e16'));
        listado.accio = val;
        return marcarExito(input, "#actionCodeError");
    }

    function validarMoviment() {
        const input = document.getElementById("inputMoviment");
        const val = obtenerValor("inputMoviment");
        if (val !== "01" && val !== "02") return marcarError(input, "#movementCodeError", t('alertas.gtr.e17'));
        listado.moviment = val;
        return marcarExito(input, "#movementCodeError");
    }

    function validarCategoria() {
        const input = document.getElementById("inputCategoria");
        const val = input ? input.value : "";
        if (!val || parseInt(val) > 5) return marcarError(input, "#errorCategory", t('alertas.gtr.e19'));
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
            marcarError(inputS, "#exitError", t('alertas.gtr.e08'));
            salidaOk = false;
        } else {
            salidaOk = true;
        }

        // Validar presencia de Fecha de Arribada
        if (!inputL.value) {
            marcarError(inputL, "#comeError", t('alertas.gtr.e09'));
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
            return marcarError(inputS, "#exitError", t('alertas.gtr.e21'));
        }

        if (fL <= fS) {
            return marcarError(inputL, "#comeError", t('alertas.gtr.e24'));
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
            return marcarError(input, "#AnimalNumberError",  t('alertas.gtr.e18'));
        }

        //Validar que sea un número positivo
        const num = Number(val);
        if (isNaN(num) || num <= 0) {
            return marcarError(input, "#AnimalNumberError",  t('alertas.gtr.e18'));
        }

        // Validar longitud máxima
        if (val.length > 6) {
            return marcarError(input, "#AnimalNumberError", t('alertas.gtr.e07'));
        }

        listado.numAnimals = val;
        return marcarExito(input, "#AnimalNumberError");
    }

    function validarsirCode() {
        const input = document.getElementById("inputsirCode");
        const val = obtenerValor("inputsirCode");
        if (val && val.length > 15 || val.length===0) return marcarError(input, "#SIRCODEError", t('alertas.gtr.e10'));
        listado.sirCode = val;
        return marcarExito(input, "#SIRCODEError");
    }

    function validarMatricula() {
        const input = document.getElementById("inputMatricula");
        const val = obtenerValor("inputMatricula");
        if (val.length > 10 || val.length===0) return marcarError(input, "#MatriculaError", t('alertas.gtr.e12'));
        listado.matricula = val;
        return marcarExito(input, "#MatriculaError");
    }

    function validarNifConductor() {
        const input = document.getElementById("inputNifConductor");
        const val = obtenerValor("inputNifConductor");
        if (val.length > 9 || val.length===0) return marcarError(input, "#NIFError", t('alertas.gtr.e13'));
        listado.nifConductor = val;
        return marcarExito(input, "#NIFError");
    }

    function validarNomDelTransportista() {
        const input = document.getElementById("inputNombreTransportista");
        const val = obtenerValor("inputNombreTransportista");

        // Validación típica de campo obligatorio
        if (val === "") {
            return marcarError(input, "#nameTransportError", t('alertas.gtr.transportista_obligatori'));
        }

        // Si la API tiene un límite
        if (val.length > 50) {
            return marcarError(input, "#nameTransportError", t('alertas.gtr.nom_llarg'));
        }

        listado.nombreTransportista = val;
        return marcarExito(input, "#nameTransportError");
    }

    function validarMedioTransporte() {
        const input = document.getElementById("selectMedioTransporte");
        const val = input ? input.value : "";

        if (val !== "01" && val !== "99") {
            return marcarError(input, "#errorTransport", t('alertas.gtr.e37'));
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