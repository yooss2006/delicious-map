export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignUpFormValues {
  profileImage: FileList | null;
  email: string;
  password: string;
  confirmPassword?: string;
  nickname: string;
}
