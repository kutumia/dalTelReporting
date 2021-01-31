module.exports = (sequelize, Sequelize) => {
    const honey = sequelize.define("honey", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      upazilla: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      mnum: {
        type: Sequelize.STRING
      },
      box: {
        type: Sequelize.STRING
      },
      production: {
        type: Sequelize.STRING
      },
      foshol: {
        type: Sequelize.STRING
      },
      whichbox: {
        type: Sequelize.STRING
      },
      sthanio: {
        type: Sequelize.STRING
      },
      experience: {
        type: Sequelize.STRING
      },
      sme: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return honey;
  };