import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class SaldoRepository {

  async buscaSaldo(id_user) {
    const saldo = await prisma.$queryRaw`SELECT saldo FROM User WHERE id_user = ${id_user}`;
    prisma.$disconnect()
    if (!saldo || saldo.length === 0) {
      return {
        success: false
      };
    } else {
      return {
        success: true,
        saldo: saldo[0].saldo
      }
    }
  }

  async buscaChart(id_user) {
    try {
      const chart = await prisma.$queryRaw`
            SELECT 
              (SELECT SUM(d.valor_despesa) FROM despesa d WHERE d.id_user = ${id_user}) AS valor_despesa,
              (SELECT SUM(r.valor_receita) FROM receita r WHERE r.id_user = ${id_user}) AS valor_receita;`;

      if (!chart || chart.length === 0) {
        console.log("Nenhum chart encontrado para o usuário:", id_user);
        return {
          success: true,
          response: [] // Retorne um array vazio caso não haja resultados
        };
      }

      // Como o resultado é um único objeto, basta acessar as propriedades diretamente
      const row = chart[0]; // Obtém o único objeto retornado pela consulta
      const chartConverted = {
        valor_despesa: row.valor_despesa,
        valor_receita: row.valor_receita,
      };

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
