import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createClient } from "@libsql/client";

const db = createClient({
    url: "file:./bd/comentarios.sqlite",
});

const defaultImage = "uploads/default.jpg";

export async function registerUser(req, res) {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ message: "Error: por favor llene todos los campos" });
    }

    if (userName.length >= 16){
        return res.status(400).json({ message: "Error: el usuario debe tener menos de 15 caracteres" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const checkExist = await db.execute({
            sql: "SELECT * FROM usuarios WHERE user_name = ?;",
            args: [userName],
        });

        if (checkExist.rows.length > 0) { // Verifica si hay resultados
            return res.status(500).json({ message: "El usuario ya existe, por favor elija otro nombre" });
        }

        await db.execute({
            sql: "INSERT INTO usuarios (user_name, password, imagen) VALUES (?, ?, ?)",
            args: [userName, hashedPassword, defaultImage],
        });

        const result = await db.execute({
            sql: "SELECT * FROM usuarios WHERE user_name = ?",
            args: [userName],
        });

        const user = result.rows[0];

        const currentUser = {
            id: user.id,
            user_name: user.user_name,
            image : user.imagen
        };

        const token = jwt.sign({ id: user.id_user, username: user.user_name }, "secreto", { expiresIn: "1h" });

        res.json({ message: "Registro Exitoso", token, currentUser });

        
    } catch (e) {
        res.status(500).json({ message: `Error al registrar usuario: ${e}` });
    }
}

export async function loginUser(req,res) {

    const { userName, password } = req.body;

   

    if (!userName || !password) {
        return res.status(400).json({ message: "Error: por favor llene todos los campos" });
    }

    try {
        const result = await db.execute({
            sql: "SELECT * FROM usuarios WHERE user_name = ?",
            args: [userName]
        });

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Error: el usuario no existe" });
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const currentUser = {
            id: user.id,
            user_name: user.user_name,
            image : user.imagen
        };

        const token = jwt.sign({ id: user.id, username: user.username }, "secreto", { expiresIn: "1h" });

        res.json({ message: "Inicio de sesión exitoso", token, currentUser });
    } catch (err) {
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
    
}