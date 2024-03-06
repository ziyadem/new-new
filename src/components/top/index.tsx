import { MdSave } from "react-icons/md";
import { BsArrowLeftShort } from "react-icons/bs";
import { tokens } from "../../db/theme";
import { Description } from "../../style";
import { useTranslation } from "react-i18next";
import { Box, Button, Card, IconButton, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CustomProps {
  path: string;
  description: string;
  Component?: () => JSX.Element;
  button: string;
  callback?: () => void;
}

const Top = (props: CustomProps) => {
  const { path, description, Component, button, callback } = props;
  const theme = useTheme();
  const colors = tokens(theme?.palette?.mode);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card
      sx={{ bgcolor: colors.card[100], backgroundImage: "none" }}
      className="w-full h-[7vh] flex items-center justify-between p-5"
    >
      <Box
        className="flex items-center gap-1 cursor-pointer select-none"
        onClick={() => navigate(path)}
      >
        <IconButton>
          <BsArrowLeftShort />
        </IconButton>
        <Description className="text-[1em]">{t(description)}</Description>
      </Box>
      <Box>
        {Component ? <Component /> : null}
        <Button
          color="info"
          size="medium"
          variant="contained"
          startIcon={<MdSave />}
          className="px-5"
          onClick={callback}
        >
          {t(button)}
        </Button>
      </Box>
    </Card>
  );
};

export default Top;
