const { body, check } = require('express-validator')

const validate = (method) => {

  switch (method) {
    case 'login':{
      return [
        body('username')
          .notEmpty()
          .withMessage('El nombre de usuario es obligatorio'),
        body('password')
          .notEmpty()
          .withMessage('La contraseña es obligatorio')
      ]
    }

    case 'createUser':
    case 'editUser':{
      return [ 
        body('name')
          .notEmpty()
          .withMessage('El nombre completo es obligatorio')
          .isLength({ min: 3, max: 50 })
          .withMessage('El nombre completo debe tener entre 3 y 50 caracteres')
          .trim()
          .isAlpha('es-ES', {ignore: ' '})
          .withMessage('El nombre debe contener solo letras'),
        body('email')
          .trim()
          .notEmpty()
          .withMessage('El correo electrónico es obligatorio')
          .isEmail()
          .withMessage('El correo electrónico debe tener un formato válido')
          .isLength({ min: 5, max: 255 })
          .withMessage('El correo electrónico debe tener entre 5 y 255 caracteres')
          .custom((value) => {
            if (!/@utp\.edu\.co$/.test(value)) {
              throw new Error('Debe ser un correo electrónico de la UTP(@utp.edu.co)');
            }
            return true;
          })          
        ]
    }
    
    case 'createCategory':
    case 'editCategory':{
      return [ 
        body('name')
          .trim()
          .notEmpty()
          .withMessage('El nombre de la categoría es obligatorio')
          .isLength({ min: 3, max: 50 })
          .withMessage('El nombre de la categoría debe tener entre 3 y 50 caracteres')
      ]
    }

    case 'createNew':
    case 'editNew':{
      return [ 
        body('title')
          .trim()
          .notEmpty()
          .withMessage('Título de noticia es obligatorio')
          .trim()
          .notEmpty()
          .isLength({ min: 3})
          .withMessage('El título de la noticias debe tener minimo tres caracteres'),
        body('summary')
          .trim()
          .notEmpty()
          .withMessage('Resumen de noticia requerido')
          .isLength({ max:255 })
          .withMessage('El resumen de la noticia debe tener máximo 255 caracteres'),
        body('link')
          .trim()
          .notEmpty()
          .withMessage('Resumen de noticia requerido')
          .isURL()
          .withMessage('Ingrese un enlace válido'),
        check('file').custom((value, { req }) => {
          if (!req.file) {
            return true;
          }
          if (!req.file) {
            throw new Error('Debe seleccionar una imagen');
          }
          if (!req.file.mimetype.startsWith('image/')) {
            throw new Error('El archivo debe ser una imagen');
          }
          return true;
        })          
      ]
    }
  }
}

module.exports = {
    validate,
}