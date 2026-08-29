import apiClient from "./apiClient";
import { DefaultResponse } from "./authService";

export interface CategoryResponse {
  id: number;
  name: string;
  icon: string;
  type: "INCOME" | "EXPENSE";
}

export const categoryService = {
  async getAllCategories(): Promise<DefaultResponse<CategoryResponse[]>> {
    const response = await apiClient.get<DefaultResponse<CategoryResponse[]>>("/api/categories");
    return response.data;
  }
};
