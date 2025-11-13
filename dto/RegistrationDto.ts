export interface RegistrationDTO {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
