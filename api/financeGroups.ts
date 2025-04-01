import AxiosInstance from "~/utils/axiosInstance";
import { WalletType } from "./wallet";
import { TransactionDataType } from "~/const/table";

export type FinanceGroupType = {
  id:number;
  name:string;
  description:string;
  icon:string;
  user_Id:number;
  finance_type_id:number;
  max_daily_expense:number;
  max_monthly_expense:number;
  max_yearly_expense:number;
  earning_goal_amount:number;
  earning_goal_date:number;
  created_at:string;
  updated_at:string;
}

export type CreateFinanceGroupRequestType = {
    name:string;
    user_id:string;
    balance?:number;
    finance_type_id:number;
}

export type EditFinanceWalletRequestType = {
  finance_id:string;
  wallet_ids:number[] | undefined;
}

export type GetAllUserFinanceGroupType = {
  data: (FinanceGroupType &{
    wallet:WalletType[]
  })[]
}
export type GetUserFinanceGroup = {
  data: (FinanceGroupType &{
    wallet:WalletType[]
  })
}

export type GetFinanceGroupTransactionType = {
  data: TransactionDataType[]
}

export type GetTransactionsFilter = {
  time?:string;
  category?:string;
  wallet?:string;
}

export const getAllUserFinanceGroup = async (userId:string) => {
  const res = await AxiosInstance.get<GetAllUserFinanceGroupType>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/finance-group/all/${userId}`
  );
  return res;
};

export const getFinanceGroup = async (userId:string) => {
  const res = await AxiosInstance.get<GetUserFinanceGroup>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/finance-group/${userId}`
  );
  return res;
};

export const getFinanceGroupWallet = async (financeId:string) => {
  const res = await AxiosInstance.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/finance-group/wallet/${financeId}`
  );
  return res;
};

export const getFinanceGroupTransaction = async (financeId:string,params?:GetTransactionsFilter) => {
  const res = await AxiosInstance.get<GetFinanceGroupTransactionType>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/finance-group/transaction/${financeId}`,{
      params
    }
  );
  return res;
};


export const createFinanceGroup = async (data:CreateFinanceGroupRequestType) => {
  const res = await AxiosInstance.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/finance-group/`,data
  );
  return res.data;
};

export const editFinanceWallet = async (data:EditFinanceWalletRequestType) => {
  const res = await AxiosInstance.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/finance-group/edit-wallet`,data
  );
  return res.data;
};