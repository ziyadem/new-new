import { Breadcrumbs } from "@mui/material";
import { Description } from "../../style";

interface Parent {
  guid: string;
  name: string;
  parent?: string;
  child?: Array<Parent>;
}

interface CustomProps {
  list: Array<Parent>;
  callback: (id: string) => void;
}

const MyBreadcrumbs = ({ list, callback }: CustomProps) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {list?.map(({ name, guid }, i) => (
        <Description
          onClick={() => {
            if (i != list.length - 1) {
              callback(guid);
            }
          }}
          className={
            i === list.length - 1
              ? "font-bold text-[1.1rem] cursor-default"
              : "text-[.9rem] capitalize cursor-pointer"
          }
        >
          {name}
        </Description>
      ))}
    </Breadcrumbs>
  );
};

export default MyBreadcrumbs;
