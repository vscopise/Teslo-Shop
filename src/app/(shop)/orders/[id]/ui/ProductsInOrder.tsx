'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { initialData } from '@/seed/seed';

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

interface Props {
    params: {
        id: string,
    }
}

export const ProductsInOrder = () => {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [])
    
    if (!loaded) return (<p>Loading...</p>);

    return (
        <>
            {
                productsInCart.map(product => (
                    <div key={product.slug} className="flex mb-5">
                        <Image
                            src={`/products/${product.images[0]}`}
                            width={100}
                            height={100}
                            alt={product.title}
                            className="mr-5 rounded"
                        />
                        <div>
                            <p>{product.title}</p>
                            <p>${product.price} x 3</p>
                            <p className="font-bold">Subtotal: ${product.price * 3}</p>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
