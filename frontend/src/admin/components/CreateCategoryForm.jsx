import { useState } from "react";
import { TextInput, Button, Paper, Title, Group } from "@mantine/core";
import { createCategory } from "../api/category"; 
import { notifications } from '@mantine/notifications';

export default function CreateCategoryForm() {
  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await createCategory(form);
      if (res.success) {
        notifications.show({
          title:"Create Category",
          message: `${res.message}`,
          color: "green",
        });
      }   
      setForm({ name: "", description: "" });
    } catch (err) {
      console.error(err);
      notifications.show({
        title:"Create Category",
        message: err.message,
        color: "red",
      });
    }
  };

  return (
    <Paper p="md" shadow="sm" radius="md" withBorder>
      <Title order={3} mb="md">Create New Category</Title>
      
      <TextInput
        label="Category Name"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        required
        placeholder="e.g. Coffee, Smoothie"
      />

      <TextInput
        label="Category Description"
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
        placeholder="Optional"
      />

      <Group mt="md">
        <Button onClick={handleSubmit}>Create</Button>
      </Group>
    </Paper>
  );
}
