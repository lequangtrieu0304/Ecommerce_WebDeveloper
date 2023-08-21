import axios from "axios";
import { URL_API } from "../config";
import { getUserInfo } from "../localStroge";

export const loginAccount = async (data) => {
    try{
        const response = await axios({
            url: `${URL_API}/api/users/login`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        })
        console.log(response);
        if(response.status !== 200){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch(err){
        return {
            error: err.response ? err.response.data.message : err.message
        }
    }
}

export const logoutAccount = async () => {
    try{
        const response = await axios({
            url: `${URL_API}/api/users/logout`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        if(response.status !== 200){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch(err){
        return {
            error: err.response ? err.response.data.message : err.message
        }
    }
}

export const registerAccount = async (data) => {
    try {
        const response = await axios ({
            url: `${URL_API}/api/users/register`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        })
        if(response.status !== 200){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch (err){
        return {
            error: err.response ? err.response.data.message : err.message 
        }
    }
}


export const updateAccount = async (data) => {
    try {
        const {id} = getUserInfo();
        const response = await axios ({
            url: `${URL_API}/api/users/update/${id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            data: data
        })
        if(response.status !== 200){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch (err){
        return {
            error: err.response ? err.response.data.message : err.message 
        }
    }
}