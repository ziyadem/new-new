/* eslint-disable */
import { useEffect } from "react";
import { Description, Image, Main, Title } from "../../../style";

import error500 from "../../../assets/images/500.png";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Error500 = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  return (
    <Main className="h-[100vh] bg-white flex-col">
      <Image src={error500} className="w-[25em] mb-10 max-[450px]:w-[18em]" />
      <Title className="w-full text-center text-[2.2em] max-[450px]:text-[2em]">
        {t("500_error")}
      </Title>
      <Description className="w-full text-center px-10">
        {t("error_page")}
      </Description>
      <Button
        color="info"
        className="px-10 mt-12 font-bold"
        onClick={() => navigate("/")}
      >
        {t("back_to_home")}
      </Button>
    </Main>
  );
};

export default Error500;
