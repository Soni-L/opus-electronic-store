import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableSortLabel,
  Checkbox,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { ShallowTreeSelectContext, selectState } from "../InventoryTable";

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
  const { rows, categoryId, onSelectAllClick, onRequestSort } = props;

  const { shallowTreeSelect, shallowTreeSelectDispatch } = React.useContext(
    ShallowTreeSelectContext
  );

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
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
            <TableCell padding="checkbox" sx={{ visibility: "hidden" }}>
              <Checkbox
                color="primary"
                checked={false}
                inputProps={{
                  "aria-labelledby": "labelId",
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
            const isItemSelected =
              shallowTreeSelect.categories
                .find((category) => category.id === categoryId)
                ?.orderItems.find(
                  (orderItem) => orderItem.orderId === row.orderId
                )?.selected === selectState.checked;

            const labelId = `enhanced-table-checkbox-${index}`;
       
            return (
              <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.orderId}
                selected={isItemSelected}
                sx={{ cursor: "pointer" }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    onChange={() =>
                      shallowTreeSelectDispatch({
                        type: "BOTTOM_LEVEL_SELECT",
                        id: row.orderId,
                      })
                    }
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
