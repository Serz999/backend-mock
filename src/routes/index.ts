import { createBaseRoute } from "./createBaseRoute";
import { controllers} from '../controllers'
import { FastifyInstance } from 'fastify'

export const routes: any = {}

for (const controllerName in controllers) { 
    const controller = controllers[controllerName as keyof typeof controllers]
    const routeName = controller.Model.name + "Route"
    const modelNameInKebabCase = controller.Model.name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    routes[routeName] = createBaseRoute(modelNameInKebabCase, controller)
}
