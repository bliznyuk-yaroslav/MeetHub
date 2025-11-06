import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";

type Props = {
  open: boolean;
  roomName: string;
  roomDesc: string;
  onClose: () => void;
  onChangeName: (v: string) => void;
  onChangeDesc: (v: string) => void;
  onSave: () => void;
};

export default function EditRoomModal({
  open,
  roomName,
  roomDesc,
  onClose,
  onChangeName,
  onChangeDesc,
  onSave,
}: Props) {
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
          Edit Room
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
            label="Room Name"
            variant="outlined"
            value={roomName}
            onChange={(e) => onChangeName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Description"
            variant="outlined"
            value={roomDesc}
            onChange={(e) => onChangeDesc(e.target.value)}
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
          onClick={onSave}
          sx={{ textTransform: "none", fontWeight: 500 }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}