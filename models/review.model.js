module.exports = (sequelize, Sequelize) => {
    const review = sequelize.define("review", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      date: {
        type: Sequelize.STRING
      },
      present: {
        type: Sequelize.STRING
      },
      male: {
        type: Sequelize.STRING
      },
      female: {
        type: Sequelize.STRING
      },
      resource: {
        type: Sequelize.STRING
      },
      resourceDetails: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return review;
  };