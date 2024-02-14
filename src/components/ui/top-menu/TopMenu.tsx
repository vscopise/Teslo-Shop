'use client';
import { useEffect, useState } from 'react';

import Link from 'next/link';

import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';

import { titleFont } from '@/config/fonts';
import { useCartStore, useUIStore } from '@/store';
import { MiniCart } from './MiniCart';


export const TopMenu = () => {

  const [showMiniCart, setShowMiniCart] = useState(false);

  const openMenu = useUIStore(state => state.openSideMenu);
  const { itemsInCart} = useCartStore(state => state.getSummaryInformation());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [])


  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="hidden sm:block">
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/men">Hombres</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/women">Mujeres</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/kid">Niños</Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link
          href={
            loaded && itemsInCart > 0 ? "/cart" : "/empty"
          }
          className="mx-2"
          onMouseEnter={() => setShowMiniCart(true)}
          onMouseLeave={() => setShowMiniCart(false)}
        >
          <div className="relative">
            { (loaded && itemsInCart > 0) && (
              <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                {itemsInCart}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
            {showMiniCart && itemsInCart > 0 && <MiniCart />}
          </div>
        </Link>

        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={openMenu}
        >
          Menú
        </button>
      </div>

    </nav>
  )
}
