import { FastifyInstance } from "fastify"
import { BaseController } from "../controllers/BaseController"

const validateSchema = {
    schema: {
        body: {
          type: 'object',
          //  required: ['someField'],
          properties: {
            // someKey: { type: 'string' },
            // someOtherKey: { type: 'number' }
          }
        }
    }
}

const serializeSchema = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {}
            },
            404: {}
        }
    }    
} 

export function createBaseRoute(route: string, controller: BaseController): Function {
    return async function (fastify: FastifyInstance, options: Object) {

        fastify.get(`/${route}`, controller.getAll.bind(controller))

        fastify.get(`/${route}/:id`, controller.getById.bind(controller))

        fastify.post(`/${route}`, controller.add.bind(controller))
        
        fastify.patch(`/${route}/:id`, controller.update.bind(controller))

        fastify.delete(`/${route}/:id`, controller.delete.bind(controller))
    }
}
