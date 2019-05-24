---
title: Telnet,SSL,LetsEncrypt
layout: post
categories: kladde
---

# Telnet,SSL,LetsEncrypt

Das ist eine kleine Studie, was man tun muss, um gesicherte Verbindungen möglichst schmerzfrei und verbindungstransparent zu verwalten.
Anlass ist, dass mir die [Telnet-Website](https://gitlab.com/mb/telnet-site) über den Weg gelaufen ist. Deren Beispiele laufen mit inetd/telnet, um
eine Terminal-Erlebnis zu transportieren. Meine erste Etappe, dies noch zu verbessern, ist, die Verbindung zu sichern.

Und damit man das Rad nicht neu erfindet, lohnt sich ein Blick zu NetHack. Öffentliche NetHack-Server verwenden sehr häufig:
* SSH: (bspw. `ssh nethack@alt.org`)
* Telnet: (`telnet nethack.alt.org`)

SSH behalte ich im Hinterkopf. Aber für diesen Artikel zeige ich, was mit Telnet möglich ist. Am Ende steht ein Server, der
eine NetHack-Session über eine gesicherte SSL Verbindung ausliefert.

# Warnung
Das ist ein Proof-Of-Concept und wird nicht für den Produktivbetrieb empfohlen! Es gibt gute Gründe, warum öffentliche NetHack Server ihre Prozesse chroot-en, jailen, den NetHack Code patchen, etc. NetHack ist nicht dafür geschrieben worden, gegen böswillige Internetuser gewappnet zu sein!

## Vorbereitung
Was ihr zum Nachmachen braucht:
* Einen Computer mit 
    * Internetzugang. Wenn er keine öffentliche IP hat, muss Port 80 (für HTTP) und Port 60123 (oder beliebiger Port >60000) von eurem Router weitergeleitet bekommen.
    * Debian GNU/Linux. Mein Tutorial ist Linux-spezifisch, am Beispiel von Raspbian auf einem Raspberry Pi.
    * Nethack: `sudo apt install nethack`
    * Telnetd-ssl: `sudo apt install telnetd-ssl`
* Eine Domain, die auf deine IP Adresse abbildet. Im weiteren Verlauf nenne ich sie `<meine.domain>` und ihr müsst eure eigene einsetzen. Gratis dyndns

## Zertifikat besorgen: LetsEncrypt
Jede SSL Verbindung braucht ein Zertifikat. Jahrelang wurden Beispiele, Hochschulseminare und Tutorials mit selbstsignierten Zertifikaten gemacht. Damit hören wir jetzt auf!

Installiert euch [certbot](https://certbot.eff.org)! Mein Anwendungsgebiet für das Zertifikat ist kein Websever, also wähle ich
``I am using "None of the above" on "Debian testing/unstable"``
und mir wird empfohlen, certbot wie folgt zu installieren:

``sudo apt install certbot``

Danach starten wir certbot wie folgt:

``sudo certbot certonly``

Jetzt kommt der Grund, warum wir Port 80 brauchen: Damit Certbot kurzfristig einen Webserver eröffnet, um das Zertifikat zu legitimieren:

Wählt auf die Frage ``How would you like to authenticate with the ACME CA?`` die Antwort ``Spin up a temporary webserver (standalone)`` und gebt danach eure Domain ein.

Am Ende erhalten wir unter `/etc/letsencrypt/<meine.domain>/` ein vollwertiges Zerifikat, was von allen modernen Betriebssystemen akzeptiert wird \o/.

Seit certbot v0.19.0 müssen wir uns nicht mehr darum kümmern, einen cronjob oder so etwas einzurichten, um das Zertifikat aktuell zu halten. Das macht inzwischen certbot für uns. Darum muss Port 80 aber weiterhin permanent umgeleitet bleiben.

## Service definieren
Wir definieren Port 60123 als den Port unseres Nethack-Services in der `/etc/services` und schreiben ans Ende der Datei:

``nethackservice     60123/tcp``

## Inetd konfigurieren
Inetd, der sogenannte Internet-Superserver. Was er macht ist, Sockets zu öffnen und bei neuen Verbindungen einen voreingestellten Prozess
zu starten, der dann stdin/stdout mit dem Socket verknüpft bekommt.
`sudo apt install inetd`

Damit inetd unseren Nethackservice startet, müssen wir ihn in der /etc/inetd konfigurieren:

``nethackservice     stream  tcp     nowait  telnetd-ssl     /usr/sbin/tcpd  /usr/sbin/in.telnetd -h -z ssl -z debug -z cert=/etc/letsencrypt/live/<meine.domain>/cert.pem -z key=/etc/letsencrypt/live/<meine.domain>/privkey.pem -L /usr/games/nethack``

Diese Zeile ist eigentlich die gesamte Magie dieses Setups. Eine Verbindungsanfrage an Port 60123 wird damit beantwortet, dass ein Telnetserver gestartet wird, der eine SSL Verbindung mit dem mitgelieferten Zertifikat herstellt und als Login-Shell Nethack einsetzt.

inetd neu starten, dann ist alles fertig eingerichtet:

``sudo service inetd restart``

# Testen/Debuggen

Fertig! Auf Clientseite muss ein SSL fähiger Telnetclient stehen:

``sudo apt install telnet-ssl``

und sich mit unserem Server verbinden:

``telnet-ssl -z ssl <meine.domain> 60123``

und schon spielen wir NetHack auf unserem Server, über eine SSL Verbindung.

Falls nicht, sind das eure zwei Logs, in die ihr serverseitig schauen müsst: ``/var/log/syslog`` und ``/var/tmp/telnetd.log``. Häufige Probleme sind Leserechte an den Zertifikatsdateien.

