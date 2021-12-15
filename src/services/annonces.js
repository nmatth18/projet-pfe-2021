import axios from 'axios'
const apiurl = process.env.REACT_APP_URL_API + '/api/annonces'
//const apiurl = 'https://pfe-market-vinci-backend.herokuapp.com/api/annonces'

// GET

// Renvoie les ads avec les filtres correspondants. Toute les combinaisons des filtres sont possible.
// Si vous mettez 0 filtres vous avez tout les ads existant
// /api/annonces?categorie=?&tri=?&prixMin=?&prixMax=?
const getAds = (suffix) => {
    return axios
        .get(`${apiurl}${suffix}`)
        .then(response => response.data)
}

// Renvoie toutes les annonces sans filtre /!\ EXCLUSIF ADMIN
// /api/annonces/all
const getAllAds = () => {
    return axios
        .get(`${apiurl}/all`)
        .then(response => response.data)
}

// Renvoie l'ad correspondant a l'id
// /api/annonces/<int:ad_id> 
const getAdById = (id) => {
    return axios
        .get(`${apiurl}/${id}`)
        .then(response => response.data)
}

// POST

// Crée une ad elle doit être dans le body de la requête
// /api/annonces
const postAd = newObject => {
    return axios.post(apiurl, newObject)
}

// DELETE

// Supprime l'ad correspondant au ad_id
// /api/annonces/<int:ad_id>
const deleteAd = (id) => {
    return axios.delete(`${apiurl}/${id}`)
}

// UPDATE

// Modifie l'ad avec les données qui sont dans le body ❗❗
// Tous les champs doivent se trouver dans le body même s'il ne change pas❗❗
// /api/annonces/<int:ad_id>
const updateAd = (id, newObject) => {
    return axios.put(`${apiurl}/${id}`, newObject)
}

//TODO delete ?

export const AnnoncesAPI = {
    getAds: getAds,
    getAllAds: getAllAds,
    getAdById: getAdById,
    postAd: postAd,
    deleteAd: deleteAd,
    updateAd: updateAd
}