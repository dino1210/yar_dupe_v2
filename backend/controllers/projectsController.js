// controllers/projectsController.js
const db = require("../config/db");

// GET all projects
exports.getAllProjects = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM projects");
    res.json(rows);
  } catch (err) {
    console.error("GET PROJECTS ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// CREATE new project (with tools, vehicles, consumables, location)
exports.createProject = async (req, res) => {
  const {
    title,
    manager,
    personInCharge,
    location,
    tools,
    consumables,
    vehicles,
    startDate,
    endDate,
    status,
  } = req.body;

  const creator = "Yard Admin";

  try {
    const [result] = await db.query(
      `INSERT INTO projects 
        (title, manager, person_in_charge, location, creator, tools_equipment_used, consumables_used, vehicles_used, start_date, end_date, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, manager, personInCharge, location, creator, tools, consumables, vehicles, startDate, endDate, status]
    );

    // Tools update + logs
    if (tools) {
      const toolsArray = tools.split(",").map(t => t.trim());

      for (const toolName of toolsArray) {
        const [[tool]] = await db.query(`SELECT * FROM tools WHERE name = ? LIMIT 1`, [toolName]);

        if (tool) {
          await db.query(`UPDATE tools SET status = 'Issued Out' WHERE id = ?`, [tool.id]);

          await db.query(
            `INSERT INTO tools_logs (tool_tag, tool_name, performed_by, issued_date, status)
             VALUES (?, ?, ?, NOW(), 'Issued Out')`,
            [tool.tag_code, tool.name, manager]
          );
        } else {
          console.warn("Tool not found:", toolName);
        }
      }
    }

    // Vehicles update + logs
    if (vehicles) {
      const vehiclesArray = vehicles.split(",").map(v => v.trim());

      for (const vehicleName of vehiclesArray) {
        const [[vehicle]] = await db.query(`SELECT * FROM vehicles WHERE name = ? LIMIT 1`, [vehicleName]);

        if (vehicle) {
          await db.query(`UPDATE vehicles SET status = 'Issued Out' WHERE id = ?`, [vehicle.id]);

          await db.query(
            `INSERT INTO vehicles_logs (vehicle_name, performed_by, issued_date, status)
             VALUES (?, ?, NOW(), 'Issued Out')`,
            [vehicle.name, manager]
          );
        } else {
          console.warn("Vehicle not found:", vehicleName);
        }
      }
    }

    // Consumables quantity update + logs
    if (consumables) {
      const consumablesArray = consumables.split(",").map(c => c.trim());

      for (const consumableName of consumablesArray) {
        await db.query(
          `UPDATE consumables 
           SET quantity = quantity - 1 
           WHERE name = ? AND quantity > 0`,
          [consumableName]
        );

        await db.query(
          `INSERT INTO consumables_logs (consumable_name, performed_by, issued_date, status)
           VALUES (?, ?, NOW(), 'Issued Out')`,
          [consumableName, manager]
        );
      }
    }

    res.status(201).json({
      id: result.insertId,
      message: "Project created and resources updated successfully."
    });
  } catch (err) {
    console.error("CREATE PROJECT ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE existing project
exports.updateProject = async (req, res) => {
  const {
    title,
    manager,
    personInCharge,
    location,
    tools,
    consumables,
    vehicles,
    startDate,
    endDate,
    status,
  } = req.body;

  const { id } = req.params;

  try {
    const query = `
      UPDATE projects 
      SET title = ?, manager = ?, person_in_charge = ?, location = ?, 
          tools_equipment_used = ?, consumables_used = ?, vehicles_used = ?, 
          start_date = ?, end_date = ?, status = ?
      WHERE id = ?
    `;
    await db.query(query, [
      title,
      manager,
      personInCharge,
      location,
      tools,
      consumables,
      vehicles,
      startDate,
      endDate,
      status,
      id,
    ]);

    res.json({ message: "Project updated successfully." });
  } catch (err) {
    console.error("UPDATE PROJECT ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};
