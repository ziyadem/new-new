import { forwardRef, memo } from "react";
import {
  NumberFormatValues,
  NumericFormat,
  NumericFormatProps,
} from "react-number-format";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const NumFormat = memo(
  forwardRef<NumericFormatProps, CustomProps>(
    ({ onChange, name, ...other }, ref) => {
      return (
        <NumericFormat
          {...other}
          getInputRef={ref}
          thousandSeparator
          valueIsNumericString
          onValueChange={(values: NumberFormatValues) => {
            onChange({ target: { name, value: values.value } });
          }}
        />
      );
    }
  )
);
