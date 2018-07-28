---
title: EvilPi Setup
layout: post
categories: evilpi
---

# EvilPi, Setup eines Man-In-The-Middle Raspberry Pi

## Übersicht
### Setup
* Raspberry Pi 3, Internetzugriff über Ethernet
### Ergebnis
* Ein WLAN Access Point, sodass Netzwerkverkehr mitgeschnitten werden kann.

## Anleitung

1. Download des aktuellen Lite-Raspbians:
```
wget https://downloads.raspberrypi.org/raspbian_lite_latest --output-document=raspbian-lite.zip
```
2. Unzip 
```
unzip raspbian-lite.zip
```
3. Flashen der SD Karte (In meinem Fall: Eingabedatei ```2018-06-27-raspbian-stretch-lite.img```, SD-Karte an Device ```/dev/sdb```:
```
sudo dd if=./2018-06-27-raspbian-stretch-lite.img of=/dev/sdb bs=16M conv=fsync
``` 

