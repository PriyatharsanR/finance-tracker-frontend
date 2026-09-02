import apiClient from "./apiClient";

export interface DefaultResponse<T> {
  code: string;
  title: string;
  message: string;
  data: T;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string; // ISO string Date from Java LocalDateTime
}

export const userService = {
  async getCurrentUserProfile(): Promise<DefaultResponse<UserProfile>> {
    const response = await apiClient.get<DefaultResponse<UserProfile>>("/api/users/me");
    return response.data;
  }
};
