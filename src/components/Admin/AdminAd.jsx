import {useEffect, useState} from "react";
import { adService } from "services/ads.service";
import {Col, Row, Form, FormControl, FloatingLabel} from "react-bootstrap";
import "styles/style.css"
import { authService } from "services/auth.service";
import DisplayAds from "./DisplayAds"
import {useHistory} from "react-router-dom";

const AdminAd = () => {

    const history = useHistory(); 

    let currentUser = authService.getCurrentUser();
    let roleCurrentUser = '';
    if (currentUser) {
        roleCurrentUser = authService.getRoleCurrentUser()
    }
    if(roleCurrentUser!=="admin"){
        history.push("/");
    }

    const [isLoading, setLoading] = useState(true); 
    const [ads, setAds] = useState('');
    const [query, setQuery] = useState('');
    const [select, setSelect] = useState('state');
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        setLoading(true);
        setAds('');
        getAllAds(); 
    }, [refreshKey]);

    const getAllAds = () => {
        adService.getAll().then((response) => {
            const allAds = response.ads; 
            setAds(allAds);
            setLoading(false); 
        })
    }

    const getFiltredAds = (query, a) => {
        if(!query) {
            return ads; 
        }
        const queryLowerCase = query.toLowerCase(); 
        if(select === "state"){
            return a.filter(ad => String(ad.state).toLowerCase().startsWith(queryLowerCase))
        }else if(select ==="title"){
            return a.filter(ad => String(ad.title).toLowerCase().startsWith(queryLowerCase))
        }
    }

    const filtredAds = getFiltredAds(query, ads)

    const changeSelectValue = (selectValue) => {
        setSelect(selectValue);
    }

    return (
        <div>
            <h1 className="center">Annonces</h1>

            <Form>
                <Row className="g-2">
                    <Col xs={11}>
                        <FloatingLabel controlId="floatingInputGrid" label="Entrez votre recherche">
                            <FormControl
                                type="search"
                                placeholder="Entrez votre recherche : titre ou état de l'annonce"
                                className="me-2"
                                aria-label="Search"
                                onChange={e => setQuery(e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col xs={1}>
                        <FloatingLabel label="Filtres">
                            <Form.Select 
                                onChange={e => changeSelectValue(e.target.value)}
                            >
                                <option value="state">état</option>
                                <option value="title">titre</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
            </Form>

            <DisplayAds ads={filtredAds} setRefreshKey={setRefreshKey} refreshKey={refreshKey} isLoading={isLoading}/>

        </div>
    )
} 

export default AdminAd;