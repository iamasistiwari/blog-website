import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign} from 'hono/jwt'
import { signupInput, SigninInput, signinInput } from '@iamasistiwari/medium-common'
enum ResponseStatus {
    Success = 200,
    Unauthorized = 401,
    Error = 500
}


export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
        JWT_Secret: string
	}
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({message: "signup inputs are not correct"})
    }
    try{
        
        const user = await prisma.user.create({
            data: {
                name: body.name || null,
                email: body.email,
                password: body.password
            }
        })
        const token = await sign({id: user.id}, c.env.JWT_Secret)
        return c.json({token: token, authorName: user.name})
    }catch(e){
        console.log(e)
        c.status(ResponseStatus.Unauthorized)
        return c.text("not correct")
    }
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({message: "signin inputs are not correct"})
    }
    try{
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            }
        })
        if(!user || user.password !== body.password){
            c.status(ResponseStatus.Unauthorized)
            return c.json({
                message: "Incorrect credentials"
            })
        }
        const jwt = await sign({id: user.id}, c.env.JWT_Secret)
        return c.json({token: jwt, authorName: user.name})
    }catch(e){
        console.log(e)
    }
})
