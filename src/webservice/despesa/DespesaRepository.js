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
    
    async buscarDespesas(id_user) {
        console.log("id user " + id_user )
        try {
            const despesas = await prisma.$queryRaw`
                SELECT 
                    d.id_despesa AS id,
                    c.nm_cat_desp AS nome_categoria,
                    d.valor_despesa AS valor,
                    d.data_despesa AS data
                FROM 
                    despesa d
                INNER JOIN 
                    cat_desp c 
                ON 
                    d.id_cat_desp = c.id_cat_desp
                WHERE 
                    d.id_user = ${id_user}
                ORDER BY 
                    d.data_despesa DESC;
            `;
    
            if (!despesas || despesas.length === 0) {
                console.log("Nenhuma despesa encontrada para o usuário:", id_user);
                return {
                    success: true,
                    response: [],
                };
            }
    
            return {
                success: true,
                response: despesas,
            };
        } catch (error) {
            console.error("Erro ao buscar despesas:", error.message, error.stack);
            return {
                success: false,
                error: error.message,
            };
        } finally {
            await prisma.$disconnect();
        }
    }
}
