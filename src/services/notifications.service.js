import axios from "axios";
import { authService } from "./auth.service";

const apiurl = process.env.REACT_APP_URL_API + '/api/notifications'

const getAllNotificationsByUserId = (userId) => {
    let currentUser = authService.getCurrentUser();
    let config = {
        headers: {
            Authorization: currentUser["token"]
        }
    }
    return axios.get(`${apiurl}/${userId}`, config)
}

const createNotification = newNotification => {
    let currentUser = authService.getCurrentUser();
    let config = {
        headers: {
            Authorization: currentUser["token"]
        }
    }
    return axios.post(apiurl, newNotification, config);
}

const updateNotification = (id, notification) => {
    let currentUser = authService.getCurrentUser();
    let config = {
        headers: {
            Authorization: currentUser["token"]
        }
    }
    return axios.put(`${apiurl}/${id}`, notification, config)
}

const deleteNotification = (id) => {
    let currentUser = authService.getCurrentUser();
    let config = {
        headers: {
            Authorization: currentUser["token"]
        }
    }
    return axios.delete(`${apiurl}/${id}`, config)
}

export const notificationService = {
    createNotification,
    deleteNotification,
    updateNotification,
    getAllNotificationsByUserId
}