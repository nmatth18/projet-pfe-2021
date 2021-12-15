
import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { AnnoncesAPI } from "services/annonces";
import { CategoriesAPI } from "services/categories";
import AnnonceList from "./components/AnnonceList";
import { ToastContainer } from 'react-toastify';

function Home() {

    const [categories, setCategories] = useState();
    const [data, setData] = useState();
    const [filter, setFilter] = useState("?categorie=&tri=ASC&prixMin=0&prixMax=3000");
    const [tri, setTri] = useState("ASC");
    const [category, setCategory] = useState("");
    const [prixMin, setPrixMin] = useState("0");
    const [prixMax, setPrixMax] = useState("3000"); 

    // Functions
    async function handleCategoryChange(event){
        await setCategory(event.target.value)
        await setFilter(`?categorie=${event.target.value}&tri=${tri}&prixMin=${prixMin}&prixMax=${prixMax}`)
        await setFilter((state) => {
            AnnoncesAPI.getAds(state).then((elt) => setData(elt));
            return state;
        })
    }
    async function handleTriChange(){
        if(tri==="ASC"){
            await setTri("DESC")
            await setFilter(`?categorie=${category}&tri=DESC&prixMin=${prixMin}&prixMax=${prixMax}`)
            await setFilter((state) => {
                AnnoncesAPI.getAds(state).then((elt) => setData(elt));
                return state;
            })
        } else {
            await setTri("ASC")
            await setFilter(`?categorie=${category}&tri=ASC&prixMin=${prixMin}&prixMax=${prixMax}`)
            await setFilter((state) => {
                AnnoncesAPI.getAds(state).then((elt) => setData(elt));
                return state;
            })
        }
    }
    async function handleMinPriceChange(event){
        await setPrixMin(event.target.value)
        await setFilter(`?categorie=${category}&tri=${tri}&prixMin=${event.target.value}&prixMax=${prixMax}`)
        await setFilter((state) => {
            AnnoncesAPI.getAds(state).then((elt) => setData(elt));
            return state;
        })
    }
    async function handleMaxPriceChange(event){
        await setPrixMax(event.target.value)
        await setFilter(`?categorie=${category}&tri=${tri}&prixMin=${prixMin}&prixMax=${event.target.value}`)
        await setFilter((state) => {
            AnnoncesAPI.getAds(state).then((elt) => setData(elt));
            return state;
        })
    }
    useEffect(() => {
        CategoriesAPI.getCategories().then((elt) => setCategories(elt));
        AnnoncesAPI.getAds(filter).then((elt) => setData(elt));
    }, [])

    return (
        <>
            <Container>
                <h1>Market Vinci - 2021</h1>
                <h4>Filtres</h4>
                <Container className="d-flex flex-column">
                    <Container className="d-flex flex-row justify-content-start">
                        <Form.Select defaultValue={categories?categories.categories[0]:""} onChange={handleCategoryChange} className="d-flex border" style={{"width":"200px"}}>
                            {categories && categories.categories.map((row) => {
                                return(
                                    <option key={row.id_category}>{row.name}</option>
                                )
                            }) }
                        </Form.Select>
                        <Container onClick={(e) => {e.preventDefault(); handleTriChange()}} className="d-flex border rounded" style={{"width":"100px", "cursor":"pointer"}}>Tri</Container>
                        <Form.Control onChange={handleMinPriceChange} placeholder="Prix min" className="d-flex border" style={{"width":"100px"}}/>
                        <Form.Control onChange={handleMaxPriceChange} placeholder="Prix max" className="d-flex border" style={{"width":"100px"}}/>
                    </Container>
                    <Container>
                        {data && <AnnonceList annonces={data.ads}/>}
                    </Container>
                </Container>
            </Container>
            <ToastContainer />
        </>
    )
}
export default Home;
