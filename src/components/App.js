
import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import Landing from "./Landing"
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AdminDashboard from "./AdminDashboard";


function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "1600" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />}/>
              <Route path='/admin-dashboard' element={<AdminDashboard />}/>
              {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
              {/*<PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/forgot-password" component={ForgotPassword} /> */}
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>

  );
}

// let routes = (
//   <Switch>
//     <Route exact path="/">
//       <Home />
//     </Route>

//     <Route path="/users">
//       <Users />
//     </Route>
//     <Redirect from="/accounts" to="/users" />

//     <Route>
//       <NoMatch />
//     </Route>
//   </Switch>
// );

export default App;
