import { useState } from "react";
import {
  AppShell,
  Navbar,
  Text,
  Button,
  Divider,
  Title,
  Stack,
  MantineProvider,
  ScrollArea,
  Accordion,
  UnstyledButton,
  Group,
} from "@mantine/core";
import {
  IconPlus,
  IconEdit,
  IconEye,
  IconChevronDown,
  IconPackage,
} from "@tabler/icons-react";
import CreateProductForm from "./product/createProduct";

export function AdminHome() {
  const [activePage, setActivePage] = useState("create");

  return (
    <MantineProvider
      theme={{
        colorScheme: "light", // Light theme instead of dark
        primaryColor: "blue",
        fontFamily: "Inter, sans-serif",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 260 }} p="md" withBorder={false}>
            <Stack spacing="sm" align="stretch">
              <Title order={3} c="black">
                CafeGo Admin
              </Title>
              <Divider my="sm" />

              <Accordion
                defaultValue="manage-product"
                chevron={<IconChevronDown size={14} />}
                styles={{
                  item: { backgroundColor: "transparent", border: "none" },
                  control: { padding: "8px 0" },
                }}
              >
                <Accordion.Item value="manage-product">
                  <Accordion.Control icon={<IconPackage size={16} color="#74c0fc" />}>
                    Manage Product
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Stack gap={4}>
                      <Button
                        variant={activePage === "create" ? "filled" : "light"}
                        leftIcon={<IconPlus size={16} />}
                        color="blue"
                        fullWidth
                        onClick={() => setActivePage("create")}
                      >
                        Create Product
                      </Button>
                      <Button
                        variant={activePage === "edit" ? "filled" : "light"}
                        leftIcon={<IconEdit size={16} />}
                        color="blue"
                        fullWidth
                        onClick={() => setActivePage("edit")}
                      >
                        Edit Product
                      </Button>
                      <Button
                        variant={activePage === "view" ? "filled" : "light"}
                        leftIcon={<IconEye size={16} />}
                        color="blue"
                        fullWidth
                        onClick={() => setActivePage("view")}
                      >
                        View Products
                      </Button>
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Stack>
          </Navbar>
        }
        styles={{
          main: {
            backgroundColor: "#f4f6f9", // Lighter background for the main content
            color: "#000000", // Black text color for readability
          },
        }}
      >
        <ScrollArea type="always" offsetScrollbars>
          {activePage === "create" && <CreateProductForm />}
          {activePage === "edit" && <div>Edit Product Page (Coming Soon)</div>}
          {activePage === "view" && <div>View Products Page (Coming Soon)</div>}
        </ScrollArea>
      </AppShell>
    </MantineProvider>
  );
}

export default AdminHome;
