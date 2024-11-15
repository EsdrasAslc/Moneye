import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class DespesaRepository {

    async criaDespesa(id_user, categoria, valor, data) {
        try {

            const despesa = await prisma.$queryRaw`INSERT INTO despesa (id_user, id_cat_desp, valor_despesa, data_despesa) VALUES (${id_user}, ${categoria}, ${valor}, ${data})`;

            const saldo = await prisma.$queryRaw`UPDATE user SET saldo = saldo - ${valor} WHERE id_user = ${id_user}`

            return {
                success: true
            }
        } catch(error) {
            return {
                success: false
            }
        } finally {
            prisma.$disconnect()
        }
    }
 
}
