import SlickSlider from "react-slick";
import { Box, Button, IconButton } from "@mui/material";
import { Card } from "@mui/material";
import { useTheme } from "@mui/material";

import { Image, Main, Section, Space } from "../../style";

import $axios from "../../services";
import { tokens } from "../../db/theme";
import { useState, useEffect } from "react";
import FileUpload from "../../components/upload";
import { Name } from "./components/name";
import { Characters } from "./components/characters";
import { Variants } from "./components/variants";
import { Catalog } from "../../components/catalog";
import { useNavigate } from "react-router-dom";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { ERROR, SUCCESS } from "../../utils/constants";
import { IoMdClose } from "react-icons/io";
import Back from "../../components/back";
import { RiSave3Fill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { main } from "../../store";
import { useDispatch } from "react-redux";

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

interface CustomOption {
  guid: string;
  name?: string;
  values: string[];
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

interface CustomOption {
  guid: string;
  name?: string;
  values: string[];
}

const initialState = {
  is_installment: false,
  name_uz: "",
  name_ru: "",
  description_uz: "",
  description_ru: "",
  ikpu: "",
  cashback: 0,
  catalog: "",
  brand: "",
  images: [],
  options: [],
  variants: [],
  characteristic: [],
};

const ProductCreate = () => {
  const theme = useTheme();
  const colors = tokens(theme?.palette?.mode);
  const [images, setImages] = useState<string[]>([]);
  const [state, setState] = useState<CustomState>({ ...initialState });
  const [options, setOptions] = useState<CustomOption[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(main({ title: "product_create_title" }));
  }, []);

  const [values, setValues] = useState<CustomOption[]>([]);

  useEffect(() => {
    setState((prev) => ({ ...prev, ikpu: "" }));
  }, [state?.name_uz]);

  const handleUpload = async (files: File[]) => {
    setImages([]);
    try {
      const formData = new FormData();

      files?.forEach((file) => {
        formData.append("image", file);
      });

      // eslint-disable-next-line
      const resp: any = await $axios.post(
        `/marketplace/upload-image/`,
        formData
      );

      if (resp?.success) {
        enqueueSnackbar(`${t("success_upload_file")}`, {
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

        resp?.data?.forEach(
          ({ guid, image }: { guid: string; image: string }) => {
            setState((prev: CustomState) => ({
              ...prev,
              images: [...(prev?.images || []), guid],
            }));
            setImages((prev: string[]) => [...prev, image]);
          }
        );
      }

      // eslint-disable-next-line
    } catch (err: any) {
      err?.response?.data?.errors?.map(
        ({ message, field }: { message: string; field: string }) =>
          enqueueSnackbar(`${message} "${field}"`, {
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
          })
      );
    }
  };

  const handleSubmit = async () => {
    try {
      // eslint-disable-next-line
      const resp: any = await $axios.post(
        `/marketplace/dashboard/product/`,
        state
      );
      if (resp?.success) {
        enqueueSnackbar(t("your_request_has_been_accepted"), {
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
        setState({ ...initialState });
        setOptions([]);
        setValues([]);
        navigate(`/products`);
      }
      // eslint-disable-next-line
    } catch (err: any) {
      err?.response?.data?.errors?.map(
        ({ message, field }: { message: string; field: string }) =>
          enqueueSnackbar(`${message} "${field}"`, {
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
          })
      );
    }
  };

  return (
    <Main className="flex-col justify-start items-start px-60 max-[1300px]:px-20 max-[900px]:px-5">
      <Section
        sx={{ color: colors.grey[100] }}
        className="w-full h-[7vh] flex items-center justify-between px-5 py-3"
      >
        <Back path="/products" />
        <Button
          startIcon={<RiSave3Fill />}
          variant="contained"
          color="info"
          onClick={handleSubmit}
        >
          {t("save")}
        </Button>
      </Section>
      <Space />
      <Section className="w-full h-[80vh] grid grid-cols-2 gap-5 overflow-y-auto">
        <Box className="product_create_grid_item">
          <Name state={state} setState={setState} />
          <Space />
          <Catalog state={state} setState={setState} />
        </Box>
        <Box className="product_create_grid_item">
          <Characters state={state} setState={setState} />
          <Space />
          <Variants
            state={state}
            setState={setState}
            values={values}
            setValues={setValues}
            options={options}
            setOptions={setOptions}
          />

          <Space />
          <Card
            sx={{ backgroundColor: colors.card[100], backgroundImage: "none" }}
            className="w-full h-auto p-5"
          >
            <Box className="w-full h-[300px]">
              <FileUpload
                onDrop={handleUpload}
                description={t("drop_product_images_or")}
                button={t("choose")}
                file={images.length > 0 ? images : null}
              />
            </Box>

            {images.length > 0 ? (
              <Box className="w-full p-10">
                <Space />
                <SlickSlider
                  speed={700}
                  autoplay={true}
                  autoplaySpeed={5000}
                  slidesToShow={1}
                  centerMode={true}
                  slidesToScroll={1}
                  className="w-full h-[40vh] cursor-grab max-[1500px]:w-full"
                >
                  {images?.map((img: string) => (
                    <Section className="px-2">
                      <Image
                        src={img}
                        alt={img}
                        className="w-full h-full rounded-2xl"
                      />
                    </Section>
                  ))}
                </SlickSlider>
              </Box>
            ) : null}
          </Card>
        </Box>
      </Section>
    </Main>
  );
};

export default ProductCreate;
