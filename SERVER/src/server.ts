import fastify from "fastify";
import cors from '@fastify/cors';
import { userRoutes } from "./routes/user";
import { characterRoutes } from "./routes/character";
import { register } from "./routes/register";
import jwt from "@fastify/jwt";


const app = fastify()

app.register(userRoutes)
app.register(characterRoutes)
app.register(register)

app.register(jwt,{
    secret:'cleba'
});

app.register(cors,{
    origin:true
})

app.listen({
    port:3000
}).then(()=>{
    console.log(`Server Running on port http://localhost:3000`)
})