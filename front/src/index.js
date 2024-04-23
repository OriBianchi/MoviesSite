/*!

=========================================================
* Argon Design System React - v1.1.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Landing from "views/examples/Landing.js";

// Nuevas routes - APIS
import LandingPage from "views/LandingPage.js";
import Register from "views/Register.js";
import Login from "views/Login.js";
import MainPage from "views/MainPage.js";
import Profile from "views/Profile";
import SearchResults from "views/SearchResults";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/main-page" exact element={<MainPage />} />
        <Route path="/landing-page" exact element={<Landing />} />
        <Route path="/login-page" exact element={<Login />} />
        <Route path="/profile-page" exact element={<Profile />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/search-results" exact element={<SearchResults />} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
