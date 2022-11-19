import "./App.css";
import "./styles.css";
import { useState } from "react";
import FileUpload from "react-material-file-upload";
import { Button } from "@mui/material";
import { detectFile } from "./http/fetchData";
import ResultTableComponent from "./components/ResultTableComponent";

function App() {
  return (
    <div className="App">
      <h1>Upload your file so Conan will help detect</h1>
      <h2>Only upload plain txt file please</h2>
      <ResultTableComponent/>
    </div>
  );
}

export default App;
