const Data = (sequelize, DataTypes) => {
  const Datas = sequelize.define('Data', {
    date: DataTypes.STRING,
  });

  return Datas;
};

module.exports = Data;
