export interface ResetPasswordRequest {
  password: string;
  confirmPassword: string;
  userId: number;
}
