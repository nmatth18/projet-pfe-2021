import React from "react"; 
import { Button, Form, Table } from 'react-bootstrap';
import {userService} from 'services/users.service'
import {useHistory} from "react-router-dom";
import "styles/style.css"
import {Loader} from "components/Loading/Loading";

export default function Display(props) {

const DisplayUsers = (props) => {

    const {users} = props;
    const history = useHistory(); 

    const navigateToUserProfile = (email) =>{
        history.push("/profile/"+email);
    }

    const changeSelectValue = (user, selectValue) => {
        let newUser = {
           id_user: user.id_user,
           email: user.email,
           last_name: user.last_name, 
           first_name: user.first_name, 
           password: user.password,
           campus: user.campus,
           role: selectValue
        }
        userService.update(user.id_user, newUser)
    }

    const deleteUser = (id) => {
        userService.deleteUser(id).then(
            (response)=>{
                props.setRefreshKey(props.refreshKey+1)
            }
        )
    }

    console.log(users);

    if(props.isLoading){
        return(
            <tr>
                <td colSpan={6}>
                    <Loader.BigLoader />
                </td>
            </tr>    
            )
    }else if(users.length > 0) {
        return (
            users.map((user) => {
                return(
                    <tr className="tuple" key={user.id_user} >
                            <td onClick={e => navigateToUserProfile(user.email)}>
                                {user.last_name}
                            </td>
                            <td onClick={e => navigateToUserProfile(user.email)}>
                                {user.first_name}
                            </td>
                            <td onClick={e => navigateToUserProfile(user.email)}>
                                {user.email}
                            </td>
                            <td onClick={e => navigateToUserProfile(user.email)}>
                                {user.campus}
                            </td>
                            <td>
                                <Form.Select defaultValue={user.role}
                                    onChange={e => changeSelectValue(user ,e.target.value)}
                                >
                                    <option value="utilisateur">utilisateur</option>
                                    <option value="admin">admin</option>
                                    <option value="limite">limité</option>
                                    <option value="banni">banni</option>
                                </Form.Select> 
                            </td>
                            <td className='tdDelete'>
                                <Button variant="outline-danger" onClick={e => deleteUser(user.id_user)}>Supprimer</Button>
                            </td>
                    </tr>
                )
            })
        )
    }else{
        return(
        <tr>
            <td className="center" colSpan={6}>
                <p> Aucun résultat trouvé</p>
            </td>
        </tr>    
        )
    }

}

return (
    <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>nom</th>
                    <th>prenom</th>
                    <th>email</th>
                    <th>campus</th>
                    <th>role</th>
                    <th>supprimer un compte</th>
                </tr>
            </thead>
            <tbody>
                    {DisplayUsers(props)}
            </tbody>
        </Table>
    </>
)

}