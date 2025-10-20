import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  name: z.string().min(1, 'Nome é obrigatório'),
  beltId: z.uuid(),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
  gender: z.enum(['male', 'female']),
  phone: z.string().optional(),
});
