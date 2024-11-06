import LoginRepository from "@/webservice/login/LoginRepository";

export async function POST(request) {
  try {

    const { email, senha } = await request.json();

    const loginRepository = new LoginRepository();

    const result = await loginRepository.login(email, senha);

    if (result) {
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ message: "Email ou senha inválidos"}), {
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
