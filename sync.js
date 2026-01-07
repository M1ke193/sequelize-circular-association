const db = require('./models');

const run = async () => {
    try {
        console.log('starting sync db...');
        await db.sequelize.sync({ alter: true });
        console.log('Database synced!');
    } catch (error) {
        console.error('Failed to sync db', error);
    } finally {
        await db.sequelize.close();
    }
};

run();
