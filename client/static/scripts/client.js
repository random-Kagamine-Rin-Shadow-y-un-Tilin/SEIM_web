import { io } from 'https://cdn.socket.io/4.8.1/socket.io.esm.min.js'

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

function getUser(){
    let user = localStorage.getItem('user_SEIM');
    if(user){
        user = JSON.parse(user);
        console.log(user);
        return user;
    }else{
        user = null;
      
        return user;
    }
}

const socket = io({
    auth:{
        user : getUser(),
        serverOffset: 0
    }
}
);

socket.on('chat message', (msg, serverOffset, userNme, userImage)=>{
    const item = `<li>
                    <section><img src="${userImage}"> ${userNme}</section>
                    <p>${msg}</p>
                </li>`;
    messages.insertAdjacentHTML('beforeend', item);
    socket.auth.serverOffset = serverOffset;
})

form.addEventListener('submit', (e)=>{

    e.preventDefault();

    if(input.value){
        socket.emit('chat message', input.value);
        input.value = '';
    }

});



