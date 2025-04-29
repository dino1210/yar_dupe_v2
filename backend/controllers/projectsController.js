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

  const creator = "Yard Admin"; // Default creator

  try {
    // 1. Save the Project
    const query = `
      INSERT INTO projects 
      (title, manager, person_in_charge, location, creator, tools_equipment_used, consumables_used, vehicles_used, start_date, end_date, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [
      title,
      manager,
      personInCharge,
      location,
      creator,
      tools,
      consumables,
      vehicles,
      startDate,
      endDate,
      status,
    ]);

    // 2. Update Tools status to 'Issued Out'
    if (tools) {
      const toolsArray = tools.split(",").map((t) => t.trim());
      for (const tool of toolsArray) {
        await db.query(
          `UPDATE tools SET status = 'Issued Out' WHERE name = ?`,
          [tool]
        );
      }
    }

    // 3. Update Vehicles status to 'Issued Out'
    if (vehicles) {
      const vehiclesArray = vehicles.split(",").map((v) => v.trim());
      for (const vehicle of vehiclesArray) {
        await db.query(
          `UPDATE vehicles SET status = 'Issued Out' WHERE name = ?`,
          [vehicle]
        );
      }
    }

    // 4. Decrease Consumables quantity
    if (consumables) {
      const consumablesArray = consumables.split(",").map((c) => c.trim());
      for (const consumable of consumablesArray) {
        await db.query(
          `UPDATE consumables SET quantity = quantity - 1 WHERE name = ? AND quantity > 0`,
          [consumable]
        );
      }
    }

    res.status(201).json({ id: result.insertId, message: "Project created and resources updated successfully." });
  } catch (err) {
    console.error("CREATE PROJECT ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE project (with tools, vehicles, consumables, location)
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
      SET title = ?, manager = ?, person_in_charge = ?, location = ?, tools_equipment_used = ?, consumables_used = ?, vehicles_used = ?, start_date = ?, end_date = ?, status = ?
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

    res.json({ message: "Project updated successfully" });
  } catch (err) {
    console.error("UPDATE PROJECT ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};