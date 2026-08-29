import apiClient from "./apiClient";

export interface DashboardResponse {
  currentUser: string;
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
  currentMonthIncome: number;
  currentMonthExpenses: number;
}

export interface DefaultResponse<T> {
  code: string;
  title: string;
  message: string;
  data: T;
}

export const dashboardService = {
  getSummary: async (): Promise<DashboardResponse> => {
    const response = await apiClient.get<DefaultResponse<DashboardResponse>>("/api/dashboard");
    return response.data.data;
  },
};
