import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import About from './components/About/About';
import HomePage from './components/Home/HomePage/HomePage';
import Header from './components/Header/Header';
import LoginSignUp from './components/LoginSignUp/LoginSignUp';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import { AppContext } from './components/context';
import { useState } from 'react';
import Blogs from './components/Blogs/Blogs';
import ArticleDetails from './components/Blogs/BlogByCategorySection/ArticleDetails/ArticleDetails';

function App() {
  const [user, setUser] = useState('test');
  return (
    <AppContext.Provider value={{ user, setUser }}>

      <div className="App">
        <Header></Header>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/articleDetails/:articleObj" element={<ArticleDetails />} />


          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          

        </Routes>
        <Footer></Footer>

      </div>


    </AppContext.Provider>


  );
}

export default App;
