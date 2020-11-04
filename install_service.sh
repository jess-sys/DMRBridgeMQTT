#!/usr/bin/env bash

## Check if we have sudo rights
if [ "$EUID" -ne 0 ]
  then echo "This script must be run as root. Exiting"
  exit
fi

## Check if node is installed
if command -v node > /dev/null
  then true
  else
    echo "Package node is not installed. Exiting"
    exit
fi

## Check if yarn is installed
if command -v yarn > /dev/null
  then true
  else
    echo "Package yarn is not installed. Exiting"
    exit
fi

## Prepare a clean directory in /opt with needed files
mkdir /opt/DMRBridgeMQTT
cp src /opt/DMRBridgeMQTT -R
cp package.json config.json /opt/DMRBridgeMQTT

## Copy systemd file
cp DMRBridgeMQTT.service /etc/systemd/system/DMRBridgeMQTT.service

## Install dependencies
cd /opt/DMRBridgeMQTT || echo "Problem with /opt/DMRBridgeMQTT directory. Exiting"
yarn

## Enable and start service
systemctl daemon-reload
systemctl enable DMRBridgeMQTT
systemctl start DMRBridgeMQTT
systemctl status DMRBridgeMQTT
