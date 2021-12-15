import {GoogleMap, Marker, LoadScript} from '@react-google-maps/api';


const Map = ({seller})=>{
    const center = seller.user.campus==="Woluwe" ?
        {
            lat: 50.849440,
            lng: 4.450960        
        }
        : seller.user.campus==="Ixelles" ?
        {
            lat: 50.835270,
            lng: 4.376290       
        }
        :
        {
            lat: 50.670550,
            lng: 4.612260        
        }

    return <LoadScript
                googleMapsApiKey={process.env.REACT_APP_API_KEY_GOOGLE_MAPS}
            >
                <GoogleMap 
                        mapContainerStyle={{width: '400px',height: '400px'}}
                        zoom={18}
                        center={center}
                        >
                        <Marker key={"Ixelle"} position={center}/>
                </GoogleMap>
            </LoadScript>
}

export default Map