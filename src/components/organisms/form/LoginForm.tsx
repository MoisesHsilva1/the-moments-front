import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginOutput } from "@/schemas/authSchema";
import { Button } from "@/components/ui/button";


const inputBaseClass =
  "w-full rounded-2xl border-0 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#E75E43]";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginOutput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginOutput) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col gap-5 sm:max-w-md"
      noValidate
    >
      <section className="flex flex-col gap-2">
        <label htmlFor="login-email" className="text-sm font-medium text-zinc-400">
          Email
        </label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              className={`${inputBaseClass} ${errors.email ? "ring-2 ring-red-500" : ""}`}
            />
          )}
        />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}
      </section>
      <section className="flex flex-col gap-2">
        <label htmlFor="login-password" className="text-sm font-medium text-zinc-400">
          Senha
        </label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className={`${inputBaseClass} ${errors.password ? "ring-2 ring-red-500" : ""}`}
            />
          )}
        />
        {errors.password && (
          <span className="text-sm text-red-500">{errors.password.message}</span>
        )}
      </section>
      <Button
        type="submit"
        className="w-full rounded-full bg-[#E75E43] py-6 text-white hover:bg-[#E75E43]/90"
      >
        Entrar
      </Button>
      <p className="text-center text-sm text-zinc-500">
        Não tem conta?{" "}
        <Link to="/register" className="text-[#E75E43] hover:underline">
          Cadastre-se
        </Link>
      </p>
    </form>
  );
};

export { LoginForm };
