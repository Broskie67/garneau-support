const sequelize = require('../connection');
const createDatabase = require('../createDatabase')
const { seedUsers } = require('./data/seedUsers')
const { seedTickets } = require('./data/seedTickets')
const { seedComments} = require('./data/seedComments')

/**
 * Connecte a la base de données, 
 */
async function seedDatabase() {
  try {
    await createDatabse()
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    await seedUsers()
    await seedTickets()
    await seedComments()
    
    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase()