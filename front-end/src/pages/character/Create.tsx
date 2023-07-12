import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, Typography, Box, FilledInput, InputAdornment, Button } from "@mui/material";
import { api } from "../../utils/api";
import Cookies from "universal-cookie";
import decode from "jwt-decode";
import { useEffect, useState } from "react";

interface FormValues {
    name: string;
    strength: string;
    dexterity: string;
    constitution: string;
    intelligence: string;
    wisdom: string;
    charisma: string;
    image: string;
    userId: string;
}

interface Token {
    sub: string;
}

export function Create() {
    const cookie = new Cookies();
    const navigate = useNavigate();

    const [userId, setUserId] = useState<string>('')

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

    const [values, setValues] = useState<FormValues>({
        name: "",
        strength: "",
        dexterity: "",
        constitution: "",
        intelligence: "",
        wisdom: "",
        charisma: "",
        image: "",
        userId: userId
    });

    const handleChange = (prop: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleFormSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        console.log(values.charisma, typeof (values.charisma));

        const response = await api.post('/character', {
            name: values.name,
            strength: Number.parseInt(values.strength),
            dexterity: Number.parseInt(values.dexterity),
            constitution: Number.parseInt(values.constitution),
            intelligence: Number.parseInt(values.intelligence),
            wisdom: Number.parseInt(values.wisdom),
            charisma: Number.parseInt(values.charisma),
            image: values.image,
            userId: values.userId,
        }, {
            headers: {
                Authorization: `Bearer ${cookie.get('token')}`,
            }
        })
        if (response.data.error) {
            alert(response.data.error)
            return
        }

        alert("Personagem criado com sucesso")
        return navigate('/')
    };

    return (
        <div style={{
            width: "fit-content",
            margin: "auto",
        }}>
            <div
                className="head"
                style={{
                    width: "fit-content",
                    margin: "auto",
                }}
            >
                <Typography fontWeight={600}>
                    Cadastro
                </Typography>
            </div>
            <br />
            <Box
                component="form"
                onSubmit={handleFormSubmit}
                sx={{
                    width: "fit-content",
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    maxWidth: "300px",
                }}
            >
                <FormControl fullWidth variant="filled">
                    <InputLabel htmlFor="filled-adornment-username">
                        Nome
                    </InputLabel>
                    <FilledInput
                        id="filled-adornment-amount"
                        value={values.name}
                        onChange={handleChange("name")}
                        startAdornment={<InputAdornment
                            position="start">@</InputAdornment>}
                        required
                    />
                </FormControl>
                <FormControl fullWidth variant="filled">
                    <InputLabel htmlFor="filled-adornment-username">
                        Strength
                    </InputLabel>
                    <FilledInput
                        id="filled-adornment-amount"
                        value={values.strength}
                        onChange={handleChange("strength")}
                        required
                    />
                </FormControl>
                <FormControl fullWidth variant="filled">
                    <InputLabel htmlFor="filled-adornment-username">
                        Dexterity
                    </InputLabel>
                    <FilledInput
                        id="filled-adornment-amount"
                        value={values.dexterity}
                        onChange={handleChange("dexterity")}
                        required
                    />
                </FormControl>
                <FormControl fullWidth variant="filled">
                    <InputLabel htmlFor="filled-adornment-username">
                        Constitution
                    </InputLabel>
                    <FilledInput
                        id="filled-adornment-amount"
                        value={values.constitution}
                        onChange={handleChange("constitution")}
                        required
                    />
                </FormControl>
                <FormControl fullWidth variant="filled">
                    <InputLabel htmlFor="filled-adornment-username">
                        Intelligence
                    </InputLabel>
                    <FilledInput
                        id="filled-adornment-amount"
                        value={values.intelligence}
                        onChange={handleChange("intelligence")}
                        required
                    />
                </FormControl>
                <FormControl fullWidth variant="filled">
                    <InputLabel htmlFor="filled-adornment-username">
                        Wisdom
                    </InputLabel>
                    <FilledInput
                        id="filled-adornment-amount"
                        value={values.wisdom}
                        onChange={handleChange("wisdom")}
                        required
                    />
                </FormControl>
                <FormControl fullWidth variant="filled">
                    <InputLabel htmlFor="filled-adornment-username">
                        Charisma
                    </InputLabel>
                    <FilledInput
                        id="filled-adornment-amount"
                        value={values.charisma}
                        onChange={handleChange("charisma")}
                        required
                    />
                </FormControl>
                <FormControl fullWidth variant="filled">
                    <InputLabel htmlFor="filled-adornment-username">
                        Image URL
                    </InputLabel>
                    <FilledInput
                        id="filled-adornment-amount"
                        value={values.image}
                        onChange={handleChange("image")}
                        required
                    />
                </FormControl>
                <Button type="submit" variant="contained" color="success">
                    Criar
                </Button>
            </Box>
        </div>
    );
} 