import React from "react";

const UpdateDrawer = ({
  isUpdateDrawerOpen,
  updateRef,
  idData,
  handleUpdateDrawerToggle,
  handleUpdateChange,
  handleResourceChange,
  handleUpdateResourceChange,
  sendUpdate,
  clients,
  managers,
  acquisitionPeople,
}) => {
  return (
    isUpdateDrawerOpen && (
      <div
        ref={updateRef}
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
          Update Project
        </h5>
        <button
          type="button"
          onClick={handleUpdateDrawerToggle}
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
              htmlFor="projectName"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              <span className="text-lg text-red-500">*</span>Project Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Project Name"
              value={idData.name}
              onChange={handleUpdateChange}
              required
            />
          </div>
          <div className="mx-auto mb-6">
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              <span className="text-lg text-red-500">*</span>Status
            </label>
            <select
              id="status"
              name="status"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={idData.status}
              onChange={handleUpdateChange}
              required
            >
              <option selected>Choose a status</option>
              <option value="In Progress">In Progress</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
              <option value="Yet to Start">Yet to Start</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="start-date"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              <span className="text-lg text-red-500">*</span>Start Date
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
                value={idData.startDate}
                onChange={handleUpdateChange}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="start-date"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              <span className="text-lg text-red-500">*</span> End Date
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
                value={idData.endDate}
                onChange={handleUpdateChange}
              />
            </div>
          </div>

          <div className="mx-auto mb-6">
            <label
              htmlFor="clientId"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              <span className="text-lg text-red-500">*</span>Select a Client
            </label>
            <select
              id="clientId"
              name="clientId"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
              value={idData.clientId}
              onChange={handleUpdateChange}
            >
              <option value="" disabled>
                Choose Client
              </option>
              {clients?.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.primaryContactPerson}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="managerId"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              <span className="text-lg text-red-500">*</span>Manager
            </label>
            <select
              id="managerId"
              name="managerId"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={idData.managerId}
              onChange={handleUpdateChange}
              required
            >
              <option value="" disabled>
                Choose a Manager
              </option>
              {managers?.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.displayName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="acquisitionPersonId"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              <span className="text-lg text-red-500">*</span>Acquisition Person
            </label>
            <select
              id="acquisitionPersonId"
              name="acquisitionPersonId"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={idData.acquisitionPersonId}
              onChange={handleUpdateChange}
              required
            >
              <option value="" disabled>
                Choose an Acquisition Person
              </option>
              {acquisitionPeople?.map((person) => (
                <option key={person.id} value={person.displayName}>
                  {person.displayName}
                </option>
              ))}
            </select>
          </div>

          <h5 className="mb-6 inline-flex items-center text-base font-semibold uppercase text-gray-500 dark:text-gray-400">
            Resources
          </h5>
          {idData?.resources?.map((resource, index) => (
            <div key={index}>
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
                  value={resource.personId}
                  onChange={(e) =>
                    handleResourceChange(index, "personId", e.target.value)
                  }
                  required
                >
                  <option value="">Choose a Person</option>
                  {managers?.map((person) => (
                    <option key={person.id} value={person.id}>
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
                  value={resource.defaultAllocation}
                  onChange={(e) =>
                    handleUpdateResourceChange(
                      index,
                      "defaultAllocation",
                      Number(e.target.value)
                    )
                  }
                  required
                >
                  <option value="">Choose a Default Allocation</option>
                  {[5, 10, 15, 20, 25, 30, 35, 40]?.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
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
                    id="resource-start-date"
                    name="resource-start-date"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    value={resource.startDate}
                    onChange={(e) =>
                      handleUpdateResourceChange(
                        index,
                        "startDate",
                        e.target.value
                      )
                    }
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
                    id="resource-end-date"
                    name="resource.end-date"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    value={resource.endDate}
                    onChange={(e) =>
                      handleUpdateResourceChange(
                        index,
                        "endDate",
                        e.target.value
                      )
                    }
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
                  value={resource.acquisitionPersonId}
                  onChange={(e) =>
                    handleResourceChange(
                      index,
                      "acquisitionPersonId",
                      e.target.value
                    )
                  }
                  required
                >
                  <option value="">Choose an Acquisition Person</option>
                  {acquisitionPeople?.map((person) => (
                    <option key={person.id} value={person.id}>
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
                  value={resource.billability}
                  onChange={(e) =>
                    handleUpdateResourceChange(
                      index,
                      "billability",
                      e.target.value
                    )
                  }
                  required
                >
                  <option value="">Choose Billability</option>
                  {["Billable", "Not Billable", "Shadow"]?.map((value) => (
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
                  Billing Rate
                </label>
                <input
                  type="number"
                  id="billingRate"
                  name="billingRate"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Billing Rate"
                  value={
                    resource.billingRate === null ? "" : resource.billingRate
                  }
                  onChange={(e) => {
                    const newValue =
                      e.target.value === "" ? null : Number(e.target.value);
                    if (
                      newValue === null ||
                      !(resource.billability === "Billable" && newValue <= 0)
                    ) {
                      handleUpdateResourceChange(
                        index,
                        "billingRate",
                        newValue
                      );
                    } else {
                      alert(
                        "Billing rate must be a non-zero positive value if Billability is Billable"
                      );
                    }
                  }}
                />
              </div>
            </div>
          ))}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              onClick={sendUpdate}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default UpdateDrawer;
