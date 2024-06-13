import { Box, Typography } from "@mui/material";
import { Handle, Position } from "reactflow";

type TextNodeDataType = {
  label: string;
  color: string;
};

type TextNodePropType = {
  data: TextNodeDataType;
  isConnectable: boolean;
};

export const TextNode = ({ data, isConnectable }: TextNodePropType) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <Box
        sx={{
          borderRadius: "1px",
          border: "solid 1px black",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: "5vh",
            backgroundColor: "green",
          }}
        ></Box>
        <Box
          sx={{
            backgroundColor: "white",
          }}
        >
          <Typography>{data.label}</Typography>
        </Box>
      </Box>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
};
