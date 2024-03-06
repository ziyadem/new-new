import { Box, Button } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { SlCloudUpload } from "react-icons/sl";
import { Description, Section, Space } from "../../style";

interface CustomProps {
  onDrop: (files: Array<File>) => void;
  file: File | null | Array<string>;
  description: string;
  button: string;
}

const FileUpload = ({ onDrop, file, description, button }: CustomProps) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box className="w-full h-full">
      <Section
        {...getRootProps()}
        className={`w-full h-full flex flex-col items-center justify-center ${
          file ? `border-green-500` : `border-blue-500`
        } border-dashed border-4 rounded-2xl cursor-cell`}
      >
        <input accept="image/*" {...getInputProps()} />
        <SlCloudUpload className="text-[2rem]" />
        <Space />
        <Description className="text-center text-[1.3rem]">
          {description}
        </Description>
        <Space />
        <Button
          variant="contained"
          className={`${file ? `bg-green-500` : `bg-blue-500`} text-white`}
        >
          {button}
        </Button>
      </Section>
      <Space />
    </Box>
  );
};

export default FileUpload;
