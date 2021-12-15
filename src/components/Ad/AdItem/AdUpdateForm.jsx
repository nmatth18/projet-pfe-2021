import React,{ useState }  from "react";
import {adService} from 'services/ads.service'
import Category from "components/Category/Category";
import DropzoneAreaComponent from "../AdNewForm/DropzoneArea";
import { mediaService } from "services/medias.service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

const CheckBox = (type) => {

    library.add(faHeart, far)

    if(type==="a donner"){
        return(
            <>
                A donner  <input type="radio" name="type" value="a donner" defaultChecked required/>
                A vendre  <input type="radio" name="type" value="a vendre" required/>
            </>
        )
    }else{
        return(
            <>
                A donner  <input type="radio" name="type" value="a donner" required/>
                A vendre  <input type="radio" name="type" value="a vendre" defaultChecked required/>
            </>
        )
    }
}
 
const AdUpdateForm = ({ad,setRefreshKey,refreshKey,setIsOpen,adMedias}) => {

    const [title, setTitle] = useState(ad.title)
    const [description, setDescription] = useState(ad.description)
    const [price,setPrice] = useState(parseInt(ad.price)) 
    const [type, setType] = useState(ad.type)
    const [state, setState] = useState(ad.state)
    const id_user = parseInt(ad.id_user)
    const [id_category,setCategory] = useState(parseInt(ad.id_category))
    const[displayed_picture,setDisplayedPicture] = useState(parseInt(ad.displayed_picture))
    const[isChangeDisplayPicture,setIsChangeDisplayPicture]=useState(false)
    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`;
    const[medias,setMedias] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(medias.length<1){
            if(adMedias.filter(medias=>medias.type==="image").length<1){
                toast.error('Erreur : Image requise !', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored'
                });
                return
            }
        }else{
            let img = false;
            if(adMedias.filter(medias=>medias.type==="image").length<1){
                medias.map((media)=>{
                    if(media['type'].includes('image')){
                        img=true;
                        return;
                    }
                })
            }else{
                img=true;
            }
            if(!img){
                toast.error('Erreur : Il faut au moins 1 image !', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored'
                });
                return
            }
        }
        if(id_category===0){
            toast.error('Erreur : Categorie requise !', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
                });
            return
        }
        let idToast = toast.loading("Modification de l'annonce",{position: "bottom-right"})
        await addMediaAndUpdate();
        setRefreshKey(refreshKey+1);
        toast.update(idToast,{
            render: 'Annonce modifiée !',
            type: "success",
            isLoading: false,
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        });
        setIsOpen(false);
    };

    const addMediaAndUpdate=async ()=>{
        const mediaPromise = medias.map(async (media)=>{
            let urlMedia = await mediaService.UploadMedias(media, id_user);
            let newMedia = {}
            if(media['type'].includes('video')){
                newMedia = {
                    url:urlMedia,
                    type:'video',
                    id_ad: ad.id_ad,
                }
            }else if(media['type'].includes('image')){
                newMedia = {
                    url:urlMedia,
                    type:'image',
                    id_ad: ad.id_ad,
                }
            }
            await mediaService.createNewMedia(newMedia);
        })
        await Promise.all(mediaPromise);
        let mediasChild = await mediaService.getByAdId(ad.id_ad);
        const mediaChildPromise = mediasChild.map(async (mediaChild)=>{
            if(mediaChild.type==="image"){
                const newAd = {
                    date,
                    title,
                    description,
                    price,
                    type,
                    state,
                    id_category,
                    id_user,
                    displayed_picture: mediaChild.id_media     
                };
                await adService.update(ad.id_ad, newAd)
                return
            }
        })
        await Promise.all(mediaChildPromise);
    }

    const handleUpdate =(e)=>{
        switch (e.target.name){
            case "title":
                setTitle(e.target.value)
                break;
            case "description":
                setDescription(e.target.value)
                break;
            case "price":
                setPrice(parseInt(e.target.value))
                break;
            case "type":
                setType(e.target.value)
                if(e.target.value ==="a donner")
                setPrice(0)
                break;                     
            default:
                break;
        }      
    }     
    const handlePictureChange=()=>{
        setIsChangeDisplayPicture(!isChangeDisplayPicture)
    }
    const handleDisplayPicture=async (e)=>{
        if(e.currentTarget.id !== displayed_picture){
            let idToast = toast.loading("Modification de la photo favorite",{position: "bottom-right"})
            setDisplayedPicture(e.currentTarget.id)
            const newAd = {
                date,
                title,
                description,
                price,
                type,
                state,
                id_category,
                id_user,
                displayed_picture: parseInt(e.currentTarget.id)
            };
            await adService.update(ad.id_ad, newAd)
            toast.update(idToast,{
                render: 'Photo favorite modifiée !',
                type: "success",
                isLoading: false,
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });            
        }
        
    }

    return (
            <div>
                <form onSubmit={handleSubmit}>
                    Titre: <input type="text" name="title" defaultValue={ad.title} onChange={handleUpdate}/>
                    Description: <input type="text" name="description" defaultValue={ad.description}onChange={handleUpdate}/>
                    Prix: <input type="number"name="price" defaultValue={ad.price} onChange={handleUpdate}/>
                    <div onChange={handleUpdate}>
                        <CheckBox type={type} />
                    </div>
                    <Category setCategory={setCategory} idDefault={id_category}/>
                    <DropzoneAreaComponent setMedias={setMedias} medias={medias}/>
                    <button type="submit">Modifier</button>    
                </form>  
                <button onClick={handlePictureChange}>Modifier vos images</button>
                {isChangeDisplayPicture &&
                    <div>   
                        <p>Choissez l'image que vous souhaiter utiliser</p>
                        {adMedias.filter(medias=>medias.type==="image").map(media => {
                            if(displayed_picture === media.id_media){
                                return (
                                    <div key={media.id_media}>
                                        <img src={media.url} alt="" />
                                        <FontAwesomeIcon id={media.id_media} onClick={handleDisplayPicture} icon="heart"/>
                                    </div>
                                )
                            }else{
                                return (
                                    <div key={media.id_media}>
                                        <img src={media.url} alt="" />
                                        <FontAwesomeIcon id={media.id_media} onClick={handleDisplayPicture} icon={["far","heart"]}/>
                                    </div>
                                )
                            }
                            
                        })}
                    </div>
                }
            </div>
        );
};
export default AdUpdateForm;