import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { z } from 'zod';
import  argon2 from 'argon2';

export async function register(app:FastifyInstance) {

    app.post('/user',async (request,response) => {
        const userSchema = z.object({
            userName: z.string(),
            passWord: z.string()
        })
        
        const {userName, passWord} = userSchema.parse(request.body)
        
        const validUserName = await prisma.user.findFirst({
            where:{
                userName
            }
        })

        if(validUserName){
            return response.send({error:'Este username já esta sendo usado, escolha outro'});
        }

        const passWordHash = await argon2.hash(passWord);

        const user = await prisma.user.create({
        data: {
            userName,
            passWordHash
        }
        });

        const passWordCreated = await prisma.password.create({
            data: {
                hash: passWordHash,
                userId:user.id
            }
        });

        const token = app.jwt.sign({
            userName: user.userName
        },{
            sub: user.id,
            expiresIn: '30 days',
        });
         
        return {token};
    })

    app.post('/user/login',async (request, response) => {
        const bodySchema = z.object({
            userName: z.string(),
            passWord: z.string()
        })

        const {userName, passWord} = bodySchema.parse(request.body);
        
        try {
            const user = await prisma.user.findFirstOrThrow({
                where:{
                    userName
                }
            });

        const userPassWord = await prisma.password.findFirstOrThrow({
            where:{
                userId: user.id
            }
        });

        if( await argon2.verify(userPassWord.hash,passWord)){
            const token = app.jwt.sign({
                userName: user.userName
             },{
                sub: user.id,
                expiresIn: '30 days',
             });
             
            return {token};
        }
            return response.status(401).send({error:"Senha incorreta"})
        } catch (error) {
            return response.status(401).send({error:"Usuário não cadastrado"})
        }

    });
}