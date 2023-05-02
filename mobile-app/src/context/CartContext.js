import React, { createContext, useState } from 'react';

const CartContext = createContext(null);
const {Provider} = CartContext;

function CartProvider({children}) {
    const [cartState, setCartState] = useState({
        products: [],
        totalPrice: 0
    });

    function addToCart(product, count) {
        productsInCart = [...cartState.products];
        matchingProduct = cartState.products.find(item => item.product.productId === product.productId)
        if (matchingProduct) {
            matchingProduct.count += count;

        } else {
            productsInCart.push({product, count});
        }
        updatedTotalPrice = cartState.totalPrice + product.productPrice * count;
        setCartState({
            products: productsInCart,
            totalPrice: updatedTotalPrice
        });
    }

    function removeFromCart(product) {

    }

    return (
        <Provider value={{
            cartState,
            addToCart,
            removeFromCart
        }}>
            {children}
        </Provider>
    )
}

export {CartContext, CartProvider}