import EditResourceDrawer from "./EditResourceDrawer";
import { useEffect, useRef, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { FaEye, FaEyeSlash, FaPen } from "react-icons/fa";
import moment from "moment";

import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";

axios.defaults.withCredentials = true;

export const EditResource = ({ resource, projectId, setResourceList }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useAuthContext();
  const [totalAllocation, setTotalAllocation] = useState(0);
  const [warning, setWarning] = useState([]);

  // const handleUpdate = (event) => {
  //   event.preventDefault();
  //   if (
  //     !formData.personId ||
  //     !formData.defaultAllocation ||
  //     !formData.startDate ||
  //     !formData.endDate ||
  //     !formData.acquisitionPersonId
  //   ) {
  //     alert("Please fill in all required fields.");
  //     return;
  //   }
  //   const formattedFormData = {
  //     ...formData,
  //     startDate: writeDate(formData.startDate),
  //     endDate: writeDate(formData.endDate),
  //   };

  //   axios
  //     .post(
  //       `${process.env.REACT_APP_API_URL}/project/${projectId}/${resource._id}/update-project-resource`,
  //       formattedFormData
  //     )
  //     .then((response) => {
  //       getResources();
  //       setIsDrawerOpen(false);

  //       console.log("Success:", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

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
          <FaPen className="mr-2" />
        </a>
      </div>
      <EditResourceDrawer
        isDrawerOpen={isDrawerOpen}
        handleDrawerToggle={handleDrawerToggle}
        resource={resource}
        projectId={projectId}
        setIsDrawerOpen={setIsDrawerOpen}
        setResourceList={setResourceList}
        drawerRef={drawerRef}
        warning={warning}
      />
    </>
  );
};
