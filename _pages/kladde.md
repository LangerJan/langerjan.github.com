# Kladde

Meine Kladde für Ideen, usw.

{% for post in site.categories["kladde"] %}
  * [{{ post.title }}]({{ post.url }})
{% endfor %}

