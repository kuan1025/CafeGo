import {
  Box, Button, Center, Group, Stack, Text, Title,
} from "@mantine/core";
import AuthModal from "../components/AuthModal";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function CustomerHomePage() {
  const navigate = useNavigate();
  const { modalOpen, setModalOpen, loginSuccess } = useAuth();

  return (
    <>
    <Header/>
    <Box
      style={{
        backgroundImage: `url(${ import.meta.env.VITE_BASENAME}images/login/login.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        padding: "2rem",
      }}
    >
      <Center style={{ height: "80vh" }}>
        <Stack spacing="xl" align="center">
          <Title order={1} style={{ fontFamily: "'Playfair Display', serif" }}>
            Start Your Order
          </Title>
          <Group>
            <Button
              size="lg"
              variant="filled"
              radius="xl"
              styles={{
                root: {
                  backgroundColor: "white",
                  color: "#4B3621",
                  border: "2px solid #4B3621",
                  '&:hover': {
                    backgroundColor: "#f2f2f2",
                  }
                }
              }}
              onClick={() => navigate('/menu')}
            >
              Pick Up
            </Button>
            <Button
              size="lg"
              radius="xl"
              variant="filled"
              styles={{
                root: {
                  backgroundColor: "black",
                  color: "white",
                  border: "2px solid #white",
                  '&:hover': {
                    color: "black",
                    backgroundColor: "#f2f2f2",
                  }
                }
              }}
            >
              Delivery
            </Button>
          </Group>
        </Stack>
      </Center>

      {/* Auth Modal */}
      <AuthModal opened={modalOpen} onClose={() => setModalOpen(false)} onLoginSuccess={loginSuccess} />
    </Box>
    </>
  );
}
