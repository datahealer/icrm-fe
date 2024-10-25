import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import moment from "moment";
axios.defaults.withCredentials = true;

const EditResourceDrawer = ({
  isDrawerOpen,
  handleDrawerToggle,
  setResourceList,
  resource,
  resourceList,
  setIsDrawerOpen,
  projectId,
  warning,
  drawerRef,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUserList] = useState([]);
  const [people, setPeople] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      personId: resource.personId._id,
      defaultAllocation: resource.defaultAllocation,
      startDate: resource.startDate
        ? moment(resource.startDate).format("YYYY-MM-DD")
        : "",
      endDate: resource.endDate
        ? moment(resource.endDate).format("YYYY-MM-DD")
        : "",
      acquisitionPersonId: resource.acquisitionPersonId,
      billability: resource.billability,
      shadowOf: undefined,
      billingRate: resource.billingRate,

      overtimeAllocations: Array.isArray(resource?.overtimeAllocations)
        ? resource.overtimeAllocations.map(
            ({ startDate, endDate, hours, billingRate }) => ({
              startDate: startDate
                ? moment(startDate).format("YYYY-MM-DD")
                : "",
              endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : "",
              hours: hours || 0,
              billingRate: billingRate || 0,
              status: "ACTIVE",
            })
          )
        : [],
    },
  });

  const {
    fields: overtimeFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "overtimeAllocations",
  });

  const writeDate = (dateString) => {
    if (!dateString) return null; // Return null if dateString is empty or null
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getResources = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/project/${projectId}/get-project-resources`;
    const response = await axios.get(apiUrl);
    setResourceList(response.data);
  };
  const billability = watch("billability");

  const onSubmit = (data) => {
    if (
      !data.personId ||
      !data.startDate ||
      !data.endDate ||
      !data.acquisitionPersonId
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (billability === "Shadow") {
      delete data.defaultAllocation;
      delete data.billingRate;
      delete data.overTimeAllocation;
    }
    if (data.shadowOf === "") {
      delete data.shadowOf;
    }

    const formattedFormData = {
      ...data,
      startDate: writeDate(data.startDate),
      endDate: writeDate(data.endDate),
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/project/${projectId}/${resource._id}/update-project-resource`,
        formattedFormData
      )
      .then((response) => {
        getResources();
        setIsDrawerOpen(false);
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/people/getPeople`)
      .then((response) => {
        const peopleData = response.data.data.people;

        setPeople(peopleData);
      })
      .catch((error) => {
        console.error("Failed to fetch people", error);
      });
  }, []);

  return (
    <div>
      {isDrawerOpen && (
        <div
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
          <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
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
                {...register("personId", { required: true })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Choose a Person</option>
                {people.map((person) => (
                  <option key={person._id} value={person._id}>
                    {person.displayName}
                  </option>
                ))}
              </select>
              {errors.personId && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {watch("billability") !== "Shadow" && (
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
                  {...register("defaultAllocation", { required: true })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Choose a Default Allocation</option>
                  {[5, 10, 15, 20, 25, 30, 35, 40].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                {errors.defaultAllocation && (
                  <span className="text-red-500">This field is required</span>
                )}
                <span className="text-yellow-500">
                  {warning.defaultAllocation}
                </span>
              </div>
            )}

            <div className="mb-6">
              <label
                htmlFor="startDate"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                {...register("startDate")}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="endDate"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                {...register("endDate")}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
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
                {...register("acquisitionPersonId", { required: true })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Choose an Acquisition Person</option>
                {people.map((person) => (
                  <option key={person._id} value={person._id}>
                    {person.displayName}
                  </option>
                ))}
              </select>
              {errors.acquisitionPersonId && (
                <span className="text-red-500">This field is required</span>
              )}
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
                {...register("billability", { required: true })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Choose Billability</option>
                {["Billable", "Not Billable", "Shadow"].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              {errors.billability && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            {watch("billability") === "Shadow" && (
              <div className="mb-6">
                <label
                  htmlFor="shadowOf"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  <span className="text-lg text-red-500">*</span>
                  Shadow Of
                </label>
                <select
                  id="shadowOf"
                  {...register("shadowOf", { required: true })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Choose a Resource</option>
                  {resourceList.map((resource) => (
                    <option key={resource._id} value={resource._id}>
                      {resource.personId.displayName}
                    </option>
                  ))}
                </select>
                {errors.shadowOf && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            )}

            {watch("billability") !== "Shadow" && (
              <div>
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
                    {...register("billingRate", { required: true })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  {errors.billingRate && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

                {overtimeFields.map((field, index) => (
                  <div key={field.id} className="mb-2  items-center">
                    <div className="flex flex-col">
                      <label className="mr-2">{`Overtime Allocation ${
                        index + 1
                      }`}</label>

                      <label className="mr-2">Start Date</label>
                    </div>
                    <input
                      {...register(`overtimeAllocations.${index}.startDate`)}
                      type="date"
                      placeholder="Start Date"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                    <label>End Date</label>

                    <input
                      {...register(`overtimeAllocations.${index}.endDate`)}
                      type="date"
                      placeholder="End Date"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                    <label>Billing Hours</label>

                    <input
                      {...register(`overtimeAllocations.${index}.hours`)}
                      type="number"
                      placeholder="Hours"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                    <label>Billing Rate</label>

                    <input
                      {...register(`overtimeAllocations.${index}.billingRate`)}
                      type="number"
                      placeholder="Billing Rate"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />

                    <input
                      {...register(`overtimeAllocations.${index}.status`)}
                      type="hidden"
                      defaultValue="ACTIVE"
                    />

                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                    <hr
                      style={{ border: "1px solid black", margin: "10px 0" }}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    append({
                      startDate: "",
                      endDate: "",
                      hours: 0,
                      billingRate: 0,
                    })
                  }
                >
                  Add Overtime Allocation
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 p-2.5 text-sm text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditResourceDrawer;
