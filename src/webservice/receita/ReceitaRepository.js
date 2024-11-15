import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class ReceitaRepository {

    async criaReceita(id_user, categoria, valor, data) {
        try {

            const receita = await prisma.$queryRaw`INSERT INTO receita (id_user, id_cat_rec, valor_receita, data_receita) VALUES (${id_user}, ${categoria}, ${valor}, ${data})`;

            const saldo = await prisma.$queryRaw`UPDATE user SET saldo = saldo + ${valor} WHERE id_user = ${id_user}`

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
