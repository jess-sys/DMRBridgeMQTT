# DMRBridgeMQTT
Send predefined audio files on a DMR Network using MQTT

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://GitHub.com/jess-sys/)

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)

# Getting started

This script is intended to be used with DMRBridgeWAV (https://github.com/jess-sys/DMRBridgeWAV).

Node v14.8.0 and Yarn 1.22.10 are preferred.

### Install dependencies

```bash
$ yarn
```

### Edit configuration file

Change the following variables to suit your needs.

```json
{
  "mqtt": {
    "serverAddress": "172.30.42.120",
    "serverPort": 1883,
    "messageTopic": "DMR/radio0/message",
    "controlTopic": "DMR/radio0/control"
  },
  "soundFilesPath": "/opt/DMRBridgeMQTT/sounds"
}
```

### Install systemd service (optional)

```bash
$ yarn install_service
```

# Usage

### As a systemd service

```bash
$ systemctl DMRBridgeMQTT enable --now
```

### As a standalone software

```bash
$ yarn start
```

The specified `messageTopic` will be monitored. When a new message is received, it'll build a filename with the payload suffixed with ".wav". It will then try to load this file from the `soundFilesPath` directory. If the file cannot be loaded, a message will be sent on the `controlTopic` topic.

# Useless stuff (copyright)

Copyright (C) 2020 Jessy SOBREIRO

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 2.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
