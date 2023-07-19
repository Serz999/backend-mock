import 'dotenv/config'
import Fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { routes } from './routes'
import fastifyRoutes from '@fastify/routes' 

const PORT: number = Number(process.env.PORT!) || 8000
const HOST: string = process.env.HOST! || "localhost"

const fastify: FastifyInstance = Fastify({
    logger: process.env.LOGGER === 'true'
})

// Plugins
fastify.register(cors, {})
fastify.register(fastifyRoutes)

// Routes
for (const routeName in routes) {
    const route: any = routes[routeName as keyof typeof routes]
    fastify.register(route)
    console.log(routeName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase())
}

fastify.get('/endpoints', async (req, res) => {
    return Object.fromEntries(fastify.routes) 
})

const run = async () => {
    try {
        await fastify.listen({ port: PORT, host: HOST })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

run()
