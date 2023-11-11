import React from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableSortLabel,
  Checkbox,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { visuallyHidden } from "@mui/utils";

const headCells = [
  {
    id: "orderId",
    numeric: false,
    disablePadding: false,
    label: "Order ID",
  },
  {
    id: "reviewScore",
    numeric: false,
    disablePadding: true,
    label: "Review Score",
  },
  {
    id: "customer",
    numeric: false,
    disablePadding: true,
    label: "Customer",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
  {
    id: "orderTime",
    numeric: false,
    disablePadding: true,
    label: "Order Time",
  },
];

export default function NestedOrdersTable(props) {
  const { rows, onSelectAllClick, numSelected, rowCount, onRequestSort } =
    props;

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  return (
    <TableContainer>
      <Table
        sx={{ marginLeft: "15px" }}
        aria-labelledby="tableTitle"
        size={"medium"}
      >
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" sx={{visibility: 'hidden'}}>
              <Checkbox
               
                color="primary"
                checked={false}
                inputProps={{
                  "aria-labelledby": 'labelId',
                }}
              />
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={"left"}
                padding={"normal"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, row.id)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
                sx={{ cursor: "pointer" }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </TableCell>
                <TableCell align="left">{row.orderId}</TableCell>
                <TableCell align="left">{row.reviewScore}</TableCell>
                <TableCell align="left">{row.customer.name}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell align="left">{row.orderTime}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
