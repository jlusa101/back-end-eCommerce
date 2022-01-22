// Required dependancies
const router = require('express').Router();
const { Category, Product } = require('../../models');

// A route that retrieves all of the categories from the database
router.get('/', (req, res) => {
    Category.findAll({
            include: [{
                model: Product
            }]
        }).then(categories => res.json(categories))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// A route that retrieves one of the categories from the database based on its ID
router.get('/:id', (req, res) => {
    Category.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: Product
            }
        }).then(categories => res.json(categories))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// A route that retrieves adds a new category to the database
router.post('/', (req, res) => {
    Category.create({
            category_name: req.body.category_name
        })
        .then(category => {
            res.json(category)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// A route that updates one of the categories in the database based on its ID
router.put('/:id', (req, res) => {
    Category.update({
            category_name: req.body.category_name
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(category => {
            if (!category[0]) {
                res.status(404).json({ message: 'No category found with this id' });
                return;
            }
            res.json(category);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// A route that deletes one of the categories from the database based on its ID
router.delete('/:id', (req, res) => {
    Category.destroy({
            where: {
                id: req.params.id
            }
        }).then(category => {
            if (!category) {
                res.status(404).json({ message: 'No category found with this id' });
                return;
            }
            res.json(category);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;