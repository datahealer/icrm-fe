import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const PurchaseItemTable = () => {
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    const fetchPurchaseItems = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/purchaseItems/purchase-items`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data, "cwsnixw");
        setPurchaseItems(data);
      } catch (error) {
        console.error("Error fetching purchase items:", error);
      }
    };

    fetchPurchaseItems();
  }, []);

  return (
    <div className="min-h-fit bg-white">
      <div className="relative m-4 overflow-x-auto p-8 shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between rounded-md bg-white p-4 shadow-md">
          <h2 className="text-lg font-bold text-gray-800">Purchase Items</h2>
        </div>

        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Item Name
              </th>
              <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Purpose
              </th>
              <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Type
              </th>
              <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Unit Type
              </th>
              <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Rate
              </th>
              <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Description
              </th>
              <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Sales Account
              </th>
              <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Tax
              </th>
              <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {purchaseItems.map((item) => (
              <tr key={item._id}>
                <>
                  <td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
                    {item?.itemId?.name}
                  </td>
                  <td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
                    {item.purpose}
                  </td>
                  <td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
                    {item.type}
                  </td>
                  <td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
                    {item.unitType}
                  </td>
                  <td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
                    {item.rate}
                  </td>
                  <td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
                    {item.description}
                  </td>
                  <td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
                    {item?.salesAccount?.name}
                  </td>
                  <td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
                    {item.tax}
                  </td>
                  <td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
                    {item.totalAmount}
                  </td>
                </>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseItemTable;
