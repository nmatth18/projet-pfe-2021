import React from "react";
import {useState} from "react";
import {categoryService} from 'services/categories.service'
import {ListGroup,Badge,InputGroup,FormControl,Button} from "react-bootstrap";
import "styles/style.css"
import {Loader} from "components/Loading/Loading";
import parse from 'html-react-parser';

const ConstructP = (props) => {
    let value = props.value;

    const deleteSubCategory = (e)=>{
        let idDelete=-1;
        let children = e.target.parentNode.childNodes;
        for(let i =0; i<children.length;i++){
            if(children[i].dataset.id){
                idDelete = children[i].dataset.id;
            }
        }
        console.log(idDelete)
        categoryService.deleteCategory(idDelete).then(
            (response)=>{
                props.setRefreshKey(props.refreshKey+1)
            }
        )
    }

    let i = 0;
    let nameParent = '';
    return(
        value.map((e)=>{
            if(i>1){
                i++;
                return(
                    <div key={'child'+nameParent+i}>
                        {parse(e)}
                        <Button onClick={e => {deleteSubCategory(e)}} variant="danger">DELETE</Button>
                    </div>
                )
            }else if(i===0){
                nameParent = e;
                i++;
            }else{
                i++;
            }
        })
    )
}

const DisplayCategories = (props) => {

    const {categories} = props;
    const [categoriesSubMap, setCategoriesSubMap] = useState({});
    const [valueInput, setValueInput] = useState('');

    const constructMap = () => {
        let categoriesMap = {};
        if(categories){
            categories.map((category) => {
                if(!category.parent_category){
                    if(!categoriesMap[category.id_category]){
                        categoriesMap[category.id_category]=new Array(category.name);
                    }else{
                        categoriesMap[category.id_category][0]=category.name
                    }
                }else{
                    if(!categoriesMap[category.parent_category] ){
                        categoriesMap[category.id_category]=new Array('');
                    }
                    if(categoriesMap[category.parent_category][1]){
                        categoriesMap[category.parent_category][1] = categoriesMap[category.parent_category][1]+1;
                    }else{
                        categoriesMap[category.parent_category].push(1);
                    }
                    categoriesMap[category.parent_category].push('<p data-id='+category.id_category+'>'+category.name+'</p>');
                    
                }
            })
            setCategoriesSubMap(categoriesMap);
        }
    }



    if(!props.isLoading){
        if(!categoriesSubMap[1]){
            constructMap();
        }
    }

    const deleteCategory = (e)=>{
        let idDelete = e.target.parentNode.parentNode.dataset.key;
        categoryService.deleteCategory(idDelete).then(
            (response)=>{
                props.setRefreshKey(props.refreshKey+1)
            }
        )
    }
    
    const addSubCategory = (e) => {
        setCategoriesSubMap([]);
        let id = parseInt(e);
        let category = {
            name:valueInput,
            parent_category:id
        }
        console.log(category);
        categoryService.create(category).then(
            (response)=>{
                props.setRefreshKey(props.refreshKey+1)
            }
        )
    }
    
    if(props.isLoading){
        return(
            <Loader.BigLoader />  
        )
    }else if(categoriesSubMap[1]) {
        return (
            Object.entries(categoriesSubMap).map(([key, value]) =>{
                for(let i = 0; i<value.length;i++){
                }
                return(
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        key={key}
                        data-key={key}
                    >
                        <div className="ms-2 me-auto">
                            <Button onClick={e => {deleteCategory(e)}} variant="danger">DELETE</Button>
                            <div className="fw-bold">{value[0]}</div>
                            <ConstructP value={value} setRefreshKey={props.setRefreshKey} refreshKey={props.refreshKey}/>
                            <form onSubmit={e => {e.preventDefault(); addSubCategory(e.target.parentNode.parentNode.dataset.key)}}>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl onChange={e => {setValueInput(e.target.value)}} placeholder="Ajouter sous categorie" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                </InputGroup>
                            </form>
                        </div>
                        <Badge variant="primary" pill>
                        {value[1]}
                        </Badge>
                    </ListGroup.Item>
                )
            })            
        )
    }else{
        return(
            <p> Aucun résultat trouvé</p>
        )
    }

}

export default DisplayCategories;