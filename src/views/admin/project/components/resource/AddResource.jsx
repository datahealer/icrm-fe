import AddResourceDrawer from "./AddResourceDrawer";
import { useEffect, useRef, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";

axios.defaults.withCredentials = true;

export const ResourceDrawer = ({
  projectId,
  resourceList,
  setResourceList,
}) => {
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
    shadowOf: "",
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
        setIsDrawerOpen={setIsDrawerOpen}
        resourceList={resourceList}
        setResourceList={setResourceList}
        drawerRef={drawerRef}
        projectId={projectId}
        warning={warning}
      />
    </>
  );
};
