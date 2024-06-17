import MessageIcon from "@mui/icons-material/Message";
import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import { DragEvent } from "react";
import {
  NodeEditDataType,
  OnNodeUpdateType,
} from "../ReactFlowCreator/ReactFlowCreator";
import CancelIcon from "@mui/icons-material/Cancel";

type NodesPanelPropType = {
  nodeEditData: NodeEditDataType;
  onNodeUpdate: OnNodeUpdateType;
  onNodeEditClose: () => void;
};

export const NodesPanel = ({
  nodeEditData,
  onNodeUpdate,
  onNodeEditClose,
}: NodesPanelPropType) => {
  const { id } = nodeEditData;

  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f3f3f3",
      }}
    >
      <Box sx={{ mb: 2 }} textAlign={"center"}>
        <Typography variant="h6" fontWeight={"bold"}>
          Nodes Panel
        </Typography>
      </Box>
      <Box px={"10px"}>
        {id ? (
          <Box width={"100%"} height={"100%"}>
            <Box>
              <Typography variant="body2" textAlign={"center"}>
                Edit Node
              </Typography>
            </Box>
            <TextField
              fullWidth
              id="outlined-basic"
              variant="standard"
              label="Label"
              onChange={(event) => {
                onNodeUpdate(id, "label", event.target.value);
              }}
            />
            <Button
              onClick={onNodeEditClose}
              startIcon={<CancelIcon />}
              variant="outlined"
              sx={{ mt: 2 }}
              color="error"
              fullWidth
            >
              Close
            </Button>
          </Box>
        ) : (
          <Tooltip title="Please Drag & Drop to the Canvas to use it">
            <Button
              startIcon={<MessageIcon />}
              sx={{
                width: "100%",
              }}
              variant="contained"
              size="large"
              className="dndnode input"
              onDragStart={(event) => onDragStart(event, "textNode")}
              draggable
            >
              Text Node
            </Button>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};
