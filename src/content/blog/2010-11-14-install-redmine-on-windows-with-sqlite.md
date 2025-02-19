---
description: Automatically generated description.
publishDate: 2010-11-14
published: true
title: Install redmine on Windows with sqlite
---

	This tutorial will help you to install redmine on your windows host.


	<ul>
		- [Official Redmine installation guide](http://www.redmine.org/wiki/1/RedmineInstall)
	</ul>

	<ul>
		- Install [ruby 1.8](http://rubyinstaller.org/downloads/)
		<li>Go to the C:\ruby18\bin directory and install gems:
		<ul>
			- gem install rails -v=2.3.5
			- gem install mongrel
			- gem install sqlite3-ruby
			- gem uninstall i18n
			- gem install i18n -v 0.3.7
		</ul></li>
		- Download http://www.sqlite.org/sqlitedll-3_7_3.zip and unpack to ruby&#8217;s bin directory.
		- Download the latest Redmine (currently 1.0.3) and unpack it somewhere.
		- Edit config/database.yml:
	</ul>

<pre><code>production:
  adapter: sqlite3
  database: db/prod.db
development:
  adapter: sqlite3
  database: db/dev.db
test:
  adapter: sqlite3
  database: db/test.db</code></pre>

	<ul>
		- Navigate to the redmine&#8217;s root directory and run <code>rake db:migrate</code>
		- <code>rake generate_session_store</code>
		- Check if redmine is running: <code>mongrel_rails start</code>
		- <code>gem install win32-service --platform i386-mswin32</code>
		- <code>gem install mongrel_service --platform i386-mswin32</code>
	</ul>

	<p>Install redmine as a service (make sure you have admin rights):
	<ul>
		- <code>mongrel_rails service::install -N Redmine -c [your redmine folder] -p [portno] -e production</code>
		- <code>mongrel_rails service::remove -N Redmine</code>
		- <code>rake db:migrate RAILS_ENV=production</code>
	</ul></p>

	The final step: Go to manage -&gt; services and set service &#8216;redmine&#8221; to &#8220;automatic&#8221;
