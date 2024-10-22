import { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useAuthContext } from "hooks/useAuthContext";
import Spinner from "./Spinner";
import DeleteProjectConfirm from "./DeleteProjectConfirm";
import Pagination from "./Pagination";
import ObjectId from "bson-objectid";
import AddDrawer from "./AddDrawer";
import UpdateDrawer from "./UpdateDrawer";
import AddResourceDrawer from "./resource/AddResourceDrawer";
import { ResourceDrawer } from "./resource/AddResource";
import axios from "axios";

import { ListResource } from "./resource/ListResource";

axios.defaults.withCredentials = true;

const ProjectTable = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const [projectData, setProjectData] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [spin, setSpin] = useState(false);
  const [sortBy, setSortBy] = useState("-createdAt");

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [clients, setClients] = useState([]);
  const [people, setPeople] = useState([]);
  const [acquisitionPeople, setAcquisitionPeople] = useState([]);
  const [managers, setManagers] = useState([]);

  const closeModal = () => {
    setIsOpen(false);
  };

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

  const [formData, setFormData] = useState({
    name: "",
    clientId: "",
    managerId: "",
    acquisitionPersonId: "",
    status: "In Progress",
    startDate: "",
    endDate: "",
  });

  const handleResourceChange = (index, field, value) => {
    const updatedResources = formData.resources.map((resource, i) => {
      if (i === index) {
        return { ...resource, [field]: value };
      }
      return resource;
    });
    setFormData({ ...formData, resources: updatedResources });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;

    setIdData((prevIdData) => ({
      ...prevIdData,
      [name]: value,
    }));
  };

  const writeDate = (dateString) => {
    if (!dateString) return null; // Return null if dateString is empty or null
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleSubmit = async (event) => {
    setSpin(true);
    event.preventDefault();
    if (
      !formData.name ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.clientId ||
      !formData.managerId ||
      !formData.acquisitionPersonId
    ) {
      alert("Please fill in all required fields.");
      setSpin(false);
      return;
    }
    const formattedFormData = {
      ...formData,
      startDate: writeDate(formData.startDate),
      endDate: writeDate(formData.endDate),
    };

    console.log(formattedFormData);

    try {
      // Send a POST request with axios
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/project`,
        formattedFormData
      );

      // Handle the response
      console.log("Success:", response.data);
      setIsDrawerOpen(false); // Close the drawer
      setSubmitted((prevSubmitted) => !prevSubmitted); // Toggle the submitted state
      setSpin(false); // Stop the spinner

      // Reset form data after submission
      setFormData({
        name: "",
        clientId: "",
        managerId: "",
        acquisitionPersonId: "",
        status: "In Progress",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

  const fetchProjectData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/project/?sort=${sortBy}`
      );

      setProjectData(response.data.data.projects);
      setSpin(false); // Stop spinner
    } catch (error) {
      // Handle any errors
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setSpin(true);
    fetchProjectData();
  }, [deleted, submitted, updated, sortBy]);

  const handleDeleteRow = (id) => {
    setSpin(true);
    fetch(`${process.env.REACT_APP_API_URL}/project/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete row");
        }
        setProjectData((prevData) => prevData.filter((row) => row.id !== id));
        setDeleted((prevDeleted) => !prevDeleted);
        setSpin(false);
      })
      .catch((error) => console.error("Error deleting row:", error));
  };

  const drawerRef = useRef(null);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setIsOpen(true);
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
    name: "",
    clientId: "",
    managerId: "",
    acquisitionPersonId: "",
    status: "In Progress",
    startDate: "",
    endDate: "",
  });

  const handleUpdateResourceChange = (index, field, value) => {
    const updatedResources = idData.resources.map((resource, i) => {
      if (i === index) {
        return { ...resource, [field]: value };
      }
      return resource;
    });
    setIdData({ ...idData, resources: updatedResources });
  };

  const handleUpdate = async (event, id) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/project/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setIdData({
        name: data.name || "",
        clientId: data.clientId || "",
        managerId: data.managerId || "",
        acquisitionPersonId: data.acquisitionPersonId || "",
        status: data.status || "In Progress",
        startDate: data.startDate || "",
        endDate: data.endDate || "",
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
    console.log(idData);

    fetch(`${process.env.REACT_APP_API_URL}/project/${selectedId}`, {
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
  const currentItems = projectData.slice(indexOfFirstItem, indexOfLastItem);
  const isCurrentPageEmpty = currentItems.length === 0 && currentPage > 1;

  const newPage = isCurrentPageEmpty ? currentPage - 1 : currentPage;

  const updatedIndexOfLastItem = newPage * itemsPerPage;
  const updatedIndexOfFirstItem = updatedIndexOfLastItem - itemsPerPage;
  const updatedCurrentItems = projectData.slice(
    updatedIndexOfFirstItem,
    updatedIndexOfLastItem
  );

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/client/`)
      .then((response) => response.json())
      .then((data) => {
        setClients(data.data.clients);
      })
      .catch((error) => {
        console.error("Failed to fetch clients", error);
      });
  }, []);

  useEffect(() => {
    // Make a request with axios withCredentials: true
    axios
      .get(`${process.env.REACT_APP_API_URL}/people/getPeople`, {
        withCredentials: true, // Include credentials like cookies
      })
      .then((response) => {
        const peopleData = response.data.data.people;

        // Update state with the received data
        setPeople(peopleData);
        setAcquisitionPeople(peopleData);

        setManagers(
          peopleData.filter((person) => person.peopleType === "PROJECT_MANAGER")
        );
      })
      .catch((error) => {
        console.error("Failed to fetch people", error);
      });
  }, []); // Empty dependency array to run this effect only once

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
                placeholder="Search for projects"
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
              ADD NEW PROJECT
            </button>
            {/* Drawer starts */}
            <AddDrawer
              isDrawerOpen={isDrawerOpen}
              handleDrawerToggle={handleDrawerToggle}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              drawerRef={drawerRef}
              clients={clients}
              managers={managers}
              acquisitionPeople={acquisitionPeople}
              handleResourceChange={handleResourceChange}
            />
            {/* Drawer ends */}
            {/* Update Drawer starts */}
            <UpdateDrawer
              isUpdateDrawerOpen={isUpdateDrawerOpen}
              updateRef={updateRef}
              idData={idData}
              handleUpdateDrawerToggle={handleUpdateDrawerToggle}
              handleUpdateChange={handleUpdateChange}
              handleResourceChange={handleResourceChange}
              handleUpdateResourceChange={handleUpdateResourceChange}
              sendUpdate={sendUpdate}
              clients={clients}
              managers={managers}
              acquisitionPeople={acquisitionPeople}
            />
            {/* Update Drawer ends */}
          </div>
          {/* Add New Person */}
        </div>
        {showModal && (
          <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
            <div className="absolute top-0 h-full w-full bg-gray-900 opacity-50"></div>
            <div className="z-50 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <DeleteProjectConfirm
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
                Project name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3">
                End Date
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
                    {(newPage - 1) * itemsPerPage + index + 1}.
                  </td>
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {row.name}
                  </th>
                  <td className="px-6 py-4">{row.status}</td>
                  <td className="px-6 py-4">{writeDate(row.startDate)}</td>
                  <td className="px-6 py-4">{writeDate(row.endDate)}</td>
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
                      <ResourceDrawer projectId={row._id} />
                      <ListResource projectId={row._id} />
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
          totalItems={projectData.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProjectTable;
