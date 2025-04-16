import { Box, Button, Group, Menu, Text, Avatar } from "@mantine/core";
import { IconLogout,IconToolsKitchen2, IconUser, IconDashboard } from "@tabler/icons-react";
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
        size="24px"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: "#fff",
          letterSpacing: "2px",
        }}
      >
        CafeGo
      </Text>

      {user ? (
        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <Group spacing="xs" style={{ cursor: "pointer" }}>
              <Avatar color="cyan" radius="xl">
                {user.name?.[0]?.toUpperCase()}
              </Avatar>
              <Text
                size="lg"
                style={{
                  color: "#fff",
                  fontWeight: 600,
                  textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
                }}
              >
                {user.name}
              </Text>
            </Group>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<IconUser size={16} />}>Settings</Menu.Item>
            {user.roles?.includes('admin') && (
              <Menu.Item
                icon={<IconDashboard size={16} />}
                component="a"
                href="/admin/home"
              >
                Admin Page
              </Menu.Item>
            )}
            {user.roles?.includes("customer") && (
              <Menu.Item
                icon={<IconToolsKitchen2 size={16} />}
                component="a"
                href="/menu"
              >
                Customer Page
              </Menu.Item>
            )}
            
            <Menu.Item
              icon={<IconLogout size={16} />}
              onClick={logout}
              color="red"
              
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Button variant="light" size="sm" onClick={() => setModalOpen(true)}>
          Sign In / Sign Up
        </Button>
      )}
    </Box>
  );
}
