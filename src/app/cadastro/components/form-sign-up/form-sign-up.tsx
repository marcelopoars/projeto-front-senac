"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import { ErrorMessage } from "@/components";
import { api } from "@/lib";
import { normalizeCpfOrCnpj, normalizePhoneNumber } from "@/utils";
import { signUpFormSchema } from "./sign-up-form-schema";
import { workRhythm } from "./work-rhythm";
import Link from "next/link";

type SignUpFormInputs = z.infer<typeof signUpFormSchema>;

export function FormSignUp() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpFormInputs>({
    mode: "onTouched",
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmitForm: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "As senhas não coincidem.",
        });
        return;
      }

      const cleanedPhone = data.phone.replace(/\D/g, "");
      const cleanedCpfOrCnpj = data.cpfOrCnpj.replace(/\D/g, "");

      const newProvider = {
        nome: data.name,
        email: data.email,
        senha: data.password,
        telefone: cleanedPhone,
        cpf_cnpj: cleanedCpfOrCnpj,
        categoria_id: Number(data.category),
        subcategoria_id: Number(data.category),
        atividade: "null",
        servico: data.description,
        logo_base64:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...base64string",
        social_media: data.socialMedia,
        website: data.website,
        cidade: "Porto Alegre",
        estado: {
          nome: "Rio Grande do Sul",
          sigla: "RS",
        },
        ritmo_trabalho: workRhythm,
        tipo_agenda: null,
      };

      const response = await api.post("/register", newProvider);

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("Prestador cadastrado com sucesso!");
        setApiError(null);
        reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setApiError(
        error.response?.data?.message ||
          "Erro ao cadastrar o prestador. Tente novamente."
      );
      setSuccessMessage(null);
    }
  };

  const data = watch();
  const { phone, cpfOrCnpj } = data;

  useEffect(() => {
    if (phone) setValue("phone", normalizePhoneNumber(phone));
    if (cpfOrCnpj) setValue("cpfOrCnpj", normalizeCpfOrCnpj(cpfOrCnpj));
  }, [cpfOrCnpj, phone, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="w-full flex flex-col max-w-[640px]"
    >
      {successMessage && (
        <div className="mb-4 ">
          <p className="bg-green-100 text-green-700 p-3 rounded-lg">
            {successMessage}{" "}
            <Link
              href="/login"
              className="font-bold underline underline-offset-4"
            >
              Efetuar login
            </Link>
          </p>
        </div>
      )}

      {apiError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {apiError}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="pb-8">
          <label htmlFor="name" className="sr-only">
            Nome
          </label>
          <input
            className={`w-full border p-3 rounded-lg ${
              errors.name ? "border-red-500" : ""
            }`}
            id="name"
            type="text"
            placeholder="Nome"
            autoComplete="name"
            autoCapitalize="words"
            {...register("name")}
          />
          <ErrorMessage error={errors.name?.message} />
        </div>

        <div className="pb-8">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            className={`w-full border p-3 rounded-lg ${
              errors.email ? "border-red-500" : ""
            }`}
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            inputMode="email"
            aria-invalid={errors.email?.message ? "true" : "false"}
            aria-describedby={errors.email?.message ? "email-error" : undefined}
            {...register("email")}
          />
          <ErrorMessage error={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="pb-8">
          <label htmlFor="phone" className="sr-only">
            Telefone ou WhatsApp
          </label>
          <input
            className={`w-full border p-3 rounded-lg ${
              errors.phone ? "border-red-500" : ""
            }`}
            id="phone"
            type="tel"
            placeholder="Telefone / WhatsApp"
            autoComplete="phone"
            inputMode="tel"
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          <ErrorMessage error={errors.phone?.message} />
        </div>

        <div className="pb-8">
          <label htmlFor="cpfOrCnpj" className="sr-only">
            CPF ou CNPJ
          </label>
          <input
            className={`w-full border p-3 rounded-lg ${
              errors.cpfOrCnpj ? "border-red-500" : ""
            }`}
            id="cpfOrCnpj"
            type="text"
            placeholder="CPF ou CNPJ"
            autoComplete="off"
            aria-describedby={errors.cpfOrCnpj ? "cpfOrCnpj-error" : undefined}
            {...register("cpfOrCnpj")}
          />
          <ErrorMessage error={errors.cpfOrCnpj?.message} />
        </div>
      </div>

      <div className="flex flex-col pb-8">
        <label htmlFor="category" className="sr-only">
          Categoria
        </label>
        <select
          className={`cursor-pointer border p-3 hover:bg-zinc-100/80 text-base rounded-lg ${
            errors.category ? "border-red-500" : ""
          }`}
          id="category"
          aria-describedby={errors.category ? "category-error" : undefined}
          {...register("category")}
        >
          <option value="">Selecione uma categoria</option>
          <option value="1">Automotivo</option>
          <option value="2">Beleza</option>
          <option value="3">Consultoria</option>
          <option value="4">Fotografia</option>
          <option value="5">Jardinagem</option>(55) 51981-8381
          <option value="6">Limpeza</option>
          <option value="7">Manutenção</option>
          <option value="Outros">Outros</option>
        </select>
        <ErrorMessage error={errors.category?.message} />
      </div>

      <div className="pb-8">
        <label htmlFor="description" className="sr-only">
          Descrição do serviço
        </label>
        <textarea
          className={`w-full border p-3 rounded-lg ${
            errors.description ? "border-red-500" : ""
          }`}
          id="description"
          placeholder="Descreva aqui os seus serviços."
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
          {...register("description")}
        />
        <ErrorMessage error={errors.description?.message} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="pb-8">
          <label htmlFor="socialMedia" className="sr-only">
            Midia Social
          </label>
          <input
            className={`w-full border p-3 rounded-lg ${
              errors.password ? "border-red-500" : ""
            }`}
            id="socialMedia"
            type="url"
            placeholder="Insira o link da sua rede social"
            aria-describedby={
              errors.socialMedia ? "socialMedia-error" : undefined
            }
            {...register("socialMedia")}
          />
          <ErrorMessage error={errors.socialMedia?.message} />
        </div>

        <div className="pb-8">
          <label htmlFor="website" className="sr-only">
            Insira seu Site
          </label>
          <input
            className={`w-full border p-3 rounded-lg ${
              errors.password ? "border-red-500" : ""
            }`}
            id="website"
            type="url"
            placeholder="Insira o link do seu site"
            aria-describedby={errors.website ? "website-error" : undefined}
            {...register("website")}
          />
          <ErrorMessage error={errors.website?.message} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="pb-8">
          <label htmlFor="password" className="sr-only">
            Senha
          </label>
          <input
            className={`w-full border p-3 rounded-lg ${
              errors.password ? "border-red-500" : ""
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

        <div className="pb-8">
          <label htmlFor="confirmPassword" className="sr-only">
            Confirmar senha
          </label>
          <input
            className={`w-full border p-3 rounded-lg ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
            id="confirmPassword"
            type="password"
            placeholder="Confirmar senha"
            autoComplete="current-confirmPassword"
            aria-invalid={errors.confirmPassword?.message ? "true" : "false"}
            aria-describedby={
              errors.confirmPassword?.message
                ? "confirmPassword-error"
                : undefined
            }
            {...register("confirmPassword")}
          />
          <ErrorMessage error={errors.confirmPassword?.message} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <button
          type="button"
          className="flex-1 bg-sky-200 p-3 rounded-lg text-center font-semibold hover:bg-sky-300 disabled:bg-slate-300 transition"
          onClick={() => reset()}
        >
          Limpar
        </button>

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
      </div>
    </form>
  );
}
