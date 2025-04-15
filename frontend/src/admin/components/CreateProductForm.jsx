import {
  Box, Button, Stack, Title, TextInput, Textarea, NumberInput, Select,
  Checkbox, Group, Divider, Image, ActionIcon, Text, Card, TextInput as MantineTextInput
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconUpload, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getAllCategories } from "../api/category";
import { createProduct } from "../api/product";
import { getAllExtraOptions } from "../api/extraOptions";
import { notifications } from "@mantine/notifications";


export default function CreateProductForm() {


  // useState
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [allowMilkOptions, setAllowMilkOptions] = useState(true);
  const [available, setAvailable] = useState(true);
  const [milkOptions, setMilkOptions] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [selectedExtraOptions, setSelectedExtraOptions] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);



  //template
  const sizeTemplates = [
    { label: "Small", key: "small" },
    { label: "Medium", key: "medium" },
    { label: "Large", key: "large" },
    { label: "Extra Large", key: "extraLarge" },
  ];
  const milkTemplates = [
    { name: "Full Cream", key: "Full Cream" },
    { name: "Soy Milk", key: "Soy Milk" },
    { name: "Oat Milk", key: "Oat Milk" },
    { name: "Almond Milk", key: "Almond Milk" },
  ];



  // submit form
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("basePrice", basePrice);
      formData.append("available", available);
      formData.append("allowMilkOptions", allowMilkOptions);
      formData.append("sizes", JSON.stringify(selectedSizes));
      formData.append("milkOptions", JSON.stringify(milkOptions));
      formData.append("extras", JSON.stringify(selectedExtraOptions));

      const res = await createProduct(formData);

      if (res && res.status === 201) {
        notifications.show({
          title: "Product Created",
          message: "Product was successfully created!",
          color: "green",
        });

        setName("");
        setDescription("");
        setCategory("");
        setBasePrice(0);
        setAvailable(true);
        setAllowMilkOptions(true);
        setSelectedSizes([]);
        setMilkOptions([]);
        setSelectedExtraOptions([]);
        setImage(null);
        setImageUrl("");
      } else {
        console.log(res.status)
        notifications.show({
          title: "Error",
          message: "Server responded with an error",
          color: "red",
        });
      }
    } catch (error) {
      console.error("Create product error:", error);

    notifications.show({
      title: "Error",
      message: "Failed to create product!! Please try again",
      color: "red",
    });
    }
  }



  // fetch Categories and ExtraOpts /////////
  const initOpts = async () => {
    try {
      const resCat = await getAllCategories();
      // <select> format have to be value / label
      const cat = resCat.data.map(item => ({
        value: item._id,
        label: item.name
      }))
      setCategories(cat);
      const resOpts = await getAllExtraOptions();
      setExtraOptions(resOpts.data);

    } catch (err) {
      console.error("Error in initial stage", err);
    }
  };

  useEffect(() => {
    initOpts();

  }, []);




  const handleDrop = (files) => {
    const file = files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };


  return (
    <Box p="lg" maw={800} mx="auto">

      <Title order={3}>Create New Product</Title>
      <Stack mt="md" spacing="xl">

        {/* Product Basic Info */}
        <Card shadow="sm" p="lg" radius="md">
          <Stack>
            <TextInput label="Product Name" required value={name} onChange={(e) => setName(e.target.value)} />
            <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Select label="Category" withinPortal
              data={categories} required value={category} onChange={setCategory} />
            <NumberInput label="Base Price" required precision={2} value={basePrice} onChange={setBasePrice} />
          </Stack>
        </Card>

        {/* Image Upload */}
        <Card shadow="sm" p="lg" radius="md">
          <Text weight={500}>Product Image</Text>
          {imageUrl ?
            // upload
            (
              <Box pos="relative" mt="sm">
                <Image src={imageUrl} radius="md" width={200} />
                <ActionIcon
                  color="red"
                  onClick={() => {
                    setImage(null);
                    setImageUrl("");
                  }}
                  // top - right
                  style={{ position: "absolute", top: 5, right: 5 }}
                >
                  <IconTrash size={20} />
                </ActionIcon>
              </Box>
            ) : (
              <Dropzone onDrop={handleDrop}
                accept={{ "image/*": [] }} // all image
                maxSize={1024 * 1024 ** 2}>
                <Group justify="center" p="lg">
                  <IconUpload size={32} />
                  <Text>Drag image here or click to upload</Text>
                </Group>
              </Dropzone>
            )}
        </Card>


        {/* size */}
        <Card shadow="sm" p="lg" radius="md">
          <Title order={5}>Available Sizes</Title>
          <Text size="sm" c="dimmed">Select which sizes are available for this product and set the price for each</Text>
          <Stack mt="sm">
            {sizeTemplates.map((size) => {
              const selected = selectedSizes.find((s) => s.label === size.label);
              return (
                <Group key={size.label}>
                  <Checkbox
                    label={size.label}
                    checked={!!selected} // avoid undefined
                    onChange={(e) => {
                      const checked = e.currentTarget.checked;
                      setSelectedSizes((prev) => {
                        if (checked) {
                          // default 0
                          return [...prev, { label: size.label, price: 0 }];
                        } else {
                          return prev.filter((s) => s.label !== size.label);
                        }
                      });
                    }}
                  />

                  <NumberInput p={10}
                    // need to have '?'  
                    value={selected?.price || 0}
                    onChange={(val) =>
                      setSelectedSizes((prev) =>
                        prev.map((s) => s.label === size.label ? { ...s, price: val } : s
                        )
                      )
                    }
                    precision={2}
                    min={0}
                    placeholder="Set price"
                    style={{ width: "50%" }}
                    disabled={!selected}
                  />

                </Group>
              );
            })}
          </Stack>
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
              {milkTemplates.map((opt) => {
                const selected = milkOptions.find((item) => item.name === opt.name)
                return (
                  <Group key={opt.name} justify="space-between" align="center" wrap="nowrap">
                    <Checkbox
                      label={opt.name}
                      checked={!!selected}
                      onChange={(e) => {
                        const checked = e.currentTarget.checked;
                        setMilkOptions((prev) => {
                          if (checked) {
                            // default 0
                            return [...prev, { name: opt.name, price: 0 }];
                          } else {
                            return prev.filter((s) => s.name !== opt.name);
                          }
                        });
                      }}
                    />
                    <NumberInput p={10}
                      // default 0
                      value={selected?.price || 0}
                      onChange={(val) =>
                        setMilkOptions((prev) =>
                          prev.map((item) =>
                            item.name === opt.name ? { ...item, price: val } : item
                          )
                        )}
                      precision={2}
                      min={0}
                      placeholder="Set price"
                      style={{ width: "50%", }}
                      disabled={!selected}
                    />
                  </Group>
                )
              })
              }
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
              {extraOptions.map((option) => (

                <Checkbox
                  key={option._id}
                  label={option.name}
                  value={option._id}
                  onChange={(e) => {
                    const isChecked = e.currentTarget.checked;
                    setSelectedExtraOptions((prev) => {
                      if (isChecked) {
                        // add to prev 
                        return [...prev, option._id];
                      } else {
                        return prev.filter((id) => id !== option._id);
                      }

                    });
                  }}
                />

              ))}
            </Group>
          </Stack>
        </Card>

        {/* Submit Button */}
        <Button fullWidth mt="md" color="green" onClick={handleSubmit}>
          Submit Product
        </Button>
      </Stack>
    </Box>
  );
}
