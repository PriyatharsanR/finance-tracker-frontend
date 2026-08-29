import apiClient from "./apiClient";
import { DefaultResponse } from "./authService";

export interface TransactionRequest {
  transactionDate: string; // YYYY-MM-DD
  categoryId: number;
  type: "INCOME" | "EXPENSE";
  amount: number;
  note: string;
}

export interface TransactionResponse {
  id: number;
  transactionDate: string;
  categoryId: number;
  categoryName: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export const transactionService = {
  async createTransaction(data: TransactionRequest): Promise<DefaultResponse<TransactionResponse>> {
    const response = await apiClient.post<DefaultResponse<TransactionResponse>>("/api/transactions", data);
    return response.data;
  },

  async getAllTransactions(): Promise<DefaultResponse<TransactionResponse[]>> {
    const response = await apiClient.get<DefaultResponse<TransactionResponse[]>>("/api/transactions");
    return response.data;
  },

  async deleteTransaction(id: number): Promise<DefaultResponse<TransactionResponse>> {
    const response = await apiClient.delete<DefaultResponse<TransactionResponse>>(`/api/transactions/${id}`);
    return response.data;
  }
};
