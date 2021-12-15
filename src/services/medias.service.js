import axios from "axios";
import { BlobServiceClient } from "@azure/storage-blob";
import uuid from 'react-uuid';
import { authService } from "./auth.service";

const sasToken = process.env.REACT_APP_SAS_TOKEN;
const containerName = process.env.REACT_APP_CONTAINER_NAME;
const storageAccountName = process.env.REACT_APP_STORAGE_ACCOUNT_NAME;

const apiurl = process.env.REACT_APP_URL_API + '/api/medias'

const createNewMedia = (newMedia) => {
    let currentUser = authService.getCurrentUser();
    let config = {
        headers: {
            Authorization: currentUser["token"]
        }
    }
    return axios
        .post(apiurl, newMedia, config)
        .then(response => response.data);
}

const deleteMedia = (id) => {
    let currentUser = authService.getCurrentUser();
    let config = {
        headers: {
            Authorization: currentUser["token"]
        }
    }
    return axios
        .delete(`${apiurl}/${id}`, config)
        .then(response => response.data);
}

/*get a ad by id*/
const get = (id) => {
    return axios
        .get(`${apiurl}/${id}`)
        .then(response => response.data);
}

/*get all media for this id_ad*/
const getByAdId = (id_ad) => {
    let currentUser = authService.getCurrentUser();
    let config = {
        headers: {
            Authorization: currentUser["token"]
        }
    }
    return axios
        .get(`${apiurl}/ad/${id_ad}`, config)
        .then(response => response.data.medias);
}

const getAll = () => {
    return axios
        .get(apiurl)
        .then(response => response.data.medias);
}

//AZURE BLOB

const createBlobInContainer = async (containerClient, file, fileName, id_user) => {

    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(fileName);

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    // upload file
    await blobClient.uploadBrowserData(file, options);
    await blobClient.setMetadata({ UserName: toString(id_user) });
};

const uploadFileToBlob = async (file, id_user) => {
    if (!file) return []
    const blobService = new BlobServiceClient(`https://${storageAccountName}.blob.core.windows.net/?${sasToken}`);

    const containerClient = blobService.getContainerClient(containerName);

    let fileName = file.name.replaceAll("+", "");
    fileName = fileName.replaceAll("  ", "%20");
    fileName = fileName.replaceAll(" ", "%20");

    fileName = uuid() + fileName;

    await createBlobInContainer(containerClient, file, fileName, id_user);

    //return getBlobsInContainer(containerClient);
    return `https://${storageAccountName}.blob.core.windows.net/${containerName}/${fileName}`

}

const deleteBlobInContainer = async (containerClient, fileName) => {

    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(fileName);

    blobClient.delete();
};

const deleteBlob = async (urlMedia) => {
    const blobService = new BlobServiceClient(`https://${storageAccountName}.blob.core.windows.net/?${sasToken}`);

    const containerClient = blobService.getContainerClient(containerName);

    let url = urlMedia;

    const urlsplit = url.split('/')
    console.log(urlsplit[4]);

    await deleteBlobInContainer(containerClient, urlsplit[4]);

    console.log("DELETED");

};

const UploadMedias = async (file, id_user) => {
    const blobsInContainer = await uploadFileToBlob(file, id_user);
    return blobsInContainer;
}

export const mediaService = {
    createNewMedia,
    deleteMedia,
    get,
    getByAdId,
    getAll,
    UploadMedias,
    deleteBlob
}