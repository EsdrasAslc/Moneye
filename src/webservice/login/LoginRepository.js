import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class LoginRepository {

  async login(email, senha) {
    const user = await prisma.$queryRaw`SELECT * FROM User WHERE email_user = ${email}`;
    prisma.$disconnect()
    if (!user || user.length === 0) {
      return false;
    }

    if (user[0].pass === senha) {
      return {
        id: user[0].id_user,
      };
    } else {
      return false;
    }
  }
}
