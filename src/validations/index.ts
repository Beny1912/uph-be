import Currency from "../helpers/currency";

export const existCurrency = (currency: string) => {
  return Currency.validate(currency);
};
