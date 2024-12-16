import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { currency } from "constant/currency";

import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBalanceScale,
  FaChartLine,
  FaFolderOpen,
  FaUsers,
} from "react-icons/fa";

const Dashboard = () => {
  const [earnings, setEarnings] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [getSixMonthsData, setLastSixMonthsData] = useState(null);

  const [balance, setBalance] = useState(0);
  const [assetValuation, setAssetValuation] = useState(0);

  const getEarnings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/dashboard/getEarnings`,
        {
          withCredentials: true,
        }
      );
      setEarnings(response.data.totalEarnings);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/dashboard/getExpenses`,
        {
          withCredentials: true,
        }
      );
      setExpenses(response.data.totalExpenses);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getProjectAndClientCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/dashboard/getProjectAndClientCount`,
        {
          withCredentials: true,
        }
      );
      setClientCount(response.data.clientCount);
      setProjectCount(response.data.projectCount);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getBalance = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/dashboard/getBalance`,
        {
          withCredentials: true,
        }
      );
      setBalance(response.data.data.balance);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getAssetValuation = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/dashboard/getAssetValuation`,
        {
          withCredentials: true,
        }
      );
      setAssetValuation(response.data.totalValuation);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getLastSixMonthsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/dashboard/getLastSixMonthsData`,
        {
          withCredentials: true,
        }
      );

      setLastSixMonthsData(response.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  const totalExpenses = currency.USD["INR"];
  const convertedExpenses = (expenses / totalExpenses).toFixed(2);
  useEffect(() => {
    getEarnings();
    getExpenses();
    getProjectAndClientCount();
    getBalance();
    getAssetValuation();
    getLastSixMonthsData();
  }, []);
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Earnings this month"}
          subtitle={`$${earnings}`}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Total Expenses"}
          subtitle={`$${convertedExpenses}`}
        />
        <Widget
          icon={<FaUsers className="h-7 w-7" />}
          title={"Total Clients"}
          subtitle={clientCount}
        />
        <Widget
          icon={<FaBalanceScale className="h-6 w-6" />}
          title={"Your Balance"}
          subtitle={`$${balance}`}
        />
        <Widget
          icon={<FaChartLine className="h-7 w-7" />}
          title={"Asset Valuation"}
          subtitle={`$${assetValuation}`}
        />
        <Widget
          icon={<FaFolderOpen className="h-6 w-6" />}
          title={"Total Projects"}
          subtitle={projectCount}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent getSixMonthsData={getSixMonthsData}  convertedExpenses ={convertedExpenses}/>
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>

        {/* Traffic chart & Pie Chart */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>

        {/* Complex Table , Task & Calendar */}

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
