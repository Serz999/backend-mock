import { CRUD, Request, Response, ObjectsArrayWrap } from "./types"
import {v4 as uuidv4} from 'uuid';

export class BaseController implements CRUD {

    Model: any = {} 

    constructor(model?: any) {
        this.Model = model
    }
    
    async add(request: Request , response: Response): Promise<Object> { 
        const values: any = request.body

        if (!values.hasOwnProperty('id')) {
            values.id = uuidv4()
        }
        
        const inst = await this.Model.create(values)

        return inst
    }

    async getAll(request: Request , response: Response): Promise<any> {
        const BASE_LIMIT = 30
         
        let page = Number(request.query.page)
        let limit = Number(request.query.limit) 
         
        if (Number.isNaN(page) || Number.isNaN(limit) || page < 0 || limit < 0) {
            page = 0
            limit = BASE_LIMIT
        }
         
        const items = await this.Model.findAndCountAll({
            limit: limit,
            offset: page * limit,

        })
         
        const itemsTotalCount = items.count
        const totalPages = Math.ceil(itemsTotalCount / limit)  
         
        return {
            totalCount: itemsTotalCount,
            totalPages: totalPages,
            objects: items.rows,
        }
    }

    async getById(request: Request , response: Response): Promise<Object> {
        const inst = await this.Model.findByPk(request.params.id)

        if (!inst) {
            response.code(404)
            return { message: `${this.Model.name} not found` }  
        } 
        
        return inst
    }

    async update(request: Request , response: Response): Promise<Object> { 
        const inst: any = await this.Model.findByPk(request.params.id)
        
        if (!inst) {
            response.code(404)
            return { message: `${this.Model.name} not found` }
        }
        
        await inst.update(request.body)

        return inst 
   }

    async delete(request: Request, response: Response): Promise<Object> {
        const inst = await this.Model.findByPk(request.params.id)

        if (!inst) {
            response.code(404)
            return { message: `${this.Model.name} not found` }   
        }

        await inst.destroy()

        return {}
    } 
}
