import { Card, Stack, Text, Button, Group, Divider, Box } from "@mantine/core";

export default function OrderSummary({ cart, onRemove }) {
  const total = cart.reduce((acc, item) => {
    const sizePrice = item.size?.price || 0;
    const milkPrice = item.milk?.price || 0;
    const extrasPrice = item.extras?.reduce((sum, extra) => sum + extra.price, 0) || 0;
    const itemTotal = (item.basePrice + sizePrice + milkPrice + extrasPrice) * item.quantity;
    return acc + itemTotal;
  }, 0);

  return (
    <Card shadow="sm" padding="lg" radius="md" style={{ width: "300px" }}>
      <Text size="lg" weight={500}>Order Detail</Text>
      
      <Stack style={{ textAlign: 'left' }}>
        {cart.map((item, index) => {
          const sizePrice = item.size?.price || 0;
          const milkPrice = item.milk?.price || 0;
          const extrasPrice = item.extras?.reduce((sum, extra) => sum + extra.price, 0) || 0;
          const itemTotal = (item.basePrice + sizePrice + milkPrice + extrasPrice) * item.quantity;

          return (
            <Box key={index} mb="md">
              {/* Product Name and Quantity */}
              <Group position="apart">
                <Text size="md" weight={500}>
                  {item.quantity} x {item.name} = ${itemTotal.toFixed(2)}
                </Text>
              </Group>

              {/* Size */}
              {item.size?.label && (
                <Text size="sm" color="dimmed">
                  <strong>Size:</strong> {item.size.label} (${sizePrice})
                </Text>
              )}

              {/* Milk */}
              {item.milk?.name && (
                <Text size="sm" color="dimmed">
                  <strong>Milk:</strong> {item.milk.name} (${milkPrice})
                </Text>
              )}

              {/* Extras */}
              {item.extras?.length > 0 && (
                <div>
                  <Text size="sm" weight={500}>Extras:</Text>
                  {item.extras.map((extra, extraIndex) => (
                    <Text key={extraIndex} size="sm" color="dimmed">
                      {extra.name} - ${extra.price}
                    </Text>
                  ))}
                </div>
              )}

              {/* Remove */}
              <Group>
                <Button
                  variant="outline"
                  size="xs"
                  color="red"
                  onClick={() => onRemove(item.productId)}
                >
                  Remove
                </Button>
              </Group>

              {index < cart.length - 1 && <Divider my="sm" />}
            </Box>
          );
        })}
      </Stack>

      {/* Total Price */}
      <Text weight={700} mt="md">Total: ${total.toFixed(2)}</Text>
      <Button fullWidth mt="sm">Proceed to Checkout</Button>
    </Card>
  );
}
