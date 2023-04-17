document.addEventListener('DOMContentLoaded', (e) => {
    const btnEnviar = document.getElementById('btn-enviar');
    const nameInput = document.getElementById("name")
    const emailInput = document.getElementById("email")

    const seccionErrorSelector = document.getElementById("seccionError")

    let enableBtn = [0,0];

    const checkEnableBtn = () => { 
        console.log(enableBtn)
        if (enableBtn.includes(0)) {
            btnEnviar.disabled = true;
        } else {
            seccionErrorSelector.innerHTML = ''
            btnEnviar.disabled = false;
        }
    }

    const nameValidator = (e) => {
        console.log(nameInput.value)
        if (nameInput.value.length < 4) {
            enableBtn[0] = 0;
        }
        else {
            enableBtn[0] = 1;
        }
        checkEnableBtn();
    }

    const emailValidator = (e) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validatorFlag = re.test(String(emailInput.value).toLowerCase())
        if(!validatorFlag){
            enableBtn[1] = 0;
        }
        else {
            enableBtn[1] = 1;
        }

        checkEnableBtn();
        
    }

    nameInput.addEventListener('input', nameValidator)
    emailInput.addEventListener('input', emailValidator)

})