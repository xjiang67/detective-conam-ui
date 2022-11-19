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
  const [total, setTotal] = useState<string>("");
  const [model1, setModel1] = useState<string>("");
  const [model2, setModel2] = useState<string>("");
  const [value, setValue] = useState("");
  const [showTable, setShowTable] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const sendRequest = useCallback(async () => {
    let detectString = value;
    if (files.length > 0) {
        detectString = await getSerializedString(files[0]) as string;
    }
    const data = await detectFile(detectString);
    if (data !== null) {
      setShowTable(true);
      let resultString = JSON.stringify(data, null, 4);
      let result: Response = JSON.parse(resultString);
      let totalNumber = result?.total;
      let model1Number = result?.model1;
      let model2Number = result?.model2;
      setTotal((totalNumber * 100).toString() + "%");
      setModel1((model1Number * 100).toString() + "%");
      setModel2((model2Number * 100).toString() + "%");
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
            <TableBody>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>{total}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Model 1</TableCell>
                <TableCell>{model1}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Model 2</TableCell>
                <TableCell>{model2}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ResultTableComponent;
