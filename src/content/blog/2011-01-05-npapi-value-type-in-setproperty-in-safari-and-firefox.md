---
description: Automatically generated description.
publishDate: 2011-01-05
published: true
title: 'NPAPI: Value type in SetProperty in Safari and Firefox'
---

	In Safari the <code>NPVariant *value</code> in function <code>ScriptableObject::SetProperty</code> is double.


	In Firefox it is int.


	To solve this problem you can use


<pre><code>value-&gt;value.intValue+value-&gt;value.doubleValue</code></pre>