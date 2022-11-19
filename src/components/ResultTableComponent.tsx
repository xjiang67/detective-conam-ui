import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import FileUpload from "react-material-file-upload";
import { detectFile, Response } from "../http/fetchData";
interface Props {}

async function getSerializedString(file: File) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsBinaryString(file);
  });
}

const ResultTableComponent: React.FC<Props> = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [keys, setKeys] = useState<string[]>([]);
  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [showTable, setShowTable] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const sendRequest = useCallback(async () => {
    let detectString = value;
    if (files.length > 0) {
      detectString = (await getSerializedString(files[0])) as string;
    }
    const data = await detectFile(detectString);

    if (data !== null) {
      setShowTable(true);
      let resultKeys: string[] = [];
      let resultValues: string[] = [];
      Object.entries(data).forEach((entry) => {
        const [key, value] = entry;
        console.log(`${key}: ${value}`);
        resultKeys.push(key);
        resultValues.push((value*100).toString() + "%");
      });
      setKeys(resultKeys);
      setValues(resultValues);
    }
  }, [value, files]); // update the callback if the state changes

  return (
    <div>
      <FileUpload value={files} onChange={setFiles} />
      <div className="ResultSection">
        <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          fullWidth
          minRows={4}
          value={value}
          onChange={handleChange}
        />
      </div>
      <div className="DetectSection">
        <Button variant="contained" onClick={sendRequest}>
          Detect
        </Button>
      </div>
      <div className="ResultSection" hidden={!showTable}>
        <TableContainer component={Paper} variant="outlined">
          <Table aria-label="demo table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Probability</TableCell>
              </TableRow>
            </TableHead>
            <TableRow>
              <TableCell>{keys[0]}</TableCell>
              <TableCell>{values[0]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{keys[1]}</TableCell>
              <TableCell>{values[1]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{keys[2]}</TableCell>
              <TableCell>{values[2]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{keys[3]}</TableCell>
              <TableCell>{values[3]}</TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ResultTableComponent;
