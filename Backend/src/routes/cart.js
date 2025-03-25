
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    const cart = req.session.cart || [];
    res.json(cart);
});

router.post('/add', (req, res) => {
    const { productId, quantity, size, extras } = req.body;


    if (!req.session.cart) {
        req.session.cart = [];
    }


    const existingProductIndex = req.session.cart.findIndex(item => item.productId === productId);
    if (existingProductIndex > -1) {
        req.session.cart[existingProductIndex].quantity += quantity;
    } else {
        req.session.cart.push({ productId, quantity, size, extras });
    }

    res.status(200).send('Product added to cart');
});



router.put('/update', (req, res) => {
    const { productId, quantity, size, extras } = req.body;

    const productIndex = req.session.cart.findIndex(item => item.productId === productId);
    if (productIndex > -1) {
        req.session.cart[productIndex] = { productId, quantity, size, extras };
        res.status(200).send('Cart updated');
    } else {
        res.status(404).send('Product not found in cart');
    }
});


router.post('/total', async (req, res) => {
    const cart = req.session.cart || [];
    let totalPrice = 0;

    try {
        for (const item of cart) {
            const product = await getProductById(item.productId);
            let productPrice = product.basePrice;

            if (item.size) {
                productPrice += item.size.additionalCost;
            }

            if (item.extras) {
                item.extras.forEach(extra => {
                    extra.options.forEach(option => {
                        productPrice += option.price;
                    });
                });
            }

            totalPrice += productPrice * item.quantity;
        }

        res.json({ totalPrice });
    } catch (error) {
        res.status(500).send('Error calculating total price');
    }
});




function getProductById(productId) {
    return Product.findById(productId)
        .then(product => {
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        })
        .catch(error => {
            console.error(error);
            throw new Error('Error retrieving product');
        });
}

module.exports = router;
