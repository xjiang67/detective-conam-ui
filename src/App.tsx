import "./App.css";
import "./styles.css";
import { useState } from "react";
import FileUpload from "react-material-file-upload";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { detectFile } from "./http/fetchData";

function App() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className="App">
      <h1>Upload your file so Conan will help detect</h1>
      <h2>Only upload plain txt file please</h2>
      <FileUpload value={files} onChange={setFiles} />
      <div className="DetectSection">
        <Button variant="contained" onClick={detectFile}>
          Detect
        </Button>
      </div>
      <div className="ResultSection">
        <TableContainer component={Paper} variant="outlined">
          <Table aria-label="demo table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Probability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Model 1</TableCell>
                <TableCell>14%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Model 2</TableCell>
                <TableCell>30%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;
