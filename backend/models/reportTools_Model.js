const db = require("../config/db");

const reportToolsModel = {
  getAllTools: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          id,
          item_name,
          tag_code,
          category,
          quantity,
          unit,
          min_stock,
          location
        FROM 
          toolstable
      `;

      db.query(query, (err, results) => {
        if (err) {
          console.error("Error fetching tools report:", err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};

module.exports = reportToolsModel;
