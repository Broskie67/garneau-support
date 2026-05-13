const bcrypt = require('bcrypt');
const User = require('../../../models/user');

async function seedUsers() {
  await User.bulkCreate([
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'a@asp.ca',
      password_hash: bcrypt.hashSync('Password123!', 10),
      phone_number: '418-123-4567',
      role: 'client',
      is_active: true
    },
    {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'b@asp.ca',
      password_hash: bcrypt.hashSync('Password123!', 10),
      phone_number: '418-555-5678',
      role: 'client',
      is_active: false
    },
    {
      first_name: 'tech1',
      last_name: 'Agent',
      email: 'tech1@asp.ca',
      password_hash: bcrypt.hashSync('Password123!', 10),
      phone_number: '418-888-8888',
      role: 'technicien',
      is_active: true
    },
    {
      first_name: 'tech2',
      last_name: 'Agent',
      email: 'tech2@asp.ca',
      password_hash: bcrypt.hashSync('Password123!', 10),
      phone_number: '418-777-7777',
      role: 'technicien',
      is_active: true
    },
    {
      first_name: 'tech3',
      last_name: 'Agent',
      email: 'tech3@asp.ca',
      password_hash: bcrypt.hashSync('Password123!', 10),
      phone_number: '418-666-6666',
      role: 'technicien',
      is_active: true
    },
    {
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@asp.ca',
      password_hash: bcrypt.hashSync('Password123!', 10),
      phone_number: '418-999-9999',
      role: 'admin',
      is_active: true
    }
  ]);
}

module.exports = {
  seedUsers
}