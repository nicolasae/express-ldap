# Gestor de Contenido y API de Consulta de Noticias 
Este proyecto se enfoca en la creación de un administrador de contenido que incluye inicio de sesión con autenticación en el servicio LDAP y consta de dos roles diferentes  para el acceso al mismo (administrador y super administrador), así mismo, se proporciona una interfaz de programación de aplicaciones (API) para que los desarrolladores puedan acceder a información de noticias y categorías  de manera fácil y rápida.

# Endpoints disponibles
Actualmente se encuentran disponibles los siguientes endpoints:

# Obtener todas las noticias 
Este endpoint proporciona todas las noticias en formato JSON. Se puede acceder mediante la siguiente URL:

https://service-portalnews.herokuapp.com/api/news-for-portal

Devuelve lo siguiente:

[
    {
        "id": 4,
        "title": "Yo amo la UTP",
        "summary": "<p>Yo amo la UTP es el nuevo símbolo Institucional ubicado en el Campus, que representa los valores de la Universidad y refleja el sentido de pertenencia de la comunidad. Los invitamos a conocerlo, se encuentra ubicado en la entrada del Galpón</p>",
        "image": "/img/uploads/imagen-noticia-defecto.jpeg",
        "createdAt": "2023-04-19T14:28:04.000Z",
        "updatedAt": "2023-04-20T20:29:24.000Z",
        "formatCreateAt": "2023-04-19",
        "formatUpdatedAt": "2023-04-20"
    },
]

# Obtener una noticia por id 
Este endpoint proporciona la noticias que corresponda con el id dado en formato JSON. Se puede acceder mediante la siguiente URL:

https://service-portalnews.herokuapp.com/api/information-new/id

Devuelve lo siguiente:

{
    "id": 1,
    "title": "Resolución No. 2461 Convoca Elecciones representantes Consejo Superior, Consejo Académico y Comités Institucionales",
    "summary": "<p>La Secretaría General informa que mediante Resolución de Rectoría No. 2461 del 30 de marzo de 2023, se convoca la elección de representantes ante el Consejo Superior, Consejo Académico y Comités Institucionales, así:</p>",
    "link": "https://comunicaciones.utp.edu.co/noticias/52307/resolucion-no-2461-convoca-elecciones-representantes-consejo-superior-consejo-academico-y-comites-institucionales",
    "image": "/img/uploads/imagen-noticia-defecto.jpeg",
    "active": 0,
    "activeForPortal": 0,
    "idAuthor": 1,
    "createdAt": "2023-04-19T14:28:04.000Z",
    "updatedAt": "2023-04-20T20:27:34.000Z",
    "formatCreateAt": "2023-04-19",
    "formatUpdatedAt": "2023-04-20"
}

# Obtener noticias que estan activas y son para el portal UTP  
Este endpoint proporciona las noticias que se encuentran activas para el portal, en caso de requerir obtener la información de una cantidad específica de noticias se debe cambiar el valor de c que se muestra en el siguiente URL: 

https://service-portalnews.herokuapp.com/api/news-for-portal?c=2

La URL anterior devuelve la información de las dos ultimas noticias modificadas. Si se da un valor de "c" mayor a la cantidad de noticias existentes mostrara la cantidad máxima de noticias creadas con anterioridad.

Devuelve lo siguiente:

[
    {
        "id": 6,
        "title": "La Facultad de Ciencias Ambientales cumple 30 años de darle un sentido humano a la UTP",
        "summary": "<p>Este año se conmemoran tres décadas de fundación de la Facultad y serán diferentes eventos para celebrar. La semana anterior se hizo el lanzamiento de esta celebración.</p>",
        "image": "/img/uploads/406A0411-HDR.jpg",
        "createdAt": "2023-04-20T20:28:48.000Z",
        "updatedAt": "2023-04-21T19:11:20.000Z",
        "formatCreateAt": "2023-04-20",
        "formatUpdatedAt": "2023-04-21"
    }
]

# Obtener todas las categorías 
Este endpoint proporciona todas las categorías en formato JSON. Se puede acceder mediante la siguiente URL:

https://service-portalnews.herokuapp.com/api/all-categories

Devuelve lo siguiente:

[
    {
        "id": 1,
        "name": "Sin categoria",
        "createdAt": "2023-04-19T14:28:04.000Z",
        "updatedAt": "2023-04-19T14:28:04.000Z",
        "formatCreateAt": "2023-04-19",
        "formatUpdatedAt": "2023-04-19"
    },
]