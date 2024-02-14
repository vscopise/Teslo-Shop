'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const changeUserRole = async (userId: string, role: string) => {

    const session = await auth();

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'El usuario debe ser administrador',
        }
    }

    try {

        const newRole = role === 'admin' ? 'admin' : 'user';

        const updateUser = await prisma.user.update({
            data: {
                role: newRole,
            },
            where: {
                id: userId
            }
        });

        revalidatePath('/admin/users');

        return {
            ok: true,
            updateUser
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error al cambiar el rol del usuario',
        }
    }
}