import ReceitaRepository from "@/webservice/receita/ReceitaRepository";

export async function GET(request) {
  try {

    const { searchParams } = new URL(request.url);
    const id_user = searchParams.get("id");

    // Verifica se o parâmetro foi fornecido
    if (!id_user) {
      return new Response(JSON.stringify({ message: "Parâmetro id é obrigatório" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    const receitaRepository = new ReceitaRepository();

    const result = await receitaRepository.buscarReceitas(id_user);

    if (result) {
      if (result.success) {
        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      } else {
        return new Response(JSON.stringify({ message: "Não foi possivel encontrar buscas" }), {
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
