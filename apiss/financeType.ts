import AxiosInstance from "~/utils/axiosInstance";

export const getFinanceType = async () => {
    const res = await AxiosInstance.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/finance-type`
    );
    return res;
  };
  