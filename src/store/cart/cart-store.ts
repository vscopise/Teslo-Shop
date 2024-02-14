import { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface State {
    cart: CartProduct[];

    getProductsInCart: () => number;
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    };
    addProductToCart: (product: CartProduct) => void;
    updateProductsQuantity: (product: CartProduct, quantity: number) => void;
    removeProductInCart: (product: CartProduct) => void;

    clearCart: () => void;
}



export const useCartStore = create<State>()(

    persist(
        (set, get) => ({

            cart: [],

            getProductsInCart: () => {
                const { cart } = get();

                return cart.reduce((total, item) => total + item.quantity, 0);

            },

            getSummaryInformation: () => {
                const { cart } = get();

                const subTotal = cart.reduce(
                    (subTotal, item) => subTotal + (item.price * item.quantity), 0
                );

                const tax = subTotal * 0.15;

                const total = subTotal + tax;

                const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

                return {
                    subTotal, tax, total, itemsInCart
                };

            },

            addProductToCart: (product: CartProduct) => {
                const { cart } = get();

                // 1. Si el producto no está en el carrito agregarlo
                const productIsInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                )

                if (!productIsInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                // 2. Si el producto está en el carrito aumentar la cantidad
                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }

                    return item;
                })
                set({ cart: updatedCartProducts });
            },

            updateProductsQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();
                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: quantity }
                    }
                    return item;
                })
                set({ cart: updatedCartProducts });
            },

            removeProductInCart: (product: CartProduct) => {
                const { cart } = get();

                const updatedCart = cart.filter(
                    item => item.id !== product.id || item.size !== product.size
                );

                set({ cart: updatedCart });
            },

            clearCart: () => {
                set({ cart: [] })
            },
            
        }),

        {
            name: 'shopping-cart'
        }
    )

)