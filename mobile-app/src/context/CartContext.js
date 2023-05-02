import React, { createContext, useState } from 'react';

const CartContext = createContext(null);
const {Provider} = CartContext;

function CartProvider({children}) {
    const [cartState, setCartState] = useState({
        products: [],
        totalPrice: 0
    });

    function addToCart(product, count) {
        updatedProducts = [...cartState.products, {product, count}];
        updatedTotalPrice = cartState.totalPrice + product.productPrice * count;
        setCartState({
            products: updatedProducts,
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