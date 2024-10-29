import RegisterRepository from "@/webservice/register/RegisterRepository";

export async function POST(request) {
  try {

    const { id_user, name, profissao, genero, idade } = await request.json();

    const registerRepository = new RegisterRepository();

    const result = await registerRepository.registerUserInfo(id_user, name, profissao, genero, idade);

    if (result) {
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ message: "Informação inválida" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Erro no servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
