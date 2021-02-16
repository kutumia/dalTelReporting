module.exports = (sequelize, Sequelize) => {
    const motivation = sequelize.define("motivation", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      date: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      place: {
        type: Sequelize.STRING
      },
      details: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return motivation;
  };