import AddResourceDrawer from "./AddResourceDrawer";
import { useEffect, useRef, useState } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';


import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";

export const ResourceDrawer = ({ projectId }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useAuthContext();
  const [totalAllocation, setTotalAllocation] = useState(0);
  const [warning, setWarning] = useState([]);

  const [formData, setFormData] = useState({
    personId: "",
    defaultAllocation: "",
    startDate: "",
    endDate: "",
    acquisitionPersonId: "",
    billability: "Billable",
    // shadowOf: "",
    billingRate: null,
    billableHours: [],
    overtimeAllocations: [],
  });

  const writeDate = (dateString) => {
    if (!dateString) return null; // Return null if dateString is empty or null
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = async (event) => {
    const { name, value } = event.target;

    if (name === "personId") {
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/project/${value}/get-project-allocation`;
        const authToken = user.token;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
        setTotalAllocation(response.data.totalAllocation);
      } catch (error) {
        console.error("Error fetching allocation:", error);
      }
    }
    if (name === "defaultAllocation") {
      const newAllocation = parseFloat(value) + totalAllocation;
      if (newAllocation > 40) {
        setWarning((prevError) => ({
          ...prevError,
          [name]: `Warning: Allocation Time exceeds by ${newAllocation - 40}`,
        }));
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !formData.personId ||
      !formData.defaultAllocation ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.acquisitionPersonId
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    const formattedFormData = {
      ...formData,
      startDate: writeDate(formData.startDate),
      endDate: writeDate(formData.endDate),
    };

    console.log(formattedFormData);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/project/${projectId}/create-project`,
        formattedFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .then((data) => {
        console.log("Success:", data);
        setIsDrawerOpen(false);

        setFormData({
          personId: "",
          defaultAllocation: "",
          startDate: "",
          endDate: "",
          acquisitionPersonId: "",
          billability: "Billable",
          billingRate: null,
          billableHours: [],
          overtimeAllocations: [],
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const drawerRef = useRef(null);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div>
        <a
          id="add-resource"
          href="#"
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          onClick={handleDrawerToggle}
        >
            <PersonAddIcon className="mr-2" />
        </a>
      </div>
      <AddResourceDrawer
        isDrawerOpen={isDrawerOpen}
        handleDrawerToggle={handleDrawerToggle}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        drawerRef={drawerRef}
        warning={warning}
      />
    </>
  );
};
