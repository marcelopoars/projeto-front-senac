"use client";

import { ErrorMessage } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório." })
    .email({ message: "Formato de email inválido." }),
  password: z
    .string()
    .min(1, { message: "Senha é obrigatório." }),
});

type FormInputs = z.infer<typeof loginSchema>;

export function FormLogin() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitForm: SubmitHandler<FormInputs> = (data) => {
    console.log(data, errors.email?.message);
    router.push("/agenda");
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <form
      className="w-full max-w-[300px] flex flex-col"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <div className="flex flex-col pb-8">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          autoComplete="email"
          aria-invalid={errors.email?.message ? "true" : "false"}
          aria-describedby={errors.email?.message ? "email-error" : undefined}
          {...register("email")}
        />
        <ErrorMessage error={errors?.email?.message} />
      </div>
      <div className="flex flex-col pb-8">
        <label htmlFor="password" className="sr-only">
          Senha
        </label>
        <input
          id="password"
          type="password"
          placeholder="Senha"
          className="border p-3 rounded-lg"
          autoComplete="current-password"
          aria-invalid={errors.password?.message ? "true" : "false"}
          aria-describedby={
            errors.password?.message ? "password-error" : undefined
          }
          {...register("password")}
        />
        <ErrorMessage error={errors?.password?.message} />
      </div>
      <button
        type="submit"
        className="bg-sky-500 p-3 rounded-lg text-center font-semibold disabled:bg-slate-300"
        disabled={!isValid}
      >
        Entrar
      </button>
    </form>
  );
}
