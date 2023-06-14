const User = require('../model/User');

const handleLogout = async (req, res) => {
    // el cliente, también elimina el token de acceso

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //sin contenido
    const refreshToken = cookies.jwt;

    // valida el refreshToken en db
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Elimina refreshToken en db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = { handleLogout }