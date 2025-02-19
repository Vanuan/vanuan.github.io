---
description: Automatically generated description.
publishDate: 2010-10-06
published: true
title: Google's XMPP is buggy
---

	When you use <span class="caps">XMPP</span> and log in to your account simultaneously from different machines you should learn the technical details of the protocol.


	For example, what will happen if you receive a message? Where will it go? To both machines? It would be great, but no.


	The tricky thing is that different machines you logged in has different ids, so called &#8220;resource&#8221; names. And even more trickier is that these resource names are different for every time you logged in. They should be at least the same for every machine, but no. Every <span class="caps">XMPP</span> (jabber) client automatically appends 8-byte hex string to the resource name, e.g.: consntantpart85AC74FF


	I don&#8217;t know whether it is <span class="caps">XMPP</span> specific or google talk server specific thing. [<span class="caps">XMPP</span> standard](http://www.ietf.org/rfc/rfc3920.txt" title="section 7) specifies that resource can be server generated or client provided string.


	So what&#8217;s the problem? Well, when client logs out (because of some internet glitch or connectivity lost) and logs in again, resource name is changed, so all other chat buddies are no more sending messages to you. They send them to that lost resource name.
