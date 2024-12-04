import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AWS from "aws-sdk";

import axios from "axios";

const unitTypes = [
  "Hours",
  "Kilos",
  "Grams",
  "Meters",
  "Feets",
  "Bags",
  "Rolls",
  "Sheets",
  "Visits",
  "Sessions",
  "Deliveries",
];

const taxTypes = [
  "None",
  "Exempt-IGST-0",
  "IGST-0",
  "IGST-0.25",
  "IGST-3",
  "IGST-5",
  "IGST-6",
  "IGST-12",
  "IGST-18",
  "IGST-28",
  "Exempt-GST-0",
  "GST-0",
  "GST-0.25",
  "GST-3",
  "GST-5",
  "GST-6",
  "GST-12",
  "GST-18",
  "GST-28",
];

const PurchaseitemTable = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [assets, setAssets] = useState([]);
  const [invoicePreviewUrl, setinvoicePreviewUrl] = useState("");
  const [people, setPeople] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const tax = watch("tax");
  const rate = watch("rate", 0);
  const quantity = watch("quantity", 0);
  const totalAmount = rate * quantity;
  setValue("totalAmount", totalAmount);

  const getAllAssets = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/purchaseItems/get-all-assets`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data, "snbxiwbnx");
      setAssets(response.data.data.response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const AccountList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/account/`,
        {
          withCredentials: true,
        }
      );
      setAccounts(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/s3/create-upload-url`,
        {
          fileName: file.name,
          folder: "purchase-items",
        },
        {
          withCredentials: true,
        }
      );

      const { uploadUrl, key } = data;

      await axios.put(uploadUrl, file);

      setValue("itemImage", key);
      setPreviewUrl(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleInvoiceUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/s3/create-upload-url`,
        {
          fileName: file.name,
          folder: "purchase-invoice",
        },
        {
          withCredentials: true,
        }
      );

      const { uploadUrl, key } = data;

      await axios.put(uploadUrl, file);

      setValue("invoiceImage", key);
      setinvoicePreviewUrl(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const getUserList = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/people/getPeople`;
      const response = await axios.get(apiUrl);
      console.log(response.data, "dwhish");
      setPeople(response.data.data.people);
    } catch (error) {
      console.log("Failed to fetch user list");
    }
  };

  const submitForm = async (data) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/purchaseItems/purchase-items`,
        {
          ...data,
        },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getAllAssets();
    getUserList();
    AccountList();
  }, []);

  return (
    <div className="min-h-fit bg-white">
      <div className="relative m-4 overflow-x-auto p-8 shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between rounded-md bg-white p-4 shadow-md">
          <h2 className="text-lg font-bold text-gray-800">New Entry</h2>
        </div>

        <form onSubmit={handleSubmit(submitForm)}>
          <div className="rounded-md bg-white p-4 shadow">
            <div className="flex gap-4">
              <div className="flex w-1/2 gap-4">
                <div className="mb-4 flex justify-start">
                  <label htmlFor="image-upload">
                    <h2>Item Image</h2>

                    <div className="flex h-32 w-32 cursor-pointer items-center justify-center rounded border border-dashed border-gray-300 text-2xl">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
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
                    {...register("itemImage")}
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="mb-4 flex justify-start">
                  <label htmlFor="invoice-image-upload">
                    <h2>Invoice Image</h2>

                    <div className="flex h-32 w-32 cursor-pointer items-center justify-center rounded border border-dashed border-gray-300 text-2xl">
                      {invoicePreviewUrl ? (
                        <img
                          src={invoicePreviewUrl}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <i className="fas fa-camera text-gray-300"></i>
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    id="invoice-image-upload"
                    accept="image/*"
                    hidden
                    {...register("invoiceImage")}
                    onChange={handleInvoiceUpload}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="item-name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Item Name
                </label>
                <select
                  id="item-name"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 p-2.5 text-sm"
                  {...register("itemId", {
                    required: "Please select an asset",
                  })}
                >
                  <option value="">Select Items</option>
                  {assets.map((asset) => (
                    <option key={asset.id} value={asset._id}>
                      {asset.name}
                    </option>
                  ))}
                </select>

                {errors.itemName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.itemName.message}
                  </p>
                )}

                <div className="mt-4 w-full">
                  <label
                    htmlFor="purpose"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Purpose
                  </label>
                  <input
                    type="text"
                    id="purpose"
                    placeholder="Purpose"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 p-2.5 text-sm"
                    {...register("purpose", {
                      required: "Purpose is required",
                    })}
                  />
                  {errors.purpose && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.purpose.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="vendor-name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Vendor Name
                  </label>
                  <select
                    id="vendor-name"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 p-2.5 text-sm"
                    {...register("vendorId", {
                      required: "Please select an vendor",
                    })}
                  >
                    <option value="">Select Vendor</option>
                    {people.map((person) => (
                      <option key={person.id} value={person._id}>
                        {person.displayName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="type"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Type
                </label>
                <input
                  type="text"
                  id="type"
                  placeholder="Type"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 p-2.5 text-sm"
                  {...register("type", { required: "Type is required" })}
                />
                {errors.type && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.type.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="unitType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unit Type
                </label>
                <select
                  id="unit-type"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 p-2.5 text-sm"
                  {...register("unitType", {
                    required: "Please select the type",
                  })}
                >
                  <option value="">Select Unit Type</option>
                  {unitTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                {errors.unitType && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.unitType.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="rate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rate(INR including GST)
                </label>
                <input
                  type="number"
                  id="rate"
                  placeholder="Rate"
                  className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...register("rate", { valueAsNumber: true })}
                />
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  placeholder="quantity"
                  className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...register("quantity", { valueAsNumber: true })}
                />
              </div>

              <div>
                <label
                  htmlFor="totalAmount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Amount(Inc. GST)
                </label>
                <input
                  type="number"
                  id="totalAmount"
                  value={totalAmount}
                  placeholder="quantity"
                  className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  readOnly
                />
              </div>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                placeholder="Item Description"
                className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("description")}
              ></textarea>
            </div>

            <h2 className="mb-4 text-lg font-bold">Accounts</h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Sales Account */}
              <div>
                <h3 className="mb-2 text-sm font-medium">Sales Acc.</h3>
                <div className="relative">
                  <select
                    className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("salesAccount", {
                      required: "Sales Account is required",
                    })}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Sales Account
                    </option>
                    {accounts?.map((account) => (
                      <option key={account._id} value={account._id}>
                        {account.name}
                      </option>
                    ))}
                  </select>

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
                  {errors.salesAccount && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.salesAccount.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Tax */}
              <div>
                <h3 className="mb-2 text-sm font-medium">Tax</h3>
                <div className="relative">
                  <select
                    className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("tax", {
                      required: "Tax is required",
                    })}
                  >
                    <option value="">Select Tax</option>
                    {taxTypes.map((tax) => (
                      <option key={tax} value={tax}>
                        {tax}
                      </option>
                    ))}
                  </select>
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
                  {errors.tax && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.tax.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Purchase Account */}
              <div>
                <h3 className="mb-2 text-sm font-medium">Purchase Acc.</h3>
                <div className="relative">
                <select
                    className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("purchaseAccount", {
                      required: "Purchase Account is required",
                    })}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Sales Account
                    </option>
                    {accounts?.map((account) => (
                      <option key={account._id} value={account._id}>
                        {account.name}
                      </option>
                    ))}
                  </select>
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
                  {errors.purchaseAccount && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.purchaseAccount.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium">SAC</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="SAC"
                    className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("sac", {
                      required:
                        tax !== null && tax !== undefined
                          ? "SAC is required"
                          : false,
                    })}
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium">HSN</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="hsn"
                    className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("hsn", {
                      required:
                        tax !== null && tax !== undefined
                          ? "hsn is required"
                          : false,
                    })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <button
              type="submit"
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseitemTable;
