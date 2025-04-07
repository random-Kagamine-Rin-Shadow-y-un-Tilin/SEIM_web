import express from "express";
import logger from 'morgan'
import { Server } from "socket.io";
import { createServer } from "node:http";
import { createClient } from "@libsql/client";
import dotenv from 'dotenv'
import cors from "cors";
import multer from "multer";
import path from 'path'; 
import jwt from "jsonwebtoken";

import { registerUser, loginUser } from "./resgiter.js";
import { resolve } from "node:path";

dotenv.config();


const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());
app.use(express.static("client"));
app.use("/uploads", express.static("uploads"));

const db = createClient({
    url: "file:./bd/comentarios.sqlite" 
});

// await db.execute('DROP TABLE comentarios');

// await db.execute('DROP TABLE usuarios')

// await db.execute(`CREATE TABLE comentarios (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     usuario_id INTEGER NOT NULL,
//     contenido TEXT NOT NULL,
//     FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
// );`)

// await db.execute(`CREATE TABLE usuarios (
//     id INTEGER PRIMARY KEY,
//     user_name VARCHAR(255) NOT NULL,
//     password TEXT NOT NULL,
//     imagen TEXT
// );`);

io.on('connection', async (socket)=>{
    console.log('usuario conectado')

    socket.on('chat message', async (msg)=>{
        let result;
        const user = socket.handshake.auth.user;
        const user_id = user.id;
        try {
            result = await db.execute({
                sql: 'INSERT INTO comentarios (contenido, usuario_id) values (:msg, :user_id)',
                args: {msg, user_id}
            })
        } catch(e){
            console.error(e);
            return
        }
        io.emit('chat message', msg, result.lastInsertRowid.toString, user.user_name, user.image);
    });

    if(!socket.recovered){
        try{
            const results = await db.execute({
                sql: `SELECT 
                        comentarios.id,
                        comentarios.contenido,
                        usuarios.user_name,
                        usuarios.imagen
                    FROM comentarios
                    INNER JOIN usuarios ON comentarios.usuario_id = usuarios.id
                    WHERE comentarios.id > ?;`,
                args: [socket.handshake.auth.serverOffset ?? 0]

            });

            results.rows.forEach((row) =>{
                socket.emit('chat message', row.contenido, row.id.toString(), row.user_name, row.imagen);
            });
            
        }
         catch(e){
            console.error(e)
            return
        }
    }
})

//Subir imagenes al servidor

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = "uploads/";
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Renombra el archivo con la fecha actual
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Formato de archivo no permitido"), false);
        }
    }
});

app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const imagePath = `/uploads/${req.file.filename}`;

        await db.execute({
            sql: "UPDATE usuarios SET imagen = ? WHERE id = ?",
            args: [imagePath, req.body.id]  // Aquí puedes agregar el ID del usuario si lo pasas en la solicitud
        });

        const newUserSEIM = {
            id: req.body.id,
            image: imagePath,
            user_name : req.body.userName
        }

        res.json({ message: "Imagen subida con éxito", newUser: newUserSEIM });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al subir la imagen" });
    }
});

///////////////////////////////////////////////


app.use(logger('dev'));

app.get('/', (req, res)=>{
    res.sendFile(process.cwd() + '/client/templates/index.html')
});

app.get('/login', (req, res)=>{
    res.sendFile(process.cwd() + '/client/templates/register.html')
});

app.get('/user', (req, res)=>{
    res.sendFile(process.cwd()+ '/client/templates/user.html');
})

app.get('/about', (req, res)=>{
    res.sendFile(process.cwd()+ '/client/templates/about_us.html');
})

app.get('/contact', (req, res)=>{
    res.sendFile(process.cwd()+ '/client/templates/contact.html');
})



server.listen(port,()=>{
    console.log(`servidor corriendo en puerto: ${port}`)
});

//register/login user

app.post('/register', registerUser);

app.post('/loginUser', loginUser);

app.post('/getUser',async (req, res) => {
    const {id} = req.body;

    const result = await db.execute({
        sql: 'SELECT * FROM usuarios WHERE id = ?',
        args: [id]
    })

    const user = result.rows[0];

    const sendUser= {
        user_name : user.user_name,
        image : user.imagen
    }

    return res.json({sendUser})

})