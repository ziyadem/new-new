import { forwardRef, memo } from "react";
import { IMaskInput } from "react-imask";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const PinflInput = memo(
  forwardRef<HTMLInputElement, CustomProps>((props, ref) => {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        overwrite
        inputRef={ref}
        mask="00000000000000"
        definitions={{ "#": /[0-9]/ }}
        onAccept={(value: string) =>
          onChange({ target: { name: props.name, value } })
        }
      />
    );
  })
);
