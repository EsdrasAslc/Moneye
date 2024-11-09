import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class LoginRepository {

  async login(email, senha) {
    const user = await prisma.$queryRaw`SELECT * FROM User WHERE email_user = ${email}`;
    prisma.$disconnect()
    if (!user || user.length === 0) {
      return {
        success: false
      };
    }

    if (user[0].pass === senha) {
      return {
        success: true,
        id: user[0].id_user
      };
    } else {
      return {
        success: false
      };
    }
  }
}
