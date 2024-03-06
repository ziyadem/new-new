/* eslint-disable */
import { useTranslation } from "react-i18next";
import { Description, Main, Section, Space, Title } from "../../style";
import { useFetch } from "../../utils/hooks/useFetch";
import {
  Box,
  Button,
  Card,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import Table from "../../components/table";

import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin5Fill, RiSearch2Line } from "react-icons/ri";

import { useDebounce } from "../../utils/hooks/useDebounce";
import Loader from "../../components/loader";
import { tokens } from "../../db/theme";
import { Column } from "../../utils/types";
import { Link, useNavigate } from "react-router-dom";
import { formatNum } from "../../utils/helpers";
import { MdEdit } from "react-icons/md";
import { Transition } from "../../components/transition";
import { useDispatch } from "react-redux";
import { main } from "../../store";

const MyProducts = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(main({ title: "my_products_title" }));
  }, []);

  const [state, setState] = useState({
    page: 1,
    page_size: 20,
    reload: 1,
    search: "",
    shop_guid: "",
    delete: null,
  });
  const { page, page_size, search, reload, shop_guid } = state;

  const dSearch = useDebounce(search, 1000);
  const { res: me } = useFetch(`/marketplace/dashboard/shop/me/`, 1);
  const url = `/marketplace/dashboard/shop/${shop_guid}/product/?search=${dSearch}&page=${page}&page_size=${page_size}`;
  const { res, loading } = useFetch(url, reload);

  useEffect(() => {
    if (me) {
      setState((prev) => ({ ...prev, shop_guid: me[0].guid }));
    }
  }, [me]);

  const columns: Array<Column> = [
    {
      field: "number",
      headerName: t("number"),
      width: 90,
    },
    {
      field: "name",
      headerName: t("name"),
      flex: 1,
      minWidth: 200,
    },
    {
      field: "price",
      headerName: t("price"),
      flex: 1,
      minWidth: 100,
      renderCell: ({ row }) => (
        <Box className="text-blue-500">{formatNum(row?.price)} UZS</Box>
      ),
    },
    {
      field: "catalog",
      headerName: t("catalog"),
      flex: 1,
      minWidth: 150,
    },
    {
      field: "brand",
      headerName: t("brand"),
      flex: 1,
      minWidth: 150,
    },
    {
      field: "actions",
      headerName: t("actions"),
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      renderCell: ({ row }: any) => (
        <Section className="flex items-center">
          <Link to={`/my-products/${row?.id}`}>
            <IconButton size="small" color="info">
              <MdEdit />
            </IconButton>
          </Link>
          <IconButton
            size="small"
            color="error"
            onClick={() => {
              setState((prev) => ({ ...prev, delete: row?.id }));
            }}
          >
            <RiDeleteBin5Fill />
          </IconButton>
        </Section>
      ),
    },
  ];

  const handleClose = () => {
    setState((prev) => ({
      ...prev,
      delete: null,
    }));
  };

  const handleDelete = () => {
    alert(state?.delete);
    handleClose();
  };

  return (
    <Main className="w-full h-[90vh] p-5">
      <Dialog
        open={Boolean(state?.delete)}
        keepMounted
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <Card
          sx={{
            width: "100%",
            backgroundColor: colors.card[100],
            padding: "25px",
          }}
        >
          <Title sx={{ mb: "10px" }}>{t("delete_title")}</Title>
          <Description>{t("delete_description")}</Description>
          <Space />
          <Box
            sx={{
              gap: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button color="success" variant="outlined" onClick={handleClose}>
              {t("cancel")}
            </Button>
            <Button color="error" variant="contained" onClick={handleDelete}>
              {t("delete")}
            </Button>
          </Box>
        </Card>
      </Dialog>
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
          <Button
            color="info"
            variant="contained"
            startIcon={<AiOutlinePlus />}
            className="px-4 text-white font-semibold"
            onClick={() => {
              navigate(`/products`);
            }}
          >
            {t("create")}
          </Button>
        </Section>
        <Section className="w-full h-[72vh] overflow-x-auto">
          {loading ? (
            <Box className="w-full h-full flex items-center justify-center">
              <Loader />
            </Box>
          ) : (
            <Table
              dec={t("product_not_found")}
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

export default MyProducts;
