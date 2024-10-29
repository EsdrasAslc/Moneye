import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class RegisterRepository {

    async registerUser(email, senha) {
        try {
            const user = await prisma.user.create({
                data: {
                    email_user: email,
                    pass: senha,
                },
            });

            return { success: true, message: "Usuário registrado com sucesso.", id: user.id_user };
        } catch (error) {
            if (error.code === 'P2002') {
                return { success: false, message: "Este e-mail já está em uso.", description: error.message };
            }
            return { success: false, message: "Erro ao registrar usuário.", description: error.message };
        } finally {
            await prisma.$disconnect();
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
