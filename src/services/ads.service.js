import axios from "axios";
import { authService } from "./auth.service";

const apiurl = process.env.REACT_APP_URL_API + '/api/annonces'
//const apiurl = 'https://pfe-market-vinci-backend.herokuapp.com/api/annonces'



/*create a ad*/

const createNewAd = (newAd) => {
    let currentUser = authService.getCurrentUser();
    let config = {
        headers: {
            Authorization: currentUser["token"]
        }
    }
    return axios
        .post(apiurl, newAd, config)
        .then(response => response.data);
}

/*update a ad*/
const update = (id, updatedAd) => {
    let currentUser = authService.getCurrentUser();
    let config = {
        headers: {
            Authorization: currentUser["token"]
        }
    }
    return axios
        .put(`${apiurl}/${id}`, updatedAd, config)
}

/*delete a ad*/
const remove = (id) => {
    let currentUser = authService.getCurrentUser();
    let config = {
        headers: {
            Authorization: currentUser["token"]
        }
    }
    return axios
        .delete(`${apiurl}/${id}`, config)
        .then(response => response.data);
}
/*get a ad by id*/
const get = (id) => {
    let currentUser = authService.getCurrentUser();
    let config = {
        headers: {
            Authorization: currentUser["token"]
        }
    }
    try {
        return axios
            .get(`${apiurl}/${id}`, config)
            .then(response => response.data.ad);
    } catch (error) {
        console.log("Ad inexistant pour l'id", id)
    }

}

/*get all ad*/
const getAll = () => {
    let currentUser = authService.getCurrentUser();
    let config = {
        headers: {
            Authorization: currentUser["token"]
        }
    }
    return axios
        .get(apiurl + "/all", config)
        .then(response => response.data);
}

export const adService = {
    createNewAd,
    remove,
    update,
    get,
    getAll
}