# express-ldap
Conexión y validación de usuarios express con ldap

<!-- bitacora -->
27-02-2023 
- Se inicializa el repositorio
- Se implementa la validación de usuario administrador en el controlador authController.js en base de datos local y servicio LDAP.
- Instalación de morgan y jsonwebtoken

10-03-2023
- Se implementa la verificación y creación de token 
- Se verifica el token para todas las rutas de userRoutes exceptuando el login
- Queda pendiente modificar la llave secreta de creación del token

13-03-2023
- Creación de api key token para aplicación
- Instalación EJS y Sequelize-cli
- Creación de -sequelizerc 
- Problema creación de llave foranea de modelo role y user

14-04-2023
- Creación correcta de llave foranea 

