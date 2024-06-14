import { Box, TextField } from "@mui/material";
import { DragEvent, useState } from "react";
import {
  NodeEditDataType,
  OnNodeUpdateType,
} from "../ReactFlowCreator/ReactFlowCreator";

type NodesPanelPropType = {
  nodeEditData: NodeEditDataType;
  onNodeUpdate: OnNodeUpdateType;
};

export const NodesPanel = ({
  nodeEditData,
  onNodeUpdate,
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
      }}
    >
      {id ? (
        <Box width={"100%"} height={"100%"}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            onChange={(event) => {
              onNodeUpdate(id, "label", event.target.value);
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: "200px",
            height: "50px",
            backgroundColor: "red",
          }}
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, "textNode")}
          draggable
        >
          Input Node
        </Box>
      )}
    </Box>
  );
};
