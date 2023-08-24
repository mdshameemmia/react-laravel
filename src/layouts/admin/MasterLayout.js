import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../../assets/admin/css/styles.css";
import "../../assets/admin/js/scripts";
import routes from "../../routes/Routes";
const MasterLayout = () => {
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <Switch>
              {routes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                    name={route.name}
                  />
                );
              })}
            </Switch>

            <Route exact path="/admin">
              <Redirect to="/admin/dashboard" />
            </Route>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
