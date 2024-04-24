import { z } from 'zod';

export const CreateProfileDtoSchema = z.object({
  email: z.string().min(1, '이메일을 입력하세요.').email('올바른 이메일 형식이 아닙니다.'),
  name: z.string().min(2, '닉네임은 필수 입니다.'),
  authId: z.string().optional(),
  profileImage: z.any().optional(),
});

export const EditProfileDtoSchema = z.object({
  name: z.string().min(2, '닉네임은 필수 입니다.'),
  profileImage: z.any().optional(),
});
