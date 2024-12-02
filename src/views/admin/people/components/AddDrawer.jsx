import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AddDrawer = ({
  isDrawerOpen,
  handleDrawerToggle,
  formData,
  handleInputChange,
  handleSubmit,
  drawerRef,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {isDrawerOpen && (
        <div
          ref={drawerRef}
          id="drawer-contact"
          className="fixed top-0 right-0 z-40 h-screen w-80 -translate-x-0 overflow-y-auto bg-gray-100 p-4 transition-transform dark:bg-gray-800"
          tabIndex="-1"
        >
          <h5 className="mb-6 inline-flex items-center text-base font-semibold uppercase text-gray-500 dark:text-gray-400">
            <svg
              className="h-4 w-4 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="M10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
            Add Person
          </h5>
          <button
            type="button"
            onClick={handleDrawerToggle}
            className="bg-transparent absolute top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-400 end-2.5 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
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
            <div className="mb-6">
              <label
                htmlFor="displayName"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Full Name
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Your Name"
                value={formData.displayName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mx-auto mb-6">
              <label
                htmlFor="department"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Department
              </label>
              <select
                id="department"
                name="department"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={formData.department}
                onChange={handleInputChange}
                required
              >
                <option selected>Choose a department</option>
                <option value="ENGINEERING">Engineering</option>
                <option value="SALES">Sales</option>
                <option value="OUTSIDEINZINT">Outside Inzint</option>
                {/* <option value="Wise">Wise</option>
                      <option value="NEFT">NEFT</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Cash">Cash</option> */}
              </select>
            </div>



            <div className="mx-auto mb-6">
              <label
                htmlFor="peopleType"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Person Type
              </label>
              <select
                id="peopleType"
                name="peopleType"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={formData.peopleType}
                onChange={handleInputChange}
                required
              >
                <option selected>Choose Type</option>
                <option value="ROOT">ROOT</option>
                <option value="SALES_MANAGER">SALES_MANAGER</option>
                <option value="HR">HR</option>
                <option value="PROJECT_MANAGER">PROJECT_MANAGER</option>
                <option value="CLIENT">CLIENT</option>
                <option value="REFERRAL_PARTNER">REFERRAL_PARTNER</option>
                <option value="FINANCE_MANAGER">FINANCE_MANAGER</option>
                <option value="CONTRACTOR">CONTRACTOR</option>
                  
                {/* <option value="Wise">Wise</option>
                      <option value="NEFT">NEFT</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Cash">Cash</option> */}
              </select>
            </div>


            <div className="mb-6">
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Phone
              </label>
              <input
                type="phone"
                id="phone"
                name="mobile"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Your phone number"
                value={formData.mobile}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span> WorkEmail
              </label>
              <input
                type="email"
                id="email"
                name="workEmail"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Your email"
                value={formData.workEmail}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span> Personal Email
              </label>
              <input
                type="email"
                id="personalEmail"
                name="personalEmail"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Your email"
                value={formData.personalEmail}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-6">
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
            </div>

            <div className="mx-auto mb-6">
              <label
                htmlFor="nature"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Nature
              </label>
              <select
                id="nature"
                name="nature"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={formData.nature}
                onChange={handleInputChange}
                required
              >
                <option selected>Choose a nature</option>
                <option value="REFERRAL_PARTNER">REFERRAL_PARTNER</option>
                <option value="EMPLOYEE">EMPLOYEE</option>
                {/* <option value="Wise">Wise</option>
                      <option value="NEFT">NEFT</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Cash">Cash</option> */}
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="employeeId"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Employee ID
              </label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Optional for Referral Partner"
                value={formData.employeeId}
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

            <div className="mb-6">
              <label
                htmlFor="hourly rate"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Hourly Rate
              </label>
              <input
                type="number"
                id="hourly-rate"
                name="hourlyRate"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Your hourly rate"
                value={formData.hourlyRate}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="tds rate"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                TDS Rate
              </label>
              <input
                type="text"
                id="tds-rate"
                name="tdsRate"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Your TDS Rate"
                value={formData.tdsRate}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="gst rate"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Gst Rate
              </label>
              <input
                type="text"
                id="gst-rate"
                name="gstRate"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Your Gst Rate"
                value={formData.gstRate}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="pan"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                PAN Number
              </label>
              <input
                type="text"
                id="pan"
                name="pan"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Your Pan Card no."
                value={formData.pan}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="a/c"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Bank Account Number
              </label>
              <input
                type=""
                id="a/c"
                name="bankAccountNumber"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Your Bank Account Number"
                value={formData.bankAccountNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="ifsc"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                IFSC Code
              </label>
              <input
                type="text"
                id="ifsc"
                name="ifscCode"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Your Bank's IFSC code"
                value={formData.ifscCode}
                onChange={handleInputChange}
              />
            </div>

            <div className="mx-auto mb-6">
              <label
                htmlFor="payment-channel"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Payment Channel
              </label>
              <select
                id="countries"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={formData.paymentChannel}
                onChange={handleInputChange}
                name="paymentChannel"
              >
                <option selected>Choose a channel</option>
                <option value="DOMESTIC_BANK_TRANSFER">
                  Domestic Bank Transfer
                </option>
                <option value="INTERNATIONAL_BANK_TRANSFER">
                  International Bank Transfer
                </option>
                <option value="VIA_THIRD_PARTY">Via Third Party</option>
              </select>
              {/* <input
                      type="text"
                      id="payment-channel"
                      name="paymentChannel"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Your Preferred Channel Partner"
                      value={formData.paymentChannel}
                      onChange={handleInputChange}
                    /> */}
            </div>

            <div className="mx-auto mb-6">
              <label
                htmlFor="payment-mode"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Payment Mode
              </label>
              <select
                id="countries"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={formData.paymentMode}
                onChange={handleInputChange}
                name="paymentMode"
              >
                <option selected>Choose a mode</option>
                <option value="INTERNATIONAL_WIRE">International Wire</option>
                <option value="WISE">Wise</option>
                <option value="NEFT">NEFT</option>
                <option value="CHEQUE">Cheque</option>
                <option value="CASH">Cash</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="aadhaarFrontUrl"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Aadhaar Front URL
              </label>
              <input
                type="url"
                id="aadhaarFrontUrl"
                name="aadhaarFrontUrl"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="URL of Aadhaar front image"
                value={formData.aadhaarFrontUrl}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="aadhaarBackUrl"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Aadhaar Back URL
              </label>
              <input
                type="url"
                id="aadhaarBackUrl"
                name="aadhaarBackUrl"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="URL of Aadhaar back image"
                value={formData.aadhaarBackUrl}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="passportUrl"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Passport URL
              </label>
              <input
                type="url"
                id="passportUrl"
                name="passportUrl"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="URL of passport image"
                value={formData.passportUrl}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="agreementUrl"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Agreement URL
              </label>
              <input
                type="url"
                id="agreementUrl"
                name="agreementUrl"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="URL of agreement document"
                value={formData.agreementUrl}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="tncUrl"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Terms & Conditions URL
              </label>
              <input
                type="url"
                id="tncUrl"
                name="tncUrl"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="URL of terms and conditions"
                value={formData.tncUrl}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="gstCertificateUrl"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                GST Certificate URL
              </label>
              <input
                type="url"
                id="gstCertificateUrl"
                name="gstCertificateUrl"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="URL of GST certificate"
                value={formData.gstCertificateUrl}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="businessNameProofUrl"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Business Name Proof URL
              </label>
              <input
                type="url"
                id="businessNameProofUrl"
                name="businessNameProofUrl"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="URL of business name proof"
                value={formData.businessNameProofUrl}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="bankStatementFolderUrl"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Bank Statement Folder URL
              </label>
              <input
                type="url"
                id="bankStatementFolderUrl"
                name="bankStatementFolderUrl"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="URL of bank statement folder"
                value={formData.bankStatementFolderUrl}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="invoiceFolderUrl"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Invoice Folder URL
              </label>
              <input
                type="url"
                id="invoiceFolderUrl"
                name="invoiceFolderUrl"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="URL of invoice folder"
                value={formData.invoiceFolderUrl}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="form16FolderUrl"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Form 16 Folder URL
              </label>
              <input
                type="url"
                id="form16FolderUrl"
                name="form16FolderUrl"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="URL of Form 16 folder"
                value={formData.form16FolderUrl}
                onChange={handleInputChange}
              />
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
