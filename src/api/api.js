import axios from 'axios';

// VUE_APP_PROD = PROD
const prod = process.env.VUE_APP_PROD

const BASE_URL = prod == 'PROD' ? 'http://localhost:8081' : '';

export const apiGetOrdersByConditions = async (page, pageSize, city, district, weekDay, isException) => {
    let url = `${BASE_URL}/api/orders/conditions?page=${page}&pageSize=${pageSize}&city=${city}&district=${district}&weekDay=${weekDay}&isException=${isException}`;
    if(isException === '') {
        url = `${BASE_URL}/api/orders/conditions?page=${page}&pageSize=${pageSize}&city=${city}&district=${district}&weekDay=${weekDay}`;
    }
    try {
        const res = await axios.get(url);
        if (res.status !== 200) {
            throw new Error('Request failed with status ' + res.status);
        }
        return res.data;
    } catch (e) {
        console.log("error: ", e);
        return null;
    }
};


export const apiModifyOrder = async (order) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/orders`, order);
        if (response.data.statusCode !== 200) {
            console.error(response.data.message);
            return null;
        }
        return response.data;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const apiAddNewOrder = async (order) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/orders`, order);
        if (response.data.statusCode !== 200) {
            console.error(response.data.message);
            return null;
        }
        return response.data;
    } catch (e) {
        console.error(e);
        return null;
    }
};


export const apiFetchOrders = async (page, pageSize) => {
    try {
        const url = `${BASE_URL}/api/orders?page=${page}&pageSize=${pageSize}`
        const res = await fetch(url)
        const resData = await res.json();
        if (resData.statusCode !== 200) {
            throw new Error('Request failed with status ' + resData.message);
        }
        
        return resData;
    } catch (e) {
        console.log("error: ", e)
        return null;
    }
};


export const apiDeleteOrder = async (orderId) => {
    try {
        const url = `${BASE_URL}/api/orders/${orderId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const resData = await response.json()
        console.log('res: ', resData)
        
        if (resData.statusCode !== 200) {
            console.error(resData.message);
            return null;
        }
        return resData;
    } catch (e) {
        console.error(e);
        return null;
    }
};