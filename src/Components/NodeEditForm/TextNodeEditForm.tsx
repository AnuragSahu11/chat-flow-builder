import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Button, TextField, Typography } from "@mui/material";
import { OnNodeUpdateType } from "../ReactFlowCreator/ReactFlowCreator";
import { useEffect, useState } from "react";

export const TextNodeEditForm = ({
  nodeId,
  onNodeUpdate,
  onNodeEditClose,
}: {
  nodeId: string;
  onNodeUpdate: OnNodeUpdateType;
  onNodeEditClose: () => void;
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onNodeUpdate(nodeId, "label", event.target.value);
  };

  useEffect(() => {
    setInputValue("");
  }, [nodeId]);

  return (
    <Box width={"100%"} height={"100%"}>
      <Box>
        <Typography variant="body2" textAlign={"center"}>
          Edit Node
        </Typography>
      </Box>
      <TextField
        value={inputValue}
        fullWidth
        id="outlined-basic"
        variant="standard"
        label="Label"
        onChange={onInputChange}
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
  );
};
