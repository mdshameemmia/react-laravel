import React, { useEffect, useState } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import Login from "./components/frontend/auth/Login";
import Home from "./components/frontend/Home";
import MasterLayout from "./layouts/admin/MasterLayout";
import axios from "axios";
import swal from "sweetalert";
const AdminPrivateRoute = () => {
  const history = useHistory();
  const [Authenticated, setAuthenticated] = useState(false);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.get(`/api/checkingAuthenticated`).then((res) => {
        if (res.data.status == 200) {
          setAuthenticated(true);
          setLoading(false);
        }
         else if (res.data.status == 401) {
          swal("Unauthorized", res.data.message, "warning");
          history.push("/");
        } else if (res.data.status == 403) {
          swal("Forbidden", res.data.message, "warning");
          history.push("/page403");
        }
      });
    });
    return () => {
      setAuthenticated(true);
    };
  }, []);

  axios.interceptors.response.use(
    undefined,
    function axiosRetryInterceptor(err) {
      if (err.response.status == 401) {
        swal("Unauthorized", err.response.data.message, "warning");
        history.push("/");
      }
      return Promise.reject(err);
    }
  );
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status == 403) {
        swal("Forbidden", error.response.data.message, "warning");
        history.push("/page403");
      } else if(error.response.status == 404){
        swal("404 Not Found", '', "warning");
        history.push("/page404");
      }
      return Promise.reject(error);
    }
  );

  if (Loading) {
    return <h2>Loading...</h2>;
  }

  return <Route>{Authenticated ? <MasterLayout /> : <Login />}</Route>;
};

export default AdminPrivateRoute;
