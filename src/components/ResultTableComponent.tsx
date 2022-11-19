import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { detectFile, GetResponse, Response } from "../http/fetchData";
interface Props {}

const ResultTableComponent: React.FC<Props> = () => {
  const [total, setTotal] = useState<string>("");
  const [model1, setModel1] = useState<string>("");
  const [model2, setModel2] = useState<string>("");

  const [showTable, setShowTable] = useState<boolean>(false);
  const sendRequest = useCallback(async () => {
    const data = await detectFile();
    if (data !== null) {
      setShowTable(true);
      let resultString = JSON.stringify(data, null, 4);
      let result: Response = JSON.parse(resultString);
      console.log(result);
      let totalNumber = result?.total;
      let model1Number = result?.model1;
      let model2Number = result?.model2;
      setTotal((totalNumber * 100).toString() + "%");
      setModel1((model1Number * 100).toString() + "%");
      setModel2((model2Number * 100).toString() + "%");
    }
  }, []); // update the callback if the state changes

  return (
    <div>
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
