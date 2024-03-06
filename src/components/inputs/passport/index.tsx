import { forwardRef, memo } from "react";
import { IMaskInput } from "react-imask";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const PassportInput = memo(
  forwardRef<HTMLInputElement, CustomProps>(
    ({ name, onChange, ...other }, ref) => {
      return (
        <IMaskInput
          {...other}
          overwrite
          inputRef={ref}
          mask="LL 0000000"
          definitions={{ L: /[A-Za-z]/, "0": /[0-9]/ }}
          onAccept={(value: string) => onChange({ target: { name, value } })}
        />
      );
    }
  )
);
