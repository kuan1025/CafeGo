import { Box, Button, Group, Text } from "@mantine/core";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, setModalOpen, logout } = useAuth();

  return (
    <Box
      px="md"
      py="sm"
      bg="#1a1a1a"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
   
      <Text
        component="a" 
        href="/"
        fw={900}
        size="32px"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: "#fff",
          letterSpacing: "2px",
          textShadow: "2px 2px 6px rgba(0,0,0,0.4)",
        }}
      >
        CafeGo
      </Text>


      {user ? (
        <Group gap="sm">
          <Text
            size="lg" 
            style={{
              color: "#fff",
              fontWeight: 600,
              textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
            }}
          >
            Hi, {user.name}
          </Text>
          <Button variant="light" size="sm" onClick={logout}>
            Logout
          </Button>
        </Group>
      ) : (
        <Button variant="light" size="sm" onClick={() => setModalOpen(true)}>
          Sign In / Sign Up
        </Button>
      )}
    </Box>
  );
}
