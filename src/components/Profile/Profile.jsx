import { useEffect, useState } from "react";
import {Badge, Button, Card} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {userService} from "../../services/users.service";
import "styles/style.css"
import {Loader} from "components/Loading/Loading";
import UpdatePwd from "components/Profile/UpdatePwd";
import {authService} from "services/auth.service"


const Profile =  () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const email = useParams().email;
    const [statusColor, setStatusColor] = useState('');
    const [statusModif, setStatusModif] = useState(false);
    const [modifPwd, setModifPwd] = useState(false);
    const [updatedUser, setUpdatedUser] = useState()
    const [modifAuthorized, setModifAuthorized] = useState(false);

    const modifierStatusModif = (e) => {
        e.preventDefault();
        setStatusModif(!statusModif);
    }
    const toggleModifPwd = (e) => {
        e.preventDefault();
        setModifPwd(!modifPwd);
    }

    function submitUpdate(e) {
        e.preventDefault();
        //todo  !! mettre un token dans le header !!
        userService.update(updatedUser.id_user,updatedUser).then(async ()=>{
            await fetchData();
            setStatusModif(false);
        })
        console.log("to submit: ", updatedUser)
    }
    const handleUserChange = (event) => {
        switch (event.target.name) {
            case "last_name":
                setUpdatedUser({...updatedUser, last_name: event.target.value});
                break;
            case "first_name":
                setUpdatedUser({...updatedUser, first_name: event.target.value});
                break;
            case "email":
                setUpdatedUser({...updatedUser, email: event.target.value});
                break;
            case "password1":
                setUpdatedUser({...updatedUser, password1: event.target.value});
                break;
            case "password2":
                setUpdatedUser({...updatedUser, password2: event.target.value});
                break;
            case "campus":
                setUpdatedUser({...updatedUser, campus: event.target.value});
                break;
            default:
                console.log("error input")
                break
        }
        
    }

    const fetchData = async ()=>{
        console.log("email ",email)
        const data = await userService.getByEmail(email);
        setData(data);
        if(data.data.user.role === "admin"){
            setStatusColor("danger");
        }else if(data.data.user.role === "mute"){
            setStatusColor("warning");
        }else if(data.data.user.role === "banned"){
            setStatusColor("danger");
        } else {
            setStatusColor("primary");
        }
        console.log(statusColor);
        setLoading(false);
        setUpdatedUser(data.data.user)
        if(authService.getRoleCurrentUser()==="admin" || data.data.user.email===authService.getCurrentUser().email )setModifAuthorized(true);
    }
    useEffect(()=>{
        
        fetchData();
    },[email]);


    if(isLoading)
        return (
            <div>
                <Loader.BigLoader />
            </div>
        )
    if(modifPwd)return (<UpdatePwd/>)
    if (data){
        return (<>
            <form>
                <Card border="primary" className={"customForm"}>
                    <Card.Header className="center">Mes informations</Card.Header>
                    <Card.Body>
                        <ul>
                            <li>Nom: {!statusModif && data.data.user.last_name} {statusModif && <input name="last_name" onChange={handleUserChange} type="text"  defaultValue={data.data.user.last_name}/>} </li>
                            <li>Prénom: {!statusModif && data.data.user.first_name} {statusModif && <input  name="first_name" onChange={handleUserChange} type="text"  defaultValue={data.data.user.first_name}/>} </li>
                            <li>Mail: {!statusModif && data.data.user.email} {statusModif && <input name="email" onChange={handleUserChange} type="text"  defaultValue={data.data.user.email}/>} </li>
                            <li>Campus: {!statusModif && data.data.user.campus} {statusModif && <select name="campus" onChange={handleUserChange} defaultValue={data.data.user.campus}>   <option>Woluwe</option>
                            <option>Ixelles</option>
                            <option>Louvain la neuve</option></select> }</li> 
                            {statusModif && <li>Mot de passe: <input name="password" onChange={handleUserChange} type="text" /></li>}
                        </ul>
                        {modifAuthorized && <><button onClick={(e)=>modifierStatusModif(e)}>{!statusModif && "Modifier profil"}{statusModif && "Annuler"}</button> <button onClick={(e)=>toggleModifPwd(e)}>modif Pwd</button></>}
                        {statusModif && <button onClick={(e)=>submitUpdate(e)}>Confirmer</button>}
                    </Card.Body>
                    <Card.Footer>
                        Statut du compte :  
                            <Badge pill bg={statusColor}> 
                                {data.data.user.role}
                            </Badge> 
                    </Card.Footer>
                </Card>
            </form>
        </>)}
        else 
            return (
            <>
                <p>Veuillez vous connecter</p>
                <Button href="/login" variant="outline-primary" type="submit">
                    Se connecter
                </Button>
            </>
            )
}

   
   


export default Profile;
