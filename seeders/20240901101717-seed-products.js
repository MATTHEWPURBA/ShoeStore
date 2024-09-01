"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  const [categories] = await queryInterface.sequelize.query(
    `SELECT id, name FROM "Categories" WHERE name IN ('Sport', 'Casual');`
  );

  const sportCategory = categories.find(category => category.name === 'Sport');
  // ini nyari category terus di bawah nya di tarik id nya
  const casualCategory = categories.find(category => category.name === 'Casual');

  if (sportCategory && casualCategory) {
    await queryInterface.bulkInsert('Products', [
      // Sport Category Products
      {
        name: 'Running Shoes',
        description: 'Comfortable running shoes with excellent cushioning.',
        price: 79.99,
        stock: 50,
        category_id: sportCategory.id,
        image_url: 'http://example.com/running-shoes.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat for all your workout needs.',
        price: 25.00,
        stock: 100,
        category_id: sportCategory.id,
        image_url: 'http://example.com/yoga-mat.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Casual Category Products
      {
        name: 'Leather Boots',
        description: 'Stylish leather boots for casual and formal wear.',
        price: 120.00,
        stock: 30,
        category_id: casualCategory.id,
        image_url: 'http://example.com/leather-boots.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Casual Sneakers',
        description: 'Comfortable sneakers for everyday use.',
        price: 60.00,
        stock: 80,
        category_id: casualCategory.id,
        image_url: 'http://example.com/casual-sneakers.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  }
  
  
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
