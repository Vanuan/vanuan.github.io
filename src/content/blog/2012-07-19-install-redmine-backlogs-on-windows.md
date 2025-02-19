---
description: Automatically generated description.
publishDate: 2012-07-19
published: true
title: Install Redmine Backlogs on Windows
---

	<p>1. Download and install ruby: [Ruby Installer](http://rubyinstaller.org/downloads/)<br />
2. Download and install [ruby devkit](http://rubyinstaller.org/downloads/). [Instructions](https://github.com/oneclick/rubyinstaller/wiki/development-kit)<br />
3. Download and install [git](http://code.google.com/p/msysgit/)<br />
4. Download [Redmine](http://rubyforge.org/frs/?group_id=1850)<br />
5. Run <code>gem install bundler</code> in the console<br />
6. Fix any build errors by installing appropriate libraries. You may need [ImageMagick](http://www.imagemagick.org/script/binary-releases.php#windows)<br />
7. cd to the redmine folder<br />
8. Run <code>bundle install --path vendor/bundle</code><br />
9. <code>mv config/database.yml.example config/database.yml</code><br />
10. Set up your database. You can use sqlite</p>