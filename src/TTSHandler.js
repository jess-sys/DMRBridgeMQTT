const {exec} = require('child_process');
const GTTS = require('gtts');
const fs = require('fs')

const config = require('../config.json')

let logger = console;

if (config.log.mode === "syslog") {
    logger = new SysLogger({tag: 'DMRBridgeMQTT'});
}

class TTS {
    constructor(message) {
        this.message = message.play
        this.language = message.lang
        this.formatted = String()
        this.path = String()
        this.exist = Boolean()
    }

    format() {
        let new_message = this.message

        new_message = String(new_message).replace(/\s+/g, '-').replace(/\W/g, '-').toLowerCase()
        this.formatted = new_message
        return new_message
    }

    exists() {
        let path = this.path

        try {
            if (fs.existsSync(path)) {
                this.exist = true
                return true
            } else {
                this.exist = false
                return false
            }
        } catch (err) {
            this.exist = false
            return false
        }
    }

    async create() {
        logger.log("info: Creating new TTS file (" + this.path + ")")

        let path = this.path
        let gtts = new GTTS(this.message, this.language)

        await gtts.save(path + '.tmp.mp3', async function (err, result) {
            if (err) {
                throw new Error(err)
            }

            await exec(`ffmpeg -i ${path}.tmp.mp3 -ar 8000 -ac 1 -acodec pcm_s16le ${path}.wav`);
            logger.log("info: Creating new TTS file (" + path + ")... OK")
        });
    }

    getPath() {
        let formatted_message = this.formatted
        let new_path = `${config.soundFilesPath}/${formatted_message}`

        this.path = new_path
        return new_path
    }

    async getPathOrCreate() {
        this.format()
        this.getPath()
        this.exists()

        if (!this.exist) {
            logger.log("info: TTS File " + this.path + " does not exist, creating it.")
            await this.create()
        } else {
            logger.log("info: TTS File " + this.path + " exists.")
        }
        return this.path + '.wav'
    }
}

module.exports = {
    "Handler": TTS
}