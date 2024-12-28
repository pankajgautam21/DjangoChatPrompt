// App.js
import React from "react";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";
import Footer from "./Components/Footer";
import "./App.css";
//import DatabaseSettings from "./Components/DatabaseSetting";

const App = () => {
  return (
    <div className="App">
      {/* <DatabaseSettings/> */}
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <Chat />
      </div>
      <Footer />
    </div>
  );
};

export default App;
