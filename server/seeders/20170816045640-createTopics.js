'use strict';

const Topic = require('../models').Topic

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Topic.bulkCreate([
      { title: "Quantum Internet Is 13 Years Away. Wait, What's Quantum Internet?", url: "https://www.wired.com/story/quantum-internet-is-13-years-away-wait-whats-quantum-internet/", content: "Very interesting article that gives a brief introduction to quantum internet."},
      { title: "One Year Later, No Man's Sky—and Its Evolution—Is Worth Exploring", url: "https://www.wired.com/story/no-mans-sky-one-year-later/", content: "No Man's Sky promised infinity, and that's a promise nothing can ever keep." }
    ])
    .then(function() {
      console.log('Topics created!')
    })
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
