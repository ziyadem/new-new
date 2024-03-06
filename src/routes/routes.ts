import { ADMIN, KASSIR, SUPER_ADMIN } from "../utils/constants";

import Home from "../pages/home";
import Products from "../pages/products";
import MyProducts from "../pages/myproducts";
import Orders from "../pages/orders";
import Order from "../pages/orders/order";
import Product from "../pages/products/product";
import ProductCreate from "../pages/products/create";
import MyProductEdit from "../pages/myproducts/edit";
import Company from "../pages/company";
import Admin from "../pages/admin";

export const routes = [
  {
    path: "/",
    component: Home,
    roles: [SUPER_ADMIN, ADMIN, KASSIR],
  },
  {
    path: "/company",
    component: Company,
    roles: [SUPER_ADMIN],
  },
  {
    path: "/admins",
    component: Admin,
    roles: [SUPER_ADMIN],
  },
  {
    path: "/products",
    component: Products,
    roles: [SUPER_ADMIN],
  },
  {
    path: "/products/:id",
    component: Product,
    roles: [SUPER_ADMIN],
  },
  {
    path: "/product/create",
    component: ProductCreate,
    roles: [SUPER_ADMIN],
  },
  {
    path: "/my-products",
    component: MyProducts,
    roles: [SUPER_ADMIN],
  },
  {
    path: "/my-products/:id",
    component: MyProductEdit,
    roles: [SUPER_ADMIN],
  },
  {
    path: "/orders",
    component: Orders,
    roles: [SUPER_ADMIN],
  },
  {
    path: "/orders/:id",
    component: Order,
    roles: [SUPER_ADMIN],
  },
];
