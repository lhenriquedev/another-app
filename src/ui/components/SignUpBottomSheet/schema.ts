import z from 'zod';

export const signUpSchema = z.object({
  email: z.email().min(1, 'Email é obrigatório'),
  password: z.string().min(8, 'Senha é obrigatória'),
  name: z.string().min(1, 'Nome é obrigatório'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatório'),
  phone: z.string().optional(),
  gender: z.enum(['male', 'female'], {
    error: 'Gênero é obrigatório',
  }),
  beltId: z.string().min(1, 'Você precisa selecionar uma faixa'),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
