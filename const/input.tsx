import { SavedFinanceDetailType } from "~/api/savedFinanceDetail";

export type AutoCompleteOptionsType = {
  label: string;
  value: string; // AutoComplete requires value to be a string
  data: SavedFinanceDetailType;
};
