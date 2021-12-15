import React from "react"; 
import { Button, Form, Table } from 'react-bootstrap';
import { adService } from "services/ads.service"; 
import {useHistory} from "react-router-dom";
import "styles/style.css"
import {Loader} from "components/Loading/Loading";

export default function Display(props) {

const DisplayAds = (props) => {

    const {ads} = props;
    const history = useHistory(); 

    const navigateToAdDetails = (id) =>{
        history.push("/annonces/"+id);
    }

    const changeSelectValue = (ad, selectValue) => {
        console.log(selectValue)
        let newAd = {
           title: ad.title,
           description: ad.description, 
           price: parseInt(ad.price), 
           date: ad.date,
           state: selectValue,
           type: ad.type,
           displayed_picture: ad.displayed_picture, 
           id_user: ad.id_user,
           id_category: ad.id_category
        }
        console.log(ad); 
        console.log(newAd);
        adService.update(ad.id_ad, newAd);
    }

    const deleteAd = (id) => {
        adService.remove(id).then(
            (response)=>{
                props.setRefreshKey(props.refreshKey+1)
            }
        )
    }

    if(props.isLoading){
        return(
            <tr>
                <td colSpan={6}>
                    <Loader.BigLoader />
                </td>
            </tr>    
            )
    }else if(ads.length > 0) {
        return (
            ads.map((ad) => {
                return(
                    <tr className="tuple" key={ad.id_ad} >
                            <td onClick={e => navigateToAdDetails(ad.id_ad)}>
                                {ad.title}
                            </td>
                            <td onClick={e => navigateToAdDetails(ad.id_ad)}>
                                {ad.date}
                            </td>
                            <td onClick={e => navigateToAdDetails(ad.id_ad)}>
                                {ad.type}
                            </td>
                            <td onClick={e => navigateToAdDetails(ad.id_ad)}>
                                {ad.price}
                            </td>
                            <td>
                                <Form.Select defaultValue={ad.state}
                                    onChange={e => changeSelectValue(ad,e.target.value)}
                                >
                                    <option value="en attente">en attente</option>
                                    <option value="vendu">vendu</option>
                                    <option value="disponible">disponible</option>
                                </Form.Select> 
                            </td>
                            <td className='tdDelete'>
                                <Button variant="outline-danger" onClick={e => deleteAd(ad.id_ad)}>Supprimer</Button>
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
                    <th>titre</th>
                    <th>date</th>
                    <th>type</th>
                    <th>prix</th>
                    <th>state</th>
                    <th>supprimer une annonce</th>
                </tr>
            </thead>
            <tbody>
                    {DisplayAds(props)}
            </tbody>
        </Table>
    </>
)

}