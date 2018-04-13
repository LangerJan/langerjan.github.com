# Coding Challenges

## Übersicht

Coding Challenges ist ein Vertiefungsfach mit folgenden Inhaltsschwerpunkten:
* Eigenständiges Lösen von komplizierten algorithmischen Problemen mit Hilfe aller Werkzeuge der Informatik
* Erlernen von wissenschaftlichem Arbeiten
* Laufzeitanalyse, Debugging, Tracing, Problemanalyse

## Organisatorisches

1. Die Aufgaben werden in einem von mir für jeden einzelnen Studierenden angelegten [gitlab-Repository](https://zenon.cs.hs-rm.de/) veröffentlicht, gelöst, abgenommen und bewertet.
2. Es finden keine Abnahmen per Email statt!
3. Die Prüfungsform heißt "praktische Tätigkeit und Fachgespräch". Sie müssen sich bis zum **23.04.2018** bei der [entsprechenden Hochschulseite](https://compass.hs-rm.de/) für die Prüfung angemeldet haben.
4. Zum Ende des Semesters findet mit jedem Teilnehmer ein 25-minütiges Fachgespräch zu ausgewählten Problemen und Lösungen des Semesters statt.
5. Sämtliche Emails an mich (Fragen, Probleme, etc) schickt ihr bitte an codingchallenges@jangampe.de.

## Aufgabenblätter

{% for post in site.categories["cc2018"] %}
  * [{{ post.title }}]({{ post.url }})
{% endfor %}
