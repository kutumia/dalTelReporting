module.exports = (sequelize, Sequelize) => {
    const seedProgress = sequelize.define("seedProgress", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
        type: Sequelize.STRING,
      },
      mnum: {
        type: Sequelize.STRING
      },
      village: {
        type: Sequelize.STRING
      },
      block: {
        type: Sequelize.STRING
      },
      union: {
        type: Sequelize.STRING
      },
      cname: {
        type: Sequelize.STRING
      },
      breed: {
        type: Sequelize.STRING
      },
      bopondate: {
        type: Sequelize.STRING
      },
      situation: {
        type: Sequelize.STRING
      },
      saao: {
        type: Sequelize.STRING
      },
     
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return seedProgress;
  };