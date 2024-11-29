import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
});

export default class ReceitaRepository {

    async criaReceita(id_user, categoria, valor, data) {
        try {

            const receita = await prisma.$queryRaw`INSERT INTO receita (id_user, id_cat_rec, valor_receita, data_receita) VALUES (${id_user}, ${categoria}, ${valor}, ${data})`;

            const saldo = await prisma.$queryRaw`UPDATE user SET saldo = saldo + ${valor} WHERE id_user = ${id_user}`

            return {
                success: true
            }
        } catch (error) {
            return {
                success: false
            }
        } finally {
            prisma.$disconnect()
        }
    }

    async buscarReceitas(id_user) {
        console.log("id user " + id_user)
        try {
            const receitas = await prisma.$queryRaw`
                SELECT 
                    r.id_receita AS id,
                    c.nm_cat_rec AS nome_categoria,
                    r.valor_receita AS valor,
                    r.data_receita AS data
                FROM 
                    receita r
                INNER JOIN 
                    cat_rec c 
                ON 
                    r.id_cat_rec = c.id_cat_rec
                WHERE 
                    r.id_user = ${id_user}
                ORDER BY 
                    r.data_receita DESC;
            `;

            if (!receitas || receitas.length === 0) {
                console.log("Nenhuma receita encontrada para o usuário:", id_user);
                return {
                    success: true,
                    response: [],
                };
            }

            return {
                success: true,
                response: receitas,
            };
        } catch (error) {
            console.error("Erro ao buscar receitas:", error.message, error.stack);
            return {
                success: false,
                error: error.message,
            };
        } finally {
            await prisma.$disconnect();
        }
    }

    async buscaChart(id_user) {
        try {
            const chart = await prisma.$queryRaw`
                SELECT 
                    c.nm_cat_rec AS nome_categoria,
                    COUNT(r.id_receita) AS quantidade_receita,
                    SUM(r.valor_receita) AS valor_total
                FROM 
                    cat_rec c
                INNER JOIN 
                    receita r
                ON 
                    c.id_cat_rec = r.id_cat_rec
                WHERE 
                    r.id_user = ${id_user}
                GROUP BY 
                    c.nm_cat_rec
                ORDER BY 
                    quantidade_receita DESC;`;

            if (!chart || chart.length === 0) {
                console.log("Nenhum chart encontrado para o usuário:", id_user);
                return {
                    success: true,
                };
            }

            const chartConverted = chart.map((row) => ({
                nome_categoria: row.nome_categoria,
                quantidade_receita: Number(row.quantidade_receita),
                valor_total: row.valor_total.toString(),
            }));

            return {
                success: true,
                response: chartConverted,
            };
        } catch (error) {
            console.error("Erro ao buscar chart:", error.message, error.stack);
            return {
                success: false,
                error: error.message,
            };
        }
    }


}
