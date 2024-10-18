import RegisterRepository from "@/webservice/register/RegisterRepository";

export async function POST(request) {
  try {

    const { email, senha } = await request.json();

    const registerRepository = new RegisterRepository();

    const result = await registerRepository.registerUser(email, senha);

    if (result) {
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ message: "Email ou senha inválidos" }), {
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
