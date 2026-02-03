const { Model, Deferrable } = require('sequelize');

let afterSyncTimes = 1;

module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {
        static associate(models) {
            // Profile.belongsTo(models.User, {
            //     foreignKey: 'create_by_user',
            //     // constraints: false, // try to uncomment this line to break circular association
            // });
        }
    }

    Profile.init(
        {
            comment: DataTypes.STRING,
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'user',
                    key: 'id',
                    deferrable: Deferrable.INITIALLY_DEFERRED,
                },
            },
        },
        {
            sequelize,
            modelName: 'Profile',
            tableName: 'profile',
            hooks: {
                afterSync: async (_options) => {
                    console.log(
                        `After sync hook of "profile" table is called ${afterSyncTimes} times`,
                    );
                    afterSyncTimes++;
                },
            },
        },
    );

    return Profile;
};
