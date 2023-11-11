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

const reducer = (selectTree, action) => {
  const totalOrdersPrevSelected = () => {
    let total = 0;
    selectTree.categories.forEach((category) =>
      category.orderItems.forEach((item) => {
        if (item.selected === selectState.checked) {
          total++;
        }
      })
    );
    return total;
  };

  const totalOrdersInCategoryPrevSelected = (id) => {
    let total = 0;
    selectTree.categories
      .find((category) => category.id === id)
      ?.orderItems?.forEach((item) => {
        if (item.selected === selectState.checked) {
          total++;
        }
      });
    return total;
  };

  switch (action.type) {
    case "TOP_LEVEL_SELECT":
      if (
        selectTree.selectAll === selectState.unChecked ||
        selectTree.selectAll === selectState.intederminate
      ) {
        return {
          ...selectTree,
          selectAll: selectState.checked,
          categories: selectTree.categories.map((row) => {
            return {
              ...row,
              selectAllOrders: selectState.checked,
              orderItems: row.orderItems.map((order) => {
                return { ...order, selected: selectState.checked };
              }),
            };
          }),
        };
      } else {
        return {
          ...selectTree,
          selectAll: selectState.unChecked,
          categories: selectTree.categories.map((row) => {
            return {
              ...row,
              selectAllOrders: selectState.unChecked,
              orderItems: row.orderItems.map((order) => {
                return { ...order, selected: selectState.unChecked };
              }),
            };
          }),
        };
      }

    case "CATEGORY_LEVEL_SELECT":
      const prevSelectState = selectTree.categories.find(
        (category) => category.id === action.id
      )?.selectAllOrders;

      if (
        prevSelectState === selectState.unChecked ||
        prevSelectState === selectState.intederminate
      ) {
        return {
          ...selectTree,
          categories: selectTree.categories.map((category) => {
            if (category.id === action.id) {
              return {
                ...category,
                selectAllOrders: selectState.checked,
                orderItems: category.orderItems.map((order) => {
                  return {
                    ...order,
                    selected: selectState.checked,
                  };
                }),
              };
            } else {
              return {
                ...category,
                orderItems: category.orderItems.map((order) => {
                  return { ...order };
                }),
              };
            }
          }),
        };
      } else {
        return {
          ...selectTree,
          categories: selectTree.categories.map((category) => {
            if (category.id === action.id) {
              return {
                ...category,
                selectAllOrders: selectState.unChecked,
                orderItems: category.orderItems.map((order) => {
                  return {
                    ...order,
                    selected: selectState.unChecked,
                  };
                }),
              };
            } else {
              return {
                ...category,
                orderItems: category.orderItems.map((order) => {
                  return { ...order };
                }),
              };
            }
          }),
        };
      }

    case "BOTTOM_LEVEL_SELECT":
      let prevOderSelected = {};
      selectTree.categories.forEach((category) => {
        const found = category.orderItems.find(
          (order) => order.orderId == action.id
        );
        if (found) {
          prevOderSelected = { ...found };
        }
      });


      if (prevOderSelected.selected === selectState.unChecked) {
        return {
          ...selectTree,
          categories: selectTree.categories.map((category) => {
            return {
              ...category,
              orderItems: category.orderItems.map((order) => {
                if (order.orderId === action.id) {
                  return {
                    ...order,
                    selected : selectState.checked
                  };
                } else {
                  return {
                    ...order,
                  };
                }
              }),
            };
          }),
        };
      } else {
        return {
          ...selectTree,
          categories: selectTree.categories.map((category) => {
            return {
              ...category,
              orderItems: category.orderItems.map((order) => {
                if (order.orderId === action.id) {
                  return {
                    ...order,
                    selected: selectState.unChecked,
                  };
                } else {
                  return {
                    ...order,
                  };
                }
              }),
            };
          }),
        };
      }
    default:
      return selectTree;
  }
};

export default function InventoryTable({ rows }) {
  const [shallowTreeSelect, shallowTreeSelectDispatch] = useReducer(reducer, {
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

  console.log(shallowTreeSelect);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);

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

  return (
    <ShallowTreeSelectContext.Provider
      value={{ shallowTreeSelect, shallowTreeSelectDispatch }}
    >
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
              const isItemSelected = selected.indexOf(row.id) !== -1;
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <OrdersTable
                  key={row.id}
                  row={row}
                  isItemSelected={isItemSelected}
                  onSelectAllOrdersClick={(e) => handleClick(e, row.id)}
                  handleClick={handleClick}
                  labelId={labelId}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </ShallowTreeSelectContext.Provider>
  );
}
