import axios from 'axios'
import { authService } from "./auth.service";

const apiurl = process.env.REACT_APP_URL_API + '/api/categories'
//const apiurl = 'https://pfe-market-vinci-backend.herokuapp.com/api/categories'

const getAll = () => {
    return axios.get(apiurl)
}

const getById = (id) => {
    return axios.get(`${apiurl}/${id}`)
}

const create = newObject => {
    let currentUser = authService.getCurrentUser();
    let config = {
        headers: {
            Authorization: currentUser["token"]
        }
    }
    return axios.post(apiurl, newObject, config)
}

const deleteCategory = (id) => {
    let currentUser = authService.getCurrentUser();
    let config = {
        headers: {
            Authorization: currentUser["token"]
        }
    }
    return axios.delete(`${apiurl}/${id}`, config)
}

export const categoryService = {
    getAll,
    create,
    getById,
    deleteCategory
}
