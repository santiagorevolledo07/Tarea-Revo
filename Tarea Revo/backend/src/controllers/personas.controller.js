const { getConnection, sql } = require('../database/connection');

// Endpoint para obtener los canales de contacto
const getCanalesContacto = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM CanalesContacto');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const pool = await getConnection();
    // LEFT JOIN para traer el nombre del canal si existe
    const result = await pool.request().query(`
      SELECT p.*, c.Nombre AS CanalNombre 
      FROM Personas p 
      LEFT JOIN CanalesContacto c ON p.CanalId = c.Id
    `);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(`
        SELECT p.*, c.Nombre AS CanalNombre 
        FROM Personas p 
        LEFT JOIN CanalesContacto c ON p.CanalId = c.Id 
        WHERE p.Id = @Id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  const { Nombre, Apellido, Edad, Correo, CanalId } = req.body;
  if (!Nombre || !Apellido || !Edad || !Correo) {
    return res.status(400).json({ message: 'Nombre, Apellido, Edad y Correo son obligatorios' });
  }

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('Nombre', sql.VarChar, Nombre)
      .input('Apellido', sql.VarChar, Apellido)
      .input('Edad', sql.Int, Edad)
      .input('Correo', sql.VarChar, Correo)
      .input('CanalId', sql.Int, CanalId ? CanalId : null) // Permite nulos si no tiene canal
      .query(`
        INSERT INTO Personas (Nombre, Apellido, Edad, Correo, CanalId) 
        OUTPUT INSERTED.Id 
        VALUES (@Nombre, @Apellido, @Edad, @Correo, @CanalId)
      `);
    
    res.status(201).json({ id: result.recordset[0].Id, Nombre, Apellido, Edad, Correo, CanalId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { Nombre, Apellido, Edad, Correo, CanalId } = req.body;
  if (!Nombre || !Apellido || !Edad || !Correo) {
    return res.status(400).json({ message: 'Nombre, Apellido, Edad y Correo son obligatorios' });
  }

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .input('Nombre', sql.VarChar, Nombre)
      .input('Apellido', sql.VarChar, Apellido)
      .input('Edad', sql.Int, Edad)
      .input('Correo', sql.VarChar, Correo)
      .input('CanalId', sql.Int, CanalId ? CanalId : null)
      .query(`
        UPDATE Personas SET 
          Nombre = @Nombre, 
          Apellido = @Apellido, 
          Edad = @Edad, 
          Correo = @Correo,
          CanalId = @CanalId
        WHERE Id = @Id
      `);
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }

    res.json({ message: 'Persona actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePersona = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query('DELETE FROM Personas WHERE Id = @Id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }

    res.json({ message: 'Persona eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCanalesContacto,
  getAll,
  getById,
  create,
  update,
  delete: deletePersona
};
