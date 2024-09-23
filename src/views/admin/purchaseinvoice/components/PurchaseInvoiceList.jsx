import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';

const PurchaseInvoiceList = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [showNewInvoice, setShowNewInvoice] = useState(false);

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await fetch('http://localhost:4500/purchaseOrder/purchase-orders');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("data is", data);
        setPurchaseOrders(data);
      } catch (error) {
        console.error('Error fetching purchase orders:', error);
      }
    };

    fetchPurchaseOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4500/purchaseOrder/purchase-orders/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setPurchaseOrders(purchaseOrders.filter((order) => order._id !== id));
    } catch (error) {
      console.error('Error deleting purchase order:', error);
    }
  };

  const handleAddNewInvoice = () => {
    setShowNewInvoice(true);
  };

  return (
    <div className="min-h-fit bg-white">
      <div className="relative m-4 overflow-x-auto p-8 shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between p-4 bg-white rounded-md shadow-md">
          <h2 className="text-lg font-bold text-gray-800">Purchase Orders</h2>
          <div className="mx-auto w-full max-w-4xl">
            <button
              id="dropdownRadioButton"
              onClick={handleAddNewInvoice}
              className="inline-flex items-center rounded-lg border border-gray-300 bg-blue-700 py-2 px-3 text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              type="button"
            >
              ADD NEW INVOICE
            </button>
          </div>
        </div>

      

        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PO Number</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Type</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{order.poNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{new Date(order.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{order.account}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{order.purchaseType}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{order.notes}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <MdDelete
                    className="cursor-pointer text-lg text-red-500 hover:text-red-300"
                    onClick={() => handleDelete(order._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseInvoiceList;

