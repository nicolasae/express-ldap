document.addEventListener('DOMContentLoaded', (e) => {
    const btnEnviar = document.getElementById('btn-enviar');
    const userNameInput = document.getElementById("username")
    const passwordInput = document.getElementById("password")

    const seccionErrorSelector = document.getElementById("seccionError")

    let enableBtn = [0, 0];

    const checkEnableBtn = () => {

        console.log(enableBtn)
        if (enableBtn.includes(0)) {

            // seccionErrorSelector.innerHTML = `
            // <div class="alert alert-warning d-flex align-items-center" role="alert">
            //     <div>
            //     Ingresar todos los campos
            //     </div>
            // </div>`

            btnEnviar.disabled = true;
        } else {
            // seccionErrorSelector.innerHTML = ''
            btnEnviar.disabled = false;
        }
    }

    const userValidator = (e) => {
        if (userNameInput.value.length < 4) {
            enableBtn[0] = 0;
        }
        else {
            enableBtn[0] = 1;
        }
        checkEnableBtn();
    }

    const passwordValidator = (e) => {
        if (passwordInput.value.length < 6) {
            enableBtn[1] = 0;
        }
        else {
            enableBtn[1] = 1;
        }
        checkEnableBtn();
    }

    userNameInput.addEventListener('input', userValidator)
    passwordInput.addEventListener('input', passwordValidator)


    // document.getElementById("login-form").addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     if (passwordInput.value.length < 6 && userNameInput.value.length < 4) {
    //         console.log('El usuario y la contraseña deben tener al menos 4 y 6 caracteres respectivamente')
    //     } else {
    //         document.getElementById("login-form").submit();
    //     }
    //     console.log('submit')
    // })
})

