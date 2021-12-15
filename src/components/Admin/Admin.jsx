import {useEffect, useState} from "react";
import {userService} from 'services/users.service'
import {adService} from 'services/ads.service'
import "styles/style.css"
import {Loader} from "components/Loading/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUsers, faComments, faListUl } from '@fortawesome/free-solid-svg-icons'
import { authService } from "services/auth.service";
import { categoryService } from "services/categories.service";
import {useHistory} from "react-router-dom";

const Admin = () => {

    library.add(faUsers, faComments, faListUl)

    const history = useHistory();

    let currentUser = authService.getCurrentUser();
    let roleCurrentUser = '';
    if (currentUser) {
        roleCurrentUser = authService.getRoleCurrentUser()
    }
    if(roleCurrentUser!=="admin"){
        history.push("/");
    }

    const [isLoading, setLoading] = useState(true);
    const [countUsers, setCountUsers] = useState(0);
    const [countAds, setCountAds] = useState(0);
    const [countCategories, setCountCategories] = useState(0); 

    useEffect(() => {
        setLoading(true);
        getCount();
    }, []); 

    const getCount = async () => {
        let responseUser = await userService.getAll();
        const countUsers = responseUser.data.users.length; 
        setCountUsers(countUsers);
        let responseAd = await adService.getAll();
        const countAds = responseAd.ads.length
        setCountAds(countAds);
        let responseCategory = await categoryService.getAll();
        const countCategories = responseCategory.data.categories.length; 
        setCountCategories(countCategories); 
        setLoading(false);
    }

    const navigateToUsers = () =>{
        history.push("/admin/utilisateurs");
    }

    const navigateToAds = () => {
        history.push("/admin/annonces"); 
    }

    const navigateToCategories = () => {
        history.push("/admin/categories"); 
    }

    if(isLoading){
        return (
            <>
                <h1 className="center">Zone administrateur</h1>
                <div className="main-part">
                    <div className="cpanel" >
                        <div className="icon-part">
                            <FontAwesomeIcon icon="users" /><br/>
                            <small>Utilisateurs</small>
                            <Loader.SmallLoader />
                        </div>
                    </div>
                    <div className="cpanel-blue cpanel">
                        <div className="icon-part">
                            <FontAwesomeIcon icon="comments" /><br/>
                            <small>Annonces</small>
                            <Loader.SmallLoader />
                        </div>
                    </div>
                    <div className="cpanel-green cpanel">
                        <div className="icon-part">
                            <FontAwesomeIcon icon="list-ul"/><br/>
                            <small>Catégories</small>
                            <Loader.SmallLoader />
                        </div>
                    </div>
                </div>
            </>
        )
    }else{
        return (
            <>
                <h1 className="center">Zone administrateur</h1>
                <div className="main-part">
                    <div className="cpanel" onClick={e => navigateToUsers()}>
                        <div className="icon-part">
                            <FontAwesomeIcon icon="users" /><br/>
                            <small>Utilisateurs</small>
                            <p>{countUsers}</p>
                        </div>
                    </div>
                    <div className="cpanel-blue cpanel" onClick={e => navigateToAds()}>
                        <div className="icon-part">
                            <FontAwesomeIcon icon="comments" /><br/>
                            <small>Annonces</small>
                            <p>{countAds}</p>
                        </div>
                    </div>
                    <div className="cpanel-green cpanel" onClick={e => navigateToCategories()}>
                        <div className="icon-part">
                            <FontAwesomeIcon icon="list-ul"/><br/>
                            <small>Catégories</small>
                            <p>{countCategories}</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Admin;