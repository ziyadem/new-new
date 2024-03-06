import { AiFillLayout } from "react-icons/ai";
import { SUPER_ADMIN } from "../utils/constants";
import { MdAnalytics } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

export const sidebar = [
  {
    disabled: false,
    path: "/",
    title: "Asosiy",
    Icon: MdAnalytics,
    roles: [SUPER_ADMIN],
  },
  {
    disabled: false,
    path: "/admins",
    title: "Adminlar",
    Icon: RiAdminFill,
    roles: [SUPER_ADMIN],
  },
  {
    disabled: false,
    path: "/company",
    title: "Kompaniyalar",
    Icon: AiFillLayout,
    roles: [SUPER_ADMIN],
  },
  // {
  //   disabled: false,
  //   title: "marketplace",
  //   Icon: HiShoppingBag,
  //   roles: [OWNER, ADMIN],
  //   childrens: [
  //     {
  //       disabled: false,
  //       path: "/marketplace",
  //       title: "statistics",
  //       Icon: RxDotFilled,
  //       roles: [OWNER, ADMIN],
  //     },
  //   ],
  // },
];
