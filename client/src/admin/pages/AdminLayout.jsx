// AppShell is a layout component that can be used to create a common Header - Navbar - Footer - Aside - Content layout 
import { useState } from "react";
import {AppShell,Navbar,Button,Divider,Title,Stack,ScrollArea,Accordion } from "@mantine/core";
import {IconPlus,IconEdit,IconEye,IconChevronDown,IconPackage } from "@tabler/icons-react";
import CreateProductForm from "../components/CreateProductForm";
import CreateCategoryForm from "../components/CreateCategoryForm";
import ViewProducts from "./ViewProducts";
import ViewCategories from "./ViewCategories";
import Header from "../../customer/components/Header";

export function AdminHome() {
  // default 
  const [activePage, setActivePage] = useState("create-product");

  return (
    <>
     
    <AppShell
      padding="md"
      header={<Header/>}
      navbar={
        <Navbar width={{ base: 260 }} p="md">
          <Stack spacing="sm" >
            <Title order={2} c="blue">
              CafeGo Admin
            </Title>
            {/* devide  */}
            <Divider my="sm" />

            {/* Divide content into collapsible sections  */}
            <Accordion
              defaultValue="manage-product"
              chevron={<IconChevronDown size={14} />}
              styles={{
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
                      variant={activePage === "create-product" ? "filled" : "light"}
                      leftIcon={<IconPlus size={16} />}
                      onClick={() => setActivePage("create-product")}
                    >
                      Create Product
                    </Button>
                    <Button
                      variant={activePage === "view-product" ? "filled" : "light"}
                      leftIcon={<IconEye size={16} />}
                      onClick={() => setActivePage("view-product")}
                    >
                      View Products
                    </Button>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
            <Accordion
              defaultValue="manage-category"
              chevron={<IconChevronDown size={14} />}
              styles={{
                control: { padding: "8px 0" },
              }}
            >
              <Accordion.Item value="manage-category">

                <Accordion.Control icon={<IconPackage size={16} color="#74c0fc" />}>
                  Manage Category
                </Accordion.Control>

                <Accordion.Panel>
                  <Stack gap={4}>
                    <Button
                      variant={activePage === "create-category" ? "filled" : "light"}
                      leftIcon={<IconPlus size={16} />}
                      onClick={() => setActivePage("create-category")}
                    >
                      Create Category
                    </Button>
                    <Button
                      variant={activePage === "edit-category" ? "filled" : "light"}
                      leftIcon={<IconEdit size={16} />}
                      onClick={() => setActivePage("edit-category")}
                    >
                      Edit Category
                    </Button>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

            </Accordion>
          </Stack>
        </Navbar>
      }
     

      // main content
      styles={{
        main: {
          backgroundColor: "#f4f6f9", 
          color: "#000000", 
        },
      }}
    >
      <ScrollArea type="always" offsetScrollbars>

        {/* product ------- */}
        {activePage === "create-product" && <CreateProductForm/>}
        {activePage === "view-product" && <ViewProducts/>}

        {/* category ------ */}
        {activePage === "create-category" && <CreateCategoryForm />}
        {activePage === "edit-category" && <ViewCategories/>}

      </ScrollArea>
    </AppShell>

      </>
  );

}

export default AdminHome;
