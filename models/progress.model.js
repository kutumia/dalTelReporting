module.exports = (sequelize, Sequelize) => {
    const progress = sequelize.define("progress", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      upazilla: {
        type: Sequelize.STRING
      },
      sme: {
        type: Sequelize.STRING
      },
      robi: {
        type: Sequelize.STRING
      },
      kharifone: {
        type: Sequelize.STRING
      },
      khariftwo: {
        type: Sequelize.STRING
      },
      block: {
        type: Sequelize.STRING
      },
      gojano: {
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
  
    return progress;
  };