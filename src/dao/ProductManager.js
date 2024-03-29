import {productModel} from './models/products.model.js'
import {nanoid} from 'nanoid'


class ProductManagerMongo {

    readProducts = async () => {
        try{
            return await productModel.find()  
        }catch(error) {
            console.log("No se pudo leer la base de Mongo: " + error)
            return "Error al tratar de obtener los productos"
        }
    }

    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    exist = async (id) => {
        try{
            return await productModel.findOne({ id: id })
        } catch {
            console.log("Paso por el catch")
            return null   
        }
        // return await productModel.findOne({_id:id}).lean()
    }

    addProducts = async (product) => {
        
        //Controla que todos los valores contengan datos. 
        if(!(product.title && product.description && product.price && product.thumbail && product.code && product.stock)) 
        {return "ERROR: Todos los campos son requeridos"}

        //Controlar que el producto no este repetido
        
            let productoExiste = await productModel.findOne({code: product.code})
            
            if(productoExiste) return 'ERROR: Producto repetido'
            
            product.id = nanoid()
      
            await productModel.create(product)
            return "Producto Agregado exitosamente"
    }

    getProducts = async (limitProduct) => {
        if (limitProduct == undefined) {
            return await this.readProducts()
        } else {
            return await productModel.find().limit(limitProduct)
        }
    }

    getProductsById = async (id) => {
        let productById = await this.exist(id)
        if(!productById) return "Producto no encontrado"
        return productById
    }

    updateProducts = async (id, product) => {
        let productById = await this.exist(id)
        if(!productById) return "Producto no encontrado"

        await productModel.updateOne({id:id}, product)

        return "Producto actualizado exitosamente" 
    }

    deleteProducts = async (id) => {
        
        let existeProducts = await this.exist(id)
        if (existeProducts) {
            await productModel.deleteOne({id:id})
            return "Producto eliminado"
        }else{
            return 'Producto no existe'
        }
    }
}

export default ProductManagerMongo



