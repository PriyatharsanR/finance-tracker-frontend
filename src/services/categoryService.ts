import apiClient from "./apiClient";
import { DefaultResponse } from "./authService";

export interface CategoryResponse {
  id: number;
  name: string;
  icon: string;
  type: "INCOME" | "EXPENSE";
  active: boolean;
}

export interface CategoryRequest {
  name: string;
  type: "INCOME" | "EXPENSE";
}

export const categoryService = {
  async getAllCategories(): Promise<DefaultResponse<CategoryResponse[]>> {
    const response = await apiClient.get<DefaultResponse<CategoryResponse[]>>("/api/categories");
    return response.data;
  },

  async createCategory(data: CategoryRequest): Promise<DefaultResponse<CategoryResponse>> {
    const response = await apiClient.post<DefaultResponse<CategoryResponse>>("/api/categories", data);
    return response.data;
  },

  async updateCategory(id: number, data: CategoryRequest): Promise<DefaultResponse<CategoryResponse>> {
    const response = await apiClient.put<DefaultResponse<CategoryResponse>>(`/api/categories/${id}`, data);
    return response.data;
  },

  async deleteCategory(id: number): Promise<DefaultResponse<void>> {
    const response = await apiClient.delete<DefaultResponse<void>>(`/api/categories/${id}`);
    return response.data;
  }
};
