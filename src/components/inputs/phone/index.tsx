import { forwardRef, memo } from "react";
import { IMaskInput } from "react-imask";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const PhoneInput = memo(
  forwardRef<HTMLInputElement, CustomProps>((props, ref) => {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        overwrite
        inputRef={ref}
        mask="+998(00) 000-00-00"
        definitions={{ "#": /[1-9]/ }}
        onAccept={(value: string) =>
          onChange({ target: { name: props.name, value } })
        }
      />
    );
  })
);
