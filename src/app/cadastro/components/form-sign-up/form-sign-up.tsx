"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { ErrorMessage } from "@/components";
import { normalizeCpfOrCnpj, normalizePhoneNumber } from "@/utils";
import { api } from "@/lib";

const signUpFormSchema = z.object({
  name: z.string().min(1, { message: "Por favor, insira o seu nome." }),
  email: z
    .string()
    .min(1, { message: "O campo de email é obrigatório." })
    .email({
      message: "Insira um endereço de email válido, ex: nome@dominio.com.",
    }),
  phone: z
    .string()
    .min(14, { message: "Por favor, insira um número de telefone válido." }),
  cpfOrCnpj: z
    .string()
    .min(1, { message: "O CPF ou CNPJ é obrigatório para o cadastro." })
    .refine(
      (value) => {
        const cleanedValue = value.replace(/\D/g, "");
        return cleanedValue.length === 14 || cleanedValue.length === 18;
      },
      {
        message: "O CPF deve ter 11 digitos e o CNPJ deve ter 14 dígitos.",
      }
    ),
  category: z
    .string()
    .min(1, { message: "Por favor, selecione uma categoria." }),
  description: z
    .string()
    .min(1, { message: "Descreva seus serviços para completar o cadastro." }),
  password: z.string().min(1, { message: "Por favor, insira sua senha." }),
  confirmPassword: z
    .string()
    .min(1, { message: "Por favor, insira a confirmação da senha." }),
  social_media: z
    .string()
    .min(1, { message: "Insira sua midia social." }),
  site: z
    .string()
    .min(1, { message: "Insira seu Web Site." }),
});

type SignUpFormInputs = z.infer<typeof signUpFormSchema>;

export function FormSignUp() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm<SignUpFormInputs>({
    mode: "onTouched",
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cpfOrCnpj: "",
      category: "",
      social_media: "",
      site: "",
      description: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitForm: SubmitHandler<SignUpFormInputs> = async (data) => {
    const {
      name,
      email,
      phone,
      cpfOrCnpj,
      social_media,
      site,
      password,
      confirmPassword,
      category,
    } = data;

    const newProvider = {
      nome: name,
      email: email,
      senha: password,
      telefone: phone,
      cpf_cnpj: cpfOrCnpj,
      atividade: "Desenvolvedor de Software",
      servico: "Criação de sites e aplicações",
      logo_base64:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...base64string",
      social_media: social_media,
      website: site,
      cidade: "Porto Alegre",
      estado: {
        nome: "Rio Grande do Sul",
        sigla: "RS",
      },
      ritmo_trabalho: [
        {
          dia_semana: "segunda",
          hora_inicio: "08:00:00",
          hora_fim: "18:00:00",
        },
        {
          dia_semana: "terça",
          hora_inicio: "08:00:00",
          hora_fim: "18:00:00",
        },
        {
          dia_semana: "quarta",
          hora_inicio: "08:00:00",
          hora_fim: "18:00:00",
        },
        {
          dia_semana: "quinta",
          hora_inicio: "08:00:00",
          hora_fim: "18:00:00",
        },
        {
          dia_semana: "sexta",
          hora_inicio: "08:00:00",
          hora_fim: "18:00:00",
        },
      ],
      categoria_id: Number(category),
      subcategoria_id: 2,
      tipo_agenda: null,
    };

    const response = await api.post(
      "/gestao/api/management/register",
      newProvider
    );

    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "As senhas não coincidem.",
      });
      return;
    }

    const cleanedPhone = data.phone.replace(/\D/g, "");
    const cleanedCpfOrCnpj = data.cpfOrCnpj.replace(/\D/g, "");

    const cleanedData = {
      ...data,
      phone: cleanedPhone,
      cpfOrCnpj: cleanedCpfOrCnpj,
    };

    console.log(cleanedData);

    // router.push("/prestador");
  };

  const data = watch();

  const { phone, cpfOrCnpj, password, confirmPassword } = data;

  useEffect(() => {
    if (phone) setValue("phone", normalizePhoneNumber(phone));
    if (cpfOrCnpj) setValue("cpfOrCnpj", normalizeCpfOrCnpj(cpfOrCnpj));
  }, [cpfOrCnpj, phone, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="flex flex-col max-w-[400px]"
    >
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
          aria-invalid={errors.email?.message ? "true" : "false"}
          aria-describedby={errors.email?.message ? "email-error" : undefined}
          {...register("email")}
        />
        <ErrorMessage error={errors.email?.message} />
      </div>
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

      <div className="flex flex-col gap-2 pb-8">
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
        <label htmlFor="social_media" className="sr-only">
          Midia Social
        </label>
        <input
          id="social_media"
          className="w-full border p-3 rounded-lg"
          placeholder="Insira seu social_media"
          aria-describedby={
            errors.social_media ? "social_media-error" : undefined
          }
          {...register("social_media")}
        />
        <ErrorMessage error={errors.social_media?.message} />
      </div>

      <div className="pb-8">
        <label htmlFor="site" className="sr-only">
          Insira seu Site
        </label>
        <input
          id="site"
          className="w-full border p-3 rounded-lg"
          placeholder="Insira seu site"
          aria-describedby={
            errors.site ? "site-error" : undefined
          }
          {...register("site")}
        />
        <ErrorMessage error={errors.site?.message} />
      </div>

      <div className="pb-8">
        <label htmlFor="description" className="sr-only">
          Descrição do serviço
        </label>
        <textarea
          id="description"
          className="w-full border p-3 rounded-lg"
          placeholder="Descreva aqui os seus serviços."
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
          {...register("description")}
        />
        <ErrorMessage error={errors.description?.message} />
      </div>

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

      <button
        type="submit"
        className="flex-1 bg-sky-500 p-3 rounded-lg text-white text-center font-semibold hover:bg-sky-600 disabled:bg-slate-300 transition"
        disabled={!isValid}
      >
        Cadastrar
      </button>
    </form>
  );
}
