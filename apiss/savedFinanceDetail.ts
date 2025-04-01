import AxiosInstance from "~/utils/axiosInstance";
import { DeleteResponseType } from "./wallet";

export type SavedFinanceDetailType = {
  id: number;
  description: string;
  category_id: number;
  finance_group_id: string;
  transaction_type: string;
  amount: number;
  wallet_id: number;
  tobe_pasted: string[];
};

export type GetSavedFinanceDetailResponseType = {
  data: SavedFinanceDetailType[];
};

export type CreateSavedFinanceDetailRequestType = {
  description: string;
  category_id: number;
  finance_group_id: string;
  transaction_type: string;
  amount: number;
  wallet_id: number;
  tobe_pasted?: string[];
};

export type EditSavedFinanceDetailRequestType = {
  id: number;
} & CreateSavedFinanceDetailRequestType;

export const getSavedFinanceDetail = async (financeId: string) => {
  const res = await AxiosInstance.get<GetSavedFinanceDetailResponseType>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/saved-finance-detail/${financeId}`
  );
  return res;
};

export const createSavedFinanceDetail = async (
  data: CreateSavedFinanceDetailRequestType
) => {
  const res = await AxiosInstance.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/saved-finance-detail/`,
    data
  );
  return res.data;
};
export const editSavedFinanceDetail = async (
  data: EditSavedFinanceDetailRequestType
) => {
  const res = await AxiosInstance.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/saved-finance-detail/edit`,
    data
  );
  return res.data;
};
export const deleteSavedFinanceDetail = async (financeId: number) => {
  const res = await AxiosInstance.delete<DeleteResponseType>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/saved-finance-detail/${financeId}`
  );
  return res;
};
