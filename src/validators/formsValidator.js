const { body } = require('express-validator')

const validadate = (method) => {
  switch (method) {
    case 'createUser':
    case 'editUser':{
      return [ 
        body('name')
          .not()
          .isEmpty()
          .withMessage('Campo de nombre requerido')
          .isLength({ min: 3 })
          .withMessage('Tamaño minimo de 3 caracteres'),
        body('email', 'Ingresar correo valido')
          .not()
          .isEmpty()
          .withMessage('Campo de correo requerido')
          .custom((value) => {
            if (!/@utp\.edu\.co$/.test(value)) {
              throw new Error('Debe ser un correo electrónico de la UTP(@utp.edu.co)');
            }
            return true;
          })          
        ]
    }
    case 'createNew':
    case 'editNew':{
      return [ 
        body('title')
        .not()
        .isEmpty()
        .withMessage('Campo de nombre requerido')
        .isLength({ min: 3 })
        .withMessage('Tamaño minimo de 3 caracteres'),
      ]
    }
    case 'createCategory':
    case 'editCategory':{
      return [ 
        body('name')
        .not()
        .isEmpty()
        .withMessage('Campo de nombre requerido')
        .isLength({ min: 3 })
        .withMessage('Tamaño minimo de 3 caracteres'),
      ]
    }
  }
}

module.exports = {
    validadate,
}