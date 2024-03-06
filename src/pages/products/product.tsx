/* eslint-disable */
import { useEffect, useState } from "react";
import { Box, Button, IconButton, useTheme } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../utils/hooks/useFetch";
import $axios from "../../services";
import { Main, Section, Space } from "../../style";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { ERROR, SUCCESS } from "../../utils/constants";
import { IoMdClose } from "react-icons/io";
import ProductCard from "./components/productCard";
import ProductValue from "./components/productValue";
import Back from "../../components/back";
import { RiSave3Fill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { tokens } from "../../db/theme";
import { main } from "../../store";
import { useDispatch } from "react-redux";

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

const Product = () => {
  const theme = useTheme();
  const colors = tokens(theme?.palette?.mode);

  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(main({ title: "product_title" }));
  }, []);

  const [data, setData] = useState<CustomData>({
    shop: "",
    product: id,
    price: 0,
    compare_at_price: 0,
    count: 0,
    discount: 0,
    variants: [],
    is_installment: false,
    sku: "",
  });

  const { res: me } = useFetch(`/marketplace/dashboard/shop/me/`, 1);

  useEffect(() => {
    me?.length > 0
      ? setData((prev) => ({
          ...prev,
          shop: me[0]?.guid,
        }))
      : null;
  }, [me]);

  const { res, loader } = useFetch(`/marketplace/dashboard/product/${id}/`, 1);

  useEffect(() => {
    res?.variants?.length > 0
      ? setData((prev) => ({
          ...prev,
          variants: res?.variants?.map((e: CustomVariant) => ({
            ...e,
            variant: e?.guid,
            count: 0,
          })),
        }))
      : null;
  }, [res]);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      price: Math.round(
        (Number(data.compare_at_price) * (100 - Number(data.discount))) / 100
      ),
    }));
  }, [data?.compare_at_price, data?.discount]);

  const all_count = Number(
    data?.variants.reduce(
      (acc: number, { count }: { count: number | null }) => acc + Number(count),
      0
    )
  );

  const handleSubmit = async () => {
    const newData = {
      ...data,
      compare_at_price: Number(data?.compare_at_price),
      discount: Number(data?.discount),
      count: Number(res?.variants?.length > 0 ? all_count : data?.count || 0),
      variants: data?.variants?.map((e: CustomVariant) => ({
        variant: e?.variant,
        compare_at_price: Number(e?.compare_at_price || 0),
        count: Number(e?.count || 0),
        price: Math.round(Number(e?.price)) || 0,
      })),
    };

    try {
      const url = `/marketplace/dashboard/shop/add-product/`;
      const resp: any = await $axios.post(url, newData);

      if (resp?.success) {
        console.log(resp);

        enqueueSnackbar(`ISHLADI !!!`, {
          variant: SUCCESS as any,
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
        navigate(`/my-products`);
      }
    } catch (err: any) {
      console.log(err);
      err?.response?.data?.errors?.map(
        ({ message, field }: { message: string; field: string }) =>
          enqueueSnackbar(`${message} "${field}"`, {
            variant: ERROR as any,
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
    <Main className="w-full h-screen overflow-hidden flex-col items-start justify-start p-5 px-60 max-[1300px]:px-20 max-[900px]:px-5">
      <Box
        sx={{ color: colors.grey[100] }}
        className="w-full flex items-center justify-between px-5"
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
      </Box>
      <Space />
      <Section className="w-full h-[90vh] overflow-y-auto">
        <ProductValue loader={loader} res={res} setData={setData} data={data} />
        <Space />
        <ProductCard loader={loader} res={res} />
      </Section>
    </Main>
  );
};

export default Product;
