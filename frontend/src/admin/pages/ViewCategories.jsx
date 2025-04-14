import { useEffect, useState } from "react";
import {
    Table, Button, Title, Group, Paper, Loader, ActionIcon, Text, Modal
} from "@mantine/core";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { getAllCategories, deleteCategory } from "../api/category";
import { notifications } from "@mantine/notifications";
import EditCategoryModal from "../components/EditCategoryForm";

export default function ViewCategories() {
    const [categories, setCategories] = useState([]);
    
    // confirm delete
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    // selected ID  
    const [selectedCategory, setSelectedCategory] = useState(null);
    // edit
    const [editOpened, setEditOpened] = useState(false); 


    const confirmDelete = (category) => {
        setSelectedCategory(category);
        setDeleteModalOpened(true);
    };



    const fetchCategories = async () => {
        try {
            const res = await getAllCategories();
            setCategories(res.data);
        } catch (err) {
            console.error("Error fetching categories", err);
        } 
    };

    const handleDelete = async () => {
        try {
            const res = await deleteCategory(selectedCategory._id);

            if (res.status === 200) {
                // remove 
                setCategories((prev) =>
                    prev.filter((category) => category._id !== selectedCategory._id)
                );
                notifications.show({
                    title: "Deleted!",
                    message: "Category has been deleted successfully",
                    color: "green",
                });
            } else {
                notifications.show({
                    title: "Failed!",
                    message: res.data.message,
                    color: "red",
                });
            }
        } catch (err) {
            console.error("Error deleting category", err);
            notifications.show({
                title: "Error",
                message: err,
                color: "red",
            });
        } finally {

            setDeleteModalOpened(false);
            setSelectedCategory(null);

        }
    };

    const handEditCategoryForm = (category) =>{
        setSelectedCategory(category);
        setEditOpened(true);
    }

    const handleUpdateSuccess = (data) => {

        setCategories((prev) =>
          prev.map((item) => (item._id === data._id ? data : item))
        );
        notifications.show({
            title: "Update!",
            message: 'successfully',
            color: "green",
        });

      };

    // init
    useEffect(() => { fetchCategories(); }, []);



    return (
        <>
        <Paper p="md" withBorder>
            <Title order={3} mb="md">All Categories</Title>

            {Array.isArray(categories) && categories.length === 0 ? (

                <Text>No categories found</Text>

            ) : (

                <Table striped highlightOnHover withBorder withColumnBorders  >

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((category) => (
                            <tr key={category._id}>

                                <td style={{ textAlign: "left" }}>
                                    {category.name}
                                </td>

                                <td style={{ textAlign: "left" }}>
                                    {category.description || "-"}
                                </td>

                                <td>
                                    <Group spacing="md">
                                        <ActionIcon color="blue" variant="light">
                                            <IconEdit size={20} 
                                            onClick={()=> handEditCategoryForm(category) }
                                            />
                                            
                                        </ActionIcon>

                                        <ActionIcon
                                            color="red"
                                            variant="light"
                                            onClick={() => confirmDelete(category)}
                                        >
                                            <IconTrash size={20} />
                                        </ActionIcon>
                                    </Group>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* confirm */}


            <Modal
                opened={deleteModalOpened}
                onClose={() => setDeleteModalOpened(false)}
                title="Confirm Category Deletion"
                centered
            >
                <Text mb="md">Are you sure you want to delete this category?</Text>
                <Group position="right">
                    <Button variant="default" onClick={() => setDeleteModalOpened(false)}>
                        Cancel
                    </Button>
                    <Button color="red" onClick={handleDelete}>
                        Delete
                    </Button>
                </Group>
            </Modal>
        </Paper>

        {  selectedCategory && (
        
        <EditCategoryModal
            opened={editOpened}
            onClose={() => setEditOpened(false)}
            category={selectedCategory}
            onSuccess={handleUpdateSuccess}
        />
        )}

        
        </>
    );
}
