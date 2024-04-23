import { z } from 'zod';

export const LoginUserDtoSchema = z.object({
  email: z.string().min(1, '이메일을 입력하세요.').email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(1, '비밀번호를 입력하세요.'),
});

export const SignUpUserDtoSchema = z
  .object({
    name: z.string().min(2, '닉네임은 필수 입니다.'),
    email: z.string().min(1, '이메일은 필수입니다.').email('올바른 이메일 형식이 아닙니다.'),
    profileImage: z.any(),
    confirmPassword: z.any(),
    password: z
      .string()
      .min(8, '비밀번호는 8글자 이상 입력해야 합니다.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        '비밀번호는 영문자, 숫자를 각각 하나 이상 포함해야 합니다.'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });
