import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
import DashboardIcon from "@material-ui/icons/Dashboard";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Profit"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["lightskyblue"],
        hoverBackgroundColor: ["rgb(182, 227, 255)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "Available"],
    datasets: [
      {
        backgroundColor: ["hotpink", "lightgreen"],
        hoverBackgroundColor: ["rgb(240, 140, 190)", "lightskyblue"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard " />
      <Sidebar />

      <div className="dashboardContainer">
        <div className="dash-head">
          <p>
            <DashboardIcon /> Dashboard || Admin
          </p>
        </div>
        <div className="dashboardSummaryBox2">
          <Link to="/admin/products">
            <p>Total Products - {products && products.length}</p>
            <p className="para">
              These number represnts the total no of various products available
              on our store.
            </p>
          </Link>
          <Link to="/admin/orders" className="order">
            <p>Total Orders - {orders && orders.length}</p>
            <p className="para">
              These number represnts the total no of Orders which have been
              ordered by the customers.
            </p>
          </Link>
          <Link to="/admin/users">
            <p>Total Users - {users && users.length}</p>
            <p className="para">
              These number represnts the total no of Users which are registered
              on our Ecommerce Site.
            </p>
          </Link>
        </div>
        <div className="chart">
          <div>
            <p>Total Amount</p>
            <p>
              <Line data={lineState} />
            </p>
          </div>
          <div className="link">
            <Link>
              <p>Total Amount - ₹{totalAmount}</p>
              <p className="para">
                These number represnts the total Amount of the order which have
                been placed by the customer.
              </p>
            </Link>
          </div>
          <div>
            <p>Available Stock</p>
            <p>
              <Doughnut data={doughnutState} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
