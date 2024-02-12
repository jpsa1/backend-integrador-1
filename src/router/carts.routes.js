import { Router } from "express";
import CartManager from "../controllers/CartManager.js";
import CartManagerMongo from "../dao/CartManager.js";

const CartRouter = Router()
const carts = new CartManager
const cartsMg = new CartManagerMongo

CartRouter.get("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await cartsMg.getCartsById(id))
})

CartRouter.post("/", async (req, res) => {
    res.send(await cartsMg.addCart())
    
    //filesystema
    // res.send(await carts.addCart())

})

CartRouter.post("/:cid/product/:pid", async (req, res) => {
    let cid = req.params.cid
    let pid = req.params.pid
    res.send(await cartsMg.addProductToCart(cid, pid))

    //filesystema
    // res.send(await carts.addProductToCart(cid, pid))
})

//PUT
// CartRouter.put("/:id", async (req, res) => {
//     let id = req.params.id
//     let cart = req.body
//     res.send(await carts.updateCart(id, cart))
// })

//DELETE
// CartRouter.delete("/:id", async (req, res) => {
//     let id = req.params.id
//     res.send(await carts.deleteCart(id))
// })

export default CartRouter