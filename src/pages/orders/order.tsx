/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { Box, Card, Chip, useTheme, Button, IconButton } from "@mui/material";
import { AiFillLike } from "react-icons/ai";
import { tokens } from "../../db/theme";
import { useDispatch } from "react-redux";
import { useFetch } from "../../utils/hooks/useFetch";
import $axios from "../../services";
import {
  ERROR,
  SUCCESS,
  payment_color,
  receive_color,
  status_color,
} from "../../utils/constants";
import { main } from "../../store";
import { Description, Main, Section, Space, Title } from "../../style";
import { useTranslation } from "react-i18next";
import { formatNum, formatPhone } from "../../utils/helpers";
import Back from "../../components/back";
import { useEffect } from "react";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { IoMdCheckmarkCircleOutline, IoMdClose } from "react-icons/io";
import Loader from "../../components/loader";
import Table from "../../components/table";
import { IoClose } from "react-icons/io5";

const Order = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme?.palette?.mode);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(main({ title: "order_title" }));
  }, []);

  const { res, loading } = useFetch(`/marketplace/dashboard/order/${id}/`, 1);

  console.log(res);

  const handleCancel = async () => {
    try {
      const resp: any = await $axios.get(
        `/marketplace/dashboard/order/${id}/cancel/`
      );

      if (resp?.success) {
        enqueueSnackbar(t("cancel_order"), {
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
        navigate("/my-products");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAccept = async () => {
    try {
      const resp: any = await $axios.post(
        `/marketplace/dashboard/order/accept/`,
        { order: id }
      );

      if (resp?.success) {
        enqueueSnackbar(t("accept_order"), {
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
        navigate("/my-products");
      } else {
        resp?.response?.data?.errors?.map(({ message }: { message: string }) =>
          dispatch(
            main({
              alert: {
                message,
                type: ERROR,
              },
            })
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const columns: any = [
    { field: "id", headerName: t("number"), width: 100 },
    { field: "shop_name", headerName: t("shop_name"), flex: 1, minWidth: 200 },
    {
      field: "product_name",
      headerName: t("product_name"),
      flex: 1,
      minWidth: 200,
    },
    {
      field: "quantity",
      headerName: t("count"),
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      renderCell: ({ row }: any) => <>{formatNum(row?.quantity)}</>,
    },
    {
      field: "additional_info",
      headerName: t("characteristic"),
      flex: 1,
      minWidth: 180,
    },
    {
      field: "price",
      headerName: t("price"),
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }: any) => (
        <>
          {formatNum(row?.price)} {t("UZS")}
        </>
      ),
    },
  ];

  return (
    <Main className="w-full h-[90vh] overflow-hidden flex-col items-start justify-start p-5 px-60 max-[1300px]:px-20 max-[900px]:px-5">
      <Box
        sx={{
          color: colors.grey[100],
        }}
        className="w-full h-auto flex items-center justify-between p-5"
      >
        <Back path="/orders" />
        <Box className="flex items-center gap-5">
          <Button
            size="small"
            color="error"
            onClick={handleCancel}
            className="max-[450px]:hidden"
          >
            {t("cancel")}
          </Button>
          <Button
            size="large"
            color="error"
            variant="outlined"
            onClick={handleCancel}
            className="hidden text-[1.1rem] max-[450px]:block"
          >
            <IoClose />
          </Button>
          <Button
            disabled={res?.payment_method == "INSTALLMENT"}
            size="small"
            color="success"
            variant="contained"
            startIcon={<AiFillLike />}
            onClick={handleAccept}
            className="max-[450px]:hidden"
          >
            {t("accept")}
          </Button>
          <Button
            size="large"
            color="success"
            variant="contained"
            onClick={handleCancel}
            className="hidden text-[1.1rem] max-[450px]:block"
          >
            <IoMdCheckmarkCircleOutline />
          </Button>
        </Box>
      </Box>
      <Section className="w-full h-[80vh] flex items-start gap-5 overflow-y-auto max-[1400px]:flex-col">
        <Card
          sx={{
            backgroundColor: colors.card[100],
            backgroundImage: "none",
          }}
          className="w-[40%] max-h-[50vh] min-h-[50vh] p-5 max-[1400px]:w-full"
        >
          <Title className="max-[1400px]:text-[1.2rem]">
            {t("order_information")}
          </Title>
          <Space />
          <Box className="w-full flex items-center justify-between border-[#fff2] border-b">
            <Description className="font-bold max-[1400px]:text-[0.8rem]">
              {t("order_number")}
            </Description>
            <Description className="max-[1400px]:text-[0.8rem]">
              {res?.order_id}
            </Description>
          </Box>
          <Box className="w-full flex items-center justify-between border-[#fff2] border-b mt-2">
            <Description className="font-bold max-[1400px]:text-[0.8rem]">
              {t("status")}
            </Description>
            <Chip
              size="small"
              variant="outlined"
              color={status_color[res?.status] || "default"}
              label={t(res?.status.toLowerCase())}
              className="capitalize"
            />
          </Box>
          <Box className="w-full flex items-center justify-between border-[#fff2] border-b mt-2">
            <Description className="font-bold max-[1400px]:text-[0.8rem]">
              {t("payment_method")}
            </Description>
            <Chip
              size="small"
              variant="outlined"
              color={payment_color[res?.payment_method] || "default"}
              label={t(res?.payment_method.toLowerCase())}
              className="capitalize"
            />
          </Box>
          <Box className="w-full flex items-center justify-between border-[#fff2] border-b mt-2">
            <Description className="font-bold max-[1400px]:text-[0.8rem]">
              {t("receive_method")}
            </Description>
            <Chip
              size="small"
              variant="outlined"
              color={receive_color[res?.receive_method] || "default"}
              label={t(res?.receive_method.toLowerCase())}
              className="capitalize"
            />
          </Box>
          <Box className="w-full flex items-center justify-between border-[#fff2] border-b mt-2">
            <Description className="font-bold max-[1400px]:text-[0.8rem]">
              {t("customer")}
            </Description>
            <Description className="max-[1400px]:text-[0.8rem]">
              {res?.full_name}
            </Description>
          </Box>
          <Box className="w-full flex items-center justify-between border-[#fff2] border-b mt-2">
            <Description className="font-bold max-[1400px]:text-[0.8rem]">
              {t("phone")}
            </Description>
            <Description className="text-blue-500 max-[1400px]:text-[0.8rem]">
              <a href={`tel: ${formatPhone(res?.phone)}`}>
                {formatPhone(res?.phone)}
              </a>
            </Description>
          </Box>
          <Box className="w-full flex items-center justify-between border-[#fff2] border-b mt-2">
            <Description className="font-bold max-[1400px]:text-[0.8rem]">
              {t("region")}
            </Description>
            <Description>{res?.region || "-"}</Description>
          </Box>
          <Box className="w-full flex items-center justify-between border-[#fff2] border-b mt-2">
            <Description className="font-bold max-[1400px]:text-[0.8rem]">
              {t("district")}
            </Description>
            <Description>{res?.district || "-"}</Description>
          </Box>
          <Box className="w-full flex items-center justify-between border-[#fff2] border-b mt-2">
            <Description className="font-bold max-[1400px]:text-[0.8rem]">
              {t("address")}
            </Description>
            <Description>{res?.address || "-"}</Description>
          </Box>
          <Box className="w-full flex items-center justify-between mt-2">
            <Description className="font-bold max-[1400px]:text-[0.8rem]">
              {t("order_time")}
            </Description>
            <Description>{res?.created_time}</Description>
          </Box>
        </Card>
        <Card
          sx={{
            backgroundColor: colors.card[100],
            backgroundImage: "none",
          }}
          className="w-[60%] max-h-[50vh] min-h-[50vh] p-5 max-[1400px]:w-full"
        >
          <Title>{t("list_of_payments")}</Title>
          <Space />
          <Section className="w-full h-[46vh] overflow-x-scroll">
            {loading ? (
              <Box className="w-full h-full flex items-center justify-center">
                <Loader />
              </Box>
            ) : (
              <Table
                dec={t("order_not_found")}
                rows={
                  res?.items?.map((e: any, i: number) => ({
                    ...e,
                    id: i + 1,
                  })) || []
                }
                columns={columns}
              />
            )}
          </Section>
        </Card>
      </Section>
    </Main>
  );
};

export default Order;
