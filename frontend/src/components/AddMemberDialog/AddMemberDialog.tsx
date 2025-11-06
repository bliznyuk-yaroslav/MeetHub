"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (payload: { email: string; role: "Admin" | "User" }) => Promise<void> | void;
};

export default function AddMemberDialog({ open, onClose, onAdd }: Props) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"Admin" | "User">("User");

  const handleSubmit = async () => {
    await onAdd({ email, role });
    setEmail("");
    setRole("User");
  };

  const isDisabled = !email.trim();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: 3, p: 1 },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight="600">
          Add Member
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
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />

          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value as "Admin" | "User")}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </FormControl>
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
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
