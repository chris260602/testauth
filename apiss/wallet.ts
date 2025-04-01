import AxiosInstance from "~/utils/axiosInstance";
import { FinanceGroupType } from "./financeGroups";

export type WalletType = {
  id:number;
  name:string;
  user_id:number;
  balance:number;
  wallet_type:WalletTypeType;
  is_hidden:boolean;
  created_at:string;
  updated_at:string;
}

export type WalletTypeType = {
  id:number;
  name:string;
  description:string;
  category:string;
}


export type GetWalletType = {
  data: (WalletType & {
    finance_group: FinanceGroupType[]
  })[]
}
export type GetSingleWalletType = {
  data: (WalletType & {
    finance_group: FinanceGroupType[]
  })
}

export type DeleteResponseType = {
  message:"string";
}
export type CategoryType = {
  id:number;
  name:string;
  description:string;
  icon:string;
  created_at:string;
  updated_at:string;
}
export type TransactionPaymentType = {
  id:number;
  transaction_id:number;
  wallet_id:number;
  amount:number;
  transaction_type:string;
  created_at:string;
  updated_at:string;
}
export type TransactionType = {
  id:number;
  finance_group_id:number;
  amount:number;
  category_id:number;
  description:string;
  created_at:string;
  updated_at:string;
}

export type GetWalletTransactionType = {
  data: (TransactionPaymentType &
    {
      transaction:(TransactionType & {
        category: CategoryType
      })
    }
  )[]
}

export type CreateWalletRequestType = {
    name:string;
    user_id:string;
    balance?:number;
    wallet_type_id:number;
    is_hidden:boolean;
}
export type TopUpWalletRequestType = {
  user_id:number;
    amount:number;
    wallet_id:number;
}

export type ToggleWalletAmountRequestType = {
  user_id:string;
  wallet_id:number;
  is_hidden:boolean;
}


export const getAllUserWallet = async (userId:string) => {
  const res = await AxiosInstance.get<GetWalletType>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wallet/all/${userId}`
  );
  return res;
};

export const getUserWallet = async (walletId:string) => {
  const res = await AxiosInstance.get<GetSingleWalletType>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wallet/${walletId}`
  );
  return res;
};

export const getWalletTransaction = async (walletId:string) => {
  const res = await AxiosInstance.get<GetWalletTransactionType>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wallet/transaction/${walletId}`
  );
  return res;
};


export const createWallet = async (data:CreateWalletRequestType) => {
  const res = await AxiosInstance.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wallet/`,data
  );
  return res.data;
};


export const topUpWallet = async (data:TopUpWalletRequestType) => {
  const res = await AxiosInstance.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wallet/topup`,data
  );
  return res.data;
};

export const toggleWalletAmount = async (data:ToggleWalletAmountRequestType) => {
  const res = await AxiosInstance.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wallet/toggle-amount`,data
  );
  return res.data;
};

export const deleteUserWallet = async (walletId:number) => {
  const res = await AxiosInstance.delete<DeleteResponseType>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wallet/${walletId}`
  );
  return res;
};