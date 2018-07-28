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
4. ```sync```, Karte raus, Karte rein, neu mounten.
5. In der Bootpartition ein leeres File ```ssh``` anlegen, um headless arbeiten zu können
6. ```sync```, Karte raus, Karte in den Pi
7. Pi mit dem Router verbinden, Pi starten, IP Adresse herausfinden
8. ```ssh pi@<IP Adresse>```
9. Updaten, Pakete nachinstallieren:
```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install vim
```

