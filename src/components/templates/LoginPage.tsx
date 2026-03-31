import { LoginForm } from '@/components/organisms/form/LoginForm';

const LoginPage = () => {
  return (
    <main className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-zinc-950">
      <div
        className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E75E43]/10 blur-[100px]"
        aria-hidden
      />
      <section className="relative z-10 flex flex-col items-center gap-8 px-4">
        <h1 className="text-2xl font-semibold text-white sm:text-3xl">
          Entrar
        </h1>
        <LoginForm />
      </section>
    </main>
  );
};

export default LoginPage;
