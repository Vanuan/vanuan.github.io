---
layout: default
---

  {% for post in site.posts offset: 0 limit: 12 %}
 
  <h2><a href="{{post.url}}">{{ post.title }}</a></h2> 

  {{ post.content }}

  <p><time>{{ post.date | date: "%Y-%m-%d" }}</time></p>
  
  {% endfor %}
