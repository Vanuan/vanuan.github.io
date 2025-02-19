---
description: Automatically generated description.
publishDate: 2010-09-23
published: true
title: Бага при использовании Join Table
---

	При использовании отношения &#8220;многие к многим&#8221; следует быть внимательным. Иначе могут возникнуть повторяющиеся записи в таблице объединения.


<pre><code>class PostLabel &lt; ActiveRecord::Base
  validates_presence_of :label_id, :post_id
  validates_uniqueness_of :label_id, :scope =&gt; :post_id
  belongs_to :label
  belongs_to :post
end</code></pre>


	<h2>Литература</h2>

	<ul>
		- [Validate Uniqueness on Join Tables in Rails](http://seanbehan.com/ruby-on-rails/validate-uniqueness-on-join-tables-in-rails/)
	</ul>