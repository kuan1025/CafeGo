import React from "react";
import { Paper, Title, Text } from "@mantine/core";

function AdminContent() {
  return (
    <Paper padding="lg" style={{ height: "100vh" }}>
      <Title order={2}>Admin Dashboard</Title>
      <Text>This is where your main content goes. Add widgets, charts, and more!</Text>
    </Paper>
  );
}

export default AdminContent;
