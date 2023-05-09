const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "curtain_c_local", // นี่เป็นชื่อ DB ของเราน
  "postgres", // user ที่ใช้สรการเข้าไปยัง db
  "12345678", // password
  {
    host: "localhost", // host ของ db ที่เราสร้างเอาไว้
    dialect: "postgres", // 'mysql' | 'mariadb' | 'postgres' | 'mssql'   พวกนี้ใช่ก็ใช้ได้นะจ๊ะ
    define: {
      timestamps: false, //ส่วนตรงนี้ก็เป็นการตั้งค่าเพิ่มเติม
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.model")(sequelize, Sequelize);
db.jobs = require("./jobs.model")(sequelize, Sequelize);
db.rooms = require("./rooms.model")(sequelize, Sequelize);
db.test = require("./test.model")(sequelize, Sequelize);
db.test1 = require("./test1.model")(sequelize, Sequelize);
db.testing = require("./testing.model")(sequelize, Sequelize);
db.user = require("./usersdb.model")(sequelize, Sequelize);

// db.jobs.hasMany(db.rooms, {
//   foreignKey: "rooms_id",
// });
// db.rooms.belongsTo(db.jobs);

module.exports = db;

// ส่วนนี้เป็นการตั้งต่า relation โดยเป็นการบอกว่าใน 1 team มีได้หลาย player ง่ายๆ ก็คือ relation แบบ 1:M
//   db.team.hasMany(
//     db.player,
//     {
//         foreignKey: { name: 'tid', field: 'tid' }, //name ตรงสำคัญพยายามตั่งให้เป็นชื่อเดียวกับ FK ใน table ที่นำไปใช้
//     }
//   };

// ส่วนนี้เป็นการตั้ง relation แบบกลับกันกับด้านบน จริงแล้วเราไม่ตั้งก็ได้แต่แนะนำให้ตั้งเอาไว้ เพราะเวลาที่เราไม่ได้ใส่
// line นี้จะทำให้เราสามารถใช้  team ในการหา player ได้อย่างเดียวและไม่สามารถใช้ player หา team ได้
//   db.player.belongsTo(db.team, { foreignKey: 'tid' });
