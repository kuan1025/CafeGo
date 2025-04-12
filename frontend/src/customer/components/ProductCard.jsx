import { Alert ,Modal, Stack, Grid, Box, Card, Image, Text, Group, Select, Checkbox, NumberInput, Button } from "@mantine/core";
import { useState, useEffect } from "react";


export default function ProductCard({ product, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMilk, setSelectedMilk] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  
  const [quantity, setQuantity] = useState(1);
  const [isExtrasModalOpen, setIsExtrasModalOpen] = useState(false);

  // init
  useEffect(() => {
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]); 
    }
    if(product.milkOptions && product.milkOptions.length > 0){
      setSelectedMilk(product.milkOptions[0])
    }
  }, [product.sizes, product.milkOptions]);


  const handleEditExtras = () => {
    setIsExtrasModalOpen(true);
  }
  const handleCloseExtrasModal = () => {
    setIsExtrasModalOpen(false);
  };

  const handleAddToCart = () => {

    console.log("handleAddToCart fired", new Date().toISOString());

    const sizePrice = selectedSize ? selectedSize.price : 0;
    const milkPrice = selectedMilk ? selectedMilk.price : 0;
    const extrasPrice = selectedExtras.reduce((acc, extra) => acc + extra.price, 0);
    const totalPrice = (product.basePrice + sizePrice + milkPrice + extrasPrice) * quantity;

    onAddToCart({
      ...product,
      size: selectedSize,
      milk: selectedMilk,
      extras: selectedExtras,
      totalPrice,
      quantity,
    });

    setSelectedExtras([])
    handleCloseExtrasModal();
  };

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" style={{ width: "250px" }}>
        <Image src={product.imageUrl} alt={product.name} height={160} />
        <Text size="xl" weight={500}>{product.name}</Text>
        <Text>Base Price: ${product.basePrice}</Text>

        <Select
          label="Size"
          value={selectedSize?.label}
          onChange={(value) => setSelectedSize(product.sizes.find(s => s.label === value))}
          data={product.sizes.map(size => ({ value: size.label, label: `${size.label} + $${size.price}` }))}
          defaultValue={product.sizes[0]?.label}
        />

        <Select
          label="Milk"
          value={selectedMilk?.name}
          onChange={(value) => setSelectedMilk(product.milkOptions.find(m => m.name === value))}
          data={product.milkOptions.map(milk => ({ value: milk.name, label: `${milk.name} + $${milk.price}` }))}
        />
          <NumberInput
            label="Quantity"
            value={quantity}
            onChange={(val) => setQuantity(val || 1)} 
            min={1}
            step={1}
          />
        <Box>
          <Grid>
            <Grid.Col span={6}>
              <Button fullWidth mt="sm" onClick={handleEditExtras}>
                Edit
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button fullWidth mt="sm" onClick={handleAddToCart}>
                Add
              </Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Card>

      {/* extra opt */}
      <Modal
        opened={isExtrasModalOpen}
        onClose={handleCloseExtrasModal}
        title="Select Extras"
        size="lg"
      >
        <Stack>
          {/* Product Image */}
          <Box mb="sm">
            <Image src={product.imageUrl} alt={product.name} width={100} height={100} />
          </Box>

          {/* Product Info */}
          <Text size="lg" weight={500}>{product.name}</Text>
          <Text size="sm" color="dimmed">Base Price: ${product.basePrice}</Text>

          <Select
            label="Size"
            value={selectedSize?.label}
            onChange={(value) => setSelectedSize(product.sizes.find(s => s.label === value))}
            data={product.sizes.map(size => ({ value: size.label, label: `${size.label} + $${size.price}` }))}
          />

          <Select
            label="Milk"
            value={selectedMilk?.name}
            onChange={(value) => setSelectedMilk(product.milkOptions.find(m => m.name === value))}
            data={product.milkOptions.map(milk => ({ value: milk.name, label: `${milk.name} + $${milk.price}` }))}
          />

          <NumberInput
            label="Quantity"
            value={quantity}
            onChange={(val) => setQuantity(val || 1)} 
            min={1}
            step={1}
          /> 

          {/* Extras */}
          <Text size="sm" weight={500}>Extras</Text>
          <Grid>
            {product.extras.map(extra => (
              <Grid.Col key={extra.name} span={6}>
                <Checkbox
                  value={extra.name}
                  label={`${extra.name} + $${extra.price}`}
                  onChange={(event) => {
                    const updatedExtras = event.target.checked
                      ? [...selectedExtras, extra]
                      : selectedExtras.filter(e => e.name !== extra.name);
                    setSelectedExtras(updatedExtras);
                  }}
                />
              </Grid.Col>
            ))}
          </Grid>

          <Group position="apart">
            <Button variant="light" onClick={handleCloseExtrasModal}>Cancel</Button>
            <Button onClick={handleAddToCart}>Add</Button>
          </Group>
        </Stack>
      </Modal>

    </>
  );
}
