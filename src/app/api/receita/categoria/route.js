import CategoriaRepository from "@/webservice/categoria/CategoriaRepository";

export async function GET() {
  try {
    const categoriaRepository = new CategoriaRepository();

    const result = await categoriaRepository.catReceita();

    if (result) {
      if (result.success) {
        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      } else {
        return new Response(JSON.stringify({ message: "Não foi possivel encontrar essa categoria" }), {
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
