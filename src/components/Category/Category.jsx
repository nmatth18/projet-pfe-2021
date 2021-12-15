import React, { useState,useEffect } from "react"
import { categoryService } from "services/categories.service"
import { Form } from 'react-bootstrap';

const Category=({setCategory, idDefault})=>{

    const [categories,setCategories]=useState([])
    
    useEffect(()=>{
        const fetchData = async ()=>{
            const retrievedCategory = await categoryService.getAll().then(res=>res.data.categories)
            setCategories(retrievedCategory)
        }
        fetchData();
    },[]);
    
    const handleCategoryChange=(e)=>{
      setCategory(parseInt(e.target.value))
    }

    if(idDefault){
        return(
            <Form.Select value={idDefault} onChange={handleCategoryChange}>
                <option value='0'>---Choisir categorie---</option>
                {categories.map(category => {
                    if(category.parent_category) return <option key={category.id_category} value={category.id_category}>{category.name}</option>;
                })}
            </Form.Select>                                         
        )
    }else{
        return(
            <Form.Select defaultValue={'0'} onChange={handleCategoryChange}>
                <option value='0'>---Choisir categorie---</option>
                {categories.map(category => {
                    if(category.parent_category) return <option key={category.id_category} value={category.id_category}>{category.name}</option>;
                })}
            </Form.Select>                                      
        )
    }
}
export default Category