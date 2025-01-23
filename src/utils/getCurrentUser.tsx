import {User} from '../types/types';

const getCurrentUser = (): User | null =>{
    const userData = localStorage.getItem("currentUser");
    return userData ? JSON.parse(userData) as User : null;
}

export default getCurrentUser;