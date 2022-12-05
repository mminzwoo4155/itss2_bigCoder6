import React from "react";
// import Signup from "./Signup"
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Homepage from "./components/Homepage";
import FormManager from "./components/FormManager";
import Profile from "./components/Profile/Profile";
import DetailForm from "./components/DetailForm";

function App() {
  return (
    // <Container
    //   className="d-flex align-items-center justify-content-center"
    //   style={{ minHeight: "100vh" }}
    // >
    //   <div className="w-100" style={{ maxWidth: "400px" }}>
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Homepage} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <PrivateRoute path="/form/*" component={Homepage} />
          <PrivateRoute path="/profile/:uid" component={Profile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute path="/form-manager" component={FormManager} />
        </Switch>
      </AuthProvider>
    </Router>
    //   </div>
    // </Container>
  );
}

export default App;
