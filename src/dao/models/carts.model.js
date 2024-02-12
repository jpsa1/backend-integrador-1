import mongoose from "mongoose";

const cartsCollection = 'carts'

const cartShema = new mongoose.Schema({
    id: String,
    products: []
})

export const cartModel = mongoose.model(cartsCollection, cartShema)