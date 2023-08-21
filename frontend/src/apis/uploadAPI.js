import axios from "axios";
import { URL_API } from "../config";
import { getUserInfo } from "../localStroge";

export const uploadImage = async (formData) => {
    try {
        const response = await axios({
            url: `${URL_API}/api/uploads/image`,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
            data: formData,
        })
        if(response.status !== 201){
            throw new Error(response.data.message)
        }
        return response.data;
    }
    catch(err){
        return {
            error: err.response ? err.response.data.message : err.message
        }
    }
}

export const uploadUser = async (formData) => {
    try {
        const response = await axios({
            url: `${URL_API}/api/uploads-user/image-user`,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
            data: formData,
        })
        if(response.status !== 201){
            throw new Error(response.data.message)
        }
        return response.data;
    }
    catch(err){
        return {
            error: err.response ? err.response.data.message : err.message
        }
    }
}