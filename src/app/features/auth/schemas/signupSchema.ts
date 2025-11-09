import z from "zod";

export const signUpSchema = z
  .object({
    email: z.email("Email inválido").min(1, "Email é obrigatório"),
    password: z.string().min(8, "A senha deve conter 8 caracteres no mínimo"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
    name: z.string().min(1, "Nome é obrigatório"),
    gender: z.enum(["male", "female"], {
      error: "Gênero é obrigatório",
    }),
    beltId: z.string().min(1, "Você precisa selecionar uma faixa"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
