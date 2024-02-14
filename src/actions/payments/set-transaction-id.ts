'use server';

import prisma from '@/lib/prisma';

export const setTransactionId = async (transactionId: string, orderId: string) => {
    try {
        const updatedOrder = await prisma.order.update({
            where: {id: orderId},
            data: {transactionId: transactionId}
        })

        if (transactionId) {
            return {
                ok: true,
                updatedOrder: updatedOrder,
            }

        } else {
            return {
                ok: false,
                message: `No se encontró la orden ${orderId}`,
            }
        }

        
    } catch (error) {
        
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo actualizar la orden'
        }
        
    }
}