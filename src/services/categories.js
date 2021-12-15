import axios from 'axios'
const apiurl = process.env.REACT_APP_URL_API + '/api/categories'
//const apiurl = 'https://pfe-market-vinci-backend.herokuapp.com/api/categories'

// GET

// Renvoie les ads avec les filtres correspondants. Toute les combinaisons des filtres sont possible.
// Si vous mettez 0 filtres vous avez tout les ads existant
// /api/annonces?categorie=?&tri=?&prixMin=?&prixMax=?
const getCategories = () => {
    return axios
        .get(`${apiurl}`)
        .then(response => response.data)
}
export const CategoriesAPI = {
    getCategories: getCategories,
}