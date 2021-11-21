'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [{
      text: 'test1',
      UserId: 2,
      RestaurantId: 35,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      text: 'test2',
      UserId: 3,
      RestaurantId: 35,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      text: 'test3',
      UserId: 3,
      RestaurantId: 35,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      text: 'test4',
      UserId: 3,
      RestaurantId: 45,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {})
  }
};
