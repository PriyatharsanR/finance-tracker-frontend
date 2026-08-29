import apiClient from "./apiClient";

export interface DefaultResponse<T> {
  code: string;
  title: string;
  message: string;
  data: T;
}

export interface AuthResponse {
  userId: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  token: string;
}

export const authService = {
  async register(data: unknown): Promise<DefaultResponse<AuthResponse>> {
    const response = await apiClient.post<DefaultResponse<AuthResponse>>("/api/auth/register", data);
    return response.data;
  },
  
  async login(data: unknown): Promise<DefaultResponse<AuthResponse>> {
    const response = await apiClient.post<DefaultResponse<AuthResponse>>("/api/auth/login", data);
    return response.data;
  }
};
