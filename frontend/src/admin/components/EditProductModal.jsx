import { Modal, TextInput, NumberInput, Button, Group, Stack, Textarea, Switch, MultiSelect, Select, Box, } from "@mantine/core";
import { useEffect, useState } from "react";
import ImageUpload from "./imageUploadForm";
import { updateProduct } from "../api/product";
import { notifications } from '@mantine/notifications';

export default function EditProductModal({ opened, onClose, product, onSave, categories, extrasList, }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [basePrice, setBasePrice] = useState(0);
    const [category, setCategory] = useState("");
    const [selectedExtras, setSelectedExtras] = useState([]);
    const [allowMilkOptions, setAllowMilkOptions] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [milkOptions, setMilkOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    // image
    const [imageFile, setImageFile] = useState(null);
    const baseURL = import.meta.env.VITE_API_BASE_URL;


    useEffect(() => {
        if (product) {
            setName(product.name || "");
            setDescription(product.description || "");
            setBasePrice(product.basePrice || 0);
            setCategory(product.category || "");

            // extra can be object or Id !!  
            setSelectedExtras(product.extras?.map(extra => extra._id || extra) || []);

            setAllowMilkOptions(product.allowMilkOptions || false);
            setSizes(product.sizes || []);
            setMilkOptions(product.milkOptions || []);
            setImageFile(null);
        }
    }, [product]);

    const handleSizeChange = (index, field, value) => {
        setSizes((prev) =>
            prev.map((size, i) =>
                i === index ? { ...size, [field]: value } : size)
        );
    };

    const handleMilkChange = (index, field, value) => {
        setMilkOptions((prev) =>
            prev.map((milk, i) =>
                i === index ? { ...milk, [field]: value } : milk
            )
        );
    };

    const addSize = () => setSizes([...sizes, { label: "", price: 0 }]);
    const removeSize = (index) => setSizes(sizes.filter((_, i) => i !== index));

    const addMilkOption = () => setMilkOptions([...milkOptions, { name: "", price: 0 }]);
    const removeMilkOption = (index) => setMilkOptions(milkOptions.filter((_, i) => i !== index));

    // validation
    const validateForm = () => {
        const newErrors = {};

        // Basic Validation
        if (!name.trim()) newErrors.name = "Product name is required";
        if (!category) newErrors.category = "Category is required";
        if (basePrice <= 0) newErrors.basePrice = "Base price must be greater than 0";

        // Validate sizes - Ensure at least one size
        if (sizes.length === 0)
            newErrors.sizes = "At least one size is required";
        else {
            sizes.forEach((size, index) => {
                if (!size.label.trim()) {
                    newErrors[`size-${index}-label`] = `Size ${index + 1} label is required`
                };
                if (size.price < 0 || isNaN(size.price)) {
                    newErrors[`size-${index}-price`] = `Size ${index + 1} price must be a valid number >= 0`;
                }
            });
        }

        // Validate milk options if allowed
        if (allowMilkOptions) {
            milkOptions.forEach((milk, index) => {
                if (!milk.name.trim()) newErrors[`milk-${index}-name`] = `Milk option ${index + 1} name is required`;
            });
        }

        return newErrors;
    };


    const handleSubmit = async () => {

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            for (let field in errors) {
                notifications.show({
                    title: 'Validation Error',
                    message: errors[field],
                    color: 'red',
                });
            }
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("basePrice", basePrice);
        formData.append("category", category);
        formData.append("extras", JSON.stringify(selectedExtras));
        formData.append("allowMilkOptions", allowMilkOptions);
        formData.append("sizes", JSON.stringify(sizes));
        formData.append("milkOptions", JSON.stringify(milkOptions));

        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {

            const res = await updateProduct(product._id, formData);
            if (res.status === 200) {
                notifications.show({
                    title: 'Success',
                    message: 'Product updated successfully',
                    color: 'green',
                });
                onSave(res.data);
                onClose();
            }
        } catch (err) {
            notifications.show({
                title: 'Error',
                message: 'Failed to update product',
                color: 'red',
            });
            console.error("Failed to update product:", err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Modal opened={opened} onClose={onClose} title="Edit Product" size="lg" centered>
            <Stack>
                <TextInput label="Product Name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
                <Textarea label="Description" value={description} onChange={(e) => setDescription(e.currentTarget.value)} />
                <NumberInput label="Base Price" value={basePrice} onChange={setBasePrice} min={0} precision={2} />
                <Select
                    label="Category"
                    data={categories}
                    value={category}
                    onChange={setCategory}
                    placeholder="Select category"
                />
                <ImageUpload
                    value={imageFile}
                    onChange={setImageFile}
                    initialUrl={product ? baseURL + product?.imageUrl : '/images/404/404.jpg'}
                />
                <MultiSelect
                    label="Extras"
                    data={extrasList}
                    value={selectedExtras}
                    onChange={setSelectedExtras}
                    placeholder="Select extra options"
                />
                <Switch
                    label="Allow Milk Options"
                    checked={allowMilkOptions}
                    onChange={(event) => setAllowMilkOptions(event.currentTarget.checked)}
                />

                {/* Sizes Section */}
                <Box>
                    <Group justify="space-between" align="center">
                        <strong>Sizes</strong>
                        <Button size="xs" onClick={addSize}>Add Size</Button>
                    </Group>
                    {sizes.map((size, i) => (
                        <Group key={i} grow mt="xs">
                            <TextInput
                                placeholder="Label"
                                value={size.label}
                                onChange={(e) => handleSizeChange(i, "label", e.currentTarget.value)}
                            />
                            <NumberInput
                                placeholder="Price"
                                value={size.price}
                                onChange={(val) => handleSizeChange(i, "price", val)}
                                min={0}
                                precision={2}
                            />
                            <Button size="xs" color="red" onClick={() => removeSize(i)}>Remove</Button>
                        </Group>
                    ))}
                </Box>

                {/* Milk Options Section */}
                {allowMilkOptions && (
                    <Box>
                        <Group justify="space-between" align="center">
                            <strong>Milk Options</strong>
                            <Button size="xs" onClick={addMilkOption}>Add Milk</Button>
                        </Group>
                        {milkOptions.map((milk, i) => (
                            <Group key={i} grow mt="xs">
                                <TextInput
                                    placeholder="Milk Name"
                                    value={milk.name}
                                    onChange={(e) => handleMilkChange(i, "name", e.currentTarget.value)}
                                />
                                <NumberInput
                                    placeholder="Price"
                                    value={milk.price}
                                    onChange={(val) => handleMilkChange(i, "price", val)}
                                    min={0}
                                    precision={2}
                                />
                                <Button size="xs" color="red" onClick={() => removeMilkOption(i)}>Remove</Button>
                            </Group>
                        ))}
                    </Box>
                )}

                <Group position="right" mt="md">
                    <Button onClick={handleSubmit} loading={loading}>Save</Button>
                </Group>
            </Stack>
        </Modal>
    );
}
