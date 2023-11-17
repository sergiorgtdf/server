export const userControllers = {};

// Define los controladores
userController.getAllUsers = (req, res) => {
    res.send("Se busca todos los usuarios");
};

userController.getUserById = (req, res) => {
    res.send("Se busca un usuario");
};

userController.createUser = (req, res) => {
    // res.send("Se ha creado un usuario");
    res.json({ message: "Se ha creado el usuario" });

    // TODO: rescatar el el codigo de error para personalizar el mensaje de error en los duplicados
};
