'use client';

//import { useSession } from 'next-auth/react';

import Link from 'next/link';

import { logout } from '@/actions';
import { useUIStore } from '@/store';
import clsx from 'clsx';

import {
    IoCloseOutline,
    IoLogInOutline,
    IoLogOutOutline,
    IoPeopleOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoShirtOutline,
    IoTicketOutline
} from "react-icons/io5"

export const SideBar = ({ session }: any) => {

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);

    //const { data: session } = useSession();
    //const isAuthenticated = !!session?.user;
    const isAdmin = session?.user.role === 'admin';

    //console.log(isAuthenticated)
    //console.log({session})

    return (
        <div>
            {
                isSideMenuOpen &&
                <div
                    className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
                    onClick={closeMenu}
                />
            }
            {
                isSideMenuOpen &&
                <div
                    className="fixed top-0 left-0 w-screen h-screen z-10 fade-in backdrop-filter backdrop-blur-sm"
                    onClick={closeMenu}
                />
            }
            {
                <nav
                    className={
                        clsx(
                            "fixed p-5 top-0 right-0 w-[500px] h-screen z-20 bg-white shadow-2xl transform transition-all duration-300",
                            {
                                "translate-x-full": !isSideMenuOpen
                            }
                        )
                    }
                >
                    <IoCloseOutline
                        size={50}
                        className="absolute top-5 right-5 cursor-pointer"
                        title="Cerrar"
                        onClick={closeMenu}
                    />

                    <div className="relative mt-14">
                        <IoSearchOutline size={20} className="absolute top-2 left-2" />
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {
                        session && (
                            <>
                                <Link
                                    href="/profile"
                                    className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
                                    onClick={closeMenu}
                                >
                                    <IoPersonOutline size={30} />
                                    <span className="ml-3 text-xl">Perfil</span>
                                </Link>

                                <Link
                                    href="/orders"
                                    className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
                                    onClick={closeMenu}
                                >
                                    <IoTicketOutline size={30} />
                                    <span className="ml-3 text-xl">Ordenes</span>
                                </Link>

                            </>
                        )
                    }

                    {
                        !session && (
                            <Link
                                href="/auth/login"
                                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
                                onClick={closeMenu}
                            >
                                <IoLogInOutline size={30} />
                                <span className="ml-3 text-xl">Entrar</span>
                            </Link>
                        )
                    }

                    {
                        session && (
                            <button
                                className=" w-full flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
                                onClick={() => logout()}
                            >
                                <IoLogOutOutline size={30} />
                                <span className="ml-3 text-xl">Salir</span>
                            </button>
                        )
                    }


                    <div className="w-full h-px bg-gray-200 my-10" />

                    {
                        isAdmin && (
                            <>
                                <Link
                                    href="/admin/products"
                                    className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
                                    onClick={closeMenu}
                                >
                                    <IoShirtOutline size={30} />
                                    <span className="ml-3 text-xl">Productos</span>
                                </Link>

                                <Link
                                    href="/admin/orders"
                                    className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
                                    onClick={closeMenu}
                                >
                                    <IoTicketOutline size={30} />
                                    <span className="ml-3 text-xl">Ordenes</span>
                                </Link>

                                <Link
                                    href="/admin/users"
                                    className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
                                    onClick={closeMenu}
                                >
                                    <IoPeopleOutline size={30} />
                                    <span className="ml-3 text-xl">Usuarios</span>
                                </Link>
                            </>

                        )
                    }

                </nav>
            }
        </div>
    )
}
