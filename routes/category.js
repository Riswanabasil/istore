const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Get all categories
router.get('/categories', categoryController.getCategories);

// Add a new category
router.post('/categories/add', categoryController.addCategory);

// Edit a category
router.post('/categories/edit', categoryController.editCategory);

// delete a category
router.post('/categories/:id/toggle-status', categoryController.toggleCategoryStatus)

module.exports = router;
