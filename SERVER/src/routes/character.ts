import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function characterRoutes(app: FastifyInstance){

    app.addHook('preHandler',async (request) => {
        await request.jwtVerify();
    });

    app.get('/character',async (request,response)=>{
            const characters = await prisma.character.findMany({
                where:{
                    userId:request.user.sub
                }
            });

            return characters
        });

    app.get('/character/:id',async (request,response)=>{
            const paramsSchema = z.object({
                id: z.string()
            })

            const {id} = paramsSchema.parse(request.params)

            const characters = await prisma.character.findFirst({
                where:{
                    id
                }
            });

            return characters
        });

    app.post('/character',async (request, response) => {

        const bodySchema = z.object({
            name: z.string(),
            strength: z.number(),
            dexterity: z.number(),
            constitution: z.number(),
            intelligence: z.number(),
            wisdom: z.number(),
            charisma: z.number(),
            image: z.string().url(),
        });

        const {
            name,
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
            image 
        } = bodySchema.parse(request.body)

        const character = await prisma.character.create({
            data:{
                name,
                strength,
                dexterity,
                constitution,
                intelligence,
                wisdom,
                charisma,
                image,
                userId:request.user.sub   
            }
        });

        return character
    })

    app.put('/character/:id',async (request, response) => {
        const paramsSchema = z.object({
            id: z.string()
        })
        const bodySchema = z.object({
            name: z.string(),
            strength: z.number(),
            dexterity: z.number(),
            constitution: z.number(),
            intelligence: z.number(),
            wisdom: z.number(),
            charisma: z.number(),
            image: z.string().url(),
        });
        const {id} = paramsSchema.parse(request.params)
        const {
            name,
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
            image 
        } = bodySchema.parse(request.body)

        const character = await prisma.character.update({
            where:{
                id
            },
            data:{
                name,
                strength,
                dexterity,
                constitution,
                intelligence,
                wisdom,
                charisma,
                image,
            }
        });

        return character 
    })

    app.delete('/character/:id',async (request,response) => {
        const paramsSchema = z.object({
            id: z.string()
        });
        const {id} = paramsSchema.parse(request.params)

        await prisma.character.delete({
            where:{
                id
            }
        });

        return response.status(204).send({success: 'Personagem deletado com sucesso'})
    })
}