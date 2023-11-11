import React from "react";
import {
  Collapse,
  IconButton,
  Checkbox,
  TableCell,
  TableRow,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import NestedOrdersTable from "./NestedOrdersTable";

export default function OrdersRow(props) {
  const { row, handleClick, isItemSelected, labelId, onSelectAllOrdersClick } =
    props;
  const [open, setOpen] = React.useState(false);

  const handleSelectAllOrdersFromParent = (event) => {
    onSelectAllOrdersClick();
  };

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
      >
        <TableCell padding="checkbox">
          <Checkbox
            onClick={(event) => handleClick(event, row.id)}
            color="primary"
            checked={isItemSelected}
            onChange={handleSelectAllOrdersFromParent}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            disabled={row?.orderItems?.length ? false : true}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            <span
              style={{
                fontFamily: "LibreFranklin",
                fontSize: "14px",
                fontWeight: "400",
                color: "#3D3D3D",
              }}
            >
              {row.itemName}
            </span>
            <span
              style={{
                fontFamily: "LibreFranklin",
                fontSize: "14px",
                fontWeight: 700,
                color: "#3D3D3D",
                paddingLeft: "4px",
              }}
            >
              {row?.orderItems?.length ? ` (${row?.orderItems?.length})` : ""}
            </span>
          </IconButton>
        </TableCell>
        {/* <TableCell align="left">{row.itemName}</TableCell> */}
        <TableCell align="left">{row.categoryName}</TableCell>
        <TableCell align="left">{row.topReviewScore}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <NestedOrdersTable
              rows={row.orderItems}
              onSelectAllClick={onSelectAllOrdersClick}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
