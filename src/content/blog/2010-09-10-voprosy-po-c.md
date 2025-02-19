---
description: Automatically generated description.
publishDate: 2010-09-10
published: true
title: Вопросы по C++
---

	1. Как создать двумерный динамический массив?


	По-видимому, так:


<pre><code>vector&lt;vector&lt;double&gt;&gt; v;</code></pre>

	Yes, I knew it! :) [C++ Forums: two dimensional arrays](http://www.cplusplus.com/forum/beginner/4811/#msg21177)


	Oh, there is a gotcha: &gt;&gt; this is a syntax error. Correct declaration would be:


<pre><code>vector&lt; vector&lt;double&gt; &gt; v;</code></pre>


	2. Какова разница между динамическим массивом (vector) и списком (list)?


	3. Возможно ли и как создать ссылку на элемент массива?
