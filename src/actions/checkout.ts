"use server"

import { CartProduct } from "@/providers/cart"
import Stripe from 'stripe'

export const createCheckout = async (products: CartProduct[]) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-09-30.acacia",
    })


    const checkout = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: "http://localhost:3000",
        cancel_url: "http://localhost:3000",
        metadata: {
            products: JSON.stringify(products)
        },
        line_items: products.map(product => {
            return {
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: product.name,
                        description: product.description,
                        images: product.imageUrls,
                    },
                    unit_amount: product.totalPrice * 100,
                },
                quantity: product.quantity
            }
        }),
    })
    return checkout
}