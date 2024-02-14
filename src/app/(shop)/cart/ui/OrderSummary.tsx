'use client';

import { useEffect, useState } from 'react';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import {useRouter } from 'next/navigation';

export const OrderSummary = () => {

    const router = useRouter();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    const { subTotal, tax, total, itemsInCart } = useCartStore(state => state.getSummaryInformation());

    useEffect(() => {
        if (itemsInCart === 0 && loaded === true) {
            router.replace('/empty');
        }
    }, [itemsInCart, loaded, router])


    if (!loaded) return (<p>Loading...</p>);

    return (
        <div className="grid grid-cols-2">

            <span>Num de productos</span>
            <span className="text-right">{itemsInCart} artículos</span>

            <span>Subtototal</span>
            <span className="text-right">{currencyFormat(subTotal)}</span>

            <span>Impuestos (15%)</span>
            <span className="text-right">$ {tax}</span>

            <span className="mt-5 text-2xl">Total</span>
            <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>

        </div>
    )
}
