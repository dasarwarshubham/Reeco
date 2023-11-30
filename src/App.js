import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./containers/navbar/NavbarContainer";
import Footer from './containers/FooterContainer';

import * as ROUTES from "./constants/routes";

const Home = lazy(() => import(/* webpackChunkName: "homePage" */ "./pages/Home"));
const Store = lazy(() => import(/* webpackChunkName: "storePage" */ "./pages/Store"));
const Cart = lazy(() => import(/* webpackChunkName: "cartPage" */ "./pages/Cart"));
const Orders = lazy(() => import(/* webpackChunkName: "ordersPage" */ "./pages/Orders/Orders"));
const Settings = lazy(() => import(/* webpackChunkName: "settingsPage" */ "./pages/Settings"));
const OrderDetails = lazy(() => import(/* webpackChunkName: "orderDetilsPage" */ "./pages/Orders/OrderDetails"));
const Analytics = lazy(() => import(/* webpackChunkName: "analyticsPage" */ "./pages/Analytics"));
const Profile = lazy(() => import(/* webpackChunkName: "profilePage" */ "./pages/Profile"));
const PageNotFound = lazy(() => import(/* webpackChunkName: "404Page" */ "./pages/404"));

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={Loader()}>
        <Routes>
          <Route path={ROUTES.HOME} Component={Home} />
          <Route path={ROUTES.STORE} Component={Store} />
          <Route path={ROUTES.ANAYLTICS} Component={Analytics} />
          <Route path={ROUTES.CART} Component={Cart} />
          <Route path={ROUTES.PROFILE} Component={Profile} />
          <Route path={ROUTES.SETTINGS} Component={Settings} />

          <Route path={ROUTES.ORDERS}>
            <Route index Component={Orders} />
            <Route path=":orderId" Component={OrderDetails} />
          </Route>

          <Route path="*" Component={PageNotFound} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
