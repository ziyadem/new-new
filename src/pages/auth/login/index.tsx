/* eslint-disable @typescript-eslint/no-explicit-any */
//* Import libraries
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import $axios from "../../../services";

//* Import Styled Component
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import { InputAdornment } from "@mui/material";
import {
  Form,
  Image,
  Space,
  Title,
  Section,
  Description,
} from "../../../style";

//* Import icons
import { enqueueSnackbar } from "notistack";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Girl from "../../../assets/images/girl.png";

interface CustomResp {
  data: {
    accessToken: string;
    refreshToken: string;
    role: string;
  };
}

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    localStorage.clear();
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    );

    try {
      setLoading(true);

      const resp: CustomResp = await $axios.post(`/auth/login`, newData);

      localStorage.setItem("ac", resp?.data?.accessToken);
      localStorage.setItem("re", resp?.data?.refreshToken);
      localStorage.setItem("role", resp?.data?.role.toUpperCase());

      enqueueSnackbar(`Muvaffaqiyatli login qilindi!`, {
        variant: "success",
        autoHideDuration: 1000,
      });

      navigate("/");
    } catch (err: any) {
      if (err?.response?.status == 400) {
        enqueueSnackbar(`error`, {
          variant: "error",
          autoHideDuration: 1000,
        });
      }
      enqueueSnackbar(err?.response?.data?.message, {
        variant: "error",
        autoHideDuration: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section className="h-screen w-full flex items-center justify-center">
      <Box className="block max-[600px]:hidden">
        <Image src={Girl} alt="img" />
      </Box>
      <Form
        onSubmit={handleSubmit}
        className="w-[550px] px-[4rem] max-[450px]:px-[.5rem]"
      >
        <Title>CRM marketga hush kelibsiz!</Title>
        <Description>Hisob ma'lumotlaringizni kiriting!!!</Description>
        <Space />
        <TextField
          required
          size="small"
          type="text"
          label="Foydalanuvchi nomi"
          className="w-full"
          name="username"
        />
        <Space />
        <TextField
          required
          fullWidth
          size="small"
          name="password"
          type={show ? "" : "password"}
          variant="outlined"
          label="Foydalanuvchi paroli"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {show ? (
                  <IconButton
                    onClick={() => {
                      setShow(false);
                    }}
                  >
                    <AiFillEye className="text-[1.5rem] cursor-pointer" />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    <AiFillEyeInvisible className="text-[1.5rem] cursor-pointer" />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
        <Space />
        <LoadingButton
          fullWidth
          color="info"
          type="submit"
          loading={loading}
          variant="contained"
          className="font-bold"
        >
          {t("login_submit")}
        </LoadingButton>
      </Form>
    </Section>
  );
};

export default Login;
