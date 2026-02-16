export const ca = {
    // --- NAVEGACIÓN ---
    nav: {
        tornar: "Tornar",
        tancar_sessio: "Sortir",
        gtr_titol: "GTR"
    },

    // --- PANTALLA DE LOGIN ---
    login: {
        titol: "GTR Login",
        subtitol: "Inici de sessió",
        nif_label: "NIF",
        nif_placeholder: "Nom d'usuari",
        pass_label: "Contrasenya",
        pass_placeholder: "Introdueix la contrasenya",
        codimo_label: "Codi Mo",
        codimo_placeholder: "Introdueix la codi Mo",
        boto_entrar: "Iniciar Sessió"
    },

    // --- FORMULARI DE TRAMESA ---
    form: {
        titol: "Registre de tramesa",
        subtitol: "Porcí - Control de lots",
        seccio_transport: "Dades del Transport",
        boto_registrar: "REGISTRAR TRAMESA",
        labels: {
            nif: "NIF",
            passwd: "CONTRASENYA MOVILITAT:",
            origen: "CODI EXPLOTACIÓ ORIGEN:",
            destino: "CODI EXPLOTACIÓ DESTINACIÓ:",
            especie: "ESPÈCIE:",
            accio: "ACCIÓ:",
            moviment: "MOVIMENT:",
            categoria: "CODI CATEGORIA:",
            data_sortida: "DATA SORTIDA:",
            data_arribada: "DATA ARRIBADA:",
            mobilitat: "MOBILITAT (SI/NO)",
            nom_transportista: "NOM TRANSPORTISTA",
            medio_transport: "MITJÀ DE TRANSPORT:",
            matricula: "MATRÍCULA:",
            nif_conductor: "NIF CONDUCTOR:",
            animals: "NÚMERO DE ANIMALS:",
            sircode: "SIRCODE:"
        },
        opcions: {
            selecciona: "Selecciona un",
            engreix: "Engreix",
            garrins: "Garrins",
            recria: "Recria/Transicio",
            reproductores: "Femelles reproductores",
            reposicio: "Reposicio",
            sementals: "Sementals",
            camio: "Camió",
            otros: "Altres",
            si: "SÍ",
            no: "NO"
        }
    },

    // --- LLISTA D'ALTES ---
    llista: {
        titol: "Llista d'altes",
        buida: "No hi ha dades disponibles",
        columnes: {
            nif: "NIF",
            pass: "Contrasenya",
            accio: "Acció",
            moviment: "Tipus Moviment",
            origen: "Explotació Origen",
            destino: "Explotació Destinació",
            rega: "Codi Rega",
            cat: "Categoría",
            animals: "Número animals",
            sortida: "Data sortida",
            arribada: "Data arribada",
            sirentra: "Codi Sirentra",
            transport: "Mitjà transport",
            matricula: "Matrícula",
            conductor: "NIF Conductor",
            mobilitat: "Mobilitat",
            accions: "Accions"
        },
        boto_borrar: "Borrar"
    },

    // --- MISSATGES DE SISTEMA I ERRORS ---
    alertas: {
        validant: "Validant...",
        processant: "Processant tramesa...",
        connectant: "Connectant amb el servidor",
        exito_titol: "Sessió iniciada",
        exito_missatge: "Has entrat correctament al sistema",
        alta_tramitada: "¡Alta Tramitada!",
        alta_ok: "El formulari s'ha enviat correctament.",
        error_titol: "Errors de validació",
        error_xarxa: "Dades invàlides (Error de xarxa)",
        error_connexio: "Error de la connexió",
        error_api: "No es pot connectar amb l'API. Revisa Internet.",
        error_api_conexio:"No es pot connectar amb Gencat",
        error_format: "La resposta del servidor no és vàlida",
        form_incomplet: "Formulari incomplet",
        form_corregir: "Si us plau, corregiu els errors marcats en vermell.",
        // Errors de validació Gencat (per codi)
        gtr: {
            e36: "Error 36: Usuari no trobat",
            e35: "Error 35: Clau de pas incorrecte",
            e15: "Error 15: L'espècie ha de ser 02",
            e04: "Error 04: Màxim 14 caràcters",
            e05: "Error 05: Màxim 14 caràcters",
            e29: "Error 29: Origen i destí iguals",
            e16: "Error 16: Ha de ser SI o NO",
            e17: "Error 17: Ha de ser 01 o 02",
            e19: "Error 19: Categoría de 01 a 05",
            e08: "Error 08: La data de sortida és obligatòria",
            e09: "Error 09: La data d'arribada és obligatòria",
            e21: "Error 21: La data sortida ha de ser més gran que l’actual",
            e24: "Error 24: La data arribada ha de ser major que la data sortida",
            e18: "Error 18: El número d’animals ha de ser més gran que 0",
            e07: "Error 07: El número d’animals no pot superar els 6 caràcters",
            e10: "Error 10: Màxim 15 caràcters",
            e12: "Error 12: Matrícula màxim 10 caràcters",
            e13: "Error 13: NIF màxim 9 caràcters",
            e37: "Error 37: El mitjà de transport ha de ser 01 o 99",
            transportista_obligatori: "El nom del transportista és obligatori"
        }
    }
};

export const es = {
    nav: {
        tornar: "Volver",
        tancar_sessio: "Salir",
        gtr_titol: "GTR"
    },
    login: {
        titol: "GTR Login",
        subtitol: "Inicio de sesión",
        nif_label: "NIF",
        nif_placeholder: "Nombre de usuario",
        pass_label: "Contraseña",
        pass_placeholder: "Introduce tu contraseña",
        codimo_label: "Codigo Mo",
        codimo_placeholder: "Introduce el codigo Mo",
        boto_entrar: "Iniciar Sesión"
    },
    form: {
        titol: "Registro de envío",
        subtitol: "Porcino - Control de lotes",
        seccio_transport: "Datos del Transporte",
        boto_registrar: "REGISTRAR ENVÍO",
        labels: {
            nif: "NIF",
            passwd: "CONTRASEÑA MOVILIDAD:",
            origen: "CÓDIGO EXPLOTACIÓN ORIGEN:",
            destino: "CÓDIGO EXPLOTACIÓN DESTINO:",
            especie: "ESPECIE:",
            accio: "ACCIÓN:",
            moviment: "MOVIMIENTO:",
            categoria: "CÓDIGO CATEGORÍA:",
            data_sortida: "FECHA SALIDA:",
            data_arribada: "FECHA LLEGADA:",
            mobilitat: "MOVILIDAD (SI/NO)",
            nom_transportista: "NOMBRE TRANSPORTISTA",
            medio_transport: "MEDIO DE TRANSPORTE:",
            matricula: "MATRÍCULA:",
            nif_conductor: "NIF CONDUCTOR:",
            animals: "NÚMERO DE ANIMALES:",
            sircode: "SIRCODE:"
        },
        opcions: {
            selecciona: "Selecciona uno",
            engreix: "Engorde",
            garrins: "Lechones",
            recria: "Recría/Transición",
            reproductores: "Hembras reproductoras",
            reposicio: "Reposición",
            sementals: "Sementales",
            camio: "Camión",
            otros: "Otros",
            si: "SÍ",
            no: "NO"
        }
    },
    llista: {
        titol: "Lista de altas",
        buida: "No hay datos disponibles",
        columnes: {
            nif: "NIF",
            pass: "Contraseña",
            accio: "Acción",
            moviment: "Tipo Movimiento",
            origen: "Explotación Origen",
            destino: "Explotación Destino",
            rega: "Código Rega",
            cat: "Categoría",
            animals: "Número animales",
            sortida: "Fecha salida",
            arribada: "Fecha llegada",
            sirentra: "Código Sirentra",
            transport: "Medio transporte",
            matricula: "Matrícula",
            conductor: "NIF Conductor",
            mobilitat: "Movilidad",
            accions: "Acciones"
        },
        boto_borrar: "Borrar"
    },
    alertas: {
        validant: "Validando...",
        processant: "Procesando envío...",
        connectant: "Conectando con el servidor",
        exito_titol: "Sesión iniciada",
        exito_missatge: "Has entrado correctamente al sistema",
        alta_tramitada: "¡Alta Tramitada!",
        alta_ok: "El formulario se ha enviado correctamente.",
        error_titol: "Errores de validación",
        error_xarxa: "Datos inválidos (Error de red)",
        error_connexio: "Error de la conexión",
        error_api: "No se puede conectar con la API. Revisa Internet.",
        error_api_conexio:"No se puede conectar con Gencat",
        error_format: "La respuesta del servidor no es válida",
        form_incomplet: "Formulario incompleto",
        form_corregir: "Por favor, corrige los errores marcados en rojo.",
        gtr: {
            e36: "Error 36: Usuario no encontrado",
            e35: "Error 35: Clave de paso incorrecta",
            e15: "Error 15: La especie debe ser 02",
            e04: "Error 04: Máximo 14 caracteres",
            e05: "Error 05: Máximo 14 caracteres",
            e29: "Error 29: Origen y destino iguales",
            e16: "Error 16: Debe ser SI o NO",
            e17: "Error 17: Debe ser 01 o 02",
            e19: "Error 19: Categoría de 01 a 05",
            e08: "Error 08: La fecha de salida es obligatoria",
            e09: "Error 09: La fecha de llegada es obligatoria",
            e21: "Error 21: La fecha de salida debe ser mayor que la actual",
            e24: "Error 24: La fecha de llegada debe ser mayor que la de salida",
            e18: "Error 18: El número de animales debe ser mayor que 0",
            e07: "Error 07: El número de animales no puede superar los 6 caracteres",
            e10: "Error 10: Máximo 15 caracteres",
            e12: "Error 12: Matrícula máximo 10 caracteres",
            e13: "Error 13: NIF máximo 9 caracteres",
            e37: "Error 37: El medio de transporte debe ser 01 o 99",
            transportista_obligatori: "El nombre del transportista es obligatorio"
        }
    }
};