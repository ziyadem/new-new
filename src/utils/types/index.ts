/* eslint-disable */
import { FormEvent } from "react";

export interface Column {
  field: string;
  headerName: string;
  flex?: number;
  minWidth?: number;
  width?: number;
  align?: "left" | "center" | "right";
  headerAlign?: "left" | "center" | "right";
  renderCell?: (params: { row: any }) => JSX.Element;
}
export interface routesType {
  path: string;
  component: () => JSX.Element;
  roles: string[];
}

export interface sidebarItemType {
  Icon: any;
  path?: string;
  title: string;
  roles: string[];
  disabled: boolean;
  childrens?: sidebarItemType[] | null;
}

export interface keyType {
  ac: string;
  re: string;
  role: string;
}

export interface loginDataType {
  username: string;
  password: string;
  showPassword: boolean;
}

export interface handleLoginType {
  e: FormEvent<HTMLFormElement>;
  data: loginDataType;
}
