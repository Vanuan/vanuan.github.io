---
description: Automatically generated description.
publishDate: 2012-02-16
published: true
title: Installing Redmine and Rails3
---

	Clone Toshi <span class="caps">MARUYAMA</span>&#8217;s Redmine repo https://github.com/marutosi/redmine.git


	Try to run redmine application:


<pre><code>   ./script/rails server</code></pre>

	If you see the following error:


<pre><code>   config/boot.rb:1:in `require&#39;: no such file to load -- rubygems (LoadError)</code></pre>

	install ruby1.9.1, delete any previous version.


<pre><code>   sudo apt-get install ruby1.9.1
    sudo apt-get remove ruby1.8</code></pre>

	try again


<pre><code>   ./script/rails server</code></pre>

	If you see the following error:


<pre><code>   config/boot.rb:14:in `rescue in &lt;top (required)&gt;&#39;: uninitialized constant        Object::Bundler (NameError)</code></pre>

	You should install bundler


<pre><code>  sudo gem install bundler</code></pre>

	Now you&#8217;ll end up with following error:


<pre><code>   Could not find gem &#39;rails (= 3.2.1) ruby&#39; in any of the gem sources listed in your Gemfile.
    Try running `bundle install`.</code></pre>

	Do like they said:


<pre><code>   bundle install</code></pre>

	Now you have this error:


<pre><code>   Installing json (1.6.5) with native extensions 
    Gem::Installer::ExtensionBuildError: ERROR: Failed to build gem native extension.
/usr/bin/ruby1.9.1 extconf.rb 
&lt;internal:lib/rubygems/custom_require&gt;:29:in `require&#39;: no such file to load -- mkmf (LoadError)
	from &lt;internal:lib/rubygems/custom_require&gt;:29:in `require&#39;
	from extconf.rb:1:in `&lt;main&gt;&#39;</code></pre>

	Ok, gem was trying to build a native extension and failed. This is because ruby1.9.1-dev is not installed. Try now


<pre><code>   sudo apt-get install ruby1.9.1-dev</code></pre>

	And again


<pre><code>   bundle install</code></pre>

	Now we have another error:


<pre><code>Installing mysql (2.8.1) with native extensions 
Gem::Installer::ExtensionBuildError: ERROR: Failed to build gem native extension.</code></pre>

	This is fixable by installing sudo libmysqlclient-dev:


<pre><code>   sudo apt-get install libmysqlclient-dev</code></pre>


	And again!


<pre><code>   bundle install</code></pre>

	Error again:


<pre><code>   Installing pg (0.9.0) with native extensions 
    Gem::Installer::ExtensionBuildError: ERROR: Failed to build gem native extension.</code></pre>


	We are losing patience now. Fix by installing  libpq-dev


<pre><code>   sudo apt-get install libpq-dev</code></pre>

	At last!



<pre><code>   Your bundle is complete! Use `bundle show [gemname]` to see where a bundled gem is installed.</code></pre>

	Try running again:


<pre><code>   ./script/rails server</code></pre>

	Complains about missing config/database.yml


	Setup your database


<pre><code>    cp config/database.yml.example config/database.yml</code></pre>

	My file looks like this:


<pre><code>   production:
      adapter: sqlite3
      database: db/redmine.sqlite3</code></pre>

	Run server:


<pre><code>    ./script/rails server</code></pre>

	<p>Now server runs but opening redmine in browser shows Could not find table &#8216;settings&#8216;<br />
This is because we didn&#8217;t initialize our database yet.</p>

	Initialize the database:


<pre><code>   rake db:migrate</code></pre>

	Now when we start again


<pre><code>    ./script/rails server</code></pre>

	we&#8217;ll see redmine index page.


	Login with admin/admin and you&#8217;re done.
