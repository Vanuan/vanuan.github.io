---
description: Automatically generated description.
publishDate: 2010-10-04
published: true
title: NPAPI. Construction of a browser plugin. Part two
---

	This is a second part of series of posts describing the building of a browser plugin using <span class="caps">NPAPI</span> model. First part is [here](http://vanuan.heroku.com/posts/42).


	<h2>What do we want to build?</h2>

	<p>1. Plugin shall receive color value from the browser side and fill a rectangle with retrieved color.<br />
2. Plugin shall receive <span class="caps">URL</span> from the browser side, download the document located there and print its text inside plugin&#8217;s rectangle (download the document using <span class="caps">NPN</span>_GetURL).<br />
3. Plugin shall receive <span class="caps">URL</span> of the document containing plugin, find all <a> tags inside this document and print inside plugin&#8217;s rectangle list of links (anchor tags [ link](...)) on the page (download document using <span class="caps">NPN</span>_GetURLNotify).<br />
4. List of links should scroll (<span class="caps">NPP</span>_HandleEvent). This means following (for instance):<br />
Plugin should fit 4 lines of text. List of links require 40 lines. Then to show all links in the plugin you have to scroll this list. On load draw links 1,2,3,4 on some event (mouse click?) 2,4,5,6 then 7,8,9,10 etc.</p>

	<h2>Step 1. Fill plugin&#8217;s rectangle with color</h2>

	To fill a rectangle with color we must:


	<p>1. receive a color<br />
2. handle plugin&#8217;s paint event</p>

	The receiving a color is simple: browser can pass color with embed parameters (passed with <span class="caps">NPP</span>_New call).


	The second part is not so obvious and platform-specific. On <span class="caps">UNIX</span> we must handle [Xlib XEvent](https://developer.mozilla.org/en/NPEvent) which is passed with <span class="caps">NPP</span>_HandleEvent. <span class="caps">NPP</span>_HandleEvent should check event type and return true if plugin can handle such event.


	[Xlib documentation](http://www.x.org/archive/X11R6.8.0/doc/manindex3.html) is enough for drawing any figures. XFillRectangle and XSetForeground are the functions needed for drawing rectangle with specified color.


	We should modify our test page to include the color parameter, height and width: <code>&lt;embed type="application/simple-plugin" color="0x00aa00" height=500 width=500 /&gt;</code>


	The result is:


	<img alt="" src="http://dl.dropbox.com/u/4217195/vanuan.heroku.com/post_43_NPAPI.png" />


	Step 1 is done. Time spent from beginning learning <span class="caps">NPAPI</span> to this point is 25 hours.


	<h2>Step 2. Print text on plugin&#8217;s rectangle</h2>

	<p>For drawing a text in X Window we can use [XDrawText](http://www.x.org/archive/X11R6.8.0/doc/XDrawText.3.html) and [XDrawString](http://tronche.com/gui/x/xlib/graphics/drawing-text/XDrawString.html).<br />
XTextWidth and other XText functions also will be helpful. Xutf8 versions can draw utf8-encoded text.</p>

<pre><code>   XDrawString ( display,
    drawable,
    gc,
    x, y,
    text.c_str(),
    text.length()
    );</code></pre>


	Again, for receiving <span class="caps">URL</span> parameter we use html entities:


	<code>&lt;embed type="application/simple-plugin" color="0x00aa00" height=500 width=500 url = "test.txt" /&gt;</code>


	Create our test.txt and we&#8217;re done:



	<h2>Step 3. Print list of links in the current document</h2>

	First you need to get the <span class="caps">URL</span> containing plugin. It is ridiculous, there is no trivial way to do that. See [Getting_the_page_URL_in_NPAPI_plugin](https://developer.mozilla.org/en/Getting_the_page_URL_in_NPAPI_plugin).


	<h2>Step 4. Scroll list of links on user input</h2>

	<img alt="" src="http://dl.dropbox.com/u/4217195/vanuan.heroku.com/post_43_NPAPI_2.png" />



	<h2>Resources</h2>

	<ul>
		- [Xlib XEvent](https://developer.mozilla.org/en/NPEvent)
		- [XGraphicsExposeEvent](http://www.x.org/archive/X11R6.8.0/doc/XGraphicsExposeEvent.3.html)
		- [XFillRectangle](http://www.x.org/archive/X11R6.8.0/doc/XFillRectangle.3.html)
		- [Rob Tougher. Xlib Programming in C++](http://linuxgazette.net/issue78/tougher.html)
		- [X11 Hello world program](ftp://ftp.funet.fi/pub/unix/security/docs/usenix/usenix/winter88/x-helloworld.ps.gz)
	</ul>