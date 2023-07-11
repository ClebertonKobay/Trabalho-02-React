import Cookies from 'universal-cookie';
import decode from 'jwt-decode';

interface User{
    sub: string,
    userName: string,
}

export function getUser(): User | null{
    const cookies = new Cookies();
    const token = cookies.get('token')

    if(!token){
        return null
    }

    const user: User = decode(token);

    return user
}