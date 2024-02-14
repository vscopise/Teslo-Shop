import { redirect } from 'next/navigation';
import clsx from 'clsx';
import { IoCardOutline } from 'react-icons/io5';
import { getOrderById } from '@/actions';
import { currencyFormat } from '@/utils';
import { PaypalButton, ProductImage, Title } from '@/components';

interface Props {
  params: {
    id: string,
  }
}

export default async function OrdersbyIdPage({ params }: Props) {

  const { id } = params;

  const { ok, order } = await getOrderById(id);

  const {
    isPaid,
    OrderItem,
    OrderAddress,
    itemsInOrder,
    subTotal,
    tax,
    total

  } = order!;

  if (!ok) redirect('/');

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split('-').at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Carrito */}
          <div className="flex flex-col mt-5">

            <div className={
              clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': !isPaid,
                  'bg-green-700': isPaid,
                }
              )
            }>
              <IoCardOutline size={30} />
              <span className="mx-2">{isPaid ? 'Pagada' : 'Pendiente depago'}</span>
            </div>

            {/* Items del carrito */}
            {
              OrderItem.map(item => (
                <div key={item.product.slug + item.size} className="flex mb-5">
                  <ProductImage
                    src={item.product.ProductImage[0]?.url}
                    width={100}
                    height={100}
                    alt={item.product.title}
                    className="mr-5 rounded"
                  />
                  <div>
                    <p>{item.product.title}</p>
                    <p>{currencyFormat(item.price)} x {item.quantity}</p>
                    <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="font-bold">{OrderAddress?.firstName} {OrderAddress?.lastName}</p>
              <p>{OrderAddress?.address}</p>
              <p>{OrderAddress?.postalCode}</p>
              <p>{OrderAddress?.city} - {OrderAddress?.countryId}</p>
              <p>{OrderAddress?.phone}</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2 mb-10">

              <span>Num de productos</span>
              <span className="text-right">{itemsInOrder} artículos</span>

              <span>Subtototal</span>
              <span className="text-right">{currencyFormat(subTotal)}</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(tax)}</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>

            </div>
            {
              !isPaid && <PaypalButton orderId={id} amount={total} />
            }

            {
              isPaid && (
                <div className="flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5 bg-green-700">
                  <IoCardOutline size={30} />
                  <span className="mx-2">Pagada</span>
                </div>
              )
            }
          </div>
        </div>

      </div>

    </div>
  );
}