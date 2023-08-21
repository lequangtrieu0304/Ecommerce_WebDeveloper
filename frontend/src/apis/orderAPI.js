import axios from 'axios';
import { URL_API } from '../config';

export const dailyOrders = async () => {
    try{
        const response = await axios({
            url: `${URL_API}/api/orders/summary`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        if(response.status !== 200){
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

export const sellingProducts = async () => {
    try{
        const response = await axios({
            url: `${URL_API}/api/orders/selling-products`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(response.status !== 200){
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

export const getProductWithQty = async (id) => {
    try{
        const response = await axios({
            url: `${URL_API}/api/orders/productWithQty/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(response.status !== 200){
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

export const getAllOrder = async () => {
    try{
        const response = await axios({
            url: `${URL_API}/api/orders/`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
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

export const getOrderById = async (id) => {
    try{
        const response = await axios({
            url: `${URL_API}/api/orders/${id}`,
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
    catch (err){
        return {
            error: err.response ? err.response.data.message : err.message
        }
    }
}

export const createOrderLogin = async (order) => {
    try {
        const response = await axios({
            url: `${URL_API}/api/orders/auth`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            data: order
        })
        if(response.status !== 201){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch (err){
        return {
            error: err.response.data.message || err.message,
        }
    }
}

export const createOrder = async (order) => {
    try {
        const response = await axios({
            url: `${URL_API}/api/orders/`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: order
        })
        if(response.status !== 201){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch (err){
        return {
            error: err.response.data.message || err.message,
        }
    }
}

