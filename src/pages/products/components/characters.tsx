import { ChangeEvent } from "react";

import { RiDeleteBin5Fill } from "react-icons/ri";

import { Box, Card } from "@mui/material";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";

import { Space, Title, Section } from "../../../style";

import { tokens } from "../../../db/theme";
import { SetStateAction, Dispatch } from "react";
import { useTranslation } from "react-i18next";

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

export const Characters = ({ state, setState }: CustomItemType) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme?.palette?.mode);

  const handleCreate = () => {
    setState((prev) => ({
      ...prev,
      // eslint-disable-next-line
      characteristic: [...prev?.characteristic, { key: "", value: "" }],
    }));
  };

  return (
    <Card
      sx={{ backgroundColor: colors.card[100], backgroundImage: "none" }}
      className="w-full p-5"
    >
      <Title>{t("enter_the_product_characteristics")}</Title>
      <Box className="w-full">
        {state?.characteristic?.map((_, i) => (
          <Section
            key={i}
            className="w-full flex items-center gap-5 my-5 max-[650px]:grid max-[650px]:border max-[650px]:p-5 max-[650px]:rounded-2xl"
          >
            <TextField
              fullWidth
              size="small"
              type="text"
              value={state?.characteristic[i].key}
              label={t("name")}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setState((prev) => ({
                  ...prev,
                  characteristic: [
                    // eslint-disable-next-line
                    ...prev?.characteristic?.map((item, idx) =>
                      i === idx ? { ...item, key: e.target.value } : item
                    ),
                  ],
                }));
              }}
            />
            <TextField
              fullWidth
              size="small"
              type="text"
              value={state?.characteristic[i].value}
              label={t("value")}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setState((prev) => ({
                  ...prev,
                  characteristic: [
                    // eslint-disable-next-line
                    ...prev?.characteristic?.map((item, idx) =>
                      i === idx ? { ...item, value: e.target.value } : item
                    ),
                  ],
                }));
              }}
            />
            <IconButton
              color="error"
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  characteristic: [
                    // eslint-disable-next-line
                    ...prev?.characteristic?.filter((_, index) => i !== index),
                  ],
                }))
              }
            >
              <RiDeleteBin5Fill />
            </IconButton>
          </Section>
        ))}
      </Box>
      <Space />
      <Button fullWidth variant="outlined" color="info" onClick={handleCreate}>
        {t("add")}
      </Button>
    </Card>
  );
};
