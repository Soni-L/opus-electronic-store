import React from "react";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

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
      name: "Dell XPS 13",
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
          },
          status: status.done,
          orderTime: moment().toISOString(),
        },
      ],
    },
  ],
};

const TableToolBar = ({itemsSelected}) => {
    return (
      <div
        style={{
          width: "100%",
          height: "30px",
          backgroundColor: "#ECE7F9",
          padding: "10px 0",
          borderRadius: "10px",
        }}
      ></div>
    );
}

export default function InventoryTable() {
  return (
    <div>
      <TableToolBar itemsSelected={9}/>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "white" }}
      ></TableContainer>
    </div>
  );
}
