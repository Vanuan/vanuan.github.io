---
layout: default
---

  {% for post in site.posts offset: 0 limit: 12 %}
 
  {% if post.published %}
  <h2><a href="{{post.url}}">{{ post.title }}</a></h2> 

  {{ post.content | split:'<!--break-->' | first | strip_html }}
  {% if post.content contains '<!--break-->' %}
  <a href="{{ post.url }}">read more</a>
  {% endif %}

  <p><time>{{ post.date | date: "%Y-%m-%d" }}</time></p>

  {% endif %}
  
  {% endfor %}
