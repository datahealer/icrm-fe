import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthContext } from "hooks/useAuthContext";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { getNames, getCode } from "country-list";
import { State } from "country-state-city";
import { Select } from "@chakra-ui/react";
import { components } from "react-select";
import { placeData } from "../../../../constant/place.js";

import axios from "axios";

axios.defaults.withCredentials = true;
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
const AddDrawer = ({
  isDrawerOpen,
  handleDrawerToggle,
  error,
  formData,
  handleInputChange,
  handleSubmit,
  drawerRef,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useAuthContext();
  const countries = getNames();
  const states = State.getStatesOfCountry(formData.country.toUpperCase());
  console.log(states, "dwhis");
  console.log(formData.country, "dwhis");

  const [people, setPeople] = useState([]);
  const [managerList, setManagerList] = useState([]);

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

  const getManagerList = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/people/getManagers`;
      const response = await axios.get(apiUrl);
      setManagerList(response.data.data.managers);
    } catch (error) {
      console.log("Failed to fetch user list");
    }
  };

  useEffect(() => {
    getUserList();
    getManagerList();
  }, []);

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
            Add Client
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
                value={formData.acquisitionPersonId}
                onChange={handleInputChange}
                name="acquisitionPersonId"
                required
              >
                <option value="">Choose a user </option>
                {Array.isArray(people) && people.length > 0 ? (
                  people.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.displayName}
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
                value={formData.manager}
                onChange={handleInputChange}
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
                value={formData.primaryContactPerson}
                onChange={handleInputChange}
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
                value={formData.l2ContactPerson}
                onChange={handleInputChange}
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
                value={formData.serviceStartDate}
                onChange={handleInputChange}
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
                value={formData.serviceEndDate}
                onChange={handleInputChange}
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
                value={formData.billingContactPerson}
                onChange={handleInputChange}
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
                value={formData.displayName}
                onChange={handleInputChange}
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
                value={formData.businessName}
                onChange={handleInputChange}
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
                value={formData.primaryContactNumber}
                onChange={(value) =>
                  handleInputChange({
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
                value={formData.billingToEmail}
                onChange={handleInputChange}
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
                value={formData.billingCcEmail}
                onChange={handleInputChange}
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
                      value={formData.password}
                      onChange={handleInputChange}
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
                        value={formData.password}
                        onChange={handleInputChange}
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
                value={formData.secondaryContactNumber}
                onChange={(value) =>
                  handleInputChange({
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
                value={formData.gstTreatment}
                onChange={handleInputChange}
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
            {(formData.gstTreatment === "REGISTERED" ||
              formData.gstTreatment === "REGISTERED_COMPOSITION") && (
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
                  value={formData.gstin}
                  onChange={handleInputChange}
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
                value={formData.serviceAgreementFolderUrl}
                onChange={handleInputChange}
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
                value={formData.ndaFolderUrl}
                onChange={handleInputChange}
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
                value={formData.sowFolderUrl}
                onChange={handleInputChange}
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
                value={formData.taxPreference}
                onChange={handleInputChange}
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
                value={formData.paymentTerms}
                onChange={handleInputChange}
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
                value={formData.source}
                onChange={handleInputChange}
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
                value={formData.placeOfSupply}
                onChange={handleInputChange}
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
                value={formData.paymentChannel}
                onChange={handleInputChange}
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
                value={formData.receivingAccount}
                onChange={handleInputChange}
                name="receivingAccount"
                required
              >
                <option selected>Choose Receiving Account</option>
                <option value="IOB_1173">IOB</option>
                <option value="IDFC_3481">IDFC FIRST BANK</option>
                <option value="ICIC_XXX">ICICI BANK</option>
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
                value={formData.receivingCurrency}
                onChange={handleInputChange}
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
                value={formData.invoiceCurrency}
                onChange={handleInputChange}
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
                value={formData.invoiceFrequency}
                onChange={handleInputChange}
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
                value={formData.invoiceDelivery}
                onChange={handleInputChange}
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
                value={formData.invoiceFollowupPlan}
                onChange={handleInputChange}
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
                value={formData.invoiceDisplayCurrencies}
                onChange={handleInputChange}
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
                value={formData.openingBalance}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
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
                value={formData.invoicePrefix}
                onChange={handleInputChange}
              />
              <span class="text-red-500">{error.invoicePrefix}</span>
            </div>
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
                value={formData.address}
                onChange={handleInputChange}
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
                value={formData.country}
                onChange={handleInputChange}
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

              {formData.country === "in" && (
                <div className="mb-6">
                  <label
                    htmlFor="state"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    <span className="text-lg text-red-500">*</span>State
                  </label>
                  <select
                    id="state"
                    name="state"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    value={formData.state}
                  >
                    <option value="">Choose State</option>
                    {states.map((state) => (
                      <option key={state.code} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
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
