import axios from 'axios';
import env from '../env';
const ACCESS_TOKEN = env.ACCESS_TOKEN;

export default (query) => {
    return axios.create({
        baseURL: 'https://api.github.com/graphql',
        headers: {
            Authorization: `bearer ${ACCESS_TOKEN}`
        }
    });
}