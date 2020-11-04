const {exec} = require('child_process');
const SysLogger = require('ain2');
const mqtt = require('mqtt')

const TTS = require('./TTSHandler')
const config = require('../config.json')

let logger = console;

if (config.log.mode === "syslog") {
    logger = new SysLogger({tag: 'DMRBridgeMQTT'});
}

class Message {
    constructor(controlTopic, messageTopic, client) {
        this.controlTopic = controlTopic
        this.messageTopic = messageTopic
    }

    async parse(topic, message) {
        if (topic !== this.messageTopic) {
            return
        }

        if (!message || ! ('play' in JSON.parse(message)) || !('lang' in JSON.parse(message))) {
            return
        }

        let parsedMessage = JSON.parse(message)
        let TTSHandler = new TTS.Handler(parsedMessage)

        this.log(topic, message, parsedMessage)

        let path = await TTSHandler.getPathOrCreate()

        logger.log("info: Contacting DMR Bridge")
        await exec(`${config.DMRBridgeWAVPath}/DMRBridgeWAV -i ${path}`);
        logger.log("info: Contacting DMR Bridge... OK")
    }

    log(topic, message, state) {
        logger.log("info: MQTT Payload received")
    }
}

class Handler {
    constructor(config) {
        // import props
        this.messageTopic = config.mqtt.messageTopic
        this.controlTopic = config.mqtt.controlTopic
        this.address = config.mqtt.serverAddress
        this.port = config.mqtt.serverPort

        logger.log(`info: Connecting to MQTT (mqtt://${this.address}:${this.port})`)
    }

    async listen() {
        let client = mqtt.connect(`mqtt://${this.address}:${this.port}`)
        let address = this.address
        let port = this.port
        let controlTopic = this.controlTopic
        let messageTopic = this.messageTopic

        global.client = client

        // On connection, send availability
        client.on('connect', function () {
            client.subscribe(messageTopic, function (err) {
                if (!err) {
                    logger.log(`info: Connecting to MQTT (mqtt://${address}:${port})... OK`)
                    logger.log(`info: Listening for messages (on ${messageTopic})`)
                    return true
                }
            })
        })

        // On message, parse it
        client.on('message', function (topic, message) {
            let newMessage = new Message(controlTopic, messageTopic, client)
            newMessage.parse(topic, message)
        })
    }
}

module.exports = {
    'handler': Handler
}