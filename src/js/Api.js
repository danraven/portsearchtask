import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_URL
});

export default {
    searchPorts: async term => (await api.get(`/api/ports/search/${term}`)).data,
    getRates: async (fromPort, toPort, fromDate, toDate) => (await api.get(`/api/rates/${fromPort}/${toPort}/${fromDate}/${toDate}`)).data
};
