import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';
import { useOrder } from '../context/OrderContext';


const ProductCustomizationModal = ({ visible, onClose, product, onConfirm }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedMilk, setSelectedMilk] = useState(null);
    const [selectedExtras, setSelectedExtras] = useState([]);
 

    const toggleExtra = (extraId) => {
        setSelectedExtras((prev) =>
            prev.includes(extraId)
                ? prev.filter((id) => id !== extraId)
                : [...prev, extraId]
        );
    };

    const handleConfirm = () => {
        const customizedProduct = {
            productId: product._id,
            name: product.name,
            basePrice: product.basePrice,
            selectedSize,
            selectedMilk,
            selectedExtras,
        };
        onConfirm(customizedProduct);
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Customize {product.name}</Text>

                    {product.sizes?.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Size</Text>
                            {product.sizes.map((size) => (
                                <TouchableOpacity
                                    key={size._id}
                                    style={[
                                        styles.optionButton,
                                        selectedSize === size._id && styles.selectedOption,
                                    ]}
                                    onPress={() => setSelectedSize(size._id)}
                                >
                                    <Text>{size.label} (+${size.price})</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {product.milkOptions?.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Milk</Text>
                            {product.milkOptions.map((milk) => (
                                <TouchableOpacity
                                    key={milk._id}
                                    style={[
                                        styles.optionButton,
                                        selectedMilk === milk._id && styles.selectedOption,
                                    ]}
                                    onPress={() => setSelectedMilk(milk._id)}
                                >
                                    <Text>{milk.name} (+${milk.price})</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {product.extras?.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Extras</Text>
                            {product.extras.map((extraId) => (
                                <TouchableOpacity
                                    key={extraId}
                                    style={[
                                        styles.optionButton,
                                        selectedExtras.includes(extraId) && styles.selectedOption,
                                    ]}
                                    onPress={() => toggleExtra(extraId)}
                                >
                                    <Text>{extraId}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
                            <Text style={{ color: 'white' }}>Confirm Add to Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    section: {
        marginBottom: 12,
    },
    sectionTitle: {
        fontWeight: '600',
        marginBottom: 6,
    },
    optionButton: {
        padding: 8,
        backgroundColor: '#eee',
        borderRadius: 6,
        marginBottom: 6,
    },
    selectedOption: {
        backgroundColor: '#cde3d4',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    cancelBtn: {
        padding: 10,
    },
    confirmBtn: {
        padding: 10,
        backgroundColor: '#006341',
        borderRadius: 6,
    },
});

export default ProductCustomizationModal;
