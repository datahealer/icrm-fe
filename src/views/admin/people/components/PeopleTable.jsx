import { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import Pagination from "./Pagination";
import { useAuthContext } from "hooks/useAuthContext";
import DeletePeopleConfirm from "./DeletePeopleConfirm";
import Spinner from "./Spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UpdateDrawer from "./UpdateDrawer";
import AddDrawer from "./AddDrawer";
import axios from "axios";

axios.defaults.withCredentials = true;

const PeopleTable = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const { user } = useAuthContext();

  const [peopleData, setPeopleData] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [spin, setSpin] = useState(false);
  const [sortBy, setSortBy] = useState("-createdAt");
  const [showPassword, setShowPassword] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (event, id) => {
    event.preventDefault();
    setDeleteId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    if (!deleteId) return;
    handleDeleteRow(deleteId);
    setShowModal(false);
    setDeleteId(null);
  };
  const initialFormData = {
    nature: "",
    // contractorId: "",
    workEmail: "",
    personalEmail: "",
    billingEmail: "",
    mobile: "",
    displayName: "",
    officialName: "",
    department: "",
    employeeId: "",
    commissionOnInvoice: 0,
    hourlyRate: 0,
    tdsRate: 0,
    businessName: "",
    GSTIN: "",
    gstRate: 0,
    pan: "",
    bankAccountNumber: "",
    ifscCode: "",
    paymentChannel: "",
    paymentMode: "",
    panUrl: "",
    aadhaarFrontUrl: "",
    aadhaarBackUrl: "",
    passportUrl: "",
    agreementUrl: "",
    tncUrl: "",
    gstCertificateUrl: "",
    businessNameProofUrl: "",
    bankStatementFolderUrl: "",
    invoiceFolderUrl: "",
    form16FolderUrl: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   const parsedValue = !isNaN(value) ? parseFloat(value) : value;
  //   setFormData({ ...formData, [name]: parsedValue });
  //   // setFormData({ ...formData, [name]: value });
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const numericFields = [
      "hourlyRate",
      "tdsRate",
      "gstRate",
      "commissionOnInvoice",
    ];
    const shouldParse = numericFields.includes(name) && value !== "";
    const parsedValue = shouldParse ? parseFloat(value) || "" : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parsedValue,
    }));
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    const numericFields = [
      "hourlyRate",
      "tdsRate",
      "gstRate",
      "commissionOnInvoice",
    ];
    const shouldParse = numericFields.includes(name) && value !== "";
    const parsedValue = shouldParse ? parseFloat(value) || "" : value;

    setIdData((prevIdData) => ({
      ...prevIdData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (event) => {
    setSpin(true);
    event.preventDefault();
    console.log("cccc", formData);

    try {
      // Make a POST request using axios
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/people/create`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true, 
        }
      );

      console.log("Success:", response.data);
      setIsDrawerOpen(false);
      setSubmitted((prevSubmitted) => !prevSubmitted);
      setSpin(false);
      setFormData(initialFormData); // Resetting form data after submission
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fetchPeopleData = async () => {
    try {
      // Make a GET request using axios
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/people/getPeople`,
        {
          params: { sort: sortBy },
        }
      );

      // Access the people data from the response
      setPeopleData(response.data.data.people);
      setSpin(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setSpin(true);
    fetchPeopleData();
  }, [deleted, submitted, updated, sortBy]);

  const handleDeleteRow = (id) => {
    setSpin(true);
    fetch(`${process.env.REACT_APP_API_URL}/people/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete row");
        }
        setPeopleData((prevData) => prevData.filter((row) => row.id !== id));
        setDeleted((prevDeleted) => !prevDeleted);
        setSpin(false);
      })
      .catch((error) => console.error("Error deleting row:", error));
  };

  const drawerRef = useRef(null);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsDrawerOpen(false);
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

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  //update functions and states

  const [selectedId, setSelectedId] = useState(null);

  const [idData, setIdData] = useState({
    nature: "",
    workEmail: "",
    mobile: "",
    password: "",
    displayName: "",
    department: "",
    employeeId: "",
    hourlyRate: 0,
    tdsRate: 0,
    gstRate: 0,
    pan: "",
    bankAccountNumber: "",
    ifscCode: "",
    paymentChannel: "",
    paymentMode: "",
  });

  const handleUpdate = async (event, id) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/people/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setIdData({
        nature: data.nature || "",
        workEmail: data.workEmail || "",
        mobile: data.mobile || "",
        displayName: data.displayName || "",
        department: data.department || "",
        employeeId: data.employeeId || "",
        hourlyRate: data.hourlyRate || 0,
        tdsRate: data.tdsRate || 0,
        gstRate: data.gstRate || 0,
        pan: data.pan || "",
        bankAccountNumber: data.bankAccountNumber || "",
        ifscCode: data.ifscCode || "",
        paymentChannel: data.paymentChannel || "",
        paymentMode: data.paymentMode || "",
      });
      setSelectedId(id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdateDrawerToggle = () => {
    setIsUpdateDrawerOpen(!isUpdateDrawerOpen);
  };

  const sendUpdate = (event) => {
    setSpin(true);
    event.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/people/${selectedId}`, {
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

  const updateRef = useRef(null);

  const handleClickOutsideUpdate = (event) => {
    if (updateRef.current && !updateRef.current.contains(event.target)) {
      setIsUpdateDrawerOpen(false);
    }
  };

  useEffect(() => {
    if (isUpdateDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutsideUpdate);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideUpdate);
    };
  }, [isUpdateDrawerOpen]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = peopleData.slice(indexOfFirstItem, indexOfLastItem);
  const isCurrentPageEmpty = currentItems.length === 0 && currentPage > 1;

  const newPage = isCurrentPageEmpty ? currentPage - 1 : currentPage;

  const updatedIndexOfLastItem = newPage * itemsPerPage;
  const updatedIndexOfFirstItem = updatedIndexOfLastItem - itemsPerPage;
  const updatedCurrentItems = peopleData.slice(
    updatedIndexOfFirstItem,
    updatedIndexOfLastItem
  );

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
            <div className="relative">
              <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3 rtl:right-0"></div>
              <input
                type="text"
                id="table-search"
                className="w-76 block rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Search for people"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              id="dropdownRadioButton"
              onClick={handleDrawerToggle}
              className="inline-flex items-center rounded-lg border border-gray-300 bg-blue-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              type="button"
            >
              ADD NEW PERSON
            </button>
            {/*Add Drawer starts */}
            <AddDrawer
              isDrawerOpen={isDrawerOpen}
              handleDrawerToggle={handleDrawerToggle}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              drawerRef={drawerRef}
            />
            {/* Add Drawer ends */}
            {/* Update Drawer starts */}
            {isUpdateDrawerOpen && (
              <UpdateDrawer
                updateRef={updateRef}
                handleUpdateDrawerToggle={handleUpdateDrawerToggle}
                handleUpdateChange={handleUpdateChange}
                sendUpdate={sendUpdate}
                idData={idData}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            )}
            {/* Update Drawer ends */}
          </div>
          {/* Add New Person */}
        </div>
        {showModal && (
          <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
            <div className="absolute top-0 h-full w-full bg-gray-900 opacity-50"></div>
            <div className="z-50 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <DeletePeopleConfirm
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
              />
            </div>
          </div>
        )}
        <table className="z-[-1]x w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="items-center p-4">
                S.No.
              </th>
              <th scope="col" className="px-6 py-3">
                Full name
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {updatedCurrentItems
              ?.filter((person) => {
                if (!searchQuery.trim()) return true;

                const query = searchQuery.toLowerCase();

                return (
                  person.displayName?.toLowerCase().includes(query) ||
                  person.department?.toLowerCase().includes(query) ||
                  person.mobile?.toLowerCase().includes(query) ||
                  person.workEmail?.toLowerCase().includes(query)
                );
              })
              ?.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    {/* <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                    /> */}
                    {(newPage - 1) * itemsPerPage + index + 1}.
                  </td>
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {/* {row.firstname+" "+row.lastname} */}
                    {row.displayName}
                  </th>
                  <td className="px-6 py-4">{row.department}</td>
                  <td className="px-6 py-4">{row.mobile}</td>
                  <td className="px-6 py-4">{row.workEmail}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-row items-center gap-3">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        onClick={(event) => {
                          handleUpdate(event, row._id);
                          handleUpdateDrawerToggle();
                        }}
                      >
                        Edit
                      </a>
                      <MdDelete
                        className="cursor-pointer text-lg text-red-500 hover:text-red-300"
                        onClick={(event) => handleDeleteClick(event, row._id)}
                      />
                    </div>
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
          totalItems={peopleData.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PeopleTable;
