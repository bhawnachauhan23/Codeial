import { BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import { useAuth } from "../hooks";
import { Home, Login, Signup, Settings, UserProfile } from "../pages";
import {Loader,Navbar} from "./";


function PrivateRoute({children})
{

  const auth=useAuth();

  return auth.user? children : <Navigate to="/login" />
};

const Page404 = () => {
  return <h1>404</h1>;
}

function App() {
 const auth=useAuth();
 
 console.log('auth', auth);

 if(auth.loading){
    return <Loader />
  }
  return (
    <div className="App">
      
      <Router>
       <Navbar/>
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/user/:userId" element={<PrivateRoute > <UserProfile /></PrivateRoute> }/>
        <Route exact path="settings" element={<PrivateRoute > <Settings /></PrivateRoute> }/>
        <Route path="*" element={<Page404/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
