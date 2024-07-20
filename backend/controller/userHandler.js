import { User } from '../models/user.js';

async function addUser(userModel) {
    let user = new User({
        ...userModel
    });
    await user.save();
    return user.toObject();
}

async function getUsers() {
    const users = await User.find();
    return users.map(u => u.toObject());
}

async function getUser(id) {
    const user = await User.findById(id);
    return user.toObject();
}

async function updateUser(id, userModel) {
    const filter = { _id: id };
    await User.findByIdAndUpdate(filter, userModel);
}


export { addUser, getUsers, getUser, updateUser };