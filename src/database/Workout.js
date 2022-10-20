const User = require('../models/workoutModel');

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }
}

const getOneUser = async userId => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw error;
    }
}

const createNewUser = async newUser => {
    try {
        let userToInsert = new User(newUser);
        const createdUser = await userToInsert.save();
        return createdUser;
    } catch (error) {
        throw error;
    }
}


const loginUser = async newUser => {
    try {
        const user = User.findOne({idToken: newUser.idToken});
        if (!user) {
            let userToInsert = new User(newUser);
            const createdUser = await userToInsert.save();
            return createdUser;
        }
        let updatedUser = await User.findOneAndUpdate(
            {idToken: newUser.idToken},
            {active: newUser.active},
            {new: true}
        )
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

const updateOneUser = async (userId, changes) => {
    try {
        let updatedUser = await User.findByIdAndUpdate(userId, {$set:changes}, {new:true});
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

const deleteOneUser = async userId => {
    try {
        let deletedUser = await User.findByIdAndRemove(userId);
        return deletedUser;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    loginUser,
    updateOneUser,
    deleteOneUser
}