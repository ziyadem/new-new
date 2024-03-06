import { v4 } from "uuid";
import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

//? Import components
import Item from "./item";
import { Paper } from "@mui/material";
import { Image, Main, Section } from "../../style";

//? Import static
import { sidebar } from "../../db/sidebar";
import { sidebarItemType } from "../../utils/types";

interface CustomProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ open, setOpen }: CustomProps) => {
  const role = localStorage.getItem("role") as string;

  return (
    <Main className="w-full justify-start">
      <Paper className="bg-transparent backdrop-blur-[10px] shadow-2xl rounded-none">
        <Section
          className={`h-screen flex flex-col w-[18rem] justify-between py-4 pt-0`}
        >
          <Section>
            <Section className="h-[10vh] flex items-center mx-4">
              <Link to="/" className={`inline-flex items-center gap-1`}>
                <Image
                  src="/images/fulllogo.svg"
                  alt=""
                  className={`h-[8vh] -ml-[8px]`}
                />
              </Link>
            </Section>
            <Section className="h-[90vh] flex flex-col gap-y-2 pb-20 overflow-y-auto">
              {sidebar?.map((e: sidebarItemType) =>
                e?.roles?.includes(role.toLocaleUpperCase()) ? (
                  <Item
                    key={v4()}
                    open={open}
                    setOpen={setOpen}
                    item={e}
                    role={role?.toLocaleLowerCase()}
                  />
                ) : null
              )}
            </Section>
          </Section>
        </Section>
      </Paper>
      <Section
        className={`w-full h-[100vh] bg-transparent duration-300 cursor-pointer ${
          !open ? "hidden" : ""
        }`}
        onClick={() => {
          setOpen(false);
        }}
      />
    </Main>
  );
};

export default Sidebar;
