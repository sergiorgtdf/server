import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { settingSecretToken } from "../config.js";
import Role from "../models/role.js";

//metodos de SIGNUP(para registrarse con sus datos) Y SIGNIN (para loguearse)

export const singup = async (req, res) => {
    const { username, email, password, roles } = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
    });
    //logica para los roles
    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map((roles) => roles._id);
    } else {
        const role = await Role.findOne({
            name: "user",
        });
        newUser.roles = [role._id];
    }

    try {
        const userValidated = await newUser.save();
        //ver los token

        const token = jwt.sign(
            { id: userValidated._id },
            settingSecretToken().secret,
            {
                expiresIn: "1h",
            }
        );

        res.status(200).json({
            Message: "Usuario ingreso con éxito",
            token,
        });
    } catch (error) {
        res.status(400).json({
            Message: `Error al crear el usuario, ${error}`,
        });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // console.log(
        //     `Datos enviado por body. Password: ${password} / email: ${email}`
        // );

        // Verifica el mail

        const userLoggedin = await User.findOne({ email });

        if (!userLoggedin)
            return res
                .status(400)
                .json({ message: `El correo no se encuentra registrado` });

        // compara el password del body con la base de datos
        const verifiedPassword = await User.comparePasword(
            password,
            userLoggedin.password
        );

        if (!verifiedPassword) {
            return res
                .status(400)
                .json({ message: `Password incorrecto`, token: null });
        }
        // Generamos el token
        //ver los token

        const token = jwt.sign(
            { id: userLoggedin._id },
            settingSecretToken().secret,
            {
                expiresIn: "1h",
            }
        );

        res.status(200).json({
            Message: "Usuario ingreso con éxito",
            token,
        });
    } catch (error) {
        return res.status(400).json({ message: `Error de inicio de sesion` });
    }
};
