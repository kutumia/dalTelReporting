module.exports = (sequelize, Sequelize) => {
    const recievedCrops = sequelize.define("recievedCrops", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      block: {
        type: Sequelize.STRING
      },
      farmer: {
        type: Sequelize.STRING
      },
      crop: {
        type: Sequelize.STRING
      },
      breed: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.STRING
      },
      bopondate: {
        type: Sequelize.STRING
      },
      cutdate: {
        type: Sequelize.STRING
      },
      folon: {
        type: Sequelize.STRING
      },
      hectorfolon: {
        type: Sequelize.STRING
      },
      seedAmount: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
     
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return recievedCrops;
  };