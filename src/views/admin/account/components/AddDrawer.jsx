import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const AddDrawer = ({
  isDrawerOpen,
  handleDrawerToggle,
  formData,
  handleInputChange,
  drawerRef,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/account/`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {isDrawerOpen && (
        <div
          ref={drawerRef}
          id="drawer-contact"
          className="fixed right-0 top-0 z-40 h-screen w-80 -translate-x-0 overflow-y-auto bg-gray-100 p-4 transition-transform dark:bg-gray-800"
          tabIndex="-1"
        >
          <h5 className="mb-6 inline-flex items-center text-base font-semibold uppercase text-gray-500 dark:text-gray-400">
            <svg
              className="me-2.5 h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="M10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
            Add Account
          </h5>
          <button
            type="button"
            onClick={handleDrawerToggle}
            className="bg-transparent absolute end-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>
                Account Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Account Name"
              />
              {errors.displayName && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="mx-auto mb-6">
              <label
                htmlFor="purpose"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Purpose
              </label>
              <input
                type="text"
                id="purpose"
                {...register("purpose")}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Purpose"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="type"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Type
              </label>
              <select
                id="type"
                {...register("type", { required: "Type is required" })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="EXPENSES">EXPENSES</option>
                <option value="TREASURY">TREASURY</option>
                <option value="SAVINGS">SAVINGS</option>
                <option value="WALLET">WALLET</option>
              </select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="bankAccount"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Bank Account
              </label>
              <input
                type="text"
                id="bankAccount"
                {...register("bankAccount", {
                  required: "Bank account is required",
                  validate: (value) =>
                    /^[A-Za-z]{3}_[0-9]{4}$/.test(value) ||
                    "Invalid bank account format",
                })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="e.g., ABC_1234"
              />
              {errors.bankAccount && (
                <p className="text-sm text-red-500">
                  {errors.bankAccount.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="ifscCode"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>IFCS Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="ifscCode"
                  {...register("ifscCode")}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="IFSC Cde"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="currency"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Currency
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="currency"
                  {...register("currency")}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Currency"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="branch"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Branch
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="branch"
                  {...register("branch")}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Branch Name"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="swiftCode"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Swift Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="swiftCode"
                  {...register("swiftCode")}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Swift Code"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mb-2 block w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddDrawer;
