import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Button, TextField, Typography } from "@mui/material";
import { OnNodeUpdateType } from "../ReactFlowCreator/ReactFlowCreator";

export const TextNodeEditForm = ({
  nodeId,
  onNodeUpdate,
  onNodeEditClose,
}: {
  nodeId: string;
  onNodeUpdate: OnNodeUpdateType;
  onNodeEditClose: () => void;
}) => {
  return (
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
          onNodeUpdate(nodeId, "label", event.target.value);
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
  );
};
