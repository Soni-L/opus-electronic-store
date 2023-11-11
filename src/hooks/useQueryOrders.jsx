import moment from "moment";

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
      orderItems: [
        {
          orderId: "1234557",
          reviewScore: 9,
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

export default function useQueryOrders() {
    return tableDataResponse;
}
