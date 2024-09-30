import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { updateBlogInput, createBlogInput } from "@iamasistiwari/medium-common";

export const blogRouter = new Hono<{
    Bindings: {
		DATABASE_URL: string
        JWT_Secret: string
	},
    Variables: {
        userId: any
    }
}>()

blogRouter.use('/*', async (c, next) =>{
    const auth = c.req.header("Authorization") || ""
    const token = auth.split(" ")[1];
    try{
        const user = await verify(token, c.env.JWT_Secret);
        if(user){
            c.set('userId', user.id)
            await next()
        }else{
            c.status(403)
            return c.json({message: "you are not logged in"})
        }
    }catch(e){
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({message: "create blog inputs are not correct"})
    }
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId,
                date: new Date
            }
        })
        console.log(blog)
        return c.json({id: blog.id})
    }catch(e){
        c.status(411)
        c.json({message: "content can't able to put"})
    }
})


blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({message: "update blog inputs are not correct"})
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try{
        const blog = await prisma.post.update({
            where: {
                id: Number(body.id)
            },
            data: {
                author: body.title,
                title: body.title,
                content: body.content,
                published: body.published
            }
        })
        return c.json({message: "successfully updated your blog"})
    }catch(e){
        console.log(e)
        return c.json({message:"post not get updated"})
    }
})
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            },
            published: true,
            date: true
        }
    });
    return c.json({
        blogs: blogs
    })
})
blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try{
        const blog = await prisma.post.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                author: {
                    select: {
                        name: true
                    }
                },
                date: true
            }
        })
        return c.json(blog)
    }catch(e){
        console.log(e)
        return c.json({message: "can't able to get blog"})
    }
})


blogRouter.delete('/delete/:id', async (c) => {
    const postId = c.req.param('id');
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try{
        const res = await prisma.post.delete({
            where : {
                authorId: authorId,
                id: Number(postId)
            }
        })
        return c.json({message: "deleted"})
    }catch(e){
        console.log(e)
        return c.json({message: "can't able to delete the blog"})
    }
})