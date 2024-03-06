import { useTranslation } from "react-i18next";
import { SetStateAction, Dispatch, ChangeEvent } from "react";

import { Box, Card, Switch } from "@mui/material";
import { useTheme } from "@mui/material";
import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { TextareaAutosize } from "@mui/material";

import { tokens } from "../../../db/theme";
import { useFetch } from "../../../utils/hooks/useFetch";
import { Description, Section, Space, Title } from "../../../style";

interface CustomState {
  name_uz: string;
  name_ru: string;
  description_uz: string;
  description_ru: string;
  ikpu: string;
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

type CustomChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export const Name = ({ state, setState }: CustomItemType) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme?.palette?.mode);

  const { res: brand } = useFetch(`/marketplace/brand/all/`, 1);

  return (
    <Card
      sx={{ backgroundColor: colors.card[100], backgroundImage: "none" }}
      className="w-full p-5"
    >
      <Title>{t("enter_the_product_information")}</Title>
      <Space />
      <Box className="grid grid-cols-2 gap-5 max-[750px]:grid-cols-1">
        <TextField
          fullWidth
          size="small"
          type="text"
          value={state?.name_uz}
          label={t("name_uz")}
          onChange={(e: CustomChangeEvent) => {
            setState((prev: CustomState) => ({
              ...prev,
              name_uz: e.target.value,
            }));
          }}
        />
        <TextField
          fullWidth
          size="small"
          type="text"
          value={state?.name_ru}
          label={t("name_ru")}
          onChange={(e: CustomChangeEvent) => {
            setState((prev: CustomState) => ({
              ...prev,
              name_ru: e.target.value,
            }));
          }}
        />
        <TextareaAutosize
          required
          minRows={3}
          value={state?.description_uz}
          placeholder={t("dec_uz")}
          className="p-2 rounded-md bg-transparent border"
          onChange={(e: CustomChangeEvent) => {
            setState((prev: CustomState) => ({
              ...prev,
              description_uz: e.target.value,
            }));
          }}
        />
        <TextareaAutosize
          required
          minRows={3}
          value={state?.description_ru}
          placeholder={t("dec_ru")}
          className="p-2 rounded-md bg-transparent border"
          onChange={(e: CustomChangeEvent) => {
            setState((prev: CustomState) => ({
              ...prev,
              description_ru: e.target.value,
            }));
          }}
        />
        <Autocomplete
          fullWidth
          size="small"
          disablePortal
          disableClearable
          options={brand || []}
          getOptionLabel={(option: { name: string; guid: string }) =>
            option?.name
          }
          onChange={(_, { guid }) => {
            setState((prev: CustomState) => ({ ...prev, brand: guid }));
          }}
          // eslint-disable-next-line
          renderInput={(params: any) => (
            <TextField
              {...params}
              value={parent}
              label={t("brand")}
              inputProps={{ ...params?.inputProps }}
            />
          )}
        />
        <TextField
          fullWidth
          size="small"
          type="text"
          value={state?.ikpu}
          label={t("IKPU")}
          onChange={(e) => {
            e.target.value?.length > 17
              ? null
              : setState((prev: CustomState) => ({
                  ...prev,
                  ikpu: e.target.value,
                }));
          }}
        />
        <Section className="flex items-center">
          <Switch
            checked={state?.is_installment}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                is_installment: e.target.checked,
              }))
            }
          />
          <Description>{t("installment")}</Description>
        </Section>
      </Box>
    </Card>
  );
};
