import Image from 'next/image';

import { initialData } from '@/seed/seed';
import Link from 'next/link';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export const MiniCart = () => {
  return (
    <div className="absolute w-[300px] right-0 bg-white rounded-xl shadow-xl p-5 text-xs transition-all">
      {
        productsInCart.map(product => (
          <div key={product.slug} className="flex mb-2">
            <Image
              src={`/products/${product.images[0]}`}
              width={50}
              height={50}
              alt={product.title}
              className="mr-5 rounded"
            />
            <div>
              <p>{product.title}</p>
              <p>3 x ${product.price}</p>
            </div>
          </div>
        ))
      }
      <div className="grid grid-cols-2 mb-5">


        <span className="mt-5 font-bold">Sub Total</span>
        <span className="mt-5 font-bold text-right">$ 100</span>

      </div>
      <Link href="/cart" className="flex btn-primary justify-center">
        Ver Carrito
      </Link>
    </div>
  )
}
