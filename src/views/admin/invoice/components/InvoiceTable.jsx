import React, { useState, useEffect, useRef } from "react";
import Pagination from "./Pagination";
import { MdDelete, MdDownload } from "react-icons/md";
import { useAuthContext } from "hooks/useAuthContext";
import Spinner from "views/admin/client/components/Spinner";
import DeleteInvoiceConfirm from "./DeleteInvoiceConfirm";
import DownloadInvoiceConfirm from "./DownloadInvoiceConfirm";
import PdfSkeleton from "./PdfSkeleton";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import CreateInvoice from "./CreateInvoice.jsx";
import { useInvoiceContext } from "context/InvoiceContext";
import TaxInvoice from "./Invoice";
import TaxInvoiceForm from "./InvoiceForm";
import ReviewInvoice from "./ReviewInvoice";
import axios from "axios";

const InvoiceTable = () => {
  const [filter, setFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const [isOpencreate, setIsOpencreate] = useState(false);

  const [showComponent, setShowComponent] = useState(false);
  const [showUpdateComponent, setshowUpdateComponent] = useState(false);

  const toggleAccordion = () => {
    setIsOpencreate(!isOpencreate);
    setShowComponent(true);
  };

  // const handleAddNewInvoice = () => {
  //   navigate("/admin/createinvoice");
  // };
  const { handleAddNewInvoice } = useInvoiceContext();
  const navigate = useNavigate();

  const [data, setData] = useState([
    { id: 1, task: "Task 1", completed: false },
    { id: 2, task: "Task 2", completed: false },
    { id: 3, task: "Task 3", completed: true },
    { id: 4, task: "Task 4", completed: false },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientData, setClientData] = useState([]);
  const [itemsPerPage] = useState(5);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [spin, setSpin] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [clients, setClients] = useState([]);
  console.log("clientdev", clients);
  const [projects, setProjects] = useState([]);
  const [people, setPeople] = useState([]);
  const [managers, setManagers] = useState([]);
  const [clientIds, setClientIds] = useState([]);
  const [selectedClientID, setSelectedClientID] = useState(null);
  const [invoices, setInvoices] = useState([]);

  const [invoiceData, setInvoiceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState("-createdAt");
  const [updated, setUpdated] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [downloadId, setDownloadId] = useState(null);

  const [downloadModal, setDownloadModal] = useState(false);
  const [downloadPdf, setDownloadPdf] = useState(false);
  const [isPrinted, setIsPrinted] = useState(false);
  const [downloadData, setDownloadData] = useState(null);

  const handlePrintStatus = (status) => {
    setIsPrinted(status);
    if (status) {
      setDownloadPdf(false);
    }
  };
  const { user } = useAuthContext();

  const updateRef = useRef(null);

  const initialFormData = {
    clientId: "",
    projectId: "",
    number: "",
    poNumber: "",
    date: "",
    serviceFromDate: "",
    serviceToDate: "",
    mileStones: [],
    dueDate: "",
    preparedBy: "",
    reviewedBy: [],

    services: [
      {
        name: "",
        description: "",
        // fromDate: "",
        // toDate: "",
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
  const [showTaxInvoice, setShowTaxInvoice] = useState(false);

  const handleViewClick = (event) => {
    event.preventDefault();
    setShowTaxInvoice(true); // Show the TaxInvoice component
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (id) => {
    setData(
      data.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
    setIsOpen(false);
  };

  const handleFinalize = async (invoiceId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/invoices/${invoiceId}`,
        {
          status: "FINALIZED",
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
  };

  const handlePaid = async (invoiceId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/invoices/${invoiceId}`,
        {
          status: "AMOUNT_RECEIVED",
        },
        {
          withCredentials: true,
        }
      );
      await fetchInvoices();
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
  };

  // const handleServiceChange = (index, field, value) => {
  //   const updatedServices = formData.services.map((service, i) => {
  //     if (i === index) {
  //       return { ...service, [field]: value };
  //     }
  //     return service;
  //   });
  //   setFormData({ ...formData, services: updatedServices });
  // };

  // const handleAdjustmentChange = (index, field, value) => {
  //   const updatedAdjustements = formData.adjustments.map((adjustment, i) => {
  //     if (i === index) {
  //       return { ...adjustment, [field]: value };
  //     }
  //     return adjustment;
  //   });
  //   setFormData({ ...formData, adjustments: updatedAdjustements });
  // };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setIsOpen(true);
  };

  const handleUpdateClickOutside = (event) => {
    if (updateRef.current && !updateRef.current.contains(event.target)) {
      setIsUpdateDrawerOpen(false);
    }
  };

  const handleDeleteClick = (event, id) => {
    event.preventDefault();
    setDeleteId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteId) return;
    handleDeleteRow(deleteId);
    setShowModal(false);
    setDeleteId(null);
  };

  const handleDownloadClick = (event, id) => {
    event.preventDefault();
    setDownloadId(id);
    setDownloadModal(true);
  };

  const handleConfirmDownload = () => {
    if (!downloadId) return;
    handleDownloadRow(downloadId);
    setDownloadPdf(true);
    setDownloadModal(false);
    setDownloadId(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseDownloadModal = () => {
    setDownloadModal(false);
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    setSpin(true);
    event.preventDefault();
    console.log(formData);

    // Send data to the API endpoint
    fetch(`${process.env.REACT_APP_API_URL}/invoices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);

        setIsDrawerOpen(false);
        setSubmitted((prevSubmitted) => !prevSubmitted);
        setSpin(false);
        setFormData(initialFormData);
        console.log();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/client/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data Before", data);
        setClients(data.data.clients);
        console.log("ClientData", clients);
      })
      .catch((error) => {
        console.error("Failed to fetch clients", error);
      });
  }, []);

  console.log("client ==>", clients);

  const fetchInvoices = async () => {
    try {
      setSpin(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/invoices`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setInvoices(data.data.invoices);
    } catch (error) {
      console.error("Failed to fetch invoices", error);
    } finally {
      setSpin(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [deleted, submitted, updated]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/project/`,
          { method: "GET" }
        );
        const data = await response.json();

        setProjects(data.data.projects);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    console.log("Projects updated", projects);
  }, [projects]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/people/`)
      .then((response) => response.json())
      .then((data) => {
        setPeople(data.data.people);

        setManagers(
          data.data.people.filter(
            (person) => person.department === "Engineering"
          )
        );
      })
      .catch((error) => {
        console.error("Failed to fetch people", error);
      });
  }, []);

  const handleDeleteRow = (id) => {
    setSpin(true);
    fetch(`${process.env.REACT_APP_API_URL}/invoices/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete row");
        }
        setInvoices((prevData) => prevData.filter((row) => row.id !== id));
        setDeleted((prevDeleted) => !prevDeleted);
        setSpin(false);
      })
      .catch((error) => console.error("Error deleting row:", error));
  };

  const handleDownloadRow = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/invoices/pdf/${id}`,
        {
          headers: {
            email: `${user.user.email}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setDownloadData(result.data);
      console.log("Result Data", result);
      console.log(user.user.email);
    } catch (error) {
      console.error("Error fetching download data:", error);
    }
  };

  // const handleClientSelect = (clientID) => {
  //   setSelectedClientID(clientID);
  // };

  // const handleClientChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value, // This sets the clientId to the selected option's value, which is the ObjectId
  //   }));
  // };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;

    setIdData((prevIdData) => ({
      ...prevIdData,
      [name]: value,
    }));
  };

  const [selectedId, setSelectedId] = useState(null);

  const [idData, setIdData] = useState({
    clientId: "",
    projectId: "",
    number: "",
    poNumber: "",
    date: "",
    serviceFromDate: "",
    serviceToDate: "",
    dueDate: "",
    preparedBy: "",
    reviewedBy: "",

    services: [
      {
        name: "",
        description: "",
        hours: "",
        rate: "",
        mileStone: "",
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
  });

  const { handleEditInvoice } = useInvoiceContext();

  const handleUpdate = async (event, id) => {
    event.preventDefault();
    await handleEditInvoice(id);
  };

  useEffect(() => {
    setSpin(true);

    fetch(`${process.env.REACT_APP_API_URL}/invoices/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data Fetcehd from API: ");
        console.log(data);
        setInvoiceData(data.data.invoices);
        setSpin(false);
        // setPeopleData((prevData) => [...data.data.people, ...prevData]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [submitted, updated, sortBy]);

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = invoices.slice(indexOfFirstItem, indexOfLastItem);
  // const isCurrentPageEmpty = currentItems.length === 0 && currentPage > 1;

  // const newPage = isCurrentPageEmpty ? currentPage - 1 : currentPage;

  // const updatedIndexOfLastItem = newPage * itemsPerPage;
  // const updatedIndexOfFirstItem = updatedIndexOfLastItem - itemsPerPage;
  // const updatedCurrentItems = invoices.slice(
  //   updatedIndexOfFirstItem,
  //   updatedIndexOfLastItem
  // );

  const drawerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsDrawerOpen(false);
      setIsUpdateDrawerOpen(false);
    }
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen]);
  useEffect(() => {
    if (isUpdateDrawerOpen) {
      document.addEventListener("mousedown", handleUpdateClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleUpdateClickOutside);
    };
  }, [isUpdateDrawerOpen]);

  const sendUpdate = (event) => {
    setSpin(true);
    event.preventDefault();
    console.log(idData);

    fetch(`${process.env.REACT_APP_API_URL}/invoices/${selectedId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(idData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setIsUpdateDrawerOpen(false);
        setUpdated((prevUpdated) => !prevUpdated);
        setSpin(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const writeDate = (dateString) => {
    if (!dateString) return null; // Return null if dateString is empty or null
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // console.log("Heyy Priyanshu", formData,formData.clientName);
  }, [formData]);

  return (
    <div className="min-h-fit bg-white">
      <div className="relative m-4 overflow-x-auto p-8 shadow-md sm:rounded-lg">
        <div className="flex-column flex flex-wrap items-center justify-between space-y-4 pb-4 sm:flex-row sm:space-y-0">
          <div>
            <button
              id="dropdownRadioButton"
              onClick={handleDropdownToggle}
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              type="button"
            >
              {/* Icons and text here */}
              Recents
            </button>
          </div>
          <div className="flex flex-row justify-between gap-4">
            <button
              id="dropdownRadioButton"
              onClick={() => {
                navigate("/admin/invoice/create");
              }}
              className="inline-flex items-center rounded-lg border border-gray-300 bg-blue-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              type="button"
            >
              Create New Invoice
            </button>
          </div>
          {/* Add New Person */}
        </div>
        {showModal && (
          <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
            <div className="absolute top-0 h-full w-full bg-gray-900 opacity-50"></div>
            <div className="z-50 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"></div>
          </div>
        )}
        <table className="z-[-1]x w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="items-center p-4">
                S.No.
              </th>
              <th scope="col" className="px-6 py-3">
                Invoice Number
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th> */}
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map((row, index) => (
              <tr
                key={row._id}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">{index + 1}.</td>
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {/* {row.firstname+" "+row.lastname} */}
                  {row.invoiceNumber}
                </th>
                <td className="px-6 py-4">{row.status}</td>
                <td className="px-6 py-4">
                  <td className="px-6 py-4">
                    <div className="flex flex-row items-center gap-3">
                      {row.status === "IN_REVIEW" &&
                      row.preparedBy.id !== user.user._id &&
                      (user.user.userType === "FINANCE_MANAGER" ||
                        user.user.userType === "ROOT") ? (
                        <a
                          href="#"
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                          onClick={() => {
                            navigate("/admin/invoice/review-invoice", {
                              state: { formData: row },
                            });
                          }}
                        >
                          Review
                        </a>
                      ) : row.status === "REVIEW_APPROVED" &&
                        row.preparedBy.id === user.user._id ? (
                        <button
                          className="font-medium text-green-600 hover:underline dark:text-green-500"
                          onClick={() => handleFinalize(row._id)}
                        >
                          Finalize
                        </button>
                      ) : row.status === "FINALIZED" ? (
                        <div className="flex gap-4">
                          <button
                            className="font-medium text-green-600 hover:underline dark:text-green-500"
                            onClick={() => {
                              navigate("/admin/invoice/review-invoice", {
                                state: { formData: row },
                              });
                            }}
                          >
                            View
                          </button>
                          <button
                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                            onClick={() => handlePaid(row._id)}
                          >
                            Mark as Paid
                          </button>
                        </div>
                      ) : (
                        <a
                          href="#"
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                          onClick={() => {
                            navigate("/admin/invoice/update", {
                              state: { invoiceData: row },
                            });
                          }}
                        >
                          Edit
                        </a>
                      )}
                    </div>
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {spin && <Spinner />}

      {/* Pagination */}
      <div className="mb-4 mr-6 flex justify-end">
        <Pagination
          itemsPerPage={itemsPerPage}
          // totalItems={peopleData.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default InvoiceTable;
