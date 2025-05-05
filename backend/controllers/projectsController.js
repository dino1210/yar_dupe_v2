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

// CREATE new project
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

    if (status === "Ongoing") {
      await exports.issueResources({
        body: {
          consumables: consumables ? consumables.split(",").map(c => c.trim()) : [],
          personInCharge,
          location
        }
      }, { status: () => ({ json: () => {} }) });
    }
    

    res.status(201).json({
      id: result.insertId,
      message: "Project created successfully."
    });
  } catch (err) {
    console.error("CREATE PROJECT ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ISSUE resources
exports.issueResources = async (req, res) => {
  const { tools = [], consumables = [], vehicles = [], personInCharge, location } = req.body;
  const performedBy = personInCharge || "System Auto";

  try {
    for (const name of tools) {
      const [[tool]] = await db.query(`SELECT * FROM tools WHERE name = ? LIMIT 1`, [name]);
      if (tool) {
        await db.query(`UPDATE tools SET status = 'Issued Out' WHERE id = ?`, [tool.id]);
        await db.query(
          `INSERT INTO tools_logs (tool_tag, tool_name, performed_by, issued_date, status, location)
           VALUES (?, ?, ?, NOW(), 'Issued Out', ?)`,
          [tool.tag_code, tool.name, performedBy, location]
        );
      }
    }

    for (const name of vehicles) {
      const [[vehicle]] = await db.query(`SELECT * FROM vehicles WHERE name = ? LIMIT 1`, [name]);
      if (vehicle) {
        await db.query(`UPDATE vehicles SET status = 'Issued Out' WHERE id = ?`, [vehicle.id]);
        await db.query(
          `INSERT INTO vehicles_logs (vehicle_name, performed_by, issued_date, status)
           VALUES (?, ?, NOW(), 'Issued Out')`,
          [vehicle.name, performedBy]
        );
      }
    }

    for (const name of consumables) {
      const [[consumable]] = await db.query(`SELECT * FROM consumables WHERE name = ? LIMIT 1`, [name]);
      if (consumable.quantity > 0) {
        await db.query(`UPDATE consumables SET quantity = quantity - 1 WHERE id = ?`, [consumable.id]);
        await db.query(
          `INSERT INTO consumables_logs (consumable_name, performed_by, issued_date, status)
           VALUES (?, ?, NOW(), 'Issued Out')`,
          [consumable.name, performedBy]
        );
      }
      
    }

    if (res.status) {
      res.status(200).json({ message: "Resources successfully issued." });
    }
  } catch (err) {
    console.error("ISSUE RESOURCES ERROR:", err.message);
    if (res.status) {
      res.status(500).json({ error: "Server error while issuing resources." });
    }
  }
};

// RETURN resources
exports.returnResources = async (req, res) => {
  const { tools = [], consumables = [], vehicles = [], personInCharge, location } = req.body;
  const performedBy = personInCharge || "System Auto";

  try {
    for (const name of tools) {
      const [[tool]] = await db.query(`SELECT * FROM tools WHERE name = ? LIMIT 1`, [name]);
      if (tool) {
        await db.query(`UPDATE tools SET status = 'Available' WHERE id = ?`, [tool.id]);
        await db.query(
          `INSERT INTO tools_logs (tool_tag, tool_name, performed_by, issued_date, status, location)
           VALUES (?, ?, ?, NOW(), 'Returned', ?)`,
          [tool.tag_code, tool.name, performedBy, location]
        );
      }
    }

    for (const name of vehicles) {
      const [[vehicle]] = await db.query(`SELECT * FROM vehicles WHERE name = ? LIMIT 1`, [name]);
      if (vehicle) {
        await db.query(`UPDATE vehicles SET status = 'Available' WHERE id = ?`, [vehicle.id]);
        await db.query(
          `INSERT INTO vehicles_logs (vehicle_name, performed_by, issued_date, status)
           VALUES (?, ?, NOW(), 'Returned')`,
          [vehicle.name, performedBy]
        );
      }
    }

    for (const name of consumables) {
      await db.query(`UPDATE consumables SET quantity = quantity + 1 WHERE name = ?`, [name]);
      await db.query(
        `INSERT INTO consumables_logs (consumable_name, performed_by, issued_date, status)
         VALUES (?, ?, NOW(), 'Returned')`,
        [name, performedBy]
      );
    }

    res.status(200).json({ message: "Resources successfully returned." });
  } catch (err) {
    console.error("RETURN RESOURCES ERROR:", err.message);
    res.status(500).json({ error: "Server error while returning resources." });
  }
};

// UPDATE project
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
    const [[oldProject]] = await db.query(`SELECT * FROM projects WHERE id = ?`, [id]);
    const oldStatus = oldProject.status;

    await db.query(
      `UPDATE projects 
       SET title = ?, manager = ?, person_in_charge = ?, location = ?, 
           tools_equipment_used = ?, consumables_used = ?, vehicles_used = ?, 
           start_date = ?, end_date = ?, status = ?
       WHERE id = ?`,
      [title, manager, personInCharge, location, tools, consumables, vehicles, startDate, endDate, status, id]
    );

    if (["Completed", "Cancelled"].includes(status) && oldStatus !== status) {
      await exports.returnResources({
        body: {
          tools: tools ? tools.split(",").map(t => t.trim()) : [],
          consumables: consumables ? consumables.split(",").map(c => c.trim()) : [],
          vehicles: vehicles ? vehicles.split(",").map(v => v.trim()) : [],
          personInCharge,
          location
        }
      }, { status: () => ({ json: () => {} }) });
    }

    if (status === "Ongoing" && oldStatus === "Upcoming") {
      await exports.issueResources({
        body: {
          tools: tools ? tools.split(",").map(t => t.trim()) : [],
          consumables: consumables ? consumables.split(",").map(c => c.trim()) : [],
          vehicles: vehicles ? vehicles.split(",").map(v => v.trim()) : [],
          personInCharge,
          location
        }
      }, { status: () => ({ json: () => {} }) });
    }

    res.json({ message: "Project updated successfully." });
  } catch (err) {
    console.error("UPDATE PROJECT ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// GET project stats
exports.getProjectStats = async (req, res) => {
  try {
    const [total] = await db.query("SELECT COUNT(*) AS total FROM projects");
    const [ongoing] = await db.query("SELECT COUNT(*) AS ongoing FROM projects WHERE status = 'Ongoing'");
    const [completed] = await db.query("SELECT COUNT(*) AS completed FROM projects WHERE status = 'Completed'");
    const [upcoming] = await db.query("SELECT COUNT(*) AS upcoming FROM projects WHERE status = 'Upcoming'");
    const [cancelled] = await db.query("SELECT COUNT(*) AS cancelled FROM projects WHERE status = 'Cancelled'");

    res.json({
      total: total[0].total,
      ongoing: ongoing[0].ongoing,
      completed: completed[0].completed,
      upcoming: upcoming[0].upcoming,
      cancelled: cancelled[0].cancelled,
    });
  } catch (err) {
    console.error("PROJECT STATS ERROR:", err.message);
    res.status(500).json({ error: "Failed to fetch project statistics." });
  }
};
