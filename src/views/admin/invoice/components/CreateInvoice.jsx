import React, { useState, useRef, useEffect } from "react";
import { FaBuilding, FaUser } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useProjects } from "hooks/useProjects";
import { useAuthContext } from "hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const CreateInvoice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showmodalsender, setshowmodalsender] = useState(false);
  const [showmodalrecipeint, setshowmodalrecipent] = useState(false);
  const [spin, setSpin] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { projects, loading, error } = useProjects();

  const dropdownRef = useRef(null);

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const [isOpenaccor, setIsOpenaccor] = useState(false);

  const initialFormData = {
    projectId: "",
    number: "",
    poNumber: "",
    date: "",
    serviceFromDate: "",
    serviceToDate: "",
    mileStones: [],
    dueDate: "",
    preparedBy: user.user._id,
    reviewedBy: user.user._id,

    services: [
      {
        name: "",
        description: "",
        mileStone: "",
        hours: "",
        rate: "",
        discountPercent: "",
        discountAmount: "",
        SAC: "998311",
        timeTrackerReportUrl: "",
        taxableAmount: "",
        sgstRate: "Nil",
        sgstAmount: "",
        cgstRate: "Nil",
        cgstAmount: "",
        igstRate: "Nil",
        igstAmount: "",
      },
    ],
    adjustments: [
      {
        name: "",
        amount: "",
      },
    ],
    status: "DRAFT",
    paidAmount: "",
    forgivenAmount: "",
    paidAmountINR: "",
    forgivenReason: "",
    cancellationReason: "",
    paymentChannel: "WISE",
    lostAmountINR: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [clientName, setClientName] = useState("");

  const [clientFromProject, setclientFromProject] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Fetch clientName when projectId is selected
    if (name === "projectId" && value) {
      fetchClientName(value);
    }
  };

  useEffect(() => {
    try {
      const response = fetch(
        `${process.env.REACT_APP_API_URL}/project/projID/663cc9b9a265d05771f744a3`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = response.json();
      console.log("Fetch ClientName When projectId is selected", data);
    } catch (error) {}
  });

  const fetchClientName = async (projectId) => {
    console.log("Fetch ClientName When projectId is selected", projectId);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/project/projID/${projectId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Client Name in fetchClientName:", data,data?.customerDisplayName);
      setclientFromProject(data.customerDisplayName);
      setFormData((prevFormData) => {
        const updatedFormData = {
          ...prevFormData,
          clientName: data.customerDisplayName,
        };
        console.log("Updated formData:", updatedFormData);
        return updatedFormData;
      });
    } catch (error) {
      console.error("Error fetching client name:", error);
    }
  };

  useEffect(() => {
    const projectId = "your_project_id"; // Replace with your actual projectId
    fetchClientName(projectId);
  }, []); // Empty dependency array to run only once on mount

  // useEffect to log the clientName when it changes
  useEffect(() => {
    console.log("Client Name in state:", clientFromProject);
  }, [clientName]); // Dependency array with clientName to run this effect when clientName changes

  const handleServiceChange = (index, field, value) => {
    const updatedServices = formData.services.map((service, i) => {
      if (i === index) {
        return { ...service, [field]: value };
      }
      return service;
    });
    setFormData({ ...formData, services: updatedServices });
  };

  const handleAdjustmentChange = (index, field, value) => {
    const updatedAdjustements = formData.adjustments.map((adjustment, i) => {
      if (i === index) {
        return { ...adjustment, [field]: value };
      }
      return adjustment;
    });
    setFormData({ ...formData, adjustments: updatedAdjustements });
  };

  useEffect(() => {
    console.log("Projects Create invoice", projects);
  });

  // Invoice Drawer
  const data = ["Apple", "Banana"];

  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const inputRef = useRef(null);

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    filterData(searchTerm);
  };

  const filterData = (searchTerm) => {
    const filtered = data.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleItemClick = (value) => {
    setSearchTerm(value);
    setShowDropdown(false);
  };
  // Invoice Drawer

  const toggleAccordion = () => {
    setIsOpenaccor(!isOpenaccor);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (event) => {
    setSpin(true);
    event.preventDefault();

    const dataToSubmit = {
      ...formData,
      clientName: clientFromProject, // Ensure clientName is included in the data being sent
    };

    console.log("Handle Submit with clientName", dataToSubmit);

    // Send data to the API endpoint
    fetch(`${process.env.REACT_APP_API_URL}/invoices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(dataToSubmit),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success: submit", data);

        setIsDrawerOpen(false);
        setSubmitted((prevSubmitted) => !prevSubmitted);
        setSpin(false);
        setFormData(initialFormData);
        console.log("Form Data Priyanshu", formData);
        navigate("/admin/invoice");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div
      className={`relative mx-auto mt-4 h-auto w-[70%] bg-white px-4 py-8 pb-16 ${
        showmodalsender || showmodalrecipeint ? "overflow-hidden" : ""
      }`}
    >
      {/* Overlay */}
      {(showmodalsender || showmodalrecipeint) && (
        <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-50"></div>
      )}

      {/* 1st row */}
      <div className="flex justify-between">
        {/* 1st col */}
        <div className=" mx-4 mt-4 flex h-[50px] w-[280px] items-center rounded-lg border  border-gray-300 bg-gray-100  px-2 hover:border-[3px] hover:border-blue-500">
          <div className="file_upload  relative rounded-lg">
            <div className="flex w-max items-center ">
              <label className="flex p-1">
                <input
                  className="hidden w-36 cursor-pointer text-sm"
                  type="file"
                  multiple
                />
                <GrGallery className="mt-1 h-4 w-8" />
                <div className="">Choose logo or drop it here</div>
              </label>
            </div>
          </div>
        </div>

        {/* 2nd col */}
        <div>
          <div className=" mb-6 mt-4 w-full">
            <select
              id="projectId"
              name="projectId"
              className="block w-full rounded-lg border border-gray-200 bg-gray-200 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
              value={formData.projectId}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Choose Project
              </option>
              {projects.map((project) => (
                <option
                  key={project._id}
                  value={project._id}
                  className="bg-white"
                >
                  {project.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* 3rd col */}
        <div className="mr-4 mt-1">
          <input
            type="text"
            id="poNumber"
            name="poNumber"
            className="mt-[10px] rounded-lg border border-gray-300 bg-gray-200 px-3 py-[7px] hover:border-[3px] hover:border-blue-500 "
            placeholder="Invoice Number"
            value={formData.poNumber}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* 2nd row */}
      <div className=" mt-4 flex w-full items-center justify-end gap-4 pr-4">
        <div className="font-bold text-gray-600">Issue date</div>
        <div>
          <input
            type="date"
            id="date"
            name="date"
            className="border border-gray-300 bg-gray-200 p-1"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* 4th row */}
      <div className="mx-2 mt-12 flex ">
        <div className="relative flex items-start justify-between  gap-36 rounded-lg p-4">
          {/* From Section */}
          <div
            className="flex items-start space-x-3 rounded-lg p-3 shadow"
            onClick={() => setshowmodalsender(true)}
          >
            <div className="flex flex-col">
              {/* <h1 className="font-semibold">From</h1> */}
              <FaBuilding className="h-6 w-6 text-gray-700" />
            </div>

            <div className="flex flex-col justify-start">
              <div className="font-semibold text-gray-700">Services</div>
              <div className="text-sm text-gray-500">Services details</div>
            </div>
          </div>

          {showmodalsender && (
            <div className="absolute inset-0 z-50 flex  w-[700px] items-center justify-center">
              <div className="relative mx-4 ml-16 h-[500px] w-full overflow-y-scroll rounded-lg bg-white p-8">
                <button
                  className="absolute top-4 right-4"
                  onClick={() => setshowmodalsender(false)}
                >
                  ✖
                </button>
                <form className="space-y-4">
                  {formData.services.map((service, index) => (
                    <div>
                      <h1 className="mb-4 text-lg font-bold text-gray-700">
                        Services
                      </h1>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="mt-1 w-full rounded-md border border-gray-300 p-2"
                          placeholder="Name"
                          value={service.name}
                          onChange={(e) =>
                            handleServiceChange(index, "name", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="mt-4 block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <input
                          type="text"
                          id="description"
                          name="description"
                          className="mt-1 w-full rounded-md border border-gray-300 p-2"
                          placeholder="Description"
                          value={service.description}
                          onChange={(e) =>
                            handleServiceChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="mt-4 flex w-full gap-4">
                        <div className="mb-6 w-[48%]">
                          <label
                            htmlFor="projectName"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            <span className="text-lg text-red-500">*</span>Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Name"
                            value={service.name}
                            onChange={(e) =>
                              handleServiceChange(index, "name", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="mb-6 w-[48%]">
                          <label
                            htmlFor="projectName"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            <span className="text-lg text-red-500">*</span>
                            Milestones
                          </label>
                          <input
                            type="text"
                            id="mileStone"
                            name="mileStone"
                            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Milestones"
                            value={service.mileStone}
                            onChange={(e) =>
                              handleServiceChange(
                                index,
                                "mileStone",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700">
                            Hours
                          </label>
                          <input
                            type="number"
                            id="hours"
                            name="hours"
                            className="mt-1 w-full rounded-md border border-gray-300 p-2"
                            placeholder="Hours"
                            value={service.hours}
                            onChange={(e) =>
                              handleServiceChange(
                                index,
                                "hours",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mt-4 block text-sm font-medium text-gray-700">
                          Rate
                        </label>
                        <input
                          type="number"
                          id="rate"
                          name="rate"
                          className="mt-1 w-full rounded-md border border-gray-300 p-2"
                          placeholder="Rate"
                          value={service.rate}
                          onChange={(e) =>
                            handleServiceChange(index, "rate", e.target.value)
                          }
                        />
                      </div>
                      <div className="mt-4 flex space-x-4">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700">
                            Discount Percent
                          </label>
                          <input
                            type="number"
                            id="discountPercent"
                            name="discountPercent"
                            className="mt-1 w-full rounded-md border border-gray-300 p-2"
                            placeholder="Discount
                            Percent"
                            value={service.discountPercent}
                            onChange={(e) =>
                              handleServiceChange(
                                index,
                                "discountPercent",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700">
                            Discount Amount
                          </label>
                          <input
                            type="number"
                            id="discountAmount"
                            name="discountAmount"
                            className="mt-1 w-full rounded-md border border-gray-300 p-2"
                            placeholder="Discount
                    Amount"
                            value={service.discountAmount}
                            onChange={(e) =>
                              handleServiceChange(
                                index,
                                "discountAmount",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center">
                        <div className="mb-6 w-[48%]">
                          <label
                            htmlFor="defaultAllocation"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            <span className="text-lg text-red-500">*</span>SAC
                          </label>
                          <select
                            id="SAC"
                            name="SAC"
                            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            value={service.SAC}
                            onChange={(e) =>
                              handleServiceChange(index, "SAC", e.target.value)
                            }
                          >
                            <option value="">Choose a SAC</option>
                            <option key="998311" value="998311">
                              Management Consulting
                            </option>
                            <option key="998312" value="998312">
                              Business Consulting
                            </option>
                            <option key="998313" value="998313">
                              IT CONSULTING
                            </option>
                            <option key="998314" value="998314">
                              IT DESIGN & DEVELOPMENT
                            </option>
                            <option key="9983" value="9983">
                              Other Professional, Technical and Business
                              Services
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="flex w-full gap-4">
                        <div className="mb-6 w-[48%]">
                          <label
                            htmlFor="projectName"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            <span className="text-lg text-red-500">*</span>Time
                            tracker report URL
                          </label>
                          <input
                            type="text"
                            id="timeTrackerReportUrl"
                            name="timeTrackerReportUrl"
                            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Time tracker
                    report URL"
                            value={service.timeTrackerReportUrl}
                            onChange={(e) =>
                              handleServiceChange(
                                index,
                                "timeTrackerReportUrl",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="mb-6 w-[48%]">
                          <label
                            htmlFor="projectName"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            <span className="text-lg text-red-500">*</span>
                            Taxable Amount
                          </label>
                          <input
                            type="number"
                            id="taxableAmount"
                            name="taxableAmount"
                            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Taxable
                    Amount"
                            value={service.taxableAmount}
                            onChange={(e) =>
                              handleServiceChange(
                                index,
                                "taxableAmount",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="flex w-full gap-4">
                        <div className="mb-6 w-[48%]">
                          <label
                            htmlFor="defaultAllocation"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            <span className="text-lg text-red-500">*</span>SGST
                            Rate
                          </label>
                          <select
                            id="sgstRate"
                            name="sgstRate"
                            className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            value={service.sgstRate}
                            onChange={(e) =>
                              handleServiceChange(
                                index,
                                "sgstRate",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Choose a SGST</option>
                            {["Nil", "9"].map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-6 w-[48%]">
                          <label
                            htmlFor="projectName"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            <span className="text-lg text-red-500">*</span>SGST
                            Amount
                          </label>
                          <input
                            type="number"
                            id="sgstAmount"
                            name="sgstAmount"
                            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="SGST Amount"
                            value={service.sgstAmount}
                            onChange={(e) =>
                              handleServiceChange(
                                index,
                                "sgstAmount",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="flex w-full gap-4">
                        <div className="mb-6 w-[48%]">
                          <label
                            htmlFor="defaultAllocation"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            <span className="text-lg text-red-500">*</span>CGST
                            Rate
                          </label>
                          <select
                            id="cgstRate"
                            name="cgstRate"
                            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            value={service.cgstRate}
                            onChange={(e) =>
                              handleServiceChange(
                                index,
                                "cgstRate",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Choose a CGST</option>
                            {["Nil", "9"].map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-6 w-[48%]">
                          <label
                            htmlFor="projectName"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            <span className="text-lg text-red-500">*</span>CGST
                            Amount
                          </label>
                          <input
                            type="number"
                            id="cgstAmount"
                            name="cgstAmount"
                            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Project Name"
                            value={service.cgstAmount}
                            onChange={(e) =>
                              handleServiceChange(
                                index,
                                "cgstAmount",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="flex w-full gap-4">
                        <div className="mb-6 w-[48%]">
                          <label
                            htmlFor="defaultAllocation"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            <span className="text-lg text-red-500">*</span>IGST
                            Rate
                          </label>
                          <select
                            id="igstRate"
                            name="igstRate"
                            className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            value={service.igstRate}
                            onChange={(e) =>
                              handleServiceChange(
                                index,
                                "igstRate",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Choose a IGST</option>
                            {["Nil", "9"].map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-6 w-[48%]">
                          <label
                            htmlFor="projectName"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            <span className="text-lg text-red-500">*</span>IGST
                            Amount
                          </label>
                          <input
                            type="number"
                            id="igstAmount"
                            name="igstAmount"
                            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="IGST Amount"
                            value={service.igstAmount}
                            onChange={(e) =>
                              handleServiceChange(
                                index,
                                "igstAmount",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </form>
              </div>
            </div>
          )}

          {/* Bill To Section */}
          <div
            className="flex cursor-pointer items-start space-x-3 rounded-lg p-3 shadow"
            onClick={() => setshowmodalrecipent(true)}
          >
            <div className="flex flex-col">
              <FaUser className="h-6 w-6 text-gray-700" />
            </div>
            <div className="flex flex-col justify-start">
              <div className="font-semibold text-gray-700">Adjustments</div>
              <div className="text-sm text-gray-500">Adjustments details</div>
            </div>
          </div>
          {showmodalrecipeint && (
            <div className="absolute inset-0 z-50 flex  w-[700px] items-center justify-center">
              <div className="relative mx-4 ml-16 mt-[-300px] h-[230px] w-full overflow-y-scroll rounded-lg bg-white p-8">
                <button
                  className="absolute top-4 right-4"
                  onClick={() => setshowmodalrecipent(false)}
                >
                  ✖
                </button>
                <form className="space-y-4">
                  {formData.adjustments.map((adjustment, index) => (
                    <div key={index}>
                      <h1 className="mb-4 text-lg font-bold text-gray-700">
                        Adjustments
                      </h1>
                      <div className="flex w-full gap-4">
                        <div className="mb-6 w-[48%]">
                          <label
                            htmlFor="projectName"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            <span className="text-lg text-red-500">*</span>Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Name"
                            value={adjustment.name}
                            onChange={(e) =>
                              handleAdjustmentChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                        <div className="mb-6 w-[48%]">
                          <label
                            htmlFor="projectName"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            <span className="text-lg text-red-500">*</span>
                            Amount
                          </label>
                          <input
                            type="number"
                            id="amount"
                            name="amount"
                            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Amount"
                            value={adjustment.amount}
                            onChange={(e) =>
                              handleAdjustmentChange(
                                index,
                                "amount",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Item List Section */}
      {/* 5th row */}
      <div className="mx-auto mt-4 w-full max-w-4xl">
        <div className="rounded-lg ">
          {isOpenaccor && (
            <div className="border-b border-gray-100 bg-white p-4">
              <div className="grid grid-cols-3 gap-8">
                <div className="mb-6 ">
                  <label
                    htmlFor="start-date"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    <span className="text-lg text-red-500">*</span>
                    Service From Date
                  </label>
                  <div className="relative">
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
                      id="serviceFromDate"
                      name="serviceFromDate"
                      className="block w-full rounded-lg border border-gray-300 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      value={formData.serviceFromDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-6 ">
                  <label
                    htmlFor="clientId"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    <span className="text-lg text-red-500">*</span>Service To
                    Date
                  </label>

                  <div className="relative max-w-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
                      <svg
                        className="h-4 w-4  text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                  </div>
                  <input
                    type="date"
                    id="serviceToDate"
                    name="serviceToDate"
                    className="block w-full rounded-lg border border-gray-300 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    value={formData.serviceToDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="clientId"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    <span className="text-lg text-red-500">*</span>Due Date
                  </label>
                  <div className="relative max-w-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
                      <svg
                        className="h-4 w-4  text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                  </div>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    className="block w-full rounded-lg border border-gray-300 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mt-4">
                <textarea
                  placeholder="Description"
                  className="w-full rounded-lg border border-gray-300 p-2"
                ></textarea>
              </div>
            </div>
          )}
        </div>
        <div
          className="mt-8 flex cursor-pointer items-center justify-center border border-gray-300 p-4 hover:border-[3px] hover:border-blue-500"
          onClick={toggleAccordion}
        >
          {isOpenaccor ? (
            <FaMinus className="mr-2 text-gray-700" />
          ) : (
            <FaPlus className="mr-2 text-gray-700" />
          )}
          <span className="font-semibold text-gray-700">
            Add new invoice item
          </span>
        </div>
      </div>
      {/* 6th row */}
      <div className="flex justify-end">
        <div className="mt-8  max-w-xs rounded-md  bg-white p-4 px-8 shadow-md">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="font-medium text-gray-700">Invoice summary</span>
            <select className="rounded-md border p-1 px-4">
              <option value="USD">USD</option>
              {/* Add more currencies as needed */}
            </select>
          </div>
          <div className="mb-2 flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-600">$0.00</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-600">$0.00</span>
          </div>
          <div className="flex justify-between font-bold">
            <span className="text-gray-800">Total</span>
            <span className="text-gray-800">$0.00</span>
          </div>
        </div>
      </div>
      {/* 7th row */}
      <hr className="my-8 border border-gray-200" />
      <div>
        <input
          type="text"
          className="mt-[10px] w-full rounded-lg border border-gray-300 bg-gray-200 py-[15px] px-4 hover:border-[3px] hover:border-blue-500"
          placeholder="Invoice terms"
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="mx-80 mt-6 block w-[120px] items-center justify-center rounded-lg bg-blue-700 px-8 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </div>
  );
};
export default CreateInvoice;