'use client';
import { useEffect, useState } from 'react';

import { getProductBySlug, getStockBySlug } from '@/actions';
import clsx from 'clsx';

interface Props {
    slug: string;
}


export const StockLabel = ({ slug }: Props) => {
    const [stock, setStock] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStock = async () => {
            const inStock = await getStockBySlug(slug);
            setStock(inStock);
            setLoading(false);
        };
        getStock();
    }, [slug])


    return (
        <>
            {
                loading
                    ? <p className="text-md mt-5 bg-gray-400 animate-pulse">&nbsp;</p>
                    : <p className={
                        clsx(
                            "text-md mt-5",
                            { 'bg-red-500 text-center text-white rounded-md': +stock === 0 }
                        )
                    }>
                        {+stock === 0 ? 'Sin stock' : `Stock: ${stock}`}
                    </p>
            }
        </>
    );
}
