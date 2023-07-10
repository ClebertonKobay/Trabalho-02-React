import * as React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, InputLabel, Typography, Box, FilledInput, InputAdornment, IconButton, Button  } from "@mui/material";

interface FormValues {
    userName: string;
    passWord: string;
    showPassword: boolean;
  }

export function Register(){
        const [values, setValues] = React.useState<FormValues>({
            userName: "",
            passWord: "",
            showPassword: false,
        });
     
        const handleChange = (prop:keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };
     
        const handleClickShowPassword = () => {
            setValues({
                ...values,
                showPassword: !values.showPassword,
            });
        };
     
        const handleMouseDownPassword = (event: React.MouseEvent) => {
            event.preventDefault();
        };
     
        const handleFormSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            alert("Signed in successfully");
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
                    <Typography  fontWeight={600}>
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
                            Username
                        </InputLabel>
                        <FilledInput
                            id="filled-adornment-amount"
                            value={values.userName}
                            onChange={handleChange("userName")}
                            startAdornment={<InputAdornment
                            position="start">@</InputAdornment>}
                            required
                        />
                    </FormControl>
                    <FormControl variant="filled">
                        <InputLabel htmlFor="filled-adornment-password">
                            Password
                        </InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={values.showPassword ? "text" : "password"}
                            value={values.passWord}
                            onChange={handleChange("passWord")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ?
                                        <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            required
                        />
                    </FormControl>
                    <Button type="submit" variant="contained">
                        Login
                    </Button>
                </Box>
            </div>
        );
} 