import { Box, Card, useTheme } from "@mui/material";
import { Description, Image, Section, Space, Title } from "../../../style";
import { v4 } from "uuid";
import { useTranslation } from "react-i18next";
import { tokens } from "../../../db/theme";
import SlickSlider from "react-slick";

// eslint-disable-next-line
const ProductCard = ({ res }: any) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme?.palette?.mode);

  return (
    <Card
      sx={{
        backgroundColor: colors.card[100],
        backgroundImage: "none",
      }}
      className="w-full flex items-center gap-20 py-10 px-16 max-[1500px]:flex-col-reverse max-[500px]:px-5"
    >
      <SlickSlider
        speed={700}
        autoplay={true}
        autoplaySpeed={5000}
        slidesToShow={1}
        centerMode={true}
        slidesToScroll={1}
        className="w-[50%] cursor-grab max-[1500px]:w-full"
      >
        {res?.product?.images?.map(({ image }: { image: string }) => (
          <Section className="px-2">
            <Image
              src={image}
              alt={image}
              className="w-full h-full rounded-2xl"
            />
          </Section>
        ))}
        {res?.product?.images?.map(({ image }: { image: string }) => (
          <Section className="px-2">
            <Image
              src={image}
              alt={image}
              className="w-full h-full rounded-2xl"
            />
          </Section>
        ))}
      </SlickSlider>
      <Box className="w-[50%] max-[1500px]:w-full">
        <Box className="flex items-center gap-10">
          <Title className="text-[1.2em] capitalize">
            {res &&
              res?.product?.["name_" + localStorage.getItem("i18nextLng")]}
          </Title>
        </Box>
        <Space />
        <Title className="text-[1em]">
          {t("IKPU")}: {res?.product?.ikpu}
        </Title>
        <Space />
        <Description>
          {res &&
            res?.product?.["description_" + localStorage.getItem("i18nextLng")]}
        </Description>
        <Space />
        {res?.product?.characteristic?.length > 0 ? (
          <Section>
            {res?.product?.characteristic?.map(
              ({ key, value }: { key: string; value: string }) => (
                <Box
                  key={v4()}
                  className="w-full flex items-center justify-between border-b border-slate-500 mb-5"
                >
                  <Description className="capitalize">{key}</Description>
                  <Description>{value}</Description>
                </Box>
              )
            )}
            <Space />
          </Section>
        ) : null}
        <Space />
        <Section className="w-full flex  items-center justify-start gap-5">
          <Box className="flex items-center justify-center gap-2">
            {res?.product?.brand_image ? (
              <Image
                src={res?.product?.brand_image}
                alt="brand_image"
                className="w-auto h-[5vh] rounded-sm"
              />
            ) : null}

            {res?.product?.brand_name ? (
              <Title className="text-[1em] text-slate-500">
                {t("brand") + ": " + res?.product?.brand_name}
              </Title>
            ) : null}
          </Box>
          <Box className="flex items-center justify-center gap-2">
            {res?.product?.catalog_image ? (
              <Image
                src={res?.product?.catalog_image}
                alt="category_image"
                className="w-auto h-[5vh] rounded-sm"
              />
            ) : null}
            {res?.product?.catalog_name ? (
              <Title className="text-[1em] text-slate-500">
                {t("catalog") + ": " + res?.product?.catalog_name}
              </Title>
            ) : null}
          </Box>
        </Section>
      </Box>
    </Card>
  );
};

export default ProductCard;
