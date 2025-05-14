
import { Button, Group, Text, Modal } from "@mantine/core";




export default function deleteConfirmModal( {deleteModalOpened, setDeleteModalOpened, handleDelete}) {
    return (
        <Modal
            opened={deleteModalOpened}
            onClose={() => setDeleteModalOpened(false)}
            title="Confirm Category Deletion"
            centered
        >
            <Text mb="md">Are you sure you want to delete this ?</Text>
            <Group position="right">
                <Button variant="default" onClick={() => setDeleteModalOpened(false)}>
                    Cancel
                </Button>
                <Button color="red" onClick={handleDelete}>
                    Delete
                </Button>
            </Group>
        </Modal>
    )


}