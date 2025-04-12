import { Button, Group, useMantineTheme } from "@mantine/core";

const categories = ["Coffee", "Tea", "Smoothie", "Cold Brew", "Hot Chocolate"];

export default function CategoryMenu({ onCategoryChange }) {
  // default col
  const theme = useMantineTheme();
  return (
    
    <Group  sx={{ backgroundColor: theme.colors.blue[6] }} position="center" spacing="lg">
      {categories.map((category) => (
        <Button key={category} onClick={() => onCategoryChange(category)}>
          {category}
        </Button>
      ))}
    </Group>
  );
}
