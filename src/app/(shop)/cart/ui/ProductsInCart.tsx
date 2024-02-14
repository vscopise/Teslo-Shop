'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useCartStore } from '@/store';
import { QuantitySelector, ProductImage } from '@/components';

export const ProductsInCart = () => {

    const updateProductQuantity = useCartStore(state => state.updateProductsQuantity);
    const removeProductInCart = useCartStore(state => state.removeProductInCart);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [])

    const productsInCart = useCartStore(state => state.cart);


    if (!loaded) return (<p>Loading...</p>);

    return (
        <>
            {
                productsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                        <ProductImage
                            src={product.image}
                            width={100}
                            height={100}
                            alt={product.title}
                            className="mr-5 rounded"
                        />
                        <div>
                            <Link
                                className="hover:underline cursor-pointer"
                                href={`/product/${product.slug}`}
                            >
                                {product.title} - {product.size}
                            </Link>
                            <p>${product.price}</p>
                            <QuantitySelector
                                quantity={product.quantity}
                                onQuantityChanged={quantity => updateProductQuantity(product, quantity)}
                            />
                            <button
                                className="underline mt-3"
                                onClick={() => removeProductInCart(product)}
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
