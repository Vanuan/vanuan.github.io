---
description: Automatically generated description.
publishDate: 2012-02-21
published: true
title: Installing Redmine and Rails3. Part 2
---

	Now redmine depends on Rmagick, which is a Ruby interface to ImageMagick. To install rmagick gem we need to install ImageMagick.



	bundle install output:


    Installing rmagick (2.13.1) with native extensions 
    Gem::Installer::ExtensionBuildError: <span class="caps">ERROR</span>: Failed to build gem native extension.

	The solution:


    sudo apt-get install libmagick9-dev

	Now bundle install should succeed.
