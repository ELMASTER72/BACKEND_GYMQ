const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user,name,phone,email,pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // comprueba si hay nombres de usuario duplicados en la base de datos
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        // cifrar la contraseña
        const hashedPwd = await bcrypt.hash(pwd, 10);

        // Crear y almacenar el nuevo usuario
        const result = await User.create({
            "username": user,
            "name": name, 
            "phone": phone,
            "email": email,
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };