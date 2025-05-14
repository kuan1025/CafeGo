import { FileButton, Image, Button, Group, Text, Stack, } from "@mantine/core";
import {  IconUpload, IconX } from "@tabler/icons-react";
import { useState, useEffect } from "react";

export default function ImageUpload({ value, onChange, initialUrl }) {
    
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (value) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(value);
        } else {
            setPreview(null);
        }
    }, [value]);

    return (
        <Stack spacing="xs">
            <Group justify="space-between">
                <Text fw={500}>Product Image</Text>
                {value && (
                    <Button
                        variant="subtle"
                        color="red"
                        size="xs"
                        leftSection={<IconX size={14} />}
                        onClick={() => onChange(null)}
                    >
                        Remove
                    </Button>
                )}
            </Group>

            {preview ? (
                <Image src={preview} alt="Preview" radius="md" height={160} fit="contain" />
            ) : (
                <Image src={initialUrl} alt="Current" radius="md" height={160} fit="contain" />
            )}

            <FileButton onChange={onChange} accept="image/*">
                {(props) => (
                    <Button leftSection={<IconUpload size={16} />} variant="light" {...props}>
                        Upload Image
                    </Button>
                )}
            </FileButton>
        </Stack>
    );
}
