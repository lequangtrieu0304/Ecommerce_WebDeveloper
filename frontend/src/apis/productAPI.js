import axios from "axios";
import { URL_API} from "../config";

export const getAllProduct = async () => {
    try{
        const response = await axios({
            url: `${URL_API}/api/products/`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(response.status !== 200){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch(err){
        return {
            error: err.response.data.message || err.message
        }
    }
}

export const getProductById = async (id) => {
    try{
        const response = await axios({
            url: `${URL_API}/api/products/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(response.status !== 200){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch(err){
        return {
            error: err.response.data.message || err.message
        }
    }
}

export const getProductByKey = async ({searchKeyword = ''}) => {
    try{
        let queryString = '?';
        if(searchKeyword){
            queryString += `searchKeyword=${searchKeyword}&`
        }
        const response = await axios({
            url: `${URL_API}/api/products${queryString}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
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

export const createProduct = async () => {
    try{
        const response = await axios({
            url: `${URL_API}/api/products`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        if(response.status !== 201){
            throw new Error(response.data.message)
        }
        return response.data;
    }
    catch (err){
        return {
            error: err.response ? err.response.data.message : err.message
        }
    }
}

export const updatedProduct = async (data) => {
    try {
        const response = await axios({
            url: `${URL_API}/api/products/${data._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            data: data,
        })
        if(response.status !== 200){
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

export const deleteProduct = async (id) => {
    try{
        const response = await axios({
            url: `${URL_API}/api/products/${id}`,
            method: 'DELETE',
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
            error: err.response.data.message || err.message,
        }
    }
}

export const createReview = async (id, review) => {
    try{
        const response = await axios({
            url: `${URL_API}/api/products/${id}/review`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            data: review,
        });
        if(response.status !== 200){
            throw new Error(response.data.message);
        }

        return response.data;
    }
    catch (err){
        return {
            error: err.response ? err.response.data.message : err.message,
        }
    }
}