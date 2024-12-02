import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import { placeData } from "../../../../constant/place.js";
import { getNames, getCode } from "country-list";

const options = [
  { value: "INR", label: "INR - Indian Rupee" },
  { value: "USD", label: "USD - US Dollar" },
  { value: "AUD", label: "AUD - Australian Dollar" },
  { value: "NZD", label: "NZD - New Zealand Dollar" },
  { value: "SGD", label: "SGD - Singapore Dollar" },
  { value: "AED", label: "AED - UAE Dirham" },
  { value: "OMR", label: "OMR - Omani Rial" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
];

const UpdateDrawer = ({
  isUpdateDrawerOpen,
  handleUpdateDrawerToggle,
  idData,
  error,
  handleUpdateChange,
  sendUpdate,
  user,
  selectedId,
  accounts,
}) => {
  const updateRef = useRef(null);
  const countries = getNames();

  const handleClickOutsideUpdate = (event) => {
    if (updateRef.current && !updateRef.current.contains(event.target)) {
      handleUpdateDrawerToggle(false);
    }
  };

  const [userList, setUserList] = useState([]);
  const [managerList, setManagerList] = useState([]);
  const getUserList = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/auth/getUser`;
      const authToken = user.token;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      setUserList(response.data.users);
    } catch (error) {
      console.log("Failed to fetch user list");
    }
  };

  const getManagerList = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/auth/getManagers`;
      const authToken = user.token;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      setManagerList(response.data.managers);
    } catch (error) {
      console.log("Failed to fetch user list");
    }
  };

  useEffect(() => {
    getUserList();
    getManagerList();
    if (isUpdateDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutsideUpdate);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideUpdate);
    };
  }, [isUpdateDrawerOpen]);

  return (
    <>
      {isUpdateDrawerOpen && (
        <div
          ref={updateRef}
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
            Update Client
          </h5>
          <button
            type="button"
            onClick={() => handleUpdateDrawerToggle(false)}
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
          <form className="mb-6">
            <div className="mx-auto mb-6">
              <label
                htmlFor="acquisitionPersonId"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Acquisition
                Person
              </label>
              <select
                id="acquisitionPersonId"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm capitalize text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={idData.acquisitionPersonId}
                onChange={handleUpdateChange}
                name="acquisitionPersonId"
                required
              >
                <option value="">Choose a user</option>
                {Array.isArray(userList) && userList.length > 0 ? (
                  userList.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))
                ) : (
                  <option disabled>No users available</option>
                )}
              </select>
            </div>

            <div className="mx-auto mb-6">
              <label
                htmlFor="manager"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Manager
              </label>
              <select
                id="manager"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm capitalize text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={idData.manager}
                onChange={handleUpdateChange}
                name="manager"
                required
              >
                console.log(managerList)
                <option value="">Choose Manager</option>
                {Array.isArray(managerList) && managerList.length > 0 ? (
                  managerList.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))
                ) : (
                  <option disabled>No users available</option>
                )}
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="primaryContactPerson"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Primary Contact
                Person
              </label>
              <input
                type="text"
                id="primaryContactPerson"
                name="primaryContactPerson"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Contact Person's name"
                value={idData.primaryContactPerson}
                onChange={handleUpdateChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="l2ContactPerson"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>L2 Contact Person
              </label>
              <input
                type="text"
                id="l2ContactPerson"
                name="l2ContactPerson"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="L2 Contact Person's name"
                value={idData.l2ContactPerson}
                onChange={handleUpdateChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="serviceStartDate"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Service Start
                Date
              </label>
              <input
                type="date"
                id="serviceStartDate"
                name="serviceStartDate"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={idData.serviceStartDate}
                onChange={handleUpdateChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="serviceEndDate"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Service End Date
              </label>
              <input
                type="date"
                id="serviceEndDate"
                name="serviceEndDate"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={idData.serviceEndDate}
                onChange={handleUpdateChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="billingContactPerson"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Billing Name
              </label>
              <input
                type="text"
                id="billingContactPerson"
                name="billingContactPerson"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Billing Person's name"
                value={idData.billingContactPerson}
                onChange={handleUpdateChange}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="displayName"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Display Name
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Display"
                value={idData.displayName}
                onChange={handleUpdateChange}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="businessName"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Business Name"
                value={idData.businessName}
                onChange={handleUpdateChange}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="primaryContactNumber"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Primary Contact
                Number
              </label>
              <PhoneInput
                type="phone"
                id="primaryContactNumber"
                name="primaryContactNumber"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Primary phone number"
                value={idData.primaryContactNumber}
                onChange={(value) =>
                  handleUpdateChange({
                    target: {
                      name: "primaryContactNumber",
                      value,
                    },
                  })
                }
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Email
              </label>
              <input
                type="email"
                id="billingToEmail"
                name="billingToEmail"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Your email"
                value={idData.billingToEmail}
                onChange={handleUpdateChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                CC Email
              </label>
              <input
                type="email"
                id="billingCcEmail"
                name="billingCcEmail"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="CC email"
                value={idData.billingCcEmail}
                onChange={handleUpdateChange}
                required
              />
            </div>

            {/* <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <span className="text-lg text-red-500">*</span>Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Your password"
                      value={idData.password}
                      onChange={handleUpdateChange}
                      required
                    />
                  </div> */}
            {/* <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <span className="text-lg text-red-500">*</span>Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Your password"
                        value={idData.password}
                        onChange={handleUpdateChange}
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-600 dark:text-gray-300"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                  </div> */}

            <div className="mb-6">
              <label
                htmlFor="secondaryContactNumber"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Secondary Phone
              </label>
              <PhoneInput
                id="secondaryContactNumber"
                name="secondaryContactNumber"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Secondary phone number"
                value={idData.secondaryContactNumber}
                onChange={(value) =>
                  handleUpdateChange({
                    target: {
                      name: "secondaryContactNumber",
                      value,
                    },
                  })
                }
              />
            </div>

            <div className="mx-auto mb-6">
              <label
                htmlFor="gstTreatment"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>GST Treatment
              </label>
              <select
                id="gstTreatment"
                name="gstTreatment"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={idData.gstTreatment}
                onChange={handleUpdateChange}
                required
              >
                <option selected>Choose a GST Treatment</option>
                <option value="REGISTERED">Registered</option>
                <option value="REGISTERED_COMPOSITION">
                  REGISTERED - Composition
                </option>
                <option value="UNREGISTERED">Unregistered</option>
                <option value="CONSUMER">Consumer</option>
                <option value="OVERSEAS">Overseas</option>
                <option value="SEZ">SEZ</option>
              </select>
            </div>
            {(idData.gstTreatment === "REGISTERED" ||
              idData.gstTreatment === "REGISTERED_COMPOSITION") && (
              <div className="mb-6">
                <label
                  htmlFor="gstin"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  <span className="text-lg text-red-500">*</span>GSTIN
                </label>
                <input
                  type="text"
                  id="gstin"
                  name="gstin"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Enter your Gst Number"
                  value={idData.gstin}
                  onChange={handleUpdateChange}
                  required
                />
                <span class="text-red-500">{error.gstin}</span>
              </div>
            )}
            <div className="mb-6">
              <label
                htmlFor="serviceAgreementFolderUrl"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Service Agreement
                Folder
              </label>
              <input
                type="url"
                id="serviceAgreementFolderUrl"
                name="serviceAgreementFolderUrl"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter your service agreement folder url"
                value={idData.serviceAgreementFolderUrl}
                onChange={handleUpdateChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="ndaFolderUrl"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>NDA Folder
              </label>
              <input
                type="url"
                id="ndaFolderUrl"
                name="ndaFolderUrl"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter your NDA folder url"
                value={idData.ndaFolderUrl}
                onChange={handleUpdateChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="sowFolderUrl"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                SOW Folder
              </label>
              <input
                type="url"
                id="sowFolderUrl"
                name="sowFolderUrl"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter your SOW folder url"
                value={idData.sowFolderUrl}
                onChange={handleUpdateChange}
              />
            </div>

            {/* <div className="mb-6">
                    <label
                      htmlFor="department"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Department
                    </label>
                    <input
                      type="text"
                      id="department"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Engineering, Sales or Outside Inzint..."
                    />
                  </div> */}

            <div className="mx-auto mb-6">
              <label
                htmlFor="taxPreference"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Tax Preference
              </label>
              <select
                id="taxPreference"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={idData.taxPreference}
                onChange={handleUpdateChange}
                name="taxPreference"
              >
                <option selected>Choose tax preference</option>
                <option value="TAXABLE">Taxable</option>
                <option value="TAX_EXEMPT">Tax Exempt</option>
              </select>
            </div>

            <div className="mx-auto mb-6">
              <label
                htmlFor="paymentTerms"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Payment Terms
              </label>
              <select
                id="paymentTerms"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={idData.paymentTerms}
                onChange={handleUpdateChange}
                name="paymentTerms"
                required
              >
                <option selected>Choose Payment Term</option>
                <option value="DUE_ON_RECEIPT">Due On Receipt</option>
                <option value="NET30">Net 30</option>
              </select>
            </div>
            <div className="mx-auto mb-6">
              <label
                htmlFor="source"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Source
              </label>
              <select
                id="source"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={idData.source}
                onChange={handleUpdateChange}
                name="source"
                required
              >
                <option selected>Choose Source</option>
                <option value="UPWORK">UPWORK</option>
                <option value="LINKEDIN">LINKEDIN</option>
                <option value="EXTERNAL_LEAD">EXTERNAL_LEAD</option>
                <option value="SUBSIDIARY">SUBSIDIARY</option>
                <option value="REFERENCE">REFERENCE</option>
                <option value="ZOOMINFO">ZOOMINFO</option>
                <option value="PERSONAL_NETWORK">PERSONAL_NETWORK</option>
                <option value="COGNISM">COGNISM</option>
              </select>
            </div>

            <div className="mx-auto mb-6">
              <label
                htmlFor="placeOfSupply"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Place Of Supply
              </label>
              <select
                id="placeOfSupply"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={idData.placeOfSupply}
                onChange={handleUpdateChange}
                name="placeOfSupply"
                required
              >
                <option selected>Choose Place</option>
                {placeData.map((place) => (
                  <option key={place.code} value={place.code}>
                    {place.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mx-auto mb-6">
              <label
                htmlFor="paymentChannel"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Payment Channel
              </label>
              <select
                id="paymentChannel"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={idData.paymentChannel}
                onChange={handleUpdateChange}
                name="paymentChannel"
                required
              >
                <option selected>Choose Payment Channel</option>
                <option value="WISE">WISE</option>
                <option value="WISE_ACH">WISE_ACH</option>
                <option value="XE">XE</option>
                <option value="UPWORK">UPWORK</option>
                <option value="AIRWALLEX">AIRWALLEX</option>
                <option value="PAYPAL">PAYPAL</option>
                <option value="INTERNATIONAL_WIRE">INTERNATIONAL WIRE</option>
                <option value="NEFT/UPI">NEFT/UPI</option>
                <option value="CHEQUE_INR">CHEQUE (INR)</option>
                <option value="CASH_INR">CASH (INR)</option>
                <option value="CASH_USD">CASH (USD)</option>
              </select>
            </div>
            <div className="mx-auto mb-6">
              <label
                htmlFor="receivingAccount"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Receiving Account
              </label>
              <select
                id="receivingAccount"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={idData.receivingAccount}
                onChange={handleUpdateChange}
                name="receivingAccount"
                required
              >
                <option selected>Choose Receiving Account</option>

                {accounts.map((accounts) => (
                  <option value={accounts._id}>{accounts.name}</option>
                ))}
              </select>
            </div>
            <div className="mx-auto mb-6">
              <label
                htmlFor="receivingCurrency"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Receiving
                Currency
              </label>
              <select
                id="receivingCurrency"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={idData.receivingCurrency}
                onChange={handleUpdateChange}
                name="receivingCurrency"
                required
              >
                <option selected>Choose Receiving Currency</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="NZD">NZD - New Zealand Dollar</option>
                <option value="SGD">SGD - Singapore Dollar</option>
                <option value="AED">AED - UAE Dirham</option>
                <option value="OMR">OMR - Omani Rial</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="EUR">EUR - Euro</option>
                <option value="CAD">CAD - Canadian Dollar</option>
              </select>
            </div>
            <div className="mx-auto mb-6">
              <label
                htmlFor="invoiceCurrency"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Invoice Currency
              </label>
              <select
                id="invoiceCurrency"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={idData.invoiceCurrency}
                onChange={handleUpdateChange}
                name="invoiceCurrency"
                required
              >
                <option selected>Choose Invoice Currency</option>

                <option value="INR">INR - Indian Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="NZD">NZD - New Zealand Dollar</option>
                <option value="SGD">SGD - Singapore Dollar</option>
                <option value="AED">AED - UAE Dirham</option>
                <option value="OMR">OMR - Omani Rial</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="EUR">EUR - Euro</option>
                <option value="CAD">CAD - Canadian Dollar</option>
              </select>
            </div>
            <div className="mx-auto mb-6">
              <label
                htmlFor="invoiceFrequency"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Invoice Frequency
              </label>
              <select
                id="invoiceFrequency"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={idData.invoiceFrequency}
                onChange={handleUpdateChange}
                name="invoiceFrequency"
                required
              >
                <option selected>Choose Schedule</option>
                <option value="WEEKLY_EVERY_MONDAY">
                  Weekly - Every Monday
                </option>
                <option value="MONTHLY_DAY_AFTER_LAST_SUNDAY">
                  Monthly - Day After Last Sunday
                </option>
                <option value="MONTHLY_DAY_AFTER_FIRST_SUNDAY">
                  Monthly - Day After First Sunday
                </option>
                <option value="MONTHLY_DAY_AFTER_SECOND_SUNDAY">
                  Monthly - Day After Second Sunday
                </option>
                <option value="MONTHLY_DAY_AFTER_THIRD_SUNDAY">
                  Monthly - Day After Third Sunday
                </option>
                <option value="MONTHLY_DAY_AFTER_FOURTH_SUNDAY">
                  Monthly - Day After Fourth Sunday
                </option>
                <option value="FORTNIGHTLY_FIRST_AND_THIRD_MONDAY">
                  Fortnightly - First and Third Monday
                </option>
                <option value="FORTNIGHTLY_SECOND_AND_FOURTH_MONDAY">
                  Fortnightly - Second and Fourth Monday
                </option>
                <option value="FORTNIGHTLY_MONDAY_EVEN_WEEKS">
                  Fortnightly - Monday Even Weeks
                </option>
                <option value="FORTNIGHTLY_MONDAY_ODD_WEEKS">
                  Fortnightly - Monday Odd Weeks
                </option>
              </select>
            </div>

            <div className="mx-auto mb-6">
              <label
                htmlFor="invoiceDelivery"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Invoice Delivery
              </label>
              <select
                id="invoiceDelivery"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={idData.invoiceDelivery}
                onChange={handleUpdateChange}
                name="invoiceDelivery"
                required
              >
                <option selected>Choose Delivery Option</option>
                <option value="AUTOMATIC_TO_EMAIL">Automatic to Email</option>
                <option value="AUTOMATIC_VIA_ASANA">Automatic via Asana</option>
                <option value="MANUAL">Manual</option>
              </select>
            </div>
            <div className="mx-auto mb-6">
              <label
                htmlFor="invoiceFollowupPlan"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Invoice Followup
                Plan
              </label>
              <select
                id="invoiceFollowupPlan"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={idData.invoiceFollowupPlan}
                onChange={handleUpdateChange}
                name="invoiceFollowupPlan"
                required
              >
                <option selected>Choose Followup Plan </option>
                <option value="7_15">7 - 15</option>
                <option value="15_20">15 - 20</option>
                <option value="25_30">25 - 30</option>
              </select>
            </div>

            <div className="mx-auto mb-6">
              <label
                htmlFor="invoiceDisplayCurrencies"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Invoice Display
                Currencies
              </label>
              <select
                id="invoiceDisplayCurrencies"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={idData.invoiceDisplayCurrencies}
                onChange={handleUpdateChange}
                name="invoiceDisplayCurrencies"
                multiple
                required
              >
                <option value="INR">INR - Indian Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="NZD">NZD - New Zealand Dollar</option>
                <option value="SGD">SGD - Singapore Dollar</option>
                <option value="AED">AED - UAE Dirham</option>
                <option value="OMR">OMR - Omani Rial</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="EUR">EUR - Euro</option>
                <option value="CAD">CAD - Canadian Dollar</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="openingBalance"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Opening Balance
              </label>
              <input
                type="number"
                id="openingBalance"
                name="openingBalance"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Opening Balance"
                value={idData.openingBalance}
                onChange={handleUpdateChange}
              />
            </div>

            {/* <div className="mb-6">
              <label
                htmlFor="invoicePrefix"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Invoice Prefix
              </label>
              <input
                type="text"
                id="invoicePrefix"
                name="invoicePrefix"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Invoice Prefix"
                value={idData.invoicePrefix}
                onChange={handleUpdateChange}
              />
              <span class="text-red-500">{error.invoicePrefix}</span>
            </div> */}
            <div className="mb-6">
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter the Client's address"
                value={idData.address}
                onChange={handleUpdateChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="country"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Country
              </label>
              <select
                id="country"
                name="country"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={idData.country}
                onChange={handleUpdateChange}
                required
              >
                <option value="">Choose Country</option>
                {countries.map((country) => {
                  const code = getCode(country);
                  return (
                    <option key={code} value={code.toLowerCase()}>
                      {country}
                    </option>
                  );
                })}
              </select>
            </div>

            <button
              type="submit"
              onClick={(event) => sendUpdate(event)}
              className="mb-2 block w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateDrawer;
