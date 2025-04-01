import AxiosInstance from "~/utils/axiosInstance";
import { DeleteResponseType } from "./wallet";

type TransactionPaymentType = {
    wallet_id:number;
    amount:number;
}
export type CreateTransactionRequestType = {
    description?:string;
    category_id:number;
    finance_group_id:string;
    transaction_type:string;
    payments:TransactionPaymentType[]
}

export type TransactionCategoryType = {
  id:number;
  name:string;
  icon:string;
  description:string;
  type:string;
}

export type EditTransactionRequestType = {
  id:number;
} & CreateTransactionRequestType;

export const getTransactionCategory = async () => {
    const res = await AxiosInstance.get<TransactionCategoryType[]>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transaction/category`
    );
    return res;
  };
  

export const createTransaction = async (data:CreateTransactionRequestType) => {
    const res = await AxiosInstance.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transaction/`,data
    );
    return res.data;
  };

  export const editTransaction = async (
    data: EditTransactionRequestType
  ) => {
    const res = await AxiosInstance.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transaction/edit`,
      data
    );
    return res.data;
  };
  export const deleteTransaction = async (transactionId: number) => {
    const res = await AxiosInstance.delete<DeleteResponseType>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transaction/${transactionId}`
    );
    return res;
  };

