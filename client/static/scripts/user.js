const localUser = localStorage.getItem('user_SEIM');

const containerUserInfo = document.getElementById('user_info');

document.addEventListener('DOMContentLoaded', async ()=>{
    if (!localUser){
        window.location.href = "/";
    } else{

        const user = JSON.parse(localUser);

        const id = user.id;

        const response = await fetch('getUser',{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({id}),
        })

        const data = await response.json();

        const currentUser = data.sendUser;

        let userInfo = `
        <img src= "${currentUser.image}">

        <h1>${currentUser.user_name}</h1>
        `;

        containerUserInfo.innerHTML = userInfo;

    }
});

document.getElementById("upload-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const user = JSON.parse(localUser);
    
    const fileInput = document.getElementById("image");
    if (fileInput.files.length === 0) {
        alert("Selecciona una imagen");
        return;
    }

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append('id', user.id)
    formData.append('userName', user.user_name)

    try {
        const response = await fetch("/upload", {
            method: "POST",
            body: formData // Solo el formData, sin encabezados de autorización
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        localStorage.setItem("user_SEIM", JSON.stringify(data.newUser));

        alert("Imagen subida con éxito");

        window.location.href = "/user";

    } catch (error) {
        console.error(error);
        alert("Error al subir la imagen");
    }
});
