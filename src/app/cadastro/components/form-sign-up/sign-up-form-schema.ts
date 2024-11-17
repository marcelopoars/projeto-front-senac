import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z.string().min(1, { message: "Por favor, insira o seu nome." }),
  email: z
    .string()
    .min(1, { message: "O campo de email é obrigatório." })
    .email({
      message: "Insira um endereço de email válido.",
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
        message: "O CPF ou CNPJ inválido.",
      }
    ),
  category: z
    .string()
    .min(1, { message: "Por favor, selecione uma categoria." }),
  description: z
    .string()
    .min(1, { message: "Descreva seus serviços para completar o cadastro." }),
  socialMedia: z
    .string()
    .min(1, { message: "Insira sua mídia social." })
    .refine(
      (url) => {
        try {
          const parsedUrl = new URL(url);
          return ["http:", "https:"].includes(parsedUrl.protocol);
        } catch {
          return false;
        }
      },
      { message: "Insira uma URL válida." }
    ),
  website: z
    .string()
    .min(1, { message: "Insira seu site." })
    .refine(
      (url) => {
        try {
          const parsedUrl = new URL(url);
          return ["http:", "https:"].includes(parsedUrl.protocol);
        } catch {
          return false;
        }
      },
      { message: "Insira uma URL válida." }
    ),
  password: z.string().min(1, { message: "Por favor, insira sua senha." }),
  confirmPassword: z
    .string()
    .min(1, { message: "Por favor, insira a confirmação da senha." }),
});
