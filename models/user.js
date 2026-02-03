const { Model, Deferrable } = require('sequelize');

let afterSyncTimes = 1;

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // User.belongsTo(models.Profile, {
            //     foreignKey: 'profile_id',
            //     //constraints: false, // try to uncomment this line to break circular association
            // });
        }
    }

    User.init(
        {
            username: DataTypes.STRING,
            favoriteProfileId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'profile',
                    key: 'id',
                    deferrable: Deferrable.INITIALLY_DEFERRED,
                },
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'user',
            hooks: {
                afterSync: async (_options) => {
                    console.log(
                        `After sync hook of "user" table is called ${afterSyncTimes} times`,
                    );
                    afterSyncTimes++;
                },
            },
        },
    );

    return User;
};
