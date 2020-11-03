# DMRBridgeMQTT
Send predefined audio files on a DMR Network using MQTT

[![ForTheBadge uses-js](http://ForTheBadge.com/images/badges/uses-js.svg)](http://ForTheBadge.com)
[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://GitHub.com/Naereen/)

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)

# Getting started

This script is intended to be used with DMRBridgeWAV (https://github.com/jess-sys/DMRBridgeWAV).

Node v14.8.0 and Yarn 1.22.10 are preferred.

### Install dependencies

```bash
$ yarn
```

### Edit configuration file

### Install systemd service (optional)

# Usage

### As a systemd service

```bash
$ systemctl DMRBridgeMQTT enable --now
```

### As a standalone software

```bash
$ yarn start
```

# Useless stuff (copyright)

Copyright (C) 2020 Jessy SOBREIRO

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 2.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
