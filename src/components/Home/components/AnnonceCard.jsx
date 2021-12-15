import { Button, Card } from "react-bootstrap";

const AnnonceCard = ({annonce, picture}) => {

    // TODO: renvoyer vers la page de details
    function showDetails(id){
        console.log(id)
    }
    
    return(
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={picture!==null?picture.url:"holder.js/100px180"} />
        <Card.Body>
            <Card.Title>{annonce.title}</Card.Title>
            <Card.Text>
                {annonce.price}
            </Card.Text>
            <Card.Text>
                {annonce.description}
            </Card.Text>
            <Button onClick={showDetails} variant="primary">Plus d'infos</Button>
        </Card.Body>
        </Card>
    )
}
export default AnnonceCard;