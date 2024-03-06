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

const Products = () => {
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
  const { page, page_size, search, reload, brand_guid, catalog_guid } = state;

  const dSearch = useDebounce(search, 1000);
  const url = `/marketplace/dashboard/product/?page=${page}&page_size=${page_size}&search=${dSearch}&brand_guid=${brand_guid}&catalog_guid=${catalog_guid}`;
  const { res, loading } = useFetch(url, reload);
  const { res: catalogs } = useFetch(`/marketplace/dashboard/catalog/all/`, 1);
  const { res: brands } = useFetch(`/marketplace/brand/all/`, 1);

  const columns: Column[] = [
    {
      field: "number",
      headerName: t("number"),
      width: 90,
    },
    {
      field: `${"name_" + localStorage.getItem("i18nextLng")}`,
      headerName: t("name"),
      flex: 1,
      minWidth: 200,
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
      field: "ikpu",
      headerName: t("ikpu"),
      flex: 1,
      minWidth: 150,
    },
    {
      field: "cashback",
      headerName: t("cashback"),
      flex: 1,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: t("actions"),
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      renderCell: ({ row }: any) => (
        <Section className="flex items-center gap-2">
          {row?.is_added ? (
            <IconButton color="success">
              <IoMdCheckmarkCircleOutline />
            </IconButton>
          ) : (
            <Link to={`/products/${row?.id}`}>
              <IconButton size="small" color="info">
                <BsPlusCircle />
              </IconButton>
            </Link>
          )}
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
            <Autocomplete
              className="w-[300px] max-[1260px]:hidden"
              size="small"
              options={catalogs || []}
              getOptionLabel={(option: any) =>
                option[`${"name_" + localStorage.getItem("i18nextLng")}`] || ""
              }
              onChange={(_, item) => {
                setState((prev: any) => ({
                  ...prev,
                  reload: prev?.reload + 1,
                  catalog_guid: item ? item?.guid : "",
                }));
              }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label={t("catalog")}
                  value={catalog_guid || ""}
                  inputProps={{ ...params?.inputProps }}
                />
              )}
            />
            <Autocomplete
              className="w-[300px] max-[1260px]:hidden"
              size="small"
              options={brands || []}
              getOptionLabel={(option: any) => option?.name || ""}
              onChange={(_, item) => {
                setState((prev: any) => ({
                  ...prev,
                  reload: prev?.reload + 1,
                  brand_guid: item?.guid,
                }));
              }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label={t("brand")}
                  value={brand_guid}
                  inputProps={{ ...params?.inputProps }}
                />
              )}
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

export default Products;
