import React from "react";
import {
  MdArrowDropUp,
  MdOutlineCalendarToday,
  MdArrowDropDown,
  MdBarChart,
} from "react-icons/md";
import Card from "components/card";
import { lineChartOptionsTotalSpent } from "variables/charts";
import { currency } from "constant/currency";

import LineChart from "components/charts/LineChart";

const TotalSpent = ({ getSixMonthsData, convertedExpenses }) => {
  const conversionRate = currency.USD["INR"];

  const currentMonthExpense =
    (getSixMonthsData?.[getSixMonthsData.length - 1]?.totalExpenses /
    conversionRate).toFixed(2);

  const previousMonthExpense =
    (getSixMonthsData?.[getSixMonthsData.length - 2]?.totalExpenses /
    conversionRate).toFixed(2);

  const calculatePercentageChange = (current, previous) => {
    console.log(current);
    console.log(previous);

    if (previous === 0) {
      if (current > 0) {
        return Infinity;
      } else if (current < 0) {
        return -Infinity;
      }
      return 0;
    }

    return ((current - previous) / previous) * 100;
  };

  const percentageChange = calculatePercentageChange(
    currentMonthExpense,
    previousMonthExpense
  );

  const graphData = [
    {
      name: "Earnings",
      data: getSixMonthsData?.map((data) => data.totalEarnings),
      color: "#4318FF",
    },
    {
      name: "Expenses",
      data: getSixMonthsData?.map((data) => data.totalExpenses),
      color: "#6AD2FF",
    },
  ];
  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between"></div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
            {`$${currentMonthExpense}`}
          </p>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-sm text-gray-600">Total Spent</p>
            <div className="flex flex-row items-center justify-center">
              {percentageChange > 0 ? (
                <MdArrowDropUp className="font-medium text-green-500" />
              ) : percentageChange < 0 ? (
                <MdArrowDropDown className="font-medium text-red-500" />
              ) : (
                <MdArrowDropUp className="font-medium text-gray-500" />
              )}

              <p
                className={`text-sm font-bold ${
                  percentageChange > 0
                    ? "text-green-500"
                    : percentageChange < 0
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {percentageChange === Infinity
                  ? "∞%"
                  : percentageChange === -Infinity
                  ? "-∞%"
                  : `${percentageChange.toFixed(2)}%`}
              </p>
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <LineChart options={lineChartOptionsTotalSpent} series={graphData} />
        </div>
      </div>
    </Card>
  );
};

export default TotalSpent;
