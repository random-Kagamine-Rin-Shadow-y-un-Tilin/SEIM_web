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