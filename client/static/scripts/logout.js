const logOutButton = document.getElementById('log_out')

logOutButton.addEventListener('click', ()=>{
    localStorage.clear("token_SEIM");
    localStorage.clear("user_SEIM");
    window.location.href = "/";
})