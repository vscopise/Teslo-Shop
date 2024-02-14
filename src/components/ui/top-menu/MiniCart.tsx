'use client';

import { useEffect, useState } from 'react';

import { useCartStore } from '@/store';

//import { initialData } from '@/seed/seed';
import Link from 'next/link';
import { ProductImage } from '@/components';

/* const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]; */

export const MiniCart = () => {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [])

  //const productsInCart = useCartStore(state => state.cart);
  const productsInCart = useCartStore(state => state.cart);
  const {subTotal, tax, total, itemsInCart} = useCartStore(state => state.getSummaryInformation());

  if (!loaded) return (<p>Loading...</p>);

  return (
    <div className="absolute w-[300px] right-0 bg-white rounded-xl shadow-xl p-5 text-xs transition-all z-50 hidden sm:block">
      {
        productsInCart.map(product => (
          <div key={`${product.slug}-${product.size}`} className="flex mb-2">
            <ProductImage
              src={product.image}
              width={50}
              height={50}
              alt={product.title}
              className="mr-5 rounded"
            />
            <div>
              <p>{product.title} - {product.size}</p>
              <p className="text-lg">{product.quantity} x ${product.price}</p>
            </div>
          </div>
        ))
      }
      <div className="grid grid-cols-2">

        <span className="mt-5">Sub Total</span>
        <span className="mt-5 text-right">$ {subTotal}</span>

      </div>
      <div className="grid grid-cols-2 mb-5">


        <span className="font-bold text-lg">Total</span>
        <span className="font-bold text-right text-lg">$ {total}</span>

      </div>
      <Link href="/cart" className="flex btn-primary justify-center">
        Ver Carrito
      </Link>
    </div>
  )
}
