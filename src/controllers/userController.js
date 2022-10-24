const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userService.getAllUsers();
        if (allUsers.length === 0) {
            return res.status(404).send({ message: "No existen usuarios" });
        }
        res.send({ status: "OK", data: allUsers });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED",
                message: "Error al realizar la petición:",
                data: { error: error?.message || error } });
    }
};

const getOneUser = async (req, res) => {
    const {params: { userId }} = req;

    if (!userId) {
        return res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':userId' can not be empty" }
            });
    }

    try {
        const user = await userService.getOneUser(userId);
        if (!user) {
            return res
            .status(404)
            .send({ status: "FAILED",
                    data: { error: `Can't find user with the id '${userId}'` } });
        }

        res.send({ status: "OK", data: user });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED",
                message: "Error al realizar la petición:",
                data: { error: error?.message || error } });
    }
}

// Function to insert user by token
const loginUser = async (req, res) => {
    const { body } = req;

    if (
        !body.token ||
        !body.claims.name ||
        !body.claims.email
    ) {
        return res
        .status(400)
        .send({
            status: "FAILED",
            data: {
                error: "One of the following keys is missing or is empty in request body: 'idToken', 'name', 'email'"
            }
        });
    }

    const newUser = {
        token: body.token,
        name: body.claims.name,
        email: body.claims.email,
        joshua: body.claims.email === process.env.ROL_JOSHUA ? true : false,
        active: true
    };

    try {
        const createdUser = await userService.loginUser(newUser);
        res.status(201).send({ status: "OK", data: createdUser });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED",
                message: "Error al realizar la petición:",
                data: { error: error?.message || error } })
    }
}

const updateOneUser = async (req, res) => {
    const {
        body,
        params: { userId }
    } = req;

    if (!userId) {
        return res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: "Parameter ':userId' can not be empty"
                }
            });
    }

    try {
        const updatedUser = await userService.updateOneUser(userId, body);

        if (!updatedUser) {
            return res
            .status(404)
            .send({
                status: "FAILED",
                data: {
                    error: `Can't find user with the id '${userId}'`
                }
            });
        }

        res.send({ status: "OK", data: updatedUser });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED",
                message: "Error al realizar la petición:",
                data: { error: error?.message || error } })
    }
}

const deleteOneUser = async (req, res) => {
    const { params: { userId } } = req;

    if (!userId) {
        return res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: "Parameter ':userId' can not be empty"
                }
            });
    }

    try {
        const deletedUser = await userService.deleteOneUser(userId);

        if (!deletedUser) {
            return res
            .status(404)
            .send({
                status: "FAILED",
                data: {
                    error: `Can't find user with the id '${userId}'`
                }
            });
        }

        res.status(200).send({ status: "OK", data: deletedUser });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED",
                message: "Error al realizar la petición:",
                data: { error: error?.message || error } })
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    loginUser,
    updateOneUser,
    deleteOneUser
}