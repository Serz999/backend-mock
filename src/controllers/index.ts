import { BaseController } from "./BaseController";
import { models } from "../models"

export const controllers: any = {}

for (const modelName in models) {
    const controllerName = modelName + "Controller"
    const model = models[modelName as keyof typeof models]
    controllers[controllerName] = new BaseController(model)   
}

