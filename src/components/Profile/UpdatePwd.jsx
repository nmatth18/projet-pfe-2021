import { useState } from "react";
import {Card} from "react-bootstrap";
import {userService} from "../../services/users.service";
import "styles/style.css"
import {authService} from "services/auth.service"
import { toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const UpdatePwd = () => {

    const [updatedUser, setUpdatedUser] = useState()
    const [modifPwd, setModifPwd] = useState(false);

    const bcrypt = require('bcryptjs');

    async function checkPassword (e) {
        e.preventDefault();
        
        let currentUser = authService.getCurrentUser();
        let userPassword;
        let userUpdated;
        await userService.getById(currentUser.id_user).then((response) => {
            userPassword = response.user.password;
            userUpdated = response.user;
        })

        if(!bcrypt.compareSync(updatedUser.password, userPassword)){
            toast.error('Erreur: mot de passe actuel incorrect', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });

        }else if(updatedUser.new_password1!==updatedUser.new_password2){     
            toast.error('Erreur: nouveau mots de passes différents', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });

        }else {
            toast.success('Succès: Mot de passe mis à jour', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });
            let salt = bcrypt.genSaltSync(10);
            let newPassword = {
                first_name: userUpdated.first_name,
                last_name: userUpdated.last_name, 
                role: userUpdated.role,
                campus: userUpdated.campus,
                email: userUpdated.email,
                password: bcrypt.hashSync(updatedUser.new_password1, salt),
            }
            userService.update(userUpdated.id_user, newPassword);
        } 
    }


    const toggleModifPwd = (e) => {
        e.preventDefault();
        setModifPwd(!modifPwd);
    }
    const handleUserChange = (event) => {
        switch (event.target.name) {
            case "password":
                setUpdatedUser({...updatedUser, password: event.target.value});
                break;
            case "new_password1":
                setUpdatedUser({...updatedUser, new_password1: event.target.value});
                break;
            case "new_password2":
                setUpdatedUser({...updatedUser, new_password2: event.target.value});
                break;
            default:
                console.log("error input")
                break
        }

    }

    return(<form>
        <Card border="primary" className={"customForm"}>
            <Card.Header className="center">Mes informations</Card.Header>
            <Card.Body>
                <ul>
                    <li>Mot de passe actuel: <br/><input name="password" onChange={handleUserChange} type="text"  /> </li>
                    <li>Nouveau mot de passe: <br/><input  name="new_password1" onChange={handleUserChange} type="text"  /> </li>
                    <li>Confirmer nouveau mot de passe: <br/><input name="new_password2" onChange={handleUserChange} type="text"  /> </li>
                </ul>
                <button onClick={(e)=>toggleModifPwd(e)}>Annuler</button>
                <button onClick={(e)=>checkPassword(e)}>Confirmer</button>
            </Card.Body>
        </Card>

        <ToastContainer/>
    </form>)
}

export default UpdatePwd;

