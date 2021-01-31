module.exports = (sequelize, Sequelize) => {
    const blockProgress = sequelize.define("blockProgress", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      aname: {
        type: Sequelize.STRING
      },
      dname: {
        type: Sequelize.STRING
      },
      upazilla: {
        type: Sequelize.STRING
      },
      crop: {
        type: Sequelize.STRING
      },
      trialnum: {
        type: Sequelize.STRING
      },
      seed: {
        type: Sequelize.STRING
      },
      organic: {
        type: Sequelize.STRING
      },
      chemical: {
        type: Sequelize.STRING
      },
      purify: {
        type: Sequelize.STRING
      },
      balainashok: {
        type: Sequelize.STRING
      },
      agacha: {
        type: Sequelize.STRING
      },
      signboard: {
        type: Sequelize.STRING
      },
      register: {
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
  
    return blockProgress;
  };