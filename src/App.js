import React, { useState } from 'react'
import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Cart from './components/Cart';
import Account from './components/Account';
import Login from './components/Login';
import Signup from './components/Signup';
import Product from './components/Product';
import Orders from './components/Orders';
import Filter from './components/Filter';
import Search from './components/Search';

import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [progress, setProgress] = useState(0)


  return (
    <Router>
      <Navbar />

      {/* Top Loading Bar */}
      <LoadingBar
        color='#fb641b'
        progress={progress}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />

      {/* Alert */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />

      <Switch>
        <Route exact path="/" >
          <Home setProgress={setProgress} toast={toast}/>
        </Route>
        <Route exact path="/search/:slug" >
          <Search setProgress={setProgress} toast={toast}/>
        </Route>
        <Route exact path="/cart" >
          <Cart setProgress={setProgress} toast={toast}/>
        </Route>
        <Route exact path="/account" >
          <Account setProgress={setProgress} toast={toast}/>
        </Route>
        <Route exact path="/login" >
          <Login setProgress={setProgress} toast={toast}/>
        </Route>
        <Route exact path="/signup" >
          <Signup setProgress={setProgress} toast={toast}/>
        </Route>
        <Route exact path="/orders" >
          <Orders setProgress={setProgress} toast={toast}/>
        </Route>
        <Route exact path="/product/:slug" >
          <Product setProgress={setProgress} toast={toast}/>
        </Route>
        <Route exact path="/filter/:category" >
          <Filter setProgress={setProgress} toast={toast}/>
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
