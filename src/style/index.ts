import { styled } from "@mui/material/styles";

export const Main = styled("main")(() => ({
  backgroundColor: "transparent",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#272432",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

export const Section = styled("section")(() => ({}));

export const Image = styled("img")(() => ({}));

export const Space = styled("div")(() => ({
  width: "100%",
  height: "20px",
}));

export const Form = styled("form")(() => ({}));

export const Title = styled("h1")(() => ({
  fontSize: "1.4993rem",
  fontWeight: 600,
  letterSpacing: "0.18px",
}));

export const Description = styled("p")(() => ({
  fontWeight: 400,
  fontSize: "0.875rem",
  lineHeight: 1.429,
  letterSpacing: "0.15px",
}));
