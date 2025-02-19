---
description: Automatically generated description.
publishDate: 2010-08-30
published: true
title: QwtPolarPlot transparency and CSS
---

	Apparently, you can&#8217;t use transparency for QwtPolarPlot now (as for qwtpolar-0.1.0).


	When you try to set transparent background for QwtPolarPlot:


<pre><code>app.setStyleSheet(&quot;QwtPolarPlot {background: transparent}&quot;);</code></pre>

	<p>you could see this:<br />
<img alt="" src="http://dl.dropbox.com/u/4217195/vanuan.heroku.com/1.png" style="width:200px; height:200px;" /><br />
Not very nice, yeah?</p>

	This is happenning because QwtPolar library is using some fancy technique for caching.


	So, how to fix it? Well, quick fix would be to redefine QwtPolarCanvas::drawCanvas method within your application and comment out that fancy code:


<pre><code>void QwtPolarCanvas::drawCanvas(QPainter *painter,
    const QwtDoubleRect&amp; canvasRect) {
  if ( !canvasRect.isValid() )
           return;
  plot()-&gt;drawCanvas(painter, canvasRect);
}</code></pre>

	So, the problem is solved:


	<img alt="" src="http://dl.dropbox.com/u/4217195/vanuan.heroku.com/2.png" style="width:200px; height:200px;" />


	You can stop there, but what if you&#8217;re a perfectionist? :)


	Let&#8217;s look what&#8217;t happenning. The problem is here:


<pre><code>painter-&gt;drawPixmap(canvasRect.topLeft().toPoint(), *d_data-&gt;cache);</code></pre>

	Somehow, QPixmap is not transparent. The solution is to do this:


<pre><code>       QBitmap mask(d_data-&gt;cache-&gt;size());
        mask.clear();
        d_data-&gt;cache-&gt;setMask(mask);</code></pre>

	or that:


<pre><code> d_data-&gt;cache-&gt;fill(Qt::transparent);</code></pre>

	before calling


<pre><code>plot()-&gt;drawCanvas(painter, canvasRect);</code></pre>

	**Edit**. Calling plot-&gt;canvas()-&gt;invalidatePaintCache() every time the plot is changed solves this problem without workaround.


	<ul>
		- [Qwt and transparency](http://www.qtforum.org/article/16586/qpainter-problem.html)
		- [QPixmap transparent](http://lists.trolltech.com/qt-interest/2006-09/msg00990.html)
	</ul>