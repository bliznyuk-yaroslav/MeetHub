import { Box, Button, Container, Typography, List, ListItem } from "@mui/material";

export default function HomePage() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        MeetHub
      </Typography>

      <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 720 }}>
        Simple meeting rooms booking app. Create rooms, invite colleagues with roles, 
        and manage bookings with conflict checks.
      </Typography>

      <List sx={{ mt: 2, opacity: 0.9, listStyleType: "disc", pl: 4 }}>
        <ListItem sx={{ display: "list-item" }}>
          Create, edit, and delete rooms
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          Add members by email with Admin/User roles
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          Create, edit, and cancel bookings with time conflict validation
        </ListItem>
      </List>

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button variant="contained" color="primary" href="/login">
          Get started
        </Button>
        <Button variant="outlined" href="/rooms">
          View my rooms
        </Button>
      </Box>
    </Container>
  );
}
