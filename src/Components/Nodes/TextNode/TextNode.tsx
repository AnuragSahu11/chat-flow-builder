import { Box, Typography } from "@mui/material";
import { Handle, Position } from "reactflow";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

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
          minWidth: "100px",
          borderRadius: "3px",
          overflow: "hidden",
          border: "solid 1px #e6e6e9",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            py: "2px",
            px: "5px",
            display: "flex",
            backgroundColor: "#4ebb7d",
            height: "min-height",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.5rem",
              color: "white",
            }}
          >
            Send Message
          </Typography>{" "}
          <WhatsAppIcon sx={{ fontSize: "12px", color: "white" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            backgroundColor: "white",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.6rem",
            }}
            variant="caption"
          >
            {data.label}
          </Typography>
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
