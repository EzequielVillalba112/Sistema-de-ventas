import axios from './axios';

export const addCategory = (category)=> axios.post(`/add_category`, category);
export const listCategory = () => axios.get(`/all_category`);
export const searchCategory = (idCategory) => axios.get(`/categoria/${idCategory}`);