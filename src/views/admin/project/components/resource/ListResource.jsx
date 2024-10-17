import { useEffect, useRef, useState } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShowResourceDrawer from "./ListResourceDrawer";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import { Visibility } from "@mui/icons-material";

export const ListResource = ({ projectId }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useAuthContext();

  const drawerRef = useRef(null);
 


 


  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div>
        <a
          id="list-resource"
          href="#"
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          onClick={handleDrawerToggle}
        >
            <Visibility className="mr-2" />
        </a>
      </div>
      <ShowResourceDrawer
        isDrawerOpen={isDrawerOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerRef={drawerRef}
        projectId={projectId}
      />
    </>
  );
};
