import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: { name: string; description: string }) => Promise<void> | void;
};

export default function CreateRoomDialog({ open, onClose, onCreate }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    await onCreate({ name, description });
    setName("");
    setDescription("");
  };

  const isDisabled = !name.trim();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight="600">
          Create New Room
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: 1,
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            minRows={3}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="text" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isDisabled}
          sx={{ textTransform: "none", fontWeight: 500 }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

