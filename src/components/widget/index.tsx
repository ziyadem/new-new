import { t } from "i18next";
import { Box, Skeleton } from "@mui/material";
import { formatNum } from "../../utils/helpers";
import { Description, Section, Space, Title } from "../../style";

interface CustomProps {
  title: string;
  count: number;
  lifetime: string;
  growth: number;
}

const Widget = ({ title, count, lifetime, growth }: CustomProps) => {
  return (
    <Box className="h-[180px] rounded-lg">
      {count >= 0 ? (
        <Section className="w-full h-full p-5">
          <Title className="text-slate-400">{t(title)}</Title>
          <Space />
          <Description className="text-[1.5em]">
            {formatNum(count || 0)}
          </Description>
          <Space />
          <Box className="flex items-center gap-1">
            <Description
              className={`text-[1.1em] ${
                growth > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {formatNum(growth || 0)}
            </Description>
            <Description className="text-[1.2em] text-slate-400">
              - {t(lifetime)}
            </Description>
          </Box>
        </Section>
      ) : (
        <Skeleton
          animation="wave"
          variant="rectangular"
          className="w-full h-full bg-transparent"
        />
      )}
    </Box>
  );
};

export default Widget;
