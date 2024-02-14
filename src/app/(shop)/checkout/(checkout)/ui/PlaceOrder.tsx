'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { placeOrder } from '@/actions';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat, sleep } from '@/utils';


export const PlaceOrder = () => {

    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [placingOrder, setplacingOrder] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const address = useAddressStore(state => state.address);

    const { subTotal, tax, total, itemsInCart } = useCartStore(state => state.getSummaryInformation());

    const cart = useCartStore(state => state.cart);

    const clearCart = useCartStore(state => state.clearCart);

    useEffect(() => {
        setLoaded(true);
    }, []);

    const onPlaceOrder = async () => {
        setplacingOrder(true);

        const productsInOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size,
        }))

        // Server Action
        const resp = await placeOrder(productsInOrder, address);
        if (!resp.ok) {
            setplacingOrder(false);
            setErrorMessage(resp.message);
            return;
        }
//console.log({resp})
        // Todo salio bien!!
        clearCart();
        router.replace(`/orders/${resp.order!.id}`);
    }


    if (!loaded) return (<p>Cargando...</p>)

    return (
        <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
                <p className="font-bold">{`${address.firstName} ${address.lastName}`}</p>
                <p>{`${address.address} - ${address.city}`}</p>
                <p>{`País: ${address.country} - CP: ${address.postalCode}`}</p>
                <p>{`Tel: ${address.phone}`}</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">

                <span>Num de productos</span>
                <span className="text-right">{itemsInCart} artículos</span>

                <span>Subtototal</span>
                <span className="text-right">{currencyFormat(subTotal)}</span>

                <span>Impuestos (15%)</span>
                <span className="text-right">{currencyFormat(tax)}</span>

                <span className="mt-5 text-2xl">Total</span>
                <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>

            </div>
            <div className="mt-5 mb-2 w-full">

                <p className="mb-5">
                    {/* Disclaimer */}
                    <span className="text-xs">
                        Al hacer clic en &quot;colocar orden&quot;, aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
                    </span>
                </p>

                <p className="text-red-500">{errorMessage}</p>
                {/*flex btn-primary justify-center*/}
                <button
                    onClick={onPlaceOrder}
                    className={
                        clsx('flex justify-center',
                            {
                                'btn-primary': !placingOrder,
                                'btn-disabled': placingOrder
                            })
                    }
                >
                    Colocar Orden
                </button>
            </div>
        </div>
    )
}
