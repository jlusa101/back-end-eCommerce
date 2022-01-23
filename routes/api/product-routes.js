// Required dependancies
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// A route to retrieve all products from the database along with category and tag information
router.get('/', (req, res) => {
    Product.findAll({
            include: [{
                    model: Category,
                    attributes: ['id', 'category_name']
                },
                {
                    model: Tag,
                    attributes: ['id', 'tag_name'],
                    through: ProductTag,
                    as: 'tag_product'
                },
            ]
        }).then(products => res.json(products))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// A route to find one product based on ID from the database along with category and tag information
router.get('/:id', (req, res) => {
    Product.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                    model: Category,
                    attributes: ['id', 'category_name']
                },
                {
                    model: Tag,
                    attributes: ['id', 'tag_name'],
                    through: ProductTag,
                    as: 'tag_product'
                },
            ]
        }).then(products => res.json(products))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// A route that creates a new product in the database
router.post('/', (req, res) => {
    Product.create({
            product_name: req.body.product_name,
            price: req.body.price,
            stock: req.body.stock,
            category_id: req.body.category_id,
            tagIds: req.body.tagIds
        })
        .then((product) => {
            // if there's product tags, we need to create pairings to bulk create in the ProductTag model
            if (req.body.tagIds.length) {
                console.log(req.body.tagIds);
                const productTagIdArr = req.body.tagIds.map((tag_id) => {
                    return {
                        product_id: product.id,
                        tag_id: tag_id,
                    };
                });
                return ProductTag.bulkCreate(productTagIdArr);
            }
            // if no product tags, just respond
            res.status(200).json(product);
        })
        .then((productTagIds) => res.status(200).json(productTagIds))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

// A route that updates a product's attributes based on its ID
router.put('/:id', (req, res) => {
    Product.update(req.body, {
            product_name: req.body.product_name,
            price: req.body.price,
            stock: req.body.stock,
            category_id: req.body.category_id,
            tagIds: req.body.tagIds,
            where: {
                id: req.params.id,
            },
        })
        .then((product) => {
            // find all associated tags from ProductTag
            return ProductTag.findAll({ where: { product_id: req.params.id } });
        })
        .then((productTags) => {
            // get list of current tag_ids
            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            // create filtered list of new tag_ids
            const newProductTags = req.body.tagIds
                .filter((tag_id) => !productTagIds.includes(tag_id))
                .map((tag_id) => {
                    return {
                        product_id: req.params.id,
                        tag_id,
                    };
                });
            // figure out which ones to remove
            const productTagsToRemove = productTags
                .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                .map(({ id }) => id);

            // run both actions
            return Promise.all([
                ProductTag.destroy({ where: { id: productTagsToRemove } }),
                ProductTag.bulkCreate(newProductTags),
            ]);
        })
        .then((updatedProductTags) => res.json(updatedProductTags))
        .catch((err) => {
            // console.log(err);
            res.status(400).json(err);
        });
});

// A route that deletes a product from the database based on its ID
router.delete('/:id', (req, res) => {
    Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(tag => {
            if (!tag) {
                res.status(404).json({ message: 'No product found with this id' });
                return;
            }
            res.json(tag);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;