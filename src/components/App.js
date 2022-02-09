
import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from "./Landing"
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AdminDashboard from "./AdminDashboard";
import MapView from "./MapView";

// import PrivateRoute from "./PrivateRoute";

function App() {

  return (
      // {/* className="d-flex align-items-center justify-content-center"
      // style={{ minHeight: "100vh" }} */}
      //{/* className="w-100" style={{ maxWidth: "1600" }} */}
    <Container>
      <div>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path='/dashboard/:id' element={<Dashboard />} />
              <Route path='/admin-dashboard/:id' element={<AdminDashboard />} />
              <Route path='/map/:id' element={<MapView />} />

              {/* <Route path="/admin-dashboard/:id" render={(props) => (
                <AdminDashboard id={props.match.params.id} />
              )} /> */}
              {/* <Route path="/admin-dashboard/:id" render={(props)=>{return( <AdminDashboard id={props.match.params.id}/>)}} /> */}
              {/* <Route path='/admin-dashboard/:id' 
              render={
                (props) => <AdminDashboard globalStore={globalStore} {...props} />}/> */}
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
