'use client';

import { useState } from 'react';

import { QuantitySelector, SizeSelector } from '@/components';
import type { CartProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';

interface Props {
    product: Product
}

export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore(state => state.addProductToCart);

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState(false);

    const addToCart = () => {
        setPosted(true);
        if (!size) return;
        //console.log({size, quantity, product})
        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            size: size,
            quantity: quantity,
            image: product.images[0]
        }
        addProductToCart(cartProduct);
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
        
    }

    return (
        <>
            {
                posted && !size && (
                    <p className='mt-2 text-red-500 fade-in'>
                        Debe seleccionar una talla
                    </p>
                )
            }
            {/* Selector de Tallas */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={setSize}
            />

            {/* Selector de Cantidad */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={setQuantity}
            />

            {/* Botón para agregar al carrito */}
            <button
                className="btn-primary w-full my-5"
                onClick={addToCart}
            >
                Agregar al Carrito
            </button>
        </>
    )
}
