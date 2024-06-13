import { Box } from "@mui/material";
import { DragEvent } from "react";

export const NodesPanel = () => {
  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "black",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "200px",
          height: "50px",
          backgroundColor: "red",
        }}
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </Box>
    </Box>
  );
};
