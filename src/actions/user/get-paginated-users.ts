'use server';

import prisma from '@/lib/prisma';

import { auth } from "@/auth.config";

export const getPaginatedusers = async () => {
    const session = await auth();

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'El usuario debe ser administrador',
        }
    }

    const users = await prisma.user.findMany({
        orderBy: {
            name: 'desc'
        }
    });

    return {
        ok: true,
        users: users
    }
}