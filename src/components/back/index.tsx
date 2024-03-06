import { IconButton } from "@mui/material";
import { LuArrowLeft } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Description } from "../../style";
import { useTranslation } from "react-i18next";

interface CustomProps {
  path: string;
  dec?: string;
}

const Back = ({ path, dec = "back" }: CustomProps) => {
  const { t } = useTranslation();

  return (
    <Link to={path} className="flex items-center gap-2">
      <IconButton>
        <LuArrowLeft className="text-[1.5rem]" />
      </IconButton>
      <Description className="text-[1.1rem] font-medium capitalize max-[650px]:hidden">
        {t(dec)}
      </Description>
    </Link>
  );
};

export default Back;
