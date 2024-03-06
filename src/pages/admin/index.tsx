/* eslint-disable */
import { useTranslation } from "react-i18next";
import { Main, Section } from "../../style";
import { useFetch } from "../../utils/hooks/useFetch";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import Table from "../../components/table";

import { AiOutlinePlus } from "react-icons/ai";
import { RiSearch2Line } from "react-icons/ri";

import { useDebounce } from "../../utils/hooks/useDebounce";
import Loader from "../../components/loader";
import { tokens } from "../../db/theme";
import { Column } from "../../utils/types";
import { Link, useNavigate } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { main } from "../../store";
import { useDispatch } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { IoTrash } from "react-icons/io5";

const Admin = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(main({ title: "products_title" }));
  }, []);

  const [state, setState] = useState({
    page: 1,
    page_size: 20,
    reload: 1,
    search: "",
    brand_guid: "",
    catalog_guid: "",
  });
  const { page, page_size, reload, brand_guid, catalog_guid } = state;

  const url = `/company-user`;
  const { res, loading } = useFetch(url, reload);
  const { res: catalogs } = useFetch(`/catalog/all/`, 1);
  const { res: brands } = useFetch(`/brand/all/`, 1);

  const columns: Column[] = [
    {
      field: "number",
      headerName: "Nomer",
      width: 90,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "password",
      headerName: "Parol",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "telegramId",
      headerName: "Telegram Id",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "actions",
      headerName: "Amallar",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      renderCell: ({ row }: any) => (
        <Section className="flex items-center gap-2">
          <IconButton size="small" color="info">
            <MdModeEditOutline />
          </IconButton>
          <IconButton size="small" color="error">
            <IoTrash />
          </IconButton>
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
          <Box className="w-full h-full flex items-center gap-5 max-[1260px]:gap-0">
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
            className="px-4 text-white font-semibold max-[1260px]:px-10"
            onClick={() => {
              navigate(`/product/create`);
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
              rows={
                res?.users?.map((e: any, i: number) => ({
                  ...e,
                  number: i + 1,
                  id: e.id,
                  password: "********",
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

export default Admin;
