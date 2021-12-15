import axios from 'axios'
import { authService } from "./auth.service";
const apiurl = process.env.REACT_APP_URL_API + '/api/utilisateurs'
//const apiurl = 'https://pfe-market-vinci-backend.herokuapp.com/api/utilisateurs'

const getAll = () => {
    let currentUser = authService.getCurrentUser();
    let config = {
        headers: {
            Authorization: currentUser["token"]
        }
    }
    return axios.get(apiurl, config)
}

const getByEmail = (email) => {
    return axios.get(`${apiurl}/${email}`)
}
const getById = (id) => {
    let currentUser = authService.getCurrentUser();
    let config = {
        headers: {
            Authorization: currentUser["token"]
        }
    }
    return axios.get(`${apiurl}/${id}`, config)
        .then(response => response.data);
}

const create = newObject => {
    return axios.post(apiurl, newObject)
}

const update = (id, newObject) => {
    let currentUser = authService.getCurrentUser();
    let config = {
        headers: {
            Authorization: currentUser["token"]
        }
    }
    return axios.put(`${apiurl}/${id}`, newObject, config)
}

const deleteUser = (id) => {
    let currentUser = authService.getCurrentUser();
    let config = {
        headers: {
            Authorization: currentUser["token"]
        }
    }
    return axios.delete(`${apiurl}/${id}`, config)
}

export const userService = {
    getAll,
    create,
    update,
    getByEmail,
    getById,
    deleteUser
}
