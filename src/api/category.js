import axios from './axios';

export const addCategory = (category)=> axios.post(`/add_category`, category);
export const listCategory = () => axios.get(`/all_category`);
export const searchCategory = (idCategory) => axios.get(`/categoria/${idCategory}`);
export const updateCategory = (categoryModific) => axios.post("/update_category",categoryModific);
export const deleteCategory = (idCategory) => axios.delete(`/category_delete/${idCategory}`);