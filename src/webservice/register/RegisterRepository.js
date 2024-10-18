import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class RegisterRepository {

    async registerUser(email, senha) {
        try {
            const user = await prisma.$queryRaw`INSERT INTO user(email_user, pass) VALUES (${email}, ${senha})`;

            prisma.$disconnect()
            return { success: true, message: "Usuário registrado com sucesso." };v   
        } catch (error) {
            if (error.code === 'P2002') {
                prisma.$disconnect()
                return { success: false, message: "Este e-mail já está em uso." };
            }
            prisma.$disconnect()
            return { success: false, message: "Erro ao registrar usuário." };
        }
    }

    async registerUserInfo(id_user, nome, profissao, genero, idade) {
        try {
            const userInfo = await prisma.$queryRaw`INSERT INTO user_info(id_user, nm_user, prof_user, gnr_user, idade_user) VALUES (${id_user}, ${nome}, ${profissao}, ${genero}, ${idade})`

            return { success: true, message: "Informações do usuário registradas com sucesso." };
        } catch (error) {
            if (error.code === 'P2002') {
                prisma.$disconnect()
                return { success: false, message: "Este usuario já possui informações." };
            }
            prisma.$disconnect()
            return { success: false, message: "Erro ao registrar usuário." };
        }
    }
}
  
