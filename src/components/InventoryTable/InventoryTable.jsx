import React, { createContext, useReducer } from "react";
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
import OrdersTable from "./OrdersTable/CollapsibleParentRow";
import selectTreeReducer from "../../reducers/selectTreeReduces";

export const ShallowTreeSelectContext = createContext();
export const selectState = {
  checked: "checked",
  intederminate: "intederminate",
  unChecked: "unChecked",
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

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const { shallowTreeSelect, shallowTreeSelectDispatch } = React.useContext(
    ShallowTreeSelectContext
  );

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={
              shallowTreeSelect.selectAll === selectState.intederminate
            }
            checked={shallowTreeSelect.selectAll === selectState.checked}
            onChange={() =>
              shallowTreeSelectDispatch({ type: "TOP_LEVEL_SELECT" })
            }
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

export default function InventoryTable({ rows }) {
  const [shallowTreeSelect, shallowTreeSelectDispatch] = useReducer(selectTreeReducer, {
    selectAll: selectState.unChecked,
    totalOrders: 3,
    categories: rows.map((row) => {
      return {
        ...row,
        selectAllOrders: selectState.unChecked,
        orderItems: row.orderItems.map((order) => {
          return { ...order, selected: selectState.unChecked };
        }),
      };
    }),
  });

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [numSelected, setNumSelected] = React.useState(0);

  React.useEffect(() => {
    let total = 0;
    shallowTreeSelect.categories.forEach((category) =>
      category?.orderItems?.forEach((item) => {
        if (item.selected === selectState.checked) {
          total++;
        }
      })
    );

    setNumSelected(total);
  }, [shallowTreeSelect.selectAll, shallowTreeSelect.categories]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <ShallowTreeSelectContext.Provider
      value={{ shallowTreeSelect, shallowTreeSelectDispatch }}
    >
      <TableToolBar numSelected={numSelected} />
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "white", borderRadius: "10px" }}
      >
        <Table>
          <EnhancedTableHead
            numSelected={numSelected}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {rows.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return <OrdersTable key={row.id} row={row} labelId={labelId} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </ShallowTreeSelectContext.Provider>
  );
}
