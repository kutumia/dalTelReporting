module.exports = (sequelize, Sequelize) => {
    const preservedProgress = sequelize.define("preservedProgress", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
        type: Sequelize.STRING
      },
      production: {
        type: Sequelize.STRING
      },
      preserved: {
        type: Sequelize.STRING
      },
      sold: {
        type: Sequelize.STRING
      },
      customer: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      dd_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return preservedProgress;
  };