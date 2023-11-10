import React from "react";
import moment from "moment";
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
  Paper,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import OrdersRow from "./OrdersRow";

const status = {
  open: "Open",
  done: "Done",
  inProgress: "In Progress",
};

const tableDataResponse = {
  total: 14,
  pageSize: 5,
  items: [
    {
      id: 1,
      itemName: "Macbook 14",
      categoryName: "Computers",
      topReviewScore: "9",
    },
    {
      id: 2,
      itemName: "Dell XPS 13",
      categoryName: "Computers",
      topReviewScore: "9",
      orderItems: [
        {
          orderId: "1234566",
          reviewScore: 6,
          customer: {
            customerId: "1",
            name: "Soni Lamkaj",
            email: "acdsoni@gmail.com",
            profilePicUrl: "src/assets/soni-profile.png",
          },
          status: status.open,
          orderTime: moment().toISOString(),
        },
        {
          orderId: "1234567",
          reviewScore: 6,
          customer: {
            customerId: "1",
            name: "Soni Lamkaj",
            email: "acdsoni@gmail.com",
            profilePicUrl: "src/assets/soni-profile.png",
          },
          status: status.done,
          orderTime: moment().toISOString(),
        },
      ],
    },
  ],
};

const firstOrderheadCells = [
  {
    id: "itemName",
    numeric: false,
    disablePadding: true,
    label: "Item",
  },
  {
    id: "categoryName",
    numeric: false,
    disablePadding: true,
    label: "Category Name",
  },
  {
    id: "topReviewScore",
    numeric: false,
    disablePadding: true,
    label: "Top Review Score",
  },
];

const rows = tableDataResponse.items;

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {firstOrderheadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
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
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const TableToolBar = ({ numSelected }) => {
  return (
    <div
      style={{
        height: "40px",
        backgroundColor: "#ECE7F9",
        margin: "10px 0",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        padding: "5px 10px",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          color: "#3D3D3D",
          fontFamily: "LibreFranklin",
          fontWeight: "600",
        }}
      >
        {numSelected > 0
          ? `${numSelected} ${numSelected === 1 ? "item" : "items"} selected`
          : ""}
      </p>
    </div>
  );
};

export default function InventoryTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <div>
      <TableToolBar numSelected={selected.length} />
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "white", borderRadius: "10px" }}
      >
        <Table>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {rows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <OrdersRow
                  key={row.id}
                  row={row}
                  isItemSelected={isItemSelected}
                  handleClick={handleClick}
                  labelId={labelId}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
