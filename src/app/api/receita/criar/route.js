import ReceitaRepository from "@/webservice/receita/ReceitaRepository";

export async function POST(request) {
  try {
    const { id_user, categoria, valor, data } = await request.json();

    const receitaRepository = new ReceitaRepository();

    const result = await receitaRepository.criaReceita(id_user, categoria, valor, data);

    if (result) {
      if (result.success) {
        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      } else {
        return new Response(JSON.stringify({ message: "Não foi possivel encontrar esse usuário" }), {
          status: 401,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Erro no servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
