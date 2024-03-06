import { v4 } from "uuid";
import i18next from "i18next";
import { Dispatch, SetStateAction, memo, useEffect, useState } from "react";

//* Import Styled components
import { Menu, PopoverVirtualElement } from "@mui/material";
import { Paper } from "@mui/material";
import { Avatar } from "@mui/material";
import { Tooltip } from "@mui/material";
import { useTheme } from "@mui/material";
import { MenuItem } from "@mui/material";
import { IconButton } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { Badge, Box, Fade } from "@mui/material";
import { Description, Section } from "../../style";

//* Import assets
import { tokens } from "../../db/theme";
import langs from "../../../public/langs.json";

import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { MdTranslate } from "react-icons/md";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

interface CustomProps {
  mode: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

type CustomElement =
  | Element
  | (() => Element)
  | PopoverVirtualElement
  | (() => PopoverVirtualElement)
  | null
  | undefined;

interface CustomState {
  header_title: string;
  lang: string;
  langOpen: CustomElement;
  profileOpen: CustomElement;
}

const Header = memo(({ mode, setMode, setOpen }: CustomProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme?.palette?.mode);
  document.body.style.backgroundColor = colors.body[100];

  // eslint-disable-next-line
  const { title } = useSelector((store: any) => store?.main);

  const [state, setState] = useState<CustomState>({
    header_title: "main_title",
    lang: localStorage.getItem("i18nextLng") || "uz",
    langOpen: null,
    profileOpen: null,
  });

  useEffect(() => {
    setState((prev: CustomState) => ({
      ...prev,
      header_title: title,
    }));
  }, [title]);

  const { lang, langOpen, profileOpen } = state;

  const sx = {
    bgcolor: colors.body[100],
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: colors.body[100],
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  };

  return (
    <Paper
      sx={{ backgroundImage: "none", color: colors.grey[100] }}
      className="bg-transparent h-[10vh] shadow-none w-full rounded-none duration-300"
    >
      <Box className="px-5 h-full flex items-center justify-between">
        <Section className="flex items-center gap-5 capitalize">
          <IconButton
            size="large"
            color="info"
            onClick={() => {
              setOpen(true);
            }}
          >
            <HiOutlineMenuAlt1 />
          </IconButton>

          <Description className="font-semibold text-[1.2rem] max-[550px]:hidden">
            {t(String(state?.header_title))}
          </Description>
        </Section>
        <Section className="flex items-center gap-3">
          <Tooltip arrow title={t("translate")}>
            <IconButton
              color="inherit"
              id="fade-button"
              aria-haspopup="true"
              aria-expanded={langOpen ? "true" : undefined}
              aria-controls={langOpen ? "fade-menu" : undefined}
              onClick={(e) =>
                setState((prev: CustomState) => ({
                  ...prev,
                  langOpen: e.currentTarget,
                }))
              }
            >
              <Badge
                badgeContent={
                  <span
                    className={`flag-icon ${
                      "flag-icon-" + lang
                    } flag-icon-squared`}
                    style={{ borderRadius: "50%" }}
                  />
                }
              >
                <MdTranslate className="text-[1.3rem]" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            open={!!langOpen}
            anchorEl={langOpen}
            onClose={() =>
              setState((prev: CustomState) => ({ ...prev, langOpen: null }))
            }
            TransitionComponent={Fade}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{ elevation: 0, sx }}
          >
            {langs?.map(({ lang, title, icon }) => (
              <MenuItem
                key={v4()}
                onClick={() => {
                  i18next.changeLanguage(lang);
                  setState((prev: CustomState) => ({
                    ...prev,
                    langOpen: null,
                    lang,
                  }));
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  backgroundColor:
                    localStorage.getItem("i18nextLng") === lang
                      ? colors.card[100]
                      : "transparent",
                }}
              >
                <div
                  className={`flag-icon ${icon} flag-icon-squared`}
                  style={{ borderRadius: "50%" }}
                />
                <Description>{title}</Description>
              </MenuItem>
            ))}
          </Menu>
          <Tooltip arrow title={mode ? t("light_mode") : t("dark_mode")}>
            <IconButton
              color="inherit"
              aria-haspopup="true"
              aria-controls="customized-menu"
              onClick={() => {
                setMode(!mode);
              }}
            >
              {mode ? (
                <BsSun className="text-[1.4rem]" />
              ) : (
                <BsMoonStars className="text-[1.4rem]" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title={t("profile")}>
            <IconButton
              id="account-menu"
              onClick={(e) =>
                setState((prev: CustomState) => ({
                  ...prev,
                  profileOpen: e.currentTarget,
                }))
              }
              size="small"
              sx={{ ml: 2 }}
              aria-controls={langOpen ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={langOpen ? "true" : undefined}
            >
              <Avatar alt="Ava" src={``} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={profileOpen}
            id="account-menu"
            open={Boolean(profileOpen)}
            onClose={() =>
              setState((prev: CustomState) => ({ ...prev, profileOpen: null }))
            }
            onClick={() =>
              setState((prev: CustomState) => ({ ...prev, profileOpen: null }))
            }
            PaperProps={{
              elevation: 0,
              sx,
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              disabled
              onClick={() => {
                setState((prev: CustomState) => ({
                  ...prev,
                  profileOpen: null,
                }));
                localStorage.clear();
                window.location.reload();
              }}
            >
              <ListItemIcon>
                <FaRegUser />
              </ListItemIcon>
              {t("profile")}
            </MenuItem>
            <MenuItem
              disabled
              onClick={() => {
                setState((prev: CustomState) => ({
                  ...prev,
                  profileOpen: null,
                }));
                localStorage.clear();
                window.location.reload();
              }}
            >
              <ListItemIcon>
                <IoSettingsOutline />
              </ListItemIcon>
              {t("settings")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setState((prev: CustomState) => ({
                  ...prev,
                  profileOpen: null,
                }));
                localStorage.clear();
                window.location.reload();
              }}
            >
              <ListItemIcon>
                <BiLogOut />
              </ListItemIcon>
              {t("long_out")}
            </MenuItem>
          </Menu>
        </Section>
      </Box>
    </Paper>
  );
});

export default Header;
