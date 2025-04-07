const squere = document.querySelector('.purple_squere');
const changeButton = document.querySelectorAll('.change')

changeButton.forEach((e)=>{
    e.addEventListener('click', ()=>{

        if(squere.classList.contains('left')){
            squere.classList.remove('left');
            squere.classList.add('right');
        }else{
            squere.classList.remove('right');
            squere.classList.add('left');
        }
       

        
    })
})

//responsvie

const responsiveRegister = document.querySelector('.register_responsive');
const responsiveLogin = document.querySelector('.login_responsive');
const changeButtonRes = document.querySelectorAll('.change_res');

changeButtonRes.forEach((e)=>{
    e.addEventListener('click', ()=>{
        if(responsiveRegister.classList.contains('show')){
            responsiveRegister.classList.remove('show')
            responsiveRegister.classList.add('not_show')

            responsiveLogin.classList.remove('now_show')
            responsiveLogin.classList.add('show')
        } else{
            responsiveLogin.classList.remove('show')
            responsiveLogin.classList.add('not_show')

            responsiveRegister.classList.remove('not_show')
            responsiveRegister.classList.add('show')
        }
    })
})

