/* eslint-disable */
import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
  useTheme,
} from "@mui/material";
import { Description, Section, Space } from "../../../style";
import { useTranslation } from "react-i18next";
import { NumFormat } from "../../../components/inputs/num";
import { ChangeEvent } from "react";
import { TfiReload } from "react-icons/tfi";
import { formatNum, generateSku } from "../../../utils/helpers";
import { DataGrid } from "@mui/x-data-grid";
import Empty from "../../../components/empty";
import { tokens } from "../../../db/theme";

interface CustomVariant {
  guid?: string;
  variant: string;
  title: string;
  compare_at_price: number | null;
  price: number | null;
  count: number | null;
}
interface CustomData {
  shop?: string | null;
  product: string | undefined;
  price: number;
  compare_at_price: number | string;
  discount: number | string;
  count: number;
  variants: CustomVariant[];
  is_installment: boolean;
  sku: string;
}

const ProductValue = ({ res, data, setData }: any) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme?.palette?.mode);

  const all_count = Number(
    data?.variants.reduce(
      (acc: number, { count }: { count: number | null }) => acc + Number(count),
      0
    )
  );

  const columns = [
    {
      field: "id",
      headerName: t("number"),
      width: 80,
      minWidth: 50,
    },
    {
      field: "title",
      headerName: t("title"),
      flex: 1,
      minWidth: 150,
    },
    {
      field: "compare_at_price",
      headerName: t("compare_at_price"),
      flex: 1,
      minWidth: 200,
      renderCell: ({ row: { id, compare_at_price } }: any) => (
        <TextField
          size="small"
          type="text"
          InputProps={{
            inputComponent: NumFormat as any,
            endAdornment: (
              <InputAdornment position="start">{t("UZS")}</InputAdornment>
            ),
          }}
          value={compare_at_price || ""}
          onChange={(e) => {
            setData((prev: CustomData) => ({
              ...prev,
              variants: prev?.variants?.map((el: CustomVariant, i: number) =>
                id - 1 === i
                  ? {
                      ...el,
                      compare_at_price: Number(e.target.value),
                      price:
                        (Number(e.target.value) *
                          (100 - Number(data.discount))) /
                        100,
                    }
                  : el
              ),
            }));
          }}
        />
      ),
    },
    {
      field: "count",
      headerName: t("count"),
      flex: 1,
      minWidth: 200,
      renderCell: ({ row: { id, compare_at_price, count } }: any) => (
        <TextField
          value={count || ""}
          disabled={!compare_at_price}
          error={count <= 0}
          size="small"
          type="text"
          InputProps={{ inputComponent: NumFormat as any }}
          onChange={(e) => {
            setData((prev: CustomData) => ({
              ...prev,
              variants: prev?.variants?.map((el, i) =>
                id - 1 === i ? { ...el, count: Number(e.target.value) } : el
              ),
            }));
          }}
        />
      ),
    },
    {
      field: "price",
      headerName: t("price"),
      flex: 1,
      minWidth: 200,
      headerAlign: "right",
      align: "right",
      renderCell: ({ row }: any) => (
        <>
          {formatNum(
            Math.round(Number(row?.price) || Number(row?.compare_at_price) || 0)
          ) +
            " " +
            t("UZS")}
        </>
      ),
    },
  ];

  return (
    <Card
      sx={{
        backgroundColor: colors.card[100],
        backgroundImage: "none",
      }}
      className="p-10 max-[500px]:p-5"
    >
      <Box className="w-full grid grid-cols-4 gap-3 max-[850px]:grid-cols-2 max-[500px]:grid-cols-1">
        <TextField
          fullWidth
          size="small"
          label={t("compare_at_price")}
          value={
            data.compare_at_price === 0 ? "" : Number(data.compare_at_price)
          }
          onChange={(e) => {
            setData((prev: CustomData) => ({
              ...prev,
              compare_at_price: Number(e.target.value),
            }));
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">{t("UZS")}</InputAdornment>
            ),
            inputComponent: NumFormat as any,
          }}
          className={data?.variants?.length > 0 ? `hidden` : ``}
        />
        <TextField
          error={Number(data.discount) > 99 || Number(data.discount) < 0}
          helperText={
            Number(data.discount) > 99
              ? t("max99")
              : Number(data.discount) < 0
              ? t("min0")
              : ""
          }
          fullWidth
          size="small"
          label={t("discount")}
          value={Number(data.discount) === 0 ? "" : Number(data.discount)}
          onChange={(e) => {
            setData((prev: CustomData) => ({
              ...prev,
              discount: Number(e.target.value),
              variants: prev.variants.map((v: CustomVariant) => ({
                ...v,
                price:
                  (Number(v.compare_at_price) *
                    (100 - Number(e.target.value || 0))) /
                  100,
              })),
            }));
          }}
          InputProps={{
            inputComponent: NumFormat as any,
            endAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
        />
        <TextField
          fullWidth
          disabled
          size="small"
          label={t("compare_at_price")}
          value={
            Number(data.compare_at_price) &&
            Number(data.discount) < 99 &&
            Number(data.discount) >= 0
              ? Math.round(
                  (Number(data.compare_at_price) *
                    (100 - Number(data.discount))) /
                    100
                )
              : 0
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{t("UZS")}</InputAdornment>
            ),
            inputComponent: NumFormat as any,
          }}
          className={data?.variants?.length > 0 ? `hidden` : ``}
        />
        <TextField
          fullWidth
          disabled={Boolean(res?.variants?.length)}
          size="small"
          label={t("all_count")}
          value={res?.variants?.length > 0 ? all_count : data?.count}
          onChange={(
            e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setData((prev: CustomData) => ({
              ...prev,
              count: Number(e.target.value),
            }));
          }}
          InputProps={{ inputComponent: NumFormat as any }}
        />
        <TextField
          fullWidth
          size="small"
          type="text"
          value={data?.sku}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  disabled={data?.sku.length < 3}
                  onClick={() => {
                    setData((prev: any) => ({
                      ...prev,
                      sku: generateSku(data?.sku, res?.name_uz),
                    }));
                  }}
                >
                  <TfiReload />
                </IconButton>
              </InputAdornment>
            ),
          }}
          label={t("SKU")}
          onChange={(e) => {
            e.target.value?.length > 8
              ? null
              : setData((prev: any) => ({
                  ...prev,
                  sku: e.target.value,
                }));
          }}
        />
        <Section className="flex items-center">
          <Switch
            checked={data?.is_installment}
            onChange={(e) => {
              setData((prev: any) => ({
                ...prev,
                is_installment: e.target.checked,
              }));
            }}
          />
          <Description>{t("installment")}</Description>
        </Section>
      </Box>
      <Space className={data?.variants?.length > 0 ? "" : "hidden"} />
      <Space className={data?.variants?.length > 0 ? "" : "hidden"} />
      <hr className={data?.variants?.length > 0 ? "" : "hidden"} />
      <Space />
      {data?.variants?.length > 0 ? (
        <Section
          sx={{
            backgroundColor: colors.card[100],
            backgroundImage: "none",
          }}
          className="w-full h-[30vh]"
        >
          <DataGrid
            hideFooter
            sx={{ border: "none" }}
            rows={data?.variants?.map((el: any, i: number) => ({
              ...el,
              id: i + 1,
            }))}
            columns={columns as any}
            disableRowSelectionOnClick
            components={{
              NoRowsOverlay: Empty,
              Pagination: null,
            }}
          />
        </Section>
      ) : null}
    </Card>
  );
};

export default ProductValue;
