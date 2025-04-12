import {
    Box, Button, Stack, Title, TextInput, Textarea, NumberInput, Select,
    Checkbox, Group, Divider, Image, ActionIcon, Text, Card, TextInput as MantineTextInput
  } from "@mantine/core";
  import { Dropzone } from "@mantine/dropzone";
  import { IconUpload, IconTrash } from "@tabler/icons-react";
  import { useState } from "react";
  
  const CATEGORY_ENUM = ["Coffee", "Tea", "Smoothie", "Cold Brew", "Hot Chocolate"];
  
  export default function CreateProductForm() {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [allowMilkOptions, setAllowMilkOptions] = useState(true);
    const [available, setAvailable] = useState(true);
    const [milkOptions, setMilkOptions] = useState([{ name: "", price: 0 }]);
    const [extraOptions, setExtraOptions] = useState(["Sugar", "Vanilla", "Caramel", "Cinnamon"]);
  
    const handleDrop = (files) => {
      const file = files[0];
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    };
  
    const handleMilkOptionChange = (index, field, value) => {
      const updatedMilkOptions = [...milkOptions];
      updatedMilkOptions[index][field] = value;
      setMilkOptions(updatedMilkOptions);
    };
  
    const handleAddMilkOption = () => {
      setMilkOptions([...milkOptions, { name: "", price: 0 }]);
    };
  
    const handleRemoveMilkOption = (index) => {
      const updatedMilkOptions = milkOptions.filter((_, i) => i !== index);
      setMilkOptions(updatedMilkOptions);
    };
  
    return (
      <Box p="lg" maw={800} mx="auto">
        <Title order={3}>Create New Product</Title>
        <Stack mt="md" spacing="xl">
          {/* Product Basic Info */}
          <Card shadow="sm" p="lg" radius="md">
            <Stack>
              <TextInput label="Product Name" required />
              <Textarea label="Description" />
              <Select label="Category" data={CATEGORY_ENUM} required />
              <NumberInput label="Base Price" required precision={2} />
            </Stack>
          </Card>
  
          {/* Image Upload */}
          <Card shadow="sm" p="lg" radius="md">
            <Text weight={500}>Product Image</Text>
            {imageUrl ? (
              <Box pos="relative" mt="sm">
                <Image src={imageUrl} radius="md" width={200} />
                <ActionIcon
                  color="red"
                  onClick={() => {
                    setImage(null);
                    setImageUrl("");
                  }}
                  style={{ position: "absolute", top: 5, right: 5 }}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Box>
            ) : (
              <Dropzone onDrop={handleDrop} accept={{ "image/*": [] }} maxSize={3 * 1024 ** 2}>
                <Group justify="center" p="lg">
                  <IconUpload size={32} />
                  <Text>Drag image here or click to upload</Text>
                </Group>
              </Dropzone>
            )}
          </Card>
            
         <Card shadow="sm" p="lg" radius="md">
            <Stack spacing="xs">
                <Checkbox
                label="Available"
                checked={available}
                onChange={(e) => setAvailable(e.currentTarget.checked)}
                />
                <Text size="sm" c="dimmed">
                Check this to make the product available to customers. Uncheck to hide it from the store.
                </Text>
            </Stack>
            </Card>

            <Card shadow="sm" p="lg" radius="md">
            <Stack spacing="xs">
                <Checkbox
                label="Allow Milk Options"
                checked={allowMilkOptions}
                onChange={(e) => setAllowMilkOptions(e.currentTarget.checked)}
                />
                <Text size="sm" c="dimmed">
                Enable this to offer different milk choices for this product (e.g., Oat Milk, Almond Milk).
                </Text>
            </Stack>
            </Card>
  
          {/* Milk Options */}
          {allowMilkOptions && (
        <Card shadow="sm" p="lg" radius="md">
            <Title order={5}>Milk Options</Title>
            <Stack>
            {milkOptions.map((milkOption, index) => (
                <Group key={index} spacing="xs" align="center">
                <MantineTextInput
                    label="Name"
                    value={milkOption.name}
                    onChange={(e) => handleMilkOptionChange(index, "name", e.target.value)}
                    placeholder="e.g. Almond Milk"
                    style={{ flex: 1 }}
                />
                <NumberInput
                    label="Price"
                    value={milkOption.price}
                    onChange={(value) => handleMilkOptionChange(index, "price", value)}
                    precision={2}
                    min={0}
                    placeholder="e.g. 1.50"
                    style={{ width: 120 }}
                />
                <ActionIcon color="red" onClick={() => handleRemoveMilkOption(index)}>
                    <IconTrash size={16} />
                </ActionIcon>
                </Group>
            ))}
            <Button variant="outline" mt="sm" onClick={handleAddMilkOption}>
                Add Milk Option
            </Button>
            </Stack>
        </Card>
        )}
        
          {/* Extra Options */}
          <Card shadow="sm" p="lg" radius="md">
            <Stack spacing="xs">
                <Title order={5}>Extra Options</Title>
                <Text size="sm" c="dimmed">
                Optional add-ons for customers to choose when ordering (e.g., syrups, spices, toppings).
                </Text>
                <Group wrap="wrap" gap="md" mt="xs">
                {extraOptions.map((option, index) => (
                    <Checkbox key={index} label={option} />
                ))}
                </Group>
            </Stack>
        </Card>
  
          {/* Submit Button */}
          <Button fullWidth mt="md" color="green">
            Submit Product
          </Button>
        </Stack>
      </Box>
    );
  }
  