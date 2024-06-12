import { Box } from "@mui/material";
import ReactFlowViewer from "../ReactFlowViewer/ReactFlowViewer";
import { NodesPanel } from "../NodesPanel/NodesPanel";
import { HeaderPanel } from "../HeaderPanel/HeaderPanel";
export const ReactFlowCreator = () => {
  return (
    <Box>
      <HeaderPanel height="10vh" />
      <ReactFlowViewer width="80vw" height="90vh" />
      <NodesPanel />
    </Box>
  );
};
