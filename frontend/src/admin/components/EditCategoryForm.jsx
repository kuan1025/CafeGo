import { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Title,
} from "@mantine/core";
import { updateCategory } from "../api/category";
import { notifications } from '@mantine/notifications';

export default function EditCategoryModal({ opened, onClose, category, onSuccess }) {
  
const [form, setForm] = useState({
    name: category.name,
    description: category.description 
  });

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setForm({
      name: category.name,
      description: category.description
    });
  }, [category]);

  // bind category -> form
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

 

  const handleSubmit = async () => {
    try {
      if (!form.name.trim()) {
        notifications.show({
          title: "Validation Error",
          message: "Category name is required",
          color: "red",
        });
        return;
      }
      setLoading(true);
      const res = await updateCategory(category._id, form);
      // console.log("res -> "+ res);
      onSuccess(res);
      onClose();
    } catch (err) {
      console.error("Error updating category", err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title={'Edit Category'} centered>
      <TextInput
        label="Name"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        required
      />
      <TextInput
        label="Description"
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
        mt="sm"
      />
      <Group mt="md" position="right">
        <Button variant="default" onClick={onClose}>Cancel</Button>
        <Button loading={loading} onClick={handleSubmit}>Update</Button>
      </Group>
    </Modal>
  );
}
