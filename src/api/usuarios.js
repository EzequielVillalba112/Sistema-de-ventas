import axios from "./axios";

export const allRange = () => axios.get('/all_range');
export const addUserApi = (user) => axios.post('/add_user',user);
export const validUserApi = (nameUser) => axios.post('/valid_user', nameUser);
export const allUserApi = () => axios.get('/all_user');