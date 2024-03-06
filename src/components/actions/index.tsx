import { IconButton } from "@mui/material";
import { closeSnackbar } from "notistack";
import { IoMdClose } from "react-icons/io";

const action = (id: number | string) => {
  return (
    <IconButton className="text-white" onClick={() => closeSnackbar(id)}>
      <IoMdClose />
    </IconButton>
  );
};

export default action;
