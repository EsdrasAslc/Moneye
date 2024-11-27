import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class UserRepository {

  async buscaUser(id_user) {
    const user = await prisma.$queryRaw`SELECT nm_user as nome, prof_user as profissao FROM user_info WHERE id_user = ${id_user}`;
    prisma.$disconnect()
    if (!user || user.length === 0) {
      return {
        success: false
      };
    } else {
        return {
            success: true,
            nome: user[0].nome,
            profissao: user[0].profissao
        }
    } 
  }

}
