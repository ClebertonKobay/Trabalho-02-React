import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import decode from "jwt-decode";
import { Character } from "../../components/Character";

interface Token {
    sub: string;
}

interface Character {
    name: string;
    strength: string;
    dexterity: string;
    constitution: string;
    intelligence: string;
    wisdom: string;
    charisma: string;
    image: string;
}

export function List() {
    const cookie = new Cookies();
    const navigate = useNavigate();

    const [userId, setUserId] = useState<string>('')
    const [characters, setCharacters] = useState<Character>({
        name: "",
        strength: "",
        dexterity: "",
        constitution: "",
        intelligence: "",
        wisdom: "",
        charisma: "",
        image: "",
    });

    useEffect(() => {
        const tokenCript = cookie.get('token')
        console.log(tokenCript)

        if (!tokenCript) {
            alert('Precisa estra logado para acessar essa função')
            navigate('/');
        }

        const token: Token = decode(tokenCript);
        setUserId(token.sub);


    }, [])

    return (
        <>
            <Character />
        </>
    )
}