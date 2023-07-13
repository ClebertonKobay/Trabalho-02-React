import { useNavigate, useParams } from "react-router-dom";
import { FormControl, InputLabel, Typography, Box, FilledInput, InputAdornment, Button } from "@mui/material";
import { api } from "../../utils/api";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

interface FormValues {
    name: string;
    strength: string;
    dexterity: string;
    constitution: string;
    intelligence: string;
    wisdom: string;
    charisma: string;
    image: string;
}

export function Edit() {
    const cookie = new Cookies();
    const navigate = useNavigate();
    const params = useParams()
    let replay;
    
    const [values, setValues] = useState<FormValues>({
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

        if (!tokenCript) {
            alert('Precisa estra logado para acessar essa função')
            navigate('/');
        }

        replay = api.get(`/character/${params.id}`,{
            headers:{
                Authorization:`Bearer ${tokenCript}`
            }
        }).then((response)=>{setValues(response.data)})
    }, [replay])


    const handleChange = (prop: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleFormSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        console.log(values.charisma, typeof (values.charisma));

        const response = await api.put(`/character/${params.id}`, {
            name: values.name,
            strength: Number.parseInt(values.strength),
            dexterity: Number.parseInt(values.dexterity),
            constitution: Number.parseInt(values.constitution),
            intelligence: Number.parseInt(values.intelligence),
            wisdom: Number.parseInt(values.wisdom),
            charisma: Number.parseInt(values.charisma),
            image: values.image,
        }, {
            headers: {
                Authorization: `Bearer ${cookie.get('token')}`,
            }
        })
        if (response.data.error) {
            alert(response.data.error)
            return
        }

        alert("Personagem atualizado com sucesso")
        return navigate('/character/list')
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
                    {`Atualização do ${values.name}`}
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
                    Update
                </Button>
            </Box>
        </div>
    );
} 