module.exports = (sequelize, Sequelize) => {
    const seedInitial = sequelize.define("seedInitial", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
        type: Sequelize.STRING
      },
      fname: {
        type: Sequelize.STRING
      },
      mnum: {
        type: Sequelize.STRING
      },
      nid: {
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
  
    return seedInitial;
  };