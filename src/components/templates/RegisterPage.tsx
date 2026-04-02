import { RegisterForm } from "@/components/organisms/form/RegisterForm";
import type React from "react";
import { FieldGroup, FieldLegend, FieldSet } from "../ui/field";

const RegisterPage: React.FC = () => {
  return (
    <FieldGroup className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-zinc-950">
      <FieldSet className="relative z-10 flex flex-col items-center gap-8 px-4 py-8">
        <FieldLegend className="text-2xl font-semibold text-white sm:text-3xl">
          Cadastrar
        </FieldLegend>

        <RegisterForm />
      </FieldSet>
    </FieldGroup>
  );
};

export default RegisterPage;
