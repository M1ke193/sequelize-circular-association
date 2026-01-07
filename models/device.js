const { Model } = require('sequelize');

let afterSyncTimes = 1;

module.exports = (sequelize, DataTypes) => {
    class Device extends Model {
        static associate(models) {}
    }

    Device.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            port: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            },
        },
        {
            sequelize,
            modelName: 'Device',
            tableName: 'device',
            hooks: {
                afterSync: async (_options) => {
                    console.log(`After sync hook of "deivce" table is called ${afterSyncTimes} times`);
                    afterSyncTimes++
                },
            },
        }
    );

    sequelize.addHook('beforeBulkSync', (syncOptions) => {
        console.log('BeforeBulkSync is called');
    });

    sequelize.addHook('afterBulkSync', async (syncOptions) => {
        console.log('AfterBulkSync has been called to create trigger');
        return sequelize.query(`
            CREATE OR REPLACE FUNCTION devices_log_fn()
            RETURNS trigger AS $$
            BEGIN
                RAISE NOTICE '[TRIGGER] action=%, id=%',
                    TG_OP,
                    COALESCE(NEW.id, OLD.id);

                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;

            CREATE TRIGGER devices_log_trg
            AFTER INSERT OR UPDATE OR DELETE ON public.device
            FOR EACH ROW
            EXECUTE FUNCTION devices_log_fn();
        `);
    });

    return Device;
};
