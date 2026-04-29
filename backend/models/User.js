const db = require('../config/db');

const User = {

  findByEmail: async (email) => {
    const [results] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return results[0];
  },

  // 1. Añadimos avatar_url = null por si el usuario decide no crear su avatar
  create: async ({ nombre, email, password, altura = null, peso = null, edad = null, avatar_config = null }) => {
    
    // 2. Añadimos avatar_url al INSERT INTO y un nuevo símbolo '?' en VALUES
    const sql = `
      INSERT INTO usuarios (nombre, email, password, altura, peso, edad, rol, avatar_url)
      VALUES (?, ?, ?, ?, ?, ?, 'user', ?)
    `;
    
    // 3. Metemos avatar_url al final del array para que coincida con el último '?'
    const [result] = await db.query(sql, [nombre, email, password, altura, peso, edad, avatar_config]);
    
    return result.insertId;
  }

};

module.exports = User;