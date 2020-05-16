import React from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Header from "./Components/Layout/Header";
//Enabling boostrap
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProject from "./Components/Project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./Components/Project/UpdateProject";
import ProjectBoard from "./Components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./Components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./Components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./Components/Layout/Landing";
import Register from "./Components/UserManagement/Register";
import Login from "./Components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./security Utils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./security Utils/SecureRoute";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    //handle logout
    store.dispatch(logout());

    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header></Header>

          {
            //Public Routes
          }

          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/login" component={Login}></Route>
          {
            //Private Routes
          }
          <Switch>
            <SecuredRoute
              exact
              path="/dashboard"
              component={Dashboard}
            ></SecuredRoute>
            <SecuredRoute
              exact
              path="/addProject"
              component={AddProject}
            ></SecuredRoute>
            <SecuredRoute
              exact
              path="/updateProject/:id"
              component={UpdateProject}
            ></SecuredRoute>
            <SecuredRoute
              exact
              path="/projectBoard/:id"
              component={ProjectBoard}
            ></SecuredRoute>
            <SecuredRoute
              exact
              path="/addProjectTask/:id"
              component={AddProjectTask}
            ></SecuredRoute>
            <SecuredRoute
              exact
              path="/updateProjectTask/:backlog_id/:pt_id"
              component={UpdateProjectTask}
            ></SecuredRoute>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
