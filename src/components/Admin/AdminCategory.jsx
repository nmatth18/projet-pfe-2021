import {useEffect, useState} from "react";
import {categoryService} from 'services/categories.service'
import { authService } from "services/auth.service";
import {ListGroup,InputGroup,FormControl} from "react-bootstrap";
import "styles/style.css"
import {useHistory} from "react-router-dom";
import {Loader} from "components/Loading/Loading";
import DisplayCategories from "./DisplayCategories"

const AdminCategory = () => {

    const history = useHistory();

    let currentUser = authService.getCurrentUser();
    let roleCurrentUser = '';
    if (currentUser) {
        roleCurrentUser = authService.getRoleCurrentUser(currentUser.token)
    }
    if(roleCurrentUser!=="admin"){
        history.push("/");
    }

    const [isLoading, setLoading] = useState(true);
    const [categories, setCategories] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);
    const [valueInput, setValueInput] = useState('');

    useEffect(() => {
        setLoading(true);
        setCategories('');
        getAllCategories();
    }, [refreshKey]); 

    const getAllCategories = () => {
        categoryService.getAll().then((response) => {
            const allCategories = response.data.categories; 
            setCategories(allCategories);
            setLoading(false);
        })
    }

    const addCategory = () => {
        console.log(valueInput);
        let category = {
            name:valueInput,
            parent_category:0
        }
        console.log(category);
        categoryService.create(category).then(
            (response)=>{
                setRefreshKey(refreshKey+1)
            }
        )
    }

    if(isLoading){
        return(
            <Loader.BigLoader />  
        )
    }else{
        return (
            <>
                <ListGroup as="ol" numbered>
                    <DisplayCategories categories={categories} setRefreshKey={setRefreshKey} refreshKey={refreshKey} isLoading={isLoading}/>
                </ListGroup>
                <form onSubmit={e => {e.preventDefault(); addCategory()}}>
                    <InputGroup className="mb-3">
                        <FormControl onChange={e => {setValueInput(e.target.value)}} placeholder="Ajouter categorie" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                    </InputGroup>
                </form>
            </>
        )
    }
}

export default AdminCategory;