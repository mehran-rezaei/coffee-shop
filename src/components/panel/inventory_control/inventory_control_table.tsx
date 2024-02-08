import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  TextField,
  styled,
  withStyles,
} from "@mui/material";
import { useEffect, useState } from "react";
import { GetStockByProductGroupId } from "@/Dataservice/DashbordProvider";
interface productgroupitem {
  stockId: Number;
  productName: String;
  quantity: Number;
  isLimited: boolean;
}
interface statedata {
  Groupitem: Array<productgroupitem>;
}
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

function Inventory_control_table(props: any) {
  const { state, setpostdata } = props;
  const [firstload, setfirstload] = useState(true);
  const [stockData, setStockData] = useState(null);
  const [State, setState] = useState<statedata>({} as statedata);
  const [selectedid, setselectedid] = useState<number>(0);

  const handleChange = (e: any) => {
    setselectedid(e.target.value);
  };

  const handleChangeCheckbox = (data: any, num: any) => {
    // Create a new array of productgroupitem objects with the updated name property
    const updatedGroupItem = State.Groupitem.map((item: any, index: any) =>
      num === index ? { ...item, ["isLimited"]: !data } : item
    );
    // Update the state with the new array of productgroupitem objects
    setState((prevState: any) => ({
      Groupitem: updatedGroupItem,
    }));
  };
  useEffect(() => {
    if (!!selectedid) {
      GetStockByProductGroupId(selectedid).then((Response) => {
        setState({ ...State, Groupitem: Response.data.dataList });
      });
    }
  }, [selectedid]);

  const handleInputChange = (event: any, num: any) => {
    const { value } = event.target;

    // Create a new array of productgroupitem objects with the updated name property
    const updatedGroupItem = State.Groupitem.map((item: any, index: any) =>
      num === index ? { ...item, ["quantity"]: value } : item
    );

    // Update the state with the new array of productgroupitem objects
    setState((prevState: any) => ({
      Groupitem: updatedGroupItem,
    }));
  };
  const StyledTableCell = styled(TableCell)({
    padding: 8,
  });
  useEffect(() => {
    setpostdata(State.Groupitem);
  }, [State]);
  const CssTextField = {
    "& label.Mui-focused": {
      color: "#652D0D",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#652D0D",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#652D0D",
      },
      "&:hover fieldset": {
        borderColor: "#652D0D",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#652D0D",
      },
    },
  };
  ////////////////////////
  const checkBoxStyles = {
    root: {
      "&$checked": {
        color: "#3D70B2",
      },
    },
    checked: {},
  };

  ////////////////////////
  return (
    <>
      {!!firstload ? (
        <div className=" z-10 w-[100%] h-[100%]">
          <TableContainer
            id={"table_ic"}
            component={Paper}
            sx={{ height: "100%" }}
          >
            {/* stickyHeader */}
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    size="small"
                    sx={{ background: "none", color: "#652D0D" }}
                    width={"30%"}
                    text-align="right"
                  >
                    نام محصول
                  </StyledTableCell>
                  <StyledTableCell
                    size="small"
                    sx={{ background: "none", color: "#652D0D" }}
                    text-align="right"
                  >
                    موجودی
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover={true}>
                  <StyledTableCell
                    size="small"
                    text-align="cnter"
                    component="th"
                    scope="row"
                    colSpan={2}
                    id={"head_"}
                  >
                    <Select
                      sx={{
                        background: "#E0C9AC",
                        color: "#652D0D",
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#652D0D",
                        },
                      }}
                      fullWidth
                      size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedid}
                      // label="Age"
                      onChange={handleChange}
                    >
                      {!!state
                        ? state.map((item: any) => (
                            <MenuItem
                              sx={{
                                justifyContent: "flex-end",
                                color: "#652D0D",
                              }}
                              id={"menu_1"}
                              value={item.id}
                            >
                              {item.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </StyledTableCell>
                </TableRow>
                {!!State.Groupitem
                  ? State.Groupitem.map((row, index) => (
                      <TableRow key={index}>
                        <StyledTableCell
                          sx={{ color: "#652D0D" }}
                          size="small"
                          text-align="right"
                          component="th"
                          scope="row"
                        >
                          {row.productName}
                        </StyledTableCell>
                        <TableCell
                          sx={{ padding: "8" }}
                          text-align="right"
                          size="small"
                        >
                          <div className="flex justify-around px-2">
                            <FormControlLabel
                              sx={{ color: "#652D0D" }}
                              control={
                                <Checkbox
                                  sx={{
                                    color: "#652D0D",
                                    "&.Mui-checked": {
                                      color: "#652D0D",
                                    },
                                  }}
                                  checked={!row.isLimited}
                                  onChange={() => {
                                    handleChangeCheckbox(row.isLimited, index);
                                  }}
                                  inputProps={{ "aria-label": "controlled" }}
                                />
                              }
                              label="نامحدود"
                            />

                            <TextField
                              inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                              }}
                              sx={CssTextField}
                              disabled={!row.isLimited}
                              size="small"
                              value={row.quantity}
                              onChange={(event) =>
                                handleInputChange(event, index)
                              }
                              id="outlined-basic"
                              label="مقدار را به صورت دستی وارد کنید"
                              variant="outlined"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : null}
    </>
  );
}

export default Inventory_control_table;
// function useSate(): [any, any] {
//   throw new Error("Function not implemented.");
// }
