---
description: Automatically generated description.
publishDate: 2010-09-14
published: true
title: Google C++ Testing Framework Quickstart Guide
---

	This guide demonstrates how to get started using [Google C++ Testing Framework](http://code.google.com/p/googletest/).


	First of all, install it.


	<h2>Installation</h2>

	If you&#8217;re using Ubuntu it&#8217;s simple:


<pre><code>$ apt-get install libgtest-dev</code></pre>

	Thera are also rpm packages (for those using rpm-based distributions).


	If you&#8217;re using Windows&#8230; Well, you should add the framework to your build path (see [the related question on Stackoverflow](http://stackoverflow.com/questions/531941/how-to-setup-google-c-testing-framework-gtest-on-visual-studio-2005)) or if you&#8217;re using Cygwin you should comile it first. Follow <span class="caps">README</span> file in the source distribution.


	<h2>Writing tests and the main() function</h2>

	Write tests and testing program. Test program incorporates test cases that contains distinct tests for the unit under test.


	At this step you can follow the [official documentation](http://code.google.com/p/googletest/wiki/Primer#Writing_the_main()_Function) or [blogs](http://meekrosoft.wordpress.com/2009/10/04/testing-c-code-with-the-googletest-framework/).


	Note. Each test is implemented as a function, using the <span class="caps">TEST</span> or <span class="caps">TEST</span>_F macro.


	Save this file. For example, TestsMain.cpp


	<h2>Compiling and linking</h2>

	Then define library and include paths. In your makefile:


<pre><code>GTEST_LDFLAGS = `gtest-config --ldflags --libs`
GTEST_CPPFLAGS = `gtest-config  --cppflags  --cxxflags`</code></pre>

	Or through the command line:


<pre><code>export GTEST_LDFLAGS = `gtest-config --ldflags --libs`
export GTEST_CPPFLAGS = `gtest-config  --cppflags  --cxxflags`</code></pre>

	You use these paths while compiling and linking:


<pre><code>g++ -c path/to/UnitUnderTest.cpp -o path/to/UnitUnderTest.o 
g++ $(GTEST_CPPFLAGS) -c TestsMain.cpp -o TestsMain.o 
g++ $(GTEST_LDFLAGS) TestsMain.o path/to/UnitUnderTest.o -o test</code></pre>

	Note. gtest-config is the utility shipped with the framework.


	Now you&#8217;ve sucessfully installed the framework and compiled your first test. Let&#8217;s check it:


<pre><code>$ ./test
[==========] Running 2 tests from 1 test case.
[----------] Global test environment set-up.
[----------] 2 tests from UnitUnderTest
[ RUN      ] UnitUnderTest.MethodFooDoesSomething
[       OK ] UnitUnderTest.MethodFooDoesSomething
[ RUN      ] UnitUnderTest.MethodBarDoesSomethingElse
[       OK ] UnitUnderTest.MethodBarDoesSomethingElse
[----------] Global test environment tear-down
[==========] 2 tests from 1 test case ran.
[  PASSED  ] 2 tests.</code></pre>

	Happy testing!



	<h2>Further readings</h2>

	<ul>
		- [Google C++ Testing Framework Slides](https://docs.google.com/present/view?id=dfsbxvm5_0f5s4pvf9)
	</ul>