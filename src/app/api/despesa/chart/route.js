import DespesaRepository from "@/webservice/despesa/DespesaRepository";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id_user = searchParams.get("id");

    if (!id_user) {
      return new Response(JSON.stringify({ message: "Parâmetro id é obrigatório" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const despesaRepository = new DespesaRepository();

    const result = await despesaRepository.buscaChart(id_user);

    if (result) {
      if (result.success) {
        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      } else {
        return new Response(JSON.stringify({ message: "Não foi possivel encontrar essa chart" }), {
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
