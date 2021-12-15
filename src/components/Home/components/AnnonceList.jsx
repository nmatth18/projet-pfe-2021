import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AnnonceCard from "./AnnonceCard";
import {mediaService} from "../../../services/medias.service";
const AnnonceList = ({annonces}) => {

    const [data, setData] = useState();

    // Functions
    function matchPicture(picture_id) {
        if(data){
            if(data.pictures){
                console.log("there is data in this bitch")
                data.pictures.map((row) => {
                    if(row.id_media === picture_id){
                        return row;
                    }
                })
            }
        }
        return null;
    }

    useEffect(() => {
        mediaService.getAll().then((elt) => setData(elt))
    }, [])

    return(
        <Container className="d-inline-flex flex-wrap flex-row justify-content-start">
            {annonces.map((annonce) => {
                return(
                    <AnnonceCard key={annonce.id_ad} annonce={annonce} picture={matchPicture(annonce.dispayed_picture??0)}/>
                )
            }) }
        </Container>
    )
}
export default AnnonceList;<div className="a"></div>