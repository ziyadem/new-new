/* eslint-disable */
import { useTranslation } from "react-i18next";
import { Main, Section } from "../../style";
import { useFetch } from "../../utils/hooks/useFetch";
import {
  Box,
  Card,
  Chip,
  IconButton,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import Table from "../../components/table";

import { RiSearch2Line } from "react-icons/ri";

import { useDebounce } from "../../utils/hooks/useDebounce";
import Loader from "../../components/loader";
import { tokens } from "../../db/theme";
import { Column } from "../../utils/types";
import { Link } from "react-router-dom";
import {
  payment_color,
  receive_color,
  status_color,
} from "../../utils/constants";
import { BsEye } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { main } from "../../store";

const Orders = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(main({ title: "orders_title" }));
  }, []);

  const [state, setState] = useState({
    page: 1,
    page_size: 20,
    reload: 1,
    search: "",
  });
  const { page, page_size, search, reload } = state;

  const dSearch = useDebounce(search, 1000);
  const { res: me } = useFetch(`/marketplace/dashboard/shop/me/`, 1);
  const url = `/marketplace/dashboard/order/?page=1&page_size=20?search=${dSearch}&page=${page}&page_size=${page_size}`;
  const { res, loading } = useFetch(url, reload);

  useEffect(() => {
    if (me) {
      setState((prev) => ({ ...prev, shop_guid: me[0].guid }));
    }
  }, [me]);

  const columns: Column[] = [
    {
      field: "number",
      headerName: t("number"),
      width: 90,
    },
    {
      field: `customer`,
      headerName: t("customer"),
      flex: 1,
      minWidth: 200,
    },
    {
      field: "status",
      headerName: t("status"),
      flex: 1,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { status } }) => (
        <Chip
          label={t(status.toLowerCase())}
          variant="outlined"
          color={status_color[status] || "default"}
          size="small"
        />
      ),
    },
    {
      field: "payment_method",
      headerName: t("payment_method"),
      flex: 1,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { payment_method } }) => (
        <Chip
          label={t(payment_method.toLowerCase())}
          variant="outlined"
          color={payment_color[payment_method] || "default"}
          size="small"
        />
      ),
    },
    {
      field: "receive_method",
      headerName: t("receive_method"),
      flex: 1,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { receive_method } }) => (
        <Chip
          label={t(receive_method.toLowerCase())}
          variant="outlined"
          color={receive_color[receive_method] || "default"}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: t("actions"),
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      renderCell: ({ row }: any) => (
        <Section className="flex items-center">
          <Link to={`/orders/${row?.id}`}>
            <IconButton size="small" color="info">
              <BsEye />
            </IconButton>
          </Link>
        </Section>
      ),
    },
  ];

  return (
    <Main className="w-full h-[90vh] p-5">
      <Card
        sx={{ backgroundColor: colors.card[100] }}
        className="w-full h-full p-5"
      >
        <Section className="w-full h-[8vh] flex items-center justify-between">
          <Box>
            <TextField
              type="search"
              size="small"
              className="w-[400px] max-[650px]:hidden"
              placeholder={t("search")}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setState((prev) => ({ ...prev, search: e.target.value }));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <RiSearch2Line />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Section>
        <Section className="w-full h-[72vh] overflow-x-auto">
          {loading ? (
            <Box className="w-full h-full flex items-center justify-center">
              <Loader />
            </Box>
          ) : (
            <Table
              dec={t("order_not_found")}
              page={page}
              pages={res?.count || 1}
              page_size={page_size}
              setState={setState}
              rows={
                res?.results.map((e: any, i: number) => ({
                  ...e,
                  number: i + 1,
                  id: e.guid,
                })) || []
              }
              columns={columns}
            />
          )}
        </Section>
      </Card>
    </Main>
  );
};

export default Orders;
