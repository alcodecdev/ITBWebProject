export const ca = {
    //NAVEGACIÓN
    nav: {
        tornar: "Tornar",
        tancar_sessio: "Sortir",
        gtr_titol: "GTR"
    },

    //PANTALLA DE LOGIN
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
    //PANTALLA INICIO
    home: {
        titol: "GTR Altes",
        enviar: "Enviar alta",
        llista: "Llista d'altes"
    },

    //FORMULARI DE TRAMESA
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

    //LLISTA D'ALTES
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

    //MISSATGES DE SISTEMA I ERRORS
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
        error_servidor: "El servidor de Gencat ha rebutjat la petició. Revisa les dades.",
        error_api: "No es pot connectar amb l'API. Revisa Internet.",
        error_api_conexio:"No es pot connectar amb Gencat",
        error_format: "La resposta del servidor no és vàlida",
        form_incomplet: "Formulari incomplet",
        form_corregir: "Si us plau, corregiu els errors marcats en vermell.",
        // Errors de validació Gencat
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
            transportista_obligatori: "El nom del transportista és obligatori",
            nom_llarg: "Error: El nom és massa llarg"
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
    home: {
        titol: "GTR Altas",
        enviar: "Enviar alta",
        llista: "Lista de altas"
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
        error_servidor: "El servidor de Gencat ha rechazado la petición. Revisa los datos.",
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
            transportista_obligatori: "El nombre del transportista es obligatorio",
            nom_llarg: "Error: El nombre es demasiado largo"
        }
    }
};
export const en = {
    nav: {
        tornar: "Back",
        tancar_sessio: "Logout",
        gtr_titol: "GTR"
    },

    login: {
        titol: "GTR Login",
        subtitol: "Sign In",
        nif_label: "NIF/ID",
        nif_placeholder: "Username",
        pass_label: "Password",
        pass_placeholder: "Enter password",
        codimo_label: "Mo Code",
        codimo_placeholder: "Enter Mo code",
        boto_entrar: "Log In"
    },

    home: {
        titol: "GTR Entries",
        enviar: "Send entry",
        llista: "Entry list"
    },

    form: {
        titol: "Shipment Registry",
        subtitol: "Porcine - Batch Control",
        seccio_transport: "Transport Data",
        boto_registrar: "REGISTER SHIPMENT",
        labels: {
            nif: "NIF/ID",
            passwd: "MOBILITY PASSWORD:",
            origen: "ORIGIN HOLDING CODE:",
            destino: "DESTINATION HOLDING CODE:",
            especie: "SPECIES:",
            accio: "ACTION:",
            moviment: "MOVEMENT:",
            categoria: "CATEGORY CODE:",
            data_sortida: "DEPARTURE DATE:",
            data_arribada: "ARRIVAL DATE:",
            mobilitat: "MOBILITY (YES/NO)",
            nom_transportista: "CARRIER NAME",
            medio_transport: "MEANS OF TRANSPORT:",
            matricula: "LICENSE PLATE:",
            nif_conductor: "DRIVER NIF/ID:",
            animals: "NUMBER OF ANIMALS:",
            sircode: "SIRCODE:"
        },
        opcions: {
            selecciona: "Select one",
            engreix: "Fattening",
            garrins: "Piglets",
            recria: "Rearing/Transition",
            reproductores: "Breeding females",
            reposicio: "Replacement",
            sementals: "Sires",
            camio: "Truck",
            otros: "Others",
            si: "YES",
            no: "NO"
        }
    },

    llista: {
        titol: "Entry List",
        buida: "No data available",
        columnes: {
            nif: "NIF/ID",
            pass: "Password",
            accio: "Action",
            moviment: "Movement Type",
            origen: "Origin Holding",
            destino: "Dest. Holding",
            rega: "Rega Code",
            cat: "Category",
            animals: "No. Animals",
            sortida: "Departure date",
            arribada: "Arrival date",
            sirentra: "Sirentra Code",
            transport: "Means of transport",
            matricula: "License plate",
            conductor: "Driver NIF",
            mobilitat: "Mobility",
            accions: "Actions"
        },
        boto_borrar: "Delete"
    },

    alertas: {
        validant: "Validating...",
        processant: "Processing shipment...",
        connectant: "Connecting to server",
        exito_titol: "Session started",
        exito_missatge: "Login successful",
        alta_tramitada: "Registration Processed!",
        alta_ok: "The form has been sent correctly.",
        error_titol: "Validation Errors",
        error_xarxa: "Invalid data (Network Error)",
        error_servidor: "The Gencat server rejected the request. Please check the data.",
        error_connexio: "Connection error",
        error_api: "Cannot connect to API. Check Internet.",
        error_api_conexio: "Cannot connect to Gencat",
        error_format: "Server response is invalid",
        form_incomplet: "Incomplete form",
        form_corregir: "Please correct the errors marked in red.",
        gtr: {
            e36: "Error 36: User not found",
            e35: "Error 35: Incorrect password",
            e15: "Error 15: Species must be 02",
            e04: "Error 04: Max 14 characters",
            e05: "Error 05: Max 14 characters",
            e29: "Error 29: Origin and destination are the same",
            e16: "Error 16: Must be YES or NO",
            e17: "Error 17: Must be 01 or 02",
            e19: "Error 19: Category from 01 to 05",
            e08: "Error 08: Departure date is mandatory",
            e09: "Error 09: Arrival date is mandatory",
            e21: "Error 21: Departure date must be later than current",
            e24: "Error 24: Arrival date must be later than departure",
            e18: "Error 18: Number of animals must be greater than 0",
            e07: "Error 07: Animal count cannot exceed 6 characters",
            e10: "Error 10: Max 15 characters",
            e12: "Error 12: License plate max 10 characters",
            e13: "Error 13: NIF max 9 characters",
            e37: "Error 37: Means of transport must be 01 or 99",
            transportista_obligatori: "Carrier name is mandatory",
            nom_llarg: "Error: The name is too long"
        }
    }
};
export const fr = {
    nav: {
        tornar: "Retour",
        tancar_sessio: "Quitter",
        gtr_titol: "GTR"
    },

    login: {
        titol: "GTR Login",
        subtitol: "Ouverture de session",
        nif_label: "NIF/ID",
        nif_placeholder: "Nom d'utilisateur",
        pass_label: "Mot de passe",
        pass_placeholder: "Entrez le mot de passe",
        codimo_label: "Code Mo",
        codimo_placeholder: "Entrez le code Mo",
        boto_entrar: "Se Connecter"
    },

    home: {
        titol: "GTR Enregistrements",
        enviar: "Envoyer l'entrée",
        llista: "Liste des entrées"
    },

    form: {
        titol: "Registre d'expédition",
        subtitol: "Porcin - Contrôle des lots",
        seccio_transport: "Données de Transport",
        boto_registrar: "ENREGISTRER L'EXPÉDITION",
        labels: {
            nif: "NIF/ID",
            passwd: "MOT DE PASSE MOBILITÉ:",
            origen: "CODE EXPLOITATION ORIGINE:",
            destino: "CODE EXPLOITATION DESTINATION:",
            especie: "ESPÈCE:",
            accio: "ACTION:",
            moviment: "MOUVEMENT:",
            categoria: "CODE CATÉGORIE:",
            data_sortida: "DATE DE DÉPART:",
            data_arribada: "DATE D'ARRIVÉE:",
            mobilitat: "MOBILITÉ (OUI/NON)",
            nom_transportista: "NOM DU TRANSPORTEUR",
            medio_transport: "MOYEN DE TRANSPORT:",
            matricula: "IMMATRICULATION:",
            nif_conductor: "NIF CONDUCTEUR:",
            animals: "NOMBRE D'ANIMAUX:",
            sircode: "SIRCODE:"
        },
        opcions: {
            selecciona: "Sélectionnez-en un",
            engreix: "Engraissement",
            garrins: "Porcelets",
            recria: "Élevage/Transition",
            reproductores: "Femelles reproductrices",
            reposicio: "Remplacement",
            sementals: "Verrats",
            camio: "Camion",
            otros: "Autres",
            si: "OUI",
            no: "NON"
        }
    },

    llista: {
        titol: "Liste des entrées",
        buida: "Aucune donnée disponible",
        columnes: {
            nif: "NIF/ID",
            pass: "Mot de passe",
            accio: "Action",
            moviment: "Type de Mouvement",
            origen: "Exploitation Origine",
            destino: "Exploit. Destination",
            rega: "Code Rega",
            cat: "Catégorie",
            animals: "Nb. Animaux",
            sortida: "Date de départ",
            arribada: "Date d'arrivée",
            sirentra: "Code Sirentra",
            transport: "Moyen de transport",
            matricula: "Immatriculation",
            conductor: "NIF Conducteur",
            mobilitat: "Mobilité",
            accions: "Actions"
        },
        boto_borrar: "Effacer"
    },

    alertas: {
        validant: "Validation...",
        processant: "Traitement de l'envoi...",
        connectant: "Connexion au serveur",
        exito_titol: "Session ouverte",
        exito_missatge: "Connexion réussie",
        alta_tramitada: "Enregistrement Terminé!",
        alta_ok: "Le formulaire a été envoyé correctement.",
        error_titol: "Erreurs de validation",
        error_xarxa: "Données invalides (Erreur réseau)",
        error_connexio: "Erreur de connexion",
        error_servidor: "Le serveur de Gencat a rejeté la demande. Veuillez vérifier les données.",
        error_api: "Impossible de se connecter à l'API. Vérifiez Internet.",
        error_api_conexio: "Impossible de se connecter à Gencat",
        error_format: "La réponse du serveur est invalide",
        form_incomplet: "Formulaire incomplet",
        form_corregir: "Veuillez corriger les erreurs marquées en rouge.",
        gtr: {
            e36: "Erreur 36: Utilisateur non trouvé",
            e35: "Erreur 35: Mot de passe incorrect",
            e15: "Erreur 15: L'espèce doit être 02",
            e04: "Erreur 04: Max 14 caractères",
            e05: "Erreur 05: Max 14 caractères",
            e29: "Erreur 29: Origine et destination identiques",
            e16: "Erreur 16: Doit être OUI ou NON",
            e17: "Erreur 17: Doit être 01 ou 02",
            e19: "Erreur 19: Catégorie de 01 à 05",
            e08: "Erreur 08: Date de départ obligatoire",
            e09: "Erreur 09: Date d'arrivée obligatoire",
            e21: "Erreur 21: La date de départ doit être postérieure à l'actuelle",
            e24: "Erreur 24: La date d'arrivée doit être postérieure au départ",
            e18: "Erreur 18: Le nombre d'animaux doit être supérieur à 0",
            e07: "Erreur 07: Le nombre d'animaux ne peut pas dépasser 6 caractères",
            e10: "Erreur 10: Max 15 caractères",
            e12: "Erreur 12: Immatriculation max 10 caractères",
            e13: "Erreur 13: NIF max 9 caractères",
            e37: "Erreur 37: Le moyen de transport doit être 01 ou 99",
            transportista_obligatori: "Le nom du transporteur est obligatoire",
            nom_llarg: "Erreur: Le nom est trop long"
        }
    }
};