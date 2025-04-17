import {
    Box, Grid, Select, Card, Image, Text, Badge, Button, Group, Stack, Center
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../api/product";
import { getAllCategories } from "../api/category";
import { parsePaginationLinks } from "../../utils/parsePagination";
import DeleteConfirmModal from "../components/deleteConfirmModal";
import { notifications } from "@mantine/notifications";
import EditProductModal from "../components/EditProductModal";
import { getAllExtraOptions } from "../api/extraOptions";




export default function ViewProducts() {

    const baseURL = import.meta.env.VITE_API_BASE_URL;


    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [paginationLinks, setPaginationLinks] = useState({});


    // confirm delete
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    // update product
    const [editModalOpened, setEditModalOpened] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [extras, setExtras] = useState([])

    const handleUpdateProduct = (updatedProduct) => {
        setProducts((prev)=>
            prev.map((product)=>product._id == updatedProduct._id? updatedProduct : product)
        )
    }





    const confirmDelete = (id) => {
        setSelectedProductId(id);
        setDeleteModalOpened(true);
    };

    const handleDelete = async () => {
        try {
            const res = await deleteProduct(selectedProductId);
            if (res.status === 200) {
                // remove 
                setProducts(prevProducts => prevProducts.filter(product => product._id !== selectedProductId));

                notifications.show({
                    title: "Deleted!",
                    message: "Product has been deleted successfully",
                    color: "green",
                });
            } else {
                notifications.show({
                    title: "Failed!",
                    message: res.data.message,
                    color: "red",
                });
            }
        } catch (err) {
            console.error("Error deleting category", err);
            notifications.show({
                title: "Error",
                message: err,
                color: "red",
            });
        } finally {
            setDeleteModalOpened(false);
            setSelectedCategory(null);
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                //  extraOpts
                const extraRes = await getAllExtraOptions();
                setExtras(extraRes.data);
                
                // init product + page
                const productRes = await getAllProducts({ page, limit: 6, category: selectedCategory, sort });
                const linkHeader = productRes.headers["link"]; 
                
                if (linkHeader) {
                    setPaginationLinks(parsePaginationLinks(linkHeader));
                }
    
                setProducts(productRes.data.products);
                setTotalPages(productRes.data.totalPages);
    
                // init ceategory
                const categoryRes = await getAllCategories();
                setCategories(
                    categoryRes.data.map((cat) => ({
                        value: cat._id,
                        label: cat.name
                    }))
                );
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
    
        fetchData();
    }, [page, selectedCategory, sort]);



    return <>


        <Box p="md">
            <Group justify="space-between" mb="lg">
                <Text size="xl" fw={700}>All Products</Text>
                <Select
                    withinPortal
                    placeholder="Filter by category"
                    data={categories}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    clearable
                />
                <Select
                    withinPortal
                    placeholder="Sort by"
                    value={sort}
                    onChange={setSort}
                    data={[
                        { value: "price_asc", label: "Price: Low to High" },
                        { value: "price_desc", label: "Price: High to Low" },
                    ]}
                />
            </Group>

            {products.length === 0 ? (
                <Center style={{ minHeight: '50vh' }}>
                    <Text size="xl" align="center">No products available</Text>
                </Center>
            ) : (

                <Grid>
                    {products.map(product => (
                        <Grid.Col span={4} key={product._id}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Card.Section>
                                    <Image src={baseURL + product.imageUrl} height={160} alt={product.name} />
                                    <Badge color={product.available ? "green" : "red"}>
                                        {product.available ? "Available" : "Unavailable"}
                                    </Badge>
                                </Card.Section>

                                <Stack mt="md" spacing="xs">
                                    <Group position="apart">
                                        <Text fw={500}>{product.name}</Text>
                                    </Group>
                                    <Text fw={700}>${product.basePrice?.toFixed(2)}</Text>
                                </Stack>

                                <Group mt="md" grow>
                                    <Button variant="light" color="blue"
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setEditModalOpened(true);
                                        }}
                                    >Edit</Button>
                                    <Button variant="light" color="red" onClick={() => confirmDelete(product._id)}>Delete</Button>
                                </Group>

                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            )}

            <Group mt="md" position="center">
                <Button
                    disabled={!paginationLinks.previous}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                >
                    Previous
                </Button>
                <Text>{`Page ${page} of ${totalPages}`}</Text>
                <Button
                    disabled={!paginationLinks.next}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Next
                </Button>
            </Group>


            {/* UPDATE */}

            <EditProductModal
            opened={editModalOpened}
            onClose={() => {
                setEditModalOpened(false);
                setSelectedProduct(null);
            }}
            product={selectedProduct}
            onSave={handleUpdateProduct}
            categories={categories}
            extrasList={extras.map((e) => ({ value: e._id, label: e.name }))}
            />






            {/*  DELETE */}
            <DeleteConfirmModal
                deleteModalOpened={deleteModalOpened}
                setDeleteModalOpened={setDeleteModalOpened}
                handleDelete={handleDelete} />

        </Box>


    </>

}