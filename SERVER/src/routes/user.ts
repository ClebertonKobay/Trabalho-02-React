import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { z } from 'zod';
import  argon2 from 'argon2';

export async function userRoutes(app:FastifyInstance){

    app.addHook('preHandler',async (request) => {
        await request.jwtVerify();
    });

    app.get('/user',async (request) => {
        const users = await prisma.user.findMany()

        return users
    })

    app.put('/user/:id',async (request,response) => {
        const paramsSchema = z.object({
            id: z.string().uuid()
        });
        const bodySchema = z.object({
            userName: z.string(),
            passWord: z.string()
        })

        const {id} = paramsSchema.parse(request.params)

        const {userName, passWord } = bodySchema.parse(request.body)

        const user = await prisma.user.findUnique({
            where:{
                id
            }
        });

        const oldPassWordHash = await prisma.password.findFirstOrThrow({
            where:{
                userId:user?.id
            }
        })
        
        if(await argon2.verify(oldPassWordHash.hash, passWord)){
            return response.status(400).send({error:'A senha não pode ser igual à anterior'})
        }

        const newPassWordHash = await argon2.hash(passWord);

        await prisma.password.delete({
            where:{
                id:oldPassWordHash.id
            }
        });
        
        await prisma.password.create({
            data:{
                hash:newPassWordHash,
                userId:id
            }
        });

        await prisma.user.update({
            data:{
                userName,
                passWordHash: newPassWordHash
            },
            where:{
                id
            }
        })

        return user;
    })

    app.delete('/user/:id', async (request,response)=>{
        const paramsSchema = z.object({
            id: z.string().uuid()
        });

        const {id} = paramsSchema.parse(request.params)

        const user = await prisma.user.findUniqueOrThrow({
            where:{
                id
            }
        });
        
        await prisma.user.delete({
            where:{
                id
            }
        })
    });

    
}