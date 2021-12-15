import React from "react";


const AdDetail = ({ad,adMedias,category})=>{ 

    return (
        <>
            <div>
                <p>Titre: {ad.title}</p>
                <p>Description: {ad.description}</p>
                <p>Prix: {ad.price}</p>
                <p>Date de publication: {ad.date}</p>
                <p>Catégorie: {category.name}</p>
                <p>Etat: {ad.state}</p>
                <p>Status: {ad.type}</p>
            </div>
            <div> 
            {adMedias.map(m => {
            return <img key={m.id_media} src={m.url} alt=""/>;
            })}
            </div>      
        </>
    )
}

export default AdDetail
