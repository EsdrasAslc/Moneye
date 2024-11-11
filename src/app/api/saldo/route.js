import SaldoRepository from "@/webservice/saldo/SaldoRepository";

export async function POST(request) {
  try {
    const { id_user } = await request.json();

    const saldoRepository = new SaldoRepository();

    const result = await saldoRepository.buscaSaldo(id_user);

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
