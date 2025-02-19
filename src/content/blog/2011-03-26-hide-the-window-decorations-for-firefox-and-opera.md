---
description: Automatically generated description.
publishDate: 2011-03-26
published: true
title: Hide the window decorations for firefox and opera
---

	I&#8217;ve found a way to hide window decorations in metacity for Opera and Firefox:


	<ul>
		- install devilspie
		- create files opera.ds and firefox.ds in your ~/.devilspie directory with the following content:
	</ul>

<pre><code>(if (is (application_name) &quot;Firefox&quot;) and (contains (window_name) &quot;Mozilla Firefox&quot;)
             (begin
                (undecorate)
             )
)</code></pre>

<pre><code>(if (is (application_name) &quot;Opera&quot;) and (is (window_name) &quot;Opera&quot;)
             (begin
                (undecorate)
             )
)</code></pre>

	<ul>
		- run devilspie and check if everything works
		- place devilspie in autostart
	</ul>