import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ReactElement, forwardRef } from "react";

type CustomProps = TransitionProps & {
  children: ReactElement<unknown>;
};

export const Transition = forwardRef(
  (props: CustomProps, ref: React.Ref<unknown>) => {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);
