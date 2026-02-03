const { sequelize, User, Profile } = require('./models');

async function runExample() {
    try {
        await sequelize.transaction(async (t) => {
            const newUser = await User.create(
                {
                    username: 'Mike',
                    favoriteProfileId: 1,
                },
                { transaction: t },
            );

            await Profile.create(
                {
                    id: 1,
                    comment: 'Test deferrable',
                    userId: newUser.id,
                },
                { transaction: t },
            );
        });

        console.log('save successfully!');
    } catch (error) {
        console.error('Failed to save:', error);
    }
}

runExample();
