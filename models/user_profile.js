const { Model } = require('sequelize');

let afterSyncTimes = 1;

module.exports = (sequelize, DataTypes) => {
    class UserProfile extends Model {
        static associate(models) {
            UserProfile.belongsTo(models.UserProfile, {
                foreignKey: 'test_id',
                // constraints: false, // try to uncomment this line to break circular association
            });
        }
    }

    UserProfile.init(
        {
            test: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'UserProfile',
            tableName: 'user_profile',
            hooks: {
                afterSync: async (_options) => {
                    console.log(`After sync hook of "UserProfile" table is called ${afterSyncTimes} times`);
                    afterSyncTimes++;
                },
            },
        }
    );

    return UserProfile;
};
