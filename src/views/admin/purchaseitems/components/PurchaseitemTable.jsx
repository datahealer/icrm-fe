import React, { useState } from 'react';

const unitTypes = [
  "Hours", "Kilos", "Grams", "Meters", "Feets", "Bags", "Rolls", "Sheets", "Visits", "Sessions", "Deliveries"
];

const taxTypes = [
  "None", "Exempt-IGST-0", "IGST-0", "IGST-0.25", "IGST-3", "IGST-5", "IGST-6", "IGST-12", "IGST-18", "IGST-28", 
  "Exempt-GST-0", "GST-0", "GST-0.25", "GST-3", "GST-5", "GST-6", "GST-12", "GST-18", "GST-28"
];

const PurchaseitemTable = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    purpose: '',
    type: '',
    unitType: '',
    rate: '',
    description: '',
    salesAccount: '',
    tax: '',
  });

  const [file, setFile] = useState(null); 
  const [preview, setPreview] = useState(''); 
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.itemName) tempErrors.itemName = "Item name cannot be empty";
    if (!unitTypes.includes(formData.unitType)) tempErrors.unitType = "Unit must be a valid value  Hours, Kilos, Grams, Meters, Feets, Bags";
    if (!taxTypes.includes(formData.tax)) tempErrors.tax = "Tax must be a valid value like None,IGST-0, IGST-0.25";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    console.log('Form submitted with data:', formData);
    
    try {
      const apiUrl = 'http://localhost:4500/purchaseItems/purchase-items';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, image: preview }), 
      });

      const responseData = await response.json();
      console.log('POST request succeeded with JSON response:', responseData);

      setFormData({
        itemName: '',
        purpose: '',
        type: '',
        unitType: '',
        rate: '',
        description: '',
        salesAccount: '',
        tax: '',
      });
      setFile(null);
      setPreview('');
    } catch (error) {
      console.error('Error while sending POST request:', error);
    }
  };

  return (
    <div className="min-h-fit bg-white">
      <div className="relative m-4 overflow-x-auto p-8 shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between p-4 bg-white rounded-md shadow-md">
          <h2 className="text-lg font-bold text-gray-800">New Entry</h2>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded text-xs focus:outline-none focus:shadow-outline">
            Draft
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white shadow rounded-md p-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <div className="mb-4 flex justify-start">
                  <label htmlFor="image-upload">
                    <div className="w-32 h-32 border border-dashed border-gray-300 rounded flex justify-center items-center text-2xl cursor-pointer">
                      {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <i className="fas fa-camera text-gray-300"></i>
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className="w-1/2">
                <label htmlFor="item-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Item Name
                </label>
                <input
                  type="text"
                  name="itemName"
                  id="item-name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Item Name"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  required
                />
                {errors.itemName && <p className="text-red-500 text-xs mt-1">{errors.itemName}</p>}
                
                <div className="w-full mt-4">
                  <label htmlFor="purpose" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Purpose
                  </label>
                  <input
                    type="text"
                    name="purpose"
                    id="purpose"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  id="type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Details</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="unitType">
                  Unit Type
                </label>
                <input
                  type="text"
                  name="unitType"
                  id="unitType"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Unit Type"
                  value={formData.unitType}
                  onChange={handleInputChange}
                />
                {errors.unitType && <p className="text-red-500 text-xs mt-1">{errors.unitType}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="rate">
                  Rate
                </label>
                <input
                  type="number"
                  name="rate"
                  id="rate"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Rate"
                  value={formData.rate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Item Description"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div className="p-4">
              <h2 className="text-lg font-bold mb-4">Accounts</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Sales Acc.</h3>
                  <div className="relative">
                    <input
                      type="text"
                      name="salesAccount"
                      placeholder="Sales Account"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.salesAccount}
                      onChange={handleInputChange}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Tax</h3>
                  <div className="relative">
                    <input
                      type="text"
                      name="tax"
                      placeholder="Tax"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.tax}
                      onChange={handleInputChange}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    {errors.tax && <p className="text-red-500 text-xs mt-1">{errors.tax}</p>}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Purchase Acc.</h3>
                  <div className="relative">
                    <input
                      type="text"
                      name="purchaseAccount"
                      placeholder="Purchase Account"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.purchaseAccount}
                      onChange={handleInputChange}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseitemTable;
