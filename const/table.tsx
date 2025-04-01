/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, TableProps, Tag } from "antd";
import { SavedFinanceDetailType } from "~/api/savedFinanceDetail";
import {
  TransactionPaymentType,
  TransactionType,
  CategoryType,
} from "~/api/wallet";
import { showDate, showDay, showMonthYear } from "~/utils/dateutils";
import { DisplayNominal } from "~/utils/numberUtils";

export type WalletTransactionDataType = TransactionPaymentType & {
  transaction: TransactionType & {
    category: CategoryType;
  };
};

export type SingleTransactionType = TransactionType & {
  transaction_payment: TransactionPaymentType[];
  category: CategoryType;
};

export type TransactionDataType = {
  date: string;
  transactions: SingleTransactionType[];
};

export const transactionColumns: TableProps<TransactionDataType>["columns"] = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text) => (
      <div className="flex gap-2 items-center">
        <span className="text-lg font-bold">{showDate(text)}</span>
        <div className="flex flex-col">
          <span className="text-xs font-medium">{showMonthYear(text)}</span>
          <Tag color="processing">
            <span className="text-center text-xs font-medium">
              {showDay(text)}
            </span>
          </Tag>
        </div>
      </div>
    ),
  },
];

export const savedFinanceDetailColumns = (
  handleEdit: (record: SavedFinanceDetailType) => void,
  handleDelete: (record: SavedFinanceDetailType) => void
): TableProps<SavedFinanceDetailType>["columns"] => [
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (text, record) => (
      <Tag color={record.transaction_type === "Expense" ? "error" : "success"}>
        {DisplayNominal(text)}
      </Tag>
    ),
  },
  {
    title: "Category",
    dataIndex: ["transaction_category", "name"],
    key: "category",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Transaction Type",
    dataIndex: "transaction_type",
    key: "transaction_type",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        ></Button>
        <Popconfirm
          title="Delete this data"
          description="Are you sure to delete this data?"
          onConfirm={() => handleDelete(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} danger></Button>
        </Popconfirm>
      </Space>
    ),
  },
];

export const financeReminderColumns = (
  handleEdit: (record: SavedFinanceDetailType) => void,
  handleDelete: (record: SavedFinanceDetailType) => void
): TableProps<SavedFinanceDetailType>["columns"] => [
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (text, record) => (
      <Tag color={record.transaction_type === "Expense" ? "error" : "success"}>
        {DisplayNominal(text)}
      </Tag>
    ),
  },
  {
    title: "Category",
    dataIndex: ["transaction_category", "name"],
    key: "category",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Occurence",
    dataIndex: "occurence",
    key: "occurence",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Reminder In",
    dataIndex: "status",
    key: "status",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        ></Button>
        <Popconfirm
          title="Delete this reminder"
          description="Are you sure to delete this reminder?"
          onConfirm={() => handleDelete(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} danger></Button>
        </Popconfirm>
      </Space>
    ),
  },
];

export const expandedTransactionColumns = (
  handleEdit: (record: SingleTransactionType) => void,
  handleDelete: (record: SingleTransactionType) => void
): TableProps<SingleTransactionType>["columns"] => [
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (text, record) => (
      <Tag
        color={
          record.transaction_payment[0]?.transaction_type === "Expense"
            ? "error"
            : "success"
        }
      >
        {DisplayNominal(text)}
      </Tag>
    ),
  },
  {
    title: "Category",
    dataIndex: ["transaction_category", "name"],
    key: "category",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Transaction Type",
    dataIndex: "transaction_type",
    key: "transaction_type",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        ></Button>
        <Popconfirm
          title="Delete this transaction"
          description="Are you sure to delete this transaction?"
          onConfirm={() => handleDelete(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} danger></Button>
        </Popconfirm>
      </Space>
    ),
  },
];

export const walletTransactionColumns: TableProps<WalletTransactionDataType>["columns"] =
  [
    {
      title: "Description",
      dataIndex: ["transaction", "description"],
      key: "description",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => (
        <Tag
          color={record.transaction_type === "Expense" ? "error" : "success"}
        >
          {DisplayNominal(text)}
        </Tag>
      ),
    },
    {
      title: "Category",
      dataIndex: ["transaction", "transaction_category", "name"],
      key: "category",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Transaction Type",
      dataIndex: "transaction_type",
      key: "transaction_type",
      render: (text) => <p>{text}</p>,
    },
  ];
