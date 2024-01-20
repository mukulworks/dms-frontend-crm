import axios from "axios";
import { useDispatch } from "react-redux";
// import jwt from "jsonwebtoken";
import serviceAppointmentHttp from "../services/apiCalls/http-common";
import { API_CONSTANT_MAP } from "../utils/constant";
import { startLoader } from "../actions/userAction";
import * as types from "../actions/index";

const tokenAxios = axios.create();

const getInterceptor = (store, history) => {
  serviceAppointmentHttp.interceptors.request.use(
    async (config) => {
      // store.dispatch({
      //    type: types.SHOW_LOADER
      // })
      let token = localStorage.getItem("token");
      let refreshToken = localStorage.getItem("refreshToken");
      let decodedToken = { payload: { exp: "" } };
      var existingTokenExp = decodedToken.payload.exp * 1000;

      //current time in milliseconds
      var dateNow = new Date().getTime();

      // if token is valid then return config -- validated by jsonwebtoken -- later
      if (existingTokenExp <= dateNow) {
        let refreshedToken = await tokenAxios.post(
          "https://g2.orbitsys.com/OrbitsysIdentityApi/Api/Identity/Refresh-Token",
          { token: refreshToken },
          {
            headers: {
              "Content-type": "application/json",
              brandCode: window.brandCode,
              countryCode: window.countryCode,
              "Client-Ip": sessionStorage.getItem("ip"),
            },
          }
        );

        localStorage.setItem("token", refreshedToken.data.token);
        localStorage.setItem("refreshToken", refreshedToken.data.refreshToken);
        return config;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  serviceAppointmentHttp.interceptors.response.use(
    (response) => {
      // store.dispatch({
      //    type: types.HIDE_LOADER
      // })
      return response;
    },
    async (error) => {
      // store.dispatch({
      //     type: types.HIDE_LOADER
      // })
      const { status, data, config } = error.response;

      if (status === 404) {
        //can be pushed to not found page
        // history.push('/NotFound')
      }
      if (status === 500) {
        // toast notification can be shown here
      }

      return Promise.reject(error);
    }
  );
};

export default getInterceptor;
