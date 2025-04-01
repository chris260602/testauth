import AxiosInstance from "~/utils/axiosInstance";

export const getWalletType = async () => {
    const res = await AxiosInstance.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wallet-type`
    );
    return res;
  };
  