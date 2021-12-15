import { userService } from 'services/users.service'
import jwt from 'jsonwebtoken'

async function login(email, password) {

    const bcrypt = require('bcryptjs');
    let user;
    await userService.getByEmail(email).then(response => {
        user = response.data.user;
        console.log(user)
    })
    console.log(user)
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id_user: user.id_user, role: user.role }, "sdkfh5464sdfjlskdjfntmdjfhskjfdhs", { algorithm: 'HS256' });
        let userDto = {
            id_user: user.id_user,
            last_name: user.last_name,
            first_name: user.first_name,
            token: token,
            email: user.email,
            campus: user.campus,
        }
        user = userDto;
        localStorage.setItem("currentUser", JSON.stringify(user));
        return user;
    }
    return null;
}


const logout = () => {
    console.log("logout !")
    localStorage.removeItem('currentUser');
}

const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    return user;
}

const getRoleCurrentUser = () => {
    if (getCurrentUser()) {
        let decodedToken = jwt.verify(getCurrentUser().token, "sdkfh5464sdfjlskdjfntmdjfhskjfdhs");
        return decodedToken.role;
    }
}

async function register(user) {
    await userService
        .create(user)
        .then(response => {
            console.log(response)
            return true;
        })
    return false;
}

export const authService = {
    login,
    logout,
    getCurrentUser,
    getRoleCurrentUser,
    register,
};

