const express = require('express');
const connectDB = require('./models/User');
const User = require('./models/User'); // Importamos el modelo de usuario

// Conectar a la base de datos
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para que Express pueda leer JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Servidor de la tienda en línea en funcionamiento!');
});

// Ruta para registrar un nuevo usuario
app.post('/api/users/register', async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'El correo ya está registrado.' });
        }
        // Crear un nuevo usuario
        const newUser = new User({
            nombre,
            email,
            password,
        });

        // Guardar el usuario en la base de datos
        await newUser.save();
        res.status(201).json({ msg: 'Usuario registrado exitosamente', user: newUser });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
});
// Ruta para obtener los datos de un usuario
app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
});
// Ruta para actualizar los datos de un usuario
app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Actualizar los campos del usuario
        user.nombre = nombre || user.nombre;
        user.email = email || user.email;
        user.password = password || user.password;

        await user.save();
        res.json({ msg: 'Usuario actualizado exitosamente', user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
});
// Ruta para eliminar un usuario
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});