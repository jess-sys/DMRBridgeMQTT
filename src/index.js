(async () => {
    try {
        const SysLogger = require('ain2');
        const config = require('../config.json')
        const mqtt = require('./mqttHandler')

        let mqttHandler = new mqtt.handler(config)
        let logger = console;

        // Logs to syslog if specified
        if (config.log.mode === "syslog") {
            logger = new SysLogger({tag: 'DMRBridgeMQTT'});
        }

        // Listen MQTT commands in the background
        mqttHandler.listen()
    } catch (e) {
        console.error(e)
        console.error('error: crashed! Is the MQTT broker running ?')
        process.exit()
    }
})();