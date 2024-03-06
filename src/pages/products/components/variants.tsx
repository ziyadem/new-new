import { v4 } from "uuid";

import { RiDeleteBin5Fill } from "react-icons/ri";

import { AutocompleteRenderInputParams, Box, Card } from "@mui/material";
import { Switch } from "@mui/material";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { FormControlLabel } from "@mui/material";

import { Space, Title, Section, Description } from "../../../style";

import { tokens } from "../../../db/theme";
import { SetStateAction, Dispatch } from "react";
import { useFetch } from "../../../utils/hooks/useFetch";
import { ERROR, SUCCESS } from "../../../utils/constants";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";

interface CustomState {
  name_uz: string;
  name_ru: string;
  description_uz: string;
  description_ru: string;
  ikpu: string;
  cashback: number;
  characteristic: Array<{ key: string; value: string }>;
  catalog: string;
  brand: string;
  options: Array<string>;
  variants: Array<{ options: Array<string> }>;
  is_installment: boolean;
  images: Array<string>;
}

interface CustomOption {
  guid: string;
  name?: string;
  values: Array<string>;
}

interface CustomVariantsType {
  state: CustomState;
  setState: Dispatch<SetStateAction<CustomState>>;
  options: Array<CustomOption>;
  setOptions: Dispatch<SetStateAction<Array<CustomOption>>>;
  values: Array<CustomOption>;
  setValues: Dispatch<SetStateAction<Array<CustomOption>>>;
}

interface CustomState {
  name_uz: string;
  name_ru: string;
  description_uz: string;
  description_ru: string;
  ikpu: string;
  cashback: number;
  characteristic: Array<{ key: string; value: string }>;
  catalog: string;
  brand: string;
  options: Array<string>;
  variants: Array<{ options: Array<string> }>;
  is_installment: boolean;
  images: Array<string>;
}

interface CustomVariantsType {
  state: CustomState;
  setState: Dispatch<SetStateAction<CustomState>>;
  options: Array<CustomOption>;
  setOptions: Dispatch<SetStateAction<Array<CustomOption>>>;
  values: Array<CustomOption>;
  setValues: Dispatch<SetStateAction<Array<CustomOption>>>;
}

export const Variants = (props: CustomVariantsType) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme?.palette?.mode);
  const { state, setState, options, setOptions, values, setValues } = props;

  const { res } = useFetch(`/marketplace/dashboard/option/`, 1);

  const handleChecked = (
    { checked }: { checked: boolean },
    value: string,
    guid: string
  ) => {
    if (checked) {
      setValues((prev) =>
        prev?.map((e) =>
          e.guid === guid ? { ...e, values: [...e.values, value] } : e
        )
      );
    } else {
      setValues((prev) =>
        prev?.map((e) =>
          e.guid === guid
            ? { ...e, values: e.values?.filter((v) => v !== value) }
            : e
        )
      );
    }
  };

  const handleGenerate = () => {
    if (
      values.find(({ values }: { values: Array<string> }) => values.length < 1)
    ) {
      enqueueSnackbar(t("something_went_wrong"), {
        variant: ERROR as never,
        autoHideDuration: 4000,
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        action: (id: number | string) => (
          <IconButton
            className="text-white"
            onClick={() => {
              closeSnackbar(id);
            }}
          >
            <IoMdClose />
          </IconButton>
        ),
      });
      return null;
    }

    // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
    let k: any = {
      options: [],
      variants: [],
    };

    values.forEach((e) => {
      // eslint-disable-next-line
      setState((prev) => ({ ...prev, options: [...prev?.options, e.guid] }));
    });

    values.forEach((a) => {
      if (k.variants.length == 0) {
        a.values.forEach((v) => {
          k.variants.push({ options: [v] });
        });
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, prefer-const
        let m: any = [];
        k.variants.forEach(({ options }: { options: Array<string> }) => {
          a.values.forEach((v) => {
            // eslint-disable-next-line prefer-const
            let obj = { options: [...options, v] };
            m.push(obj);
          });
        });
        k.variants = m;
      }
    });
    setState((prev) => ({ ...prev, variants: [...k.variants] }));
    enqueueSnackbar(t("options_have_been_created_successfully"), {
      variant: SUCCESS as never,
      autoHideDuration: 4000,
      anchorOrigin: { vertical: "bottom", horizontal: "right" },
      action: (id: number | string) => (
        <IconButton
          className="text-white"
          onClick={() => {
            closeSnackbar(id);
          }}
        >
          <IoMdClose />
        </IconButton>
      ),
    });
  };

  return (
    <Card
      sx={{ backgroundColor: colors.card[100], backgroundImage: "none" }}
      className="w-full p-5"
    >
      <Title>{t("create_options")}</Title>
      <Box className="flex flex-col">
        {options?.map(({ guid, name, values }: CustomOption, i) => (
          <Section key={i} className="flex items-center gap-5">
            <Box className="w-full border p-5 mt-5 rounded relative">
              <Description
                className="absolute -top-3 text-[1em] px-2 rounded-lg"
                sx={{ bgcolor: colors.card[100] }}
              >
                {name}
              </Description>
              {values?.map((value, idx) => (
                <FormControlLabel
                  key={idx}
                  control={
                    <Switch
                      onChange={(e) => handleChecked(e.target, value, guid)}
                    />
                  }
                  label={value}
                />
              ))}
            </Box>
            <IconButton
              color="error"
              onClick={() => {
                setOptions((prev) => [...prev.filter((v) => v.guid !== guid)]);
                setValues((prev) => [...prev.filter((v) => v.guid !== guid)]);
              }}
            >
              <RiDeleteBin5Fill />
            </IconButton>
          </Section>
        ))}
      </Box>
      <Space />
      <Autocomplete
        fullWidth
        size="small"
        disablePortal
        disableClearable
        options={res || []}
        getOptionLabel={(option: { name: string; guid: string }) =>
          option?.name
        }
        onChange={(
          _,
          item: {
            guid: string;
            name: string;
            values: Array<string>;
          }
        ) => {
          if (!options?.find((e) => e?.guid === item?.guid)) {
            setOptions((prev: Array<CustomOption>) => [...prev, item]);
            setValues((prev: Array<CustomOption>) => [
              ...prev,
              { guid: item?.guid, values: [] },
            ]);
          }
        }}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField
            {...params}
            value={parent}
            label={t("options")}
            inputProps={{ ...params?.inputProps }}
          />
        )}
      />
      <Space />
      <Button
        fullWidth
        variant="outlined"
        color="info"
        onClick={handleGenerate}
      >
        {t("create")}
      </Button>
      <Space />
      <Box className="w-full grid grid-cols-2 gap-2 max-[750px]:grid-cols-1">
        {state?.variants?.map(({ options }: { options: Array<string> }) =>
          options?.length ? (
            <Box
              key={v4()}
              className="w-full p-2 border border-slate-500 rounded-md"
            >
              {options.map((o, i, a) => (i === a?.length - 1 ? o : o + " / "))}
            </Box>
          ) : null
        )}
      </Box>
    </Card>
  );
};
