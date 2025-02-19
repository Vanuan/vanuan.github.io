---
description: Automatically generated description.
publishDate: 2010-10-04
published: true
title: NPAPI. Construction of a browser plugin. Part one
---

	This post describes construction of plugin for browser using [<span class="caps">NPAPI</span>](http://en.wikipedia.org/wiki/NPAPI).


	Disclaimer. This information contains only Linux specific details of <span class="caps">NPAPI</span> plugin construction.


	<h2>What is a plugin and how does it work?</h2>

	What a plugin in general is  you can [read at Wikipedia](http://en.wikipedia.org/wiki/Plugin). What is a browser plugin? A browser plugin is a software that extends the capabilities of browser providing it with functionality needed for displaying custom content formats. For example you can see plugins for displaying Flash <span class="caps">SWF</span> objects, <span class="caps">PDF</span> documents, embedded Java applications.


	How do plugins work? It&#8217;s pretty simple. Specific content can be embedded on a web page or opened directly from a browser. When a browser encounters such content, it searches in its plugin directory for a plugin that can handle such content and if found, it then creates the plugin process and pass that content to it. The plugin then can draw itself on a webpage and receive custom events such as keyboard and mouse input.


	<h2>Understanding the model</h2>

	From previous paragraph you can understand how plugins work from the user perspective. But how do they work internally? What&#8217;s the code?


	Ok. First of all, a browser do almost all the work. There are two kinds of <span class="caps">API</span> functions: <span class="caps">NPP</span> and <span class="caps">NPN</span>. <span class="caps">NPP</span> functions are plugin-side functions called by the browser when special events occur (plugin creation, user input, plugin destroying). <span class="caps">NPN</span>_ functions are implemented on the browser side and can be called by the plugin. So, the plugin must implement <span class="caps">NPP</span> functions, while <span class="caps">NPN</span> functions are browser-side services available for the plugin.


	<img alt="" src="http://www.podgoretsky.pri.ee/ftp/Docs/Internet/Netscape%20Plug-Ins/f8-1.gif" />


	When the browser loads plugin it calls a special function, called NP_Initialize. This function is a must for implementing. Two parameters passed by browser: nppfuncs and npnfuncs. One is a pointer to table of <span class="caps">NPP</span> functions, another &#8211; <span class="caps">NPN</span> functions. Both pointers point to the special structs which stores function pointers. The plugin must fill <span class="caps">NPP</span>funcs table with pointer to functions implemented by the plugin. <span class="caps">NPN</span>funcs table is needed for the plugin to be able to call that browser-implemented functions.


	How the plugin can tell the browser which content types it can handle? In Unix, you must implement another special function NP_GetMIMEDescription. In Windows that information is provided with dll resources.


	How many plugin processes created when I embed many objects handled by plugin? As for Firefox, it creates one plugin process for every browser instance. As already mentioned, when a browser loads plugin, NP_Initialize gets called. When a browser encounters specific content associated with plugin it calls NP_Initialize if plugin is not loaded, and then calls another special function <span class="caps">NPP</span>_New for every content stream associated with that plugin. That <span class="caps">NPP</span>_New functions creates &#8220;a plugin instance&#8221;. So, the Firefox browser creates only one plugin process. Chrome also creates one &#8220;sandboxed&#8221; process for all the plugin instances ([source](http://www.chromium.org/nativeclient/getting-started/getting-started-background-and-basics)).


	Where can I store my data? In a global namespace? But how then can I store different data for different plugin instances? Or is there another way of store my data between <span class="caps">NPP</span> function calls? Yes, there is. Every <span class="caps">NPP</span> function has a parameter &#8220;<span class="caps">NPP</span>&#8221; which is a pointer to the special struct associated with a specific plugin instance. You can allocate memory for your data and save a pointer to it in that struct. Don&#8217;t forget to destroy it as well. A browser calls <span class="caps">NPP</span>_Destroy when a plugin instance is destroyed.


	<h2>How to start?</h2>

	To start coding you&#8217;ll need <span class="caps">NPAPI</span> headers that can be downloaded [here](http://code.google.com/p/npapi-headers/), compiler and an <span class="caps">NPAPI</span> enabled browser (Firefox should be fine).


	For <span class="caps">UNIX</span>, besides NP_Initialize you should additionally implement NP_GetMIMEDescription and NP_GetValue.


<pre><code>// Register mime types and description for UNIX
// (Windows declares it in resources)
// Plugin&#39;s mime types
#define MIME_TYPE_DESCRIPTION &quot;application/sample-plugin:file-extension:Description&quot;
const char* NP_GetMIMEDescription() {
  return MIME_TYPE_DESCRIPTION;
}
// Plugin&#39;s name and description
NPError OSCALL NP_GetValue(void*, NPPVariable, void* out) {
  return NPERR_NO_ERROR;
}
// Initializes plugin
NPError NP_Initialize(NPNetscapeFuncs* npnfuncs, NPPluginFuncs* nppfuncs) {
  if(npnfuncs == NULL)
    return NPERR_INVALID_FUNCTABLE_ERROR;
  if(HIBYTE(npnfuncs-&gt;version) &gt; NP_VERSION_MAJOR)
    return NPERR_INCOMPATIBLE_VERSION_ERROR;
  cout &lt;&lt; &quot;Plugin Initialized:&quot; &lt;&lt; npnfuncs &lt;&lt; endl;
  // TODO save npnfuncs pointer
  NP_GetEntryPoints(nppfuncs);
  return NPERR_NO_ERROR;
}
// Set table of functions called by browser.
NPError NP_GetEntryPoints(NPPluginFuncs* pFuncs) {
  if (pFuncs == NULL)
    return NPERR_INVALID_FUNCTABLE_ERROR;
  pFuncs-&gt;version       = (NP_VERSION_MAJOR &lt;&lt; 8) | NP_VERSION_MINOR;
  pFuncs-&gt;newp          = NPP_New;
  pFuncs-&gt;javaClass     = NULL;
  return NPERR_NO_ERROR;
}
// new plugin instance
NPError NPP_New(NPMIMEType    pluginType,
                NPP instance, uint16_t mode,
                int16_t argc,  char *argn[],
                char *argv[], NPSavedData *saved) {
  cout &lt;&lt; &quot;NPP_New&quot; &lt;&lt; endl;
  return NPERR_NO_ERROR;
}</code></pre>


	The code should speak for itself.


	Compile it with:


<pre><code>gcc -c plugin.cpp
gcc -shared -o plugin.o</code></pre>

	Install it with


<pre><code>sudo ln -s `pwd`/simple-plugin.so /usr/lib/mozilla/plugins/simple-plugin.so</code></pre>


	To test plugin you&#8217;ll need html file with this body:


<pre><code>&lt;h1&gt;Developing a browser plug-in&lt;/h1&gt;
&lt;embed type=&quot;application/simple-plugin&quot; /&gt;</code></pre>

	To run firefox from console use &#8220;-console&#8221; command line argument (firefox -console). When you open test html document you should see something like that:


<pre><code>Plugin Initialized:0xb7729ce8
NPP_New</code></pre>

	<h2>What&#8217;s next?</h2>

	See [part two](http://vanuan.heroku.com/posts/43) of this series of posts.


	<h2>Resources</h2>

	<ul>
		- [<span class="caps">NPAPI</span> &#8211; Wikipedia](http://en.wikipedia.org/wiki/NPAPI)
		- [<span class="caps">NPAPI</span> Mozilla wiki](https://wiki.mozilla.org/NPAPI)
		- [Mozilla developer documentation on plugins](https://developer.mozilla.org/en/Plugins)
		- [Programming Netscape Plug-Ins. Zan Oliphant, 1996](http://www.podgoretsky.pri.ee/ftp/Docs/Internet/Netscape%20Plug-Ins/)
		- [Colonelpanic series of posts](http://colonelpanic.net/2009/03/building-a-firefox-plugin-part-one/)
		- [Incomplete old article of 2004](http://gplflash.sourceforge.net/gplflash2_blog/npapi.html)
		- [Not so helpful codeproject post](http://www.codeproject.com/KB/cross-platform/NPAPIBrowserPlugin.aspx)
		- [Samples provided by Mozilla](http://mxr.mozilla.org/mozilla-central/source/modules/plugin/sdk/samples/basic/)
		- [Old npsimple sample](http://git.webvm.net/?p=npsimple;a=summary)
		- [<span class="caps">NPAPI</span> header files on code.google.com](http://code.google.com/p/npapi-headers/)
	</ul>

	<h2>P.S.</h2>

	Hm, 42nd post&#8230;
