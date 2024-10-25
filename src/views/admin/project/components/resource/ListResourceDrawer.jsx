import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaPen } from "react-icons/fa";
import axios from "axios";

import { useAuthContext } from "hooks/useAuthContext";
import { EditResource } from "./EditResource";

axios.defaults.withCredentials = true;

const ShowResourceDrawer = ({
  isDrawerOpen,
  handleDrawerToggle,
  drawerRef,
  setResourceList,
  resourceList,
  projectId,
}) => {
  const user = useAuthContext();
  const getResources = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/project/${projectId}/get-project-resources`;
    const response = await axios.get(apiUrl);
    console.log(response.data);
    setResourceList(response.data);
  };

  useEffect(() => {
    getResources();
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
            Resources
          </h5>

          <ul className="list-disc pl-5">
            {resourceList.map((resource, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <EditResource
                  resource={resource}
                  resourceList={resourceList}
                  projectId={projectId}
                  setResourceList={setResourceList}
                />
                {resource.personId.displayName}{" "}
              </li>
            ))}
          </ul>
          {/* <form className="mb-6">
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
              Resources
            </h5>

            <div className="mb-6">
              <label
                htmlFor="personId"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Person Id
              </label>
              <select
                id="personId"
                name="personId"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={formData.personId}
                onChange={handleInputChange}
                required
              >
                <option value="">Choose a Person</option>
                {managers.map((person) => (
                  <option key={person.id} value={person._id}>
                    {person.displayName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mx-auto mb-6">
              <label
                htmlFor="defaultAllocation"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Default
                Allocation
              </label>
              <select
                id="defaultAllocation"
                name="defaultAllocation"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={formData.defaultAllocation}
                onChange={handleInputChange}
                required
              >
                <option value="">Choose a Default Allocation</option>
                {[5, 10, 15, 20, 25, 30, 35, 40].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <span class="text-yellow-500">{warning.defaultAllocation}</span>

            </div>

            <div className="mb-6">
              <label
                htmlFor="resource-start-date"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Start Date
              </label>
              <div className="relative max-w-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="resource-end-date"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                End Date
              </label>
              <div className="relative max-w-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="acquisitionPersonId"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>
                Acquisition Person Id
              </label>
              <select
                id="acquisitionPersonId"
                name="acquisitionPersonId"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={formData.acquisitionPersonId}
                onChange={handleInputChange}

                required
              >
                <option value="">Choose an Acquisition Person</option>
                {acquisitionPeople.map((person) => (
                  <option key={person.id} value={person._id}>
                    {person.displayName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mx-auto mb-6">
              <label
                htmlFor="billability"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>
                Billability
              </label>
              <select
                id="billability"
                name="billability"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={formData.billability}
                onChange={handleInputChange}

                required
              >
                <option value="">Choose Billability</option>
                {["Billable", "Not Billable", "Shadow"].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="billingRate"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="text-lg text-red-500">*</span>Billing Rate
              </label>
              <input
                type="number"
                id="billingRate"
                name="billingRate"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Billing Rate"
                value={
                  formData.billingRate === null ? "" : formData.billingRate
                }
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
          </form> */}
        </div>
      )}
    </div>
  );
};

export default ShowResourceDrawer;
