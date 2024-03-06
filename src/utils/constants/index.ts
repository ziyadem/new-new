/* eslint-disable @typescript-eslint/no-explicit-any */
export const { SUPER_ADMIN, ADMIN, KASSIR } = {
  SUPER_ADMIN: "SUPER ADMIN",
  ADMIN: "ADMIN",
  KASSIR: "KASSIR",
};

export const { INHERIT, DEFAULT, ERROR, SUCCESS, WARNING, INFO } = {
  INHERIT: "inherit",
  DEFAULT: "default",
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
  INFO: "info",
};

export const status_color: any = {
  PENDING: "info",
  UNDER_CONSIDERATION: "warning",
  ACCEPTED: "success",
  DENIED: "error",
  REFUSAL_BY_USER: "default",
};

export const payment_color: any = {
  PAYINCASH: "success",
  ONLINEPAYMENT: "info",
  INSTALLMENT: "warning",
};

export const receive_color: any = {
  DELIVERY: "info",
  SELFPICKUP: "success",
};
