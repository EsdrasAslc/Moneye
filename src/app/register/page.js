export default function Register() {
  return (
    <main>
      <section>
        <div>
          <label htmlFor="email">Digite seu email</label>
          <input
            type="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">Digite a sua senha</label>
          <input
            type="password"
            id="password"
          />
        </div>
        <p>Caso não possua conta clique aqui!</p>
        <button >Login</button>
      </section>
    </main>
  );
}
