import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, type RegisterOutput } from "@/schemas/authSchema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const inputBaseClass =
  "w-full rounded-2xl border-0 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#E75E43]";

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterOutput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterOutput) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col gap-5 sm:max-w-md"
      noValidate
    >
      <section className="flex flex-col gap-2">
        <label htmlFor="register-name" className="text-sm font-medium text-zinc-400">
          Nome
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="register-name"
              type="text"
              autoComplete="name"
              placeholder="Seu nome"
              className={cn(inputBaseClass, errors.name && "ring-2 ring-red-500")}
            />
          )}
        />
        {errors.name && (
          <span className="text-sm text-red-500">{errors.name.message}</span>
        )}
      </section>
      <section className="flex flex-col gap-2">
        <label htmlFor="register-email" className="text-sm font-medium text-zinc-400">
          Email
        </label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="register-email"
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              className={cn(inputBaseClass, errors.email && "ring-2 ring-red-500")}
            />
          )}
        />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}
      </section>
      <section className="flex flex-col gap-2">
        <label htmlFor="register-password" className="text-sm font-medium text-zinc-400">
          Senha
        </label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="register-password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              className={cn(inputBaseClass, errors.password && "ring-2 ring-red-500")}
            />
          )}
        />
        {errors.password && (
          <span className="text-sm text-red-500">{errors.password.message}</span>
        )}
      </section>
      <section className="flex flex-col gap-2">
        <label
          htmlFor="register-confirmPassword"
          className="text-sm font-medium text-zinc-400"
        >
          Confirmar senha
        </label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="register-confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              className={cn(
                inputBaseClass,
                errors.confirmPassword && "ring-2 ring-red-500"
              )}
            />
          )}
        />
        {errors.confirmPassword && (
          <span className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </section>
      <Button
        type="submit"
        className="w-full rounded-full bg-[#E75E43] py-6 text-white hover:bg-[#E75E43]/90"
      >
        Cadastrar
      </Button>
      <p className="text-center text-sm text-zinc-500">
        Já tem conta?{" "}
        <Link to="/login" className="text-[#E75E43] hover:underline">
          Entrar
        </Link>
      </p>
    </form>
  );
};

export { RegisterForm };
