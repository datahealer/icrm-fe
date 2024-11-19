import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import axios from "axios";
import TaxInvoice from "./Invoice";
import { useAuthContext } from "hooks/useAuthContext";

const TaxInvoiceForm = () => {
  const {
    register,
    control,
    getValues,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({});

  const {
    fields: items,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "items",
  });

  const [clientData, setClientData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [peopleData, setPeopleData] = useState("");


  const onSubmit = (data) => {
    setShowInvoice(true);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/client/`,
        {
          withCredentials: true,
        }
      );
      setClientData(response.data.data.clients);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const fetchProjectData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/project/`,
        {
          withCredentials: true,
        }
      );
      setProjectData(response.data.data.projects);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  const { user } = useAuthContext();

  const fetchPeopleData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/people/${user.user._id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data, "dhwio");
      setPeopleData(response.data);
    } catch (err) {
      console.log("Error fetching data", err);
    }
  };
  useEffect(() => {
    fetchData();
    fetchProjectData();
    fetchPeopleData();
  }, []);

 

  const onSaveAsDraft = async () => {
    const draftData = getValues();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/invoices/`,
        { ...draftData, status: "DRAFT" },
        { withCredentials: true }
      );
      alert("Draft saved successfully.");
    } catch (err) {
      console.error("Error saving draft:", err);
    }
  };
  return (
    <>
      {!showInvoice ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-4xl space-y-6 p-8"
        >
          {/* Header Section */}
          <div className="rounded-lg bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-bold">Invoice Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Invoice Number
                </label>
                <input
                  type="text"
                  {...register("invoiceNumber", {
                    required: "Invoice number is required",
                  })}
                  className="w-full rounded border p-2"
                />
                {errors.invoiceNumber && (
                  <span className="text-sm text-red-500">
                    {errors.invoiceNumber.message}
                  </span>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Invoice Date
                </label>
                <Controller
                  control={control}
                  name="invoiceDate"
                  rules={{ required: "Invoice date is required" }}
                  render={({ field }) => (
                    <input
                      type="date"
                      {...field}
                      className="w-full rounded border p-2"
                    />
                  )}
                />
                {errors.invoiceDate && (
                  <span className="text-sm text-red-500">
                    {errors.invoiceDate.message}
                  </span>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Due Date
                </label>
                <Controller
                  control={control}
                  name="dueDate"
                  render={({ field }) => (
                    <input
                      type="date"
                      {...field}
                      className="w-full rounded border p-2"
                    />
                  )}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Currency
                </label>
                <select
                  {...register("currency")}
                  className="w-full rounded border p-2"
                >
                  <option value="">Select Currency</option>
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Payment Link
                </label>
                <input
                  type="url"
                  {...register("paymentLink", {
                    required: "Payment Link is required",
                  })}
                  className="w-full rounded border p-2"
                />
                {errors.invoiceNumber && (
                  <span className="text-sm text-red-500">
                    {errors.invoiceNumber.message}
                  </span>
                )}
              </div>

            

              {/* Display the selected reviewers array for demonstration */}
           
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Milestones
                </label>
                <input
                  type="number"
                  {...register("milestones", {})}
                  className="w-full rounded border p-2"
                />
              </div>

              <div>
                <label className="bloc k mb-1 text-sm font-medium">
                  Amount Received
                </label>
                <input
                  type="number"
                  {...register("amountReceived", {
                    valueAsNumber: true,
                  })}
                  className="w-full rounded border p-2"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Previous Dues
                </label>
                <input
                  type="number"
                  {...register("previousDues", { valueAsNumber: true })}
                  className="w-full rounded border p-2"
                  placeholder="Enter Due amount"
                />
              </div>
            </div>
          </div>

          {/* Billing Information */}
          <div className="rounded-lg bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-bold">Billing Information</h2>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Select Business
              </label>
              <select
                {...register("business.businessName")}
                onChange={(e) => {
                  const selectedBusiness = clientData.find(
                    (business) => business.businessName === e.target.value
                  );
                  if (selectedBusiness) {
                    setValue("business.id", selectedBusiness._id);
                    setValue(
                      "business.businessName",
                      selectedBusiness.businessName
                    );
                    setValue(
                      "business.primaryContactNumber",
                      selectedBusiness.primaryContactNumber
                    );
                    setValue(
                      "business.invoiceCurrency",
                      selectedBusiness.invoiceCurrency
                    );
                    setValue("business.address", selectedBusiness.address);
                    setValue(
                      "business.billingToEmail",
                      selectedBusiness.billingToEmail
                    );
                    setValue("business.gstin", selectedBusiness.gstin);
                  }
                  setValue(
                    "business.gstTreatment",
                    selectedBusiness.gstTreatment
                  );
                  setValue("business.state", selectedBusiness.state);
                  setValue("business.placeOfSupply", selectedBusiness.placeOfSupply);

                }}
                className="w-full rounded border p-2"
              >
                <option value="">Select a business</option>
                {clientData.map((business) => (
                  <option key={business.id} value={business.id}>
                    {business.businessName}
                  </option>
                ))}
              </select>
            </div>
            {/* Additional Billing Info Fields */}
            {/* Project Information */}
            <div className="rounded-lg bg-gray-50 p-6">
              <h2 className="mb-4 text-xl font-bold">Project Information</h2>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Project Name
                </label>
                <select
                  {...register("project.name")}
                  className="w-full rounded border p-2"
                  onChange={(e) => {
                    const selectedProject = projectData.find(
                      (project) => project.name === e.target.value
                    );
                    if (selectedProject) {
                      setValue("project.name", selectedProject.name);
                      setValue("project.startDate", selectedProject.startDate);
                      setValue("project.endDate", selectedProject.endDate);
                      setValue("project.id", selectedProject._id);
                    }
                  }}
                >
                  <option value="">Select a project</option>
                  {projectData.map((project) => (
                    <option key={project.id} value={project.name}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Invoice Items */}
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="rounded border bg-white p-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          Service
                        </label>
                        <input
                          type="text"
                          {...register(`items.${index}.name`)}
                          className="w-full rounded border p-2"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          SAC
                        </label>
                        <input
                          type="text"
                          {...register(`items.${index}.sac`)}
                          className="w-full rounded border p-2"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          Hrs
                        </label>
                        <input
                          type="number"
                          {...register(`items.${index}.hours`)}
                          className="w-full rounded border p-2"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          Rate
                        </label>
                        <input
                          type="number"
                          {...register(`items.${index}.rate`)}
                          className="w-full rounded border p-2"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          Disc.
                        </label>
                        <input
                          type="text"
                          {...register(`items.${index}.discountAmount`)}
                          className="w-full rounded border p-2"
                        />
                      </div>
                      {/* <div>
                        <label className="mb-1 block text-sm font-medium">
                          SGST
                        </label>
                        <input
                          type="number"
                          {...register(`items.${index}.sgstAmount`)}
                          className="w-full rounded border p-2"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          CGST
                        </label>
                        <input
                          type="number"
                          {...register(`items.${index}.cgstAmount`)}
                          className="w-full rounded border p-2"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          IGST
                        </label>
                        <input
                          type="number"
                          {...register(`items.${index}.igstAmount`)}
                          className="w-full rounded border p-2"
                        />
                      </div> */}
                    </div>

                    <button type="button" onClick={() => remove(index)}>
                      Remove Item
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    append({
                      service: "",
                      sac: "",
                      hrs: "",
                      rate: "",
                      disc: "",
                      taxableValue: "",
                      // sgst: "",
                      // cgst: "",
                      // igst: "",
                      amount: "",
                    })
                  }
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 rounded bg-blue-500 p-2 text-white"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onSaveAsDraft}
            className="rounded bg-gray-500 p-2 text-white"
          >
            Save as Draft
          </button>
        </form>
      ) : (
        <TaxInvoice
          getValues={getValues}
          peopleData={peopleData}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default TaxInvoiceForm;
