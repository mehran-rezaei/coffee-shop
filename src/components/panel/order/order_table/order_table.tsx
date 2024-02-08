import {
  colors,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
interface initialStateType {
  orderId: Number;
  number: Number;
  desciription: String;
  price: Number;
  status: String;
  address: String;
  customerName: String;
}
const StyledTableCell = styled(TableCell)({
  padding: 2,
  textAlign: "center",
  color: "#652D0D",
});
const StyledTableRow = styled(TableRow)({
  height: "50px",
  "& > *": {
    maxWidth: "50px",
  },
});
const splitstr = (input: any) => {
  var fields = input.split("-");
  return fields[1];
};
const findstatus = (val: any) => {
  switch (val) {
    case "pending":
      return "انتظار";
    case "Completed":
      return "کامل";
    case "Cancelled":
      return "لغو";

    default:
      return "نامشخص";
  }
};
//////////////////////////////get status
//////////////////////////////
function Order_table(props: any) {
  const { state, setselectitem, selectitem } = props;
  return (
    <>
      <div className={!!selectitem.orderId ? "w-2/4" : "w-full"}>
        <TableContainer component={Paper} id={"table_order"}>
          <Table aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>شماره</StyledTableCell>
                <StyledTableCell>شماره سفارش</StyledTableCell>
                <StyledTableCell>توضیحات</StyledTableCell>
                <StyledTableCell>هزینه </StyledTableCell>
                <StyledTableCell>وضعیت</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {!!state?state.map((row: any, index: number) => (
                <StyledTableRow
                  hover={true}
                  onClick={() => {
                    selectitem.orderId == row.orderId
                      ? setselectitem({} as initialStateType)
                      : setselectitem(row);
                  }}
                  key={row.name}
                >
                  <StyledTableCell sx={{ width: 5 }} component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {splitstr(row.number)}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.desciription}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.price}
                  </StyledTableCell>
                  <StyledTableCell component="th" sx={{}} scope="row">
                    <div className="flex w-100 justify-center">
                      <div className=" py-2 w-3/5 flex items-center justify-center text-white rounded-xl bg-[#652D0D]">
                        <p>{findstatus(row.status)}</p>
                      </div>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              )):null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Order_table;
