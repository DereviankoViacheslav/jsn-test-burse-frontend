import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "../pages/auth";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";

const useRoutes = (isAuthenticated, userRole) => {
  if (isAuthenticated) {
    if (userRole !== "basic") {
      return (
        <Switch>
          <Route path="/admin" exact>
            <DashboardLayout />
          </Route>
          <Redirect to="/admin" />
        </Switch>
      );
    }

    return (
      <Switch>
        <Route path="/users" exact>
          <MainLayout />
        </Route>
        <Redirect to="/users" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/auth" exact>
        <Auth />
      </Route>
      <Redirect to="/auth" />
    </Switch>
  );
};

export default useRoutes;
