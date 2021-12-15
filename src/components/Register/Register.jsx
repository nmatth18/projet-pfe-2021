import {useState} from "react";
import {Col, Row, Button, Form} from "react-bootstrap";
import "styles/style.css"
import { useHistory } from 'react-router-dom';
import {authService} from "services/auth.service";



const Register = () => {
    const bcrypt = require('bcryptjs');
    const history = useHistory();
    const emptyUser = {
        last_name: "Nom",
        first_name: "Prenom",
        email: "Adresse mail",
        password1: "Mot de passe",
        password2: "Mot de passe",
        campus: "Woluwe"
    }
    const [newUser, setNewUser] = useState(emptyUser)


    const register = (event) => {
        event.preventDefault();
        console.log(newUser)
        if (newUser.password1!==newUser.password2) {alert("mots de passe differents");return ;}
        let salt = bcrypt.genSaltSync(10);
        const userObject =
            {
            last_name: newUser.name,
            first_name: newUser.firstName,
            email: newUser.email,
            password: bcrypt.hashSync(newUser.password1, salt),
            campus: newUser.campus,
        }
        if(authService.register(userObject)){
            setNewUser(emptyUser);
           history.push("/")
        }
    }
    const handleUserChange = (event) => {
        switch (event.target.name) {
            case "name":
                setNewUser({...newUser, name: event.target.value});
                break;
            case "firstName":
                setNewUser({...newUser, firstName: event.target.value});
                break;
            case "email":
                setNewUser({...newUser, email: event.target.value});
                break;
            case "password1":
                setNewUser({...newUser, password1: event.target.value});
                break;
            case "password2":
                setNewUser({...newUser, password2: event.target.value});
                break;
            case "campus":
                setNewUser({...newUser, campus: event.target.value});
                break;
            default:
                console.log("error input")
                break
        }
    }

    return (
        <div className="customForm">
            <h1 className="center">Inscription</h1>
            <Form onSubmit={register}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Nom :</Form.Label>
                        <Form.Control type="text" placeholder="Nom" onChange={handleUserChange} name="name" required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>Prénom :</Form.Label>
                        <Form.Control type="" placeholder="Prenom" onChange={handleUserChange} name="firstName" required/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Addresse e-mail institutionnelle :</Form.Label>
                        <Form.Control placeholder="email" onChange={handleUserChange} name="email" required pattern="[A-Za-z]+\.[A-Za-z]+@(student.){0,1}vinci.be"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Campus :</Form.Label>
                        <Form.Select defaultValue="Woluwe" onChange={handleUserChange} name="campus">
                            <option>Woluwe</option>
                            <option>Ixelles</option>
                            <option>Louvain la neuve</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPassword1" >
                        <Form.Label>Mot de Passe :</Form.Label>
                        <Form.Control onChange={handleUserChange} name="password1" pattern="[a-z0-9._%+-]{6,}" type="password" required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridConfirmedPassword2" >
                        <Form.Label>Confirmer mot de passe : </Form.Label>
                        <Form.Control onChange={handleUserChange} name="password2" pattern="[a-z0-9._%+-]{6,}" type="password" required/>
                    </Form.Group>
                </Row>
                <div className="center">
                <Button variant="outline-primary" type="submit">
                    Valider mon inscription
                </Button>
                </div>
            </Form>
        </div>
    )
}
export default Register;
