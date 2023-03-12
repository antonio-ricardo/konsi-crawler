import { InferType, object, setLocale, string } from 'yup'

setLocale({
  mixed: {
    default: 'O campo ${path} é inválido',
    required: 'O campo ${path} é obrigatório',
    oneOf: 'O campo ${path} deve ser um dos seguintes valores: ${values}',
    notOneOf:
      'O campo ${path} não pode ser um dos seguintes valores: ${values}',
    notType: 'O campo ${path} tem que ser do tipo ${type}',
    defined: 'O campo ${path} não pode ser indefinido',
  },
  string: {
    length: 'O campo ${path} deve ter exatamente ${length} caracteres',
    min: 'O campo ${path} deve ter pelo menos ${min} caracteres',
    max: 'O campo ${path} deve ter no máximo ${max} caracteres',
    email: 'O campo ${path} tem o formato de e-mail inválido',
    url: 'O campo ${path} deve ter um formato de URL válida',
    trim: 'O campo ${path} não deve conter espaços no início ou no fim.',
    lowercase: 'O campo ${path} deve estar em maiúsculo',
    uppercase: 'O campo ${path} deve estar em minúsculo',
  },
})

const getBenefitsForCpfSchema = object({
  login: string().required(),
  password: string().required(),
  cpf: string().required(),
}).required()

export const getBenefitsForCpfDto = (data: unknown) => {
  const { login, cpf, password } = getBenefitsForCpfSchema.validateSync(data, {
    stripUnknown: true,
  })

  return { login, cpf, password }
}

export type GetBenefitsForCpfDto = InferType<typeof getBenefitsForCpfSchema>;
