import Image from 'next/image';
import Link from 'next/link';

import { Title } from '@/components';
import { initialData } from '@/seed/seed';
import clsx from 'clsx';
import { IoCardOutline } from 'react-icons/io5';

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

export default function OrderPage({ params }: Props) {

  const { id } = params;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Carrito */}
          <div className="flex flex-col mt-5">

            <div className={
              clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': false,
                  'bg-green-700': true,
                }
              )
            }>
              <IoCardOutline size={30} />
              <span className="mx-2">Pendiente de pago</span>
            </div>

            {/* Items del carrito */}
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
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="font-bold">Vicente Scópise</p>
              <p>Dirección</p>
              <p>Barrio</p>
              <p>Ciudad</p>
              <p>País</p>
              <p>CP</p>
              <p>Tel</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2 mb-10">

              <span>Num de productos</span>
              <span className="text-right">3 artículos</span>

              <span>Subtototal</span>
              <span className="text-right">$ 300</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">$ 100</span>

            </div>

            <div className={
              clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': false,
                  'bg-green-700': true,
                }
              )
            }>
              <IoCardOutline size={30} />
              <span className="mx-2">Pendiente de pago</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}