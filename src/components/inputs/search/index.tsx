import { forwardRef, memo } from "react";
import { FormControl, OutlinedInput } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import { Form } from "../../../style";

interface CustomProps {
  handleSearch: () => void;
  handleSubmit: () => void;
  value: string;
  placeholder: string;
}

const Search = forwardRef<HTMLInputElement, CustomProps>(
  memo(({ handleSearch, handleSubmit, value, placeholder }, ref) => {
    return (
      <Form onSubmit={handleSubmit} className="w-full">
        <FormControl size="small" variant="outlined" className="w-full">
          <OutlinedInput
            type="text"
            value={value}
            inputRef={ref}
            onChange={handleSearch}
            placeholder={placeholder}
            startAdornment={<BsSearch className="box-content pr-5" />}
            className="w-full h-full text-inherit bg-inherit p-inherit"
          />
        </FormControl>
      </Form>
    );
  })
);

export default Search;
