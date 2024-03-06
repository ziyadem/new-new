import axios from "axios";

//? Base Axios instance
const $axios = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
});

//? REQUEST interceptor
$axios.interceptors.request.use(
  // eslint-disable-next-line
  async (request: any) => {
    request.headers = {
      ...request.headers,
      authorization: "Bearer " + localStorage.getItem("ac"),
    };
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//? RESPONSE interceptor
$axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.status === 401) {
      if (localStorage.getItem("re")) {
        try {
          const refreshRes = await $axios.post("/auth/refresh", {
            refreshToken: localStorage.getItem("re"),
          });
          console.log(refreshRes, "res");
          console.log("tokeni");

          localStorage.setItem("ac", refreshRes.data.accessToken);

          $axios.defaults.headers.common.authorization =
            refreshRes.data.accessToken;

          if (error.config.headers) {
            error.config.headers.authorization = refreshRes.data.accessToken;
          }
          return await $axios(error.config);
        } catch (err) {
          localStorage.removeItem("ac");
          localStorage.removeItem("re");
          localStorage.removeItem("status_name");
          window.location.replace("/login");
        }
      } else {
        localStorage.removeItem("ac");
        localStorage.removeItem("re");
        localStorage.removeItem("status_name");
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default $axios;

// import axios, { AxiosInstance, AxiosResponse } from "axios";

// //* Axios instansi yaratish
// const $axios: AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_KEY as string,
// });

// interface CustomRequest {
//   headers: {
//     Authorization: string;
//     "Accept-Language": string;
//   };
// }

// //* REQUEST interceptor
// $axios.interceptors.request.use(
//   // eslint-disable-next-line
//   async (request: CustomRequest & any) => ({
//     ...request,
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("ac")}`,
//       "Accept-Language": localStorage.getItem("i18nextLng") || "uz",
//     },
//   }),
//   (error) => Promise.reject(error)
// );

// //* RESPONSE interceptor
// $axios.interceptors.response.use(
//   (res: AxiosResponse) => res,
//   async (error) => {
//     if (
//       error.response.status === 401 &&
//       error.config.url !== "/marketplace/user/token/refresh/"
//     ) {
//       if (localStorage.getItem("re")) {
//         try {
//           const refreshRes: { access: string } = await $axios.post(
//             `/marketplace/user/token/refresh/`,
//             { refresh: localStorage.getItem("re") }
//           );

//           localStorage.setItem("ac", refreshRes.access);

//           $axios.defaults.headers.common.Authorization = refreshRes.access;

//           if (error.config.headers) {
//             error.config.headers.Authorization = refreshRes.access;
//           }
//           return await $axios(error.config);
//         } catch (err) {
//           console.error(err);
//         }
//       } else {
//         localStorage.clear();
//       }
//     } else if (error.response.status === 401) {
//       localStorage.clear();
//       window.location.reload();
//     }
//     return Promise.reject(error);
//   }
// );

// export default $axios;
