"use client";

import { ErrorMessage } from "@/components";
import { api } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Por favor, insira o seu email." })
    .email({ message: "Formato de email inválido." }),
  password: z.string().min(1, { message: "Por favor, insira sua senha." }),
});

type FormInputs = z.infer<typeof loginSchema>;

export function FormLogin() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormInputs>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitForm: SubmitHandler<FormInputs> = async (data) => {
    try {
      const response = await api.post("/login", {
        email: data.email,
        password: data.password,
      });

      const { token, usuario } = response.data;

      document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24}`;

      localStorage.setItem("userName", usuario.nome);

      reset();
      setApiError(null);

      router.push("/agenda");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      setApiError(error.response?.data?.message || "Erro ao fazer login.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="w-full max-w-[300px] flex flex-col"
    >
      <div className="flex flex-col pb-8">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          className={`border p-3 rounded-lg ${
            errors.email || apiError ? "border-red-500" : ""
          }`}
          id="email"
          type="email"
          placeholder="email"
          autoComplete="email"
          aria-invalid={errors.email?.message ? "true" : "false"}
          aria-describedby={errors.email?.message ? "email-error" : undefined}
          {...register("email")}
        />
        <ErrorMessage error={errors.email?.message} />
      </div>
      <div className="flex flex-col pb-8">
        <label htmlFor="password" className="sr-only">
          Senha
        </label>
        <input
          className={`border p-3 rounded-lg ${
            errors.password || apiError ? "border-red-500" : ""
          }`}
          id="password"
          type="password"
          placeholder="Senha"
          autoComplete="current-password"
          aria-invalid={errors.password?.message ? "true" : "false"}
          aria-describedby={
            errors.password?.message ? "password-error" : undefined
          }
          {...register("password")}
        />
        <ErrorMessage error={errors.password?.message} />
      </div>
      <button
        type="submit"
        className={twMerge(
          "flex-1 flex justify-center items-center bg-sky-500 p-3 rounded-lg hover:bg-sky-600 transition",
          !isValid ? "disabled:bg-slate-300" : ""
        )}
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? (
          <CircleNotch className="size-6 text-white/50 animate-spin" />
        ) : (
          <span className="text-white text-center font-semibold">Entrar</span>
        )}
      </button>

      {apiError && <ErrorMessage error={apiError} />}
    </form>
  );
}
