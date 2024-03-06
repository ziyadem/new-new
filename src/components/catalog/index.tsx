import { v4 } from "uuid";
import { useState } from "react";

import { BsEye } from "react-icons/bs";

import { Box } from "@mui/material";
import { Card } from "@mui/material";
import { useTheme } from "@mui/material";
import { IconButton } from "@mui/material";

import { Space, Image, Title, Section, Description } from "../../style";

import { tokens } from "../../db/theme";
import Empty from "../../components/empty";
import { useFetch } from "../../utils/hooks/useFetch";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { DataGrid } from "@mui/x-data-grid";
import { SetStateAction, Dispatch } from "react";
import Loader from "../../components/loader";
import { useTranslation } from "react-i18next";
import MyBreadcrumbs from "../breadcrumbs";

interface CustomState {
  name_uz: string;
  name_ru: string;
  description_uz: string;
  description_ru: string;
  ikpu: string;
  cashback: number;
  characteristic: {
    key: string;
    value: string;
  }[];
  catalog: string;
  brand: string;
  options: string[];
  variants: {
    options: string[];
  }[];
  is_installment: boolean;
  images: string[];
}

interface CustomItemType {
  state: CustomState;
  setState: Dispatch<SetStateAction<CustomState>>;
}

export const Catalog = ({ state, setState }: CustomItemType) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme?.palette?.mode);

  const [id, setId] = useState<string | null>(null);

  const url = id
    ? `/marketplace/dashboard/catalog/child/${id}/`
    : `/marketplace/dashboard/catalog/`;

  const { res, loading } = useFetch(url, 0);

  const columns = [
    {
      field: "number",
      headerName: t("number"),
      width: 100,
    },
    ...(id
      ? []
      : [
          {
            field: "icon",
            headerName: t("icon"),
            flex: 1,
            minWidth: 200,
            renderCell: ({ row: { icon } }: { row: { icon: string } }) => (
              <Image src={icon} width={50} height={50} />
            ),
          },
        ]),
    {
      field: `name_${localStorage.getItem("i18nextLng")}`,
      headerName: t("name"),
      flex: 1,
      minWidth: 200,
    },
    {
      field: "actions",
      headerName: t("actions"),
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }: { row: { guid: string } }) => (
        <>
          <IconButton
            size="small"
            color="info"
            id={v4()}
            onClick={() => {
              setId(row?.guid);
            }}
          >
            <BsEye />
          </IconButton>
          <IconButton
            size="small"
            color={state?.catalog === row?.guid ? "success" : "warning"}
            id={v4()}
            onClick={() => {
              setState((prev: CustomState) => ({
                ...prev,
                catalog: row?.guid,
              }));
            }}
          >
            <IoMdCheckmarkCircleOutline />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Card
      sx={{ backgroundColor: colors.card[100], backgroundImage: "none" }}
      className="w-full p-5"
    >
      {loading ? (
        <Section className="w-full h-full">
          <Loader />
        </Section>
      ) : (
        <Section className="w-full">
          <Box className="w-full flex items-center gap-2">
            {id ? (
              <Description
                className="cursor-pointer text-[1rem] text-gray-400 -mt-1"
                onClick={() => {
                  setId(null);
                }}
              >
                {t("catalog")} /
              </Description>
            ) : (
              <Title
                className="cursor-pointer"
                onClick={() => {
                  setId(null);
                }}
              >
                {t("select_category")}
              </Title>
            )}
            <MyBreadcrumbs
              list={res?.parents || []}
              callback={(id: string) => {
                setId(id);
              }}
            />
          </Box>
          <Space />
          <Box className="w-full h-[70vh] overflow-y-auto max-[750px]:h-[40vh]">
            <DataGrid
              sx={{ border: "none" }}
              hideFooter
              rows={
                (res?.child || res?.result || res)?.map(
                  (el: { guid: string }, i: number) => ({
                    ...el,
                    number: i + 1,
                    id: el?.guid,
                  })
                ) || []
              }
              columns={columns as never}
              disableRowSelectionOnClick
              components={{
                NoRowsOverlay: Empty,
                Pagination: null,
              }}
            />
          </Box>
        </Section>
      )}
    </Card>
  );
};
