// import React, { useState, useEffect } from 'react';
// import { MdDelete } from 'react-icons/md';

// const PurchaseItemTable = () => {
//   const [purchaseItems, setPurchaseItems] = useState([]);

//   useEffect(() => {
//     const fetchPurchaseItems = async () => {
//       try {
//         const response = await fetch('http://localhost:4500/purchaseItems/purchase-items');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setPurchaseItems(data);
//       } catch (error) {
//         console.error('Error fetching purchase items:', error);
//       }
//     };

//     fetchPurchaseItems();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:4500/purchaseItems/purchase-items/${id}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       setPurchaseItems(purchaseItems.filter((item) => item._id !== id));
//     } catch (error) {
//       console.error('Error deleting purchase item:', error);
//     }
//   };

//   return (
//     <div className="min-h-fit bg-white">
//       <div className="relative m-4 overflow-x-auto p-8 shadow-md sm:rounded-lg">
//         <div className="flex items-center justify-between p-4 bg-white rounded-md shadow-md">
//           <h2 className="text-lg font-bold text-gray-800">Purchase Items</h2>
//         </div>

//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Type</th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Account</th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax</th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {purchaseItems.map((item) => (
//               <tr key={item._id}>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.itemName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.purpose}</td>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.type}</td>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.unitType}</td>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.rate}</td>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.description}</td>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.salesAccount}</td>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.tax}</td>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                   <MdDelete
//                           className="cursor-pointer text-lg text-red-500 hover:text-red-300"
//                           onClick={() => handleDelete(item._id)}
//                         />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PurchaseItemTable;

import React, { useState, useEffect } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

const EditForm = ({ item, onSave, onCancel }) => {
  const [editedItem, setEditedItem] = useState(item);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedItem);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <input name="itemName" value={editedItem.itemName} onChange={handleChange} className="border p-1" />
      <input name="purpose" value={editedItem.purpose} onChange={handleChange} className="border p-1" />
      <input name="type" value={editedItem.type} onChange={handleChange} className="border p-1" />
      <input name="unitType" value={editedItem.unitType} onChange={handleChange} className="border p-1" />
      <input name="rate" value={editedItem.rate} onChange={handleChange} className="border p-1" />
      <input name="description" value={editedItem.description} onChange={handleChange} className="border p-1" />
      <input name="salesAccount" value={editedItem.salesAccount} onChange={handleChange} className="border p-1" />
      <input name="tax" value={editedItem.tax} onChange={handleChange} className="border p-1" />
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-500 text-white p-1 rounded">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white p-1 rounded">Cancel</button>
      </div>
    </form>
  );
};

const PurchaseItemTable = () => {
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    const fetchPurchaseItems = async () => {
      try {
        const response = await fetch('http://localhost:4500/purchaseItems/purchase-items');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPurchaseItems(data);
      } catch (error) {
        console.error('Error fetching purchase items:', error);
      }
    };

    fetchPurchaseItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4500/purchaseItems/purchase-items/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setPurchaseItems(purchaseItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting purchase item:', error);
    }
  };

  const handleSave = async (editedItem) => {
    try {
      const response = await fetch(`http://localhost:4500/purchaseItems/purchase-items/${editedItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedItem),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedItem = await response.json();
      setPurchaseItems(purchaseItems.map((item) => (item._id === updatedItem._id ? updatedItem : item)));
      setIsEditing(null);
    } catch (error) {
      console.error('Error updating purchase item:', error);
    }
  };

  return (
    <div className="min-h-fit bg-white">
      <div className="relative m-4 overflow-x-auto p-8 shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between p-4 bg-white rounded-md shadow-md">
          <h2 className="text-lg font-bold text-gray-800">Purchase Items</h2>
        </div>

        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Type</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Account</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchaseItems.map((item) => (
              <tr key={item._id}>
                {isEditing === item._id ? (
                  <td colSpan={9} className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <EditForm
                      item={item}
                      onSave={handleSave}
                      onCancel={() => setIsEditing(null)}
                    />
                  </td>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.itemName}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.purpose}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.unitType}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.rate}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.salesAccount}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{item.tax}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 flex space-x-2">
                      <MdEdit
                        className="cursor-pointer text-lg text-blue-500 hover:text-blue-300"
                        onClick={() => setIsEditing(item._id)}
                      />
                      <MdDelete
                        className="cursor-pointer text-lg text-red-500 hover:text-red-300"
                        onClick={() => handleDelete(item._id)}
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseItemTable;

