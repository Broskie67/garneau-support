const sequelize = require('../connection');
const { seedUsers } = require('./data/seedUsers')
const { seedTickets } = require('./data/seedTickets')

/**
 * Connects to the database, synchronizes the Sequelize models,
 * inserts the initial seed data, then closes the connection.
 */
async function seedDatabase() {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    await seedUsers()
    await seedTickets()
    
    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase()