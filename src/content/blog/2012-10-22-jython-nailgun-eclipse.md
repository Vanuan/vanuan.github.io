---
description: Automatically generated description.
publishDate: 2012-10-22
published: false
title: jython-nailgun-eclipse
---



# Jython startup time, nailgun and eclipse (WIP)

Being frustrated about Jython startup time that leads to running unittest rarely, I decided to investigate ways to improve it.

Unfortunately, there's not much you can do about it: 

* [Stackoverflow question](http://stackoverflow.com/questions/1467827/how-do-i-make-pydev-jython-to-startup-faster-when-running-a-script)
* [Jython bug](http://bugs.jython.org/issue1380)

The suggestion is to run JVM once and reuse that instance. [Nailgun](http://www.martiansoftware.com/nailgun/background.html) helps to achieve it. Playing a little with it I came up with the idea of extending PyDev with an ability to use Nailgun.

## Extending PyDev

After reading [developer instructions](http://www.pydev.org/developers.html) I went ahead and forked the [Pydev repository](https://github.com/Vanuan/Pydev). After importing eclipse projects into a new workspace, adding some breakpoints and running Eclipse in the debug mode I found a place where Jython's command line is constructed: it is a `getCommandLine` method of `org.python.pydev.debug.ui.launching.PythonRunnerConfig`.

The plan has emerged:

* Run nailgun server
* Setup classpath
* Run the script

Since nailgun server should be started only once, I can do it manually for now.

TODO:

* start nailgun server by pydev (restart on demand)
* stop: ng-stop

### PYTHONPATH

First I need to provide a proper PYTHONPATH environment variable. Since in Jython PYTHONPATH contains classpath, I can just setup class path. To do that Nailgun provides ng-cp class:

    ./ng ng-cp space delimited classpath folders

### Run the script

To run the script you must specify the jython main class and a path to a script as an argument:

    ./ng org.python.util.jython path/to/script
    
or you can use the `-c` option for inline scripts:

    ./ng org.python.util.jython -c "inline script"

### Module reloading

Now our script run pretty fast. But the problem is that imported modules are not reloaded when you change them. I.e. if a module is already in `sys.modules`, `import` does nothing.

There are a few articles that attempt to solve this problem:

* http://pyunit.sourceforge.net/notes/reloading.html
* http://www.indelible.org/ink/python-reloading/

There are two approaches to make module be reloaded:

* delete it from `sys.modules` and wait for the next import
* use the built-in function `reload`.

I've choosen the second one, since it's more obvious and simple.

It is not enough to just reload one module. You must also reload all its dependants.
E.g. if you have such two modules:

    # dependency.py
    name = __name__
    
    
    # dependant.py
    from dependency import name
    
And you change `dependency.name`, you must reload not only the dependency, but also the dependant.

To do that we'll build the dependency tree.

Since we want to reload only changed modules, we should save modules timestamps.

* (hook on save action, make hook on import, save modified timestamp )
* ValueError: ('unsupported operand type', op) when using re.compile
  * Never reload sre_constants module!

https://github.com/Vanuan/module_reloader


An option to call reloader script was added to Eclipse.

TODO:

  * Unload module when file is deleted
  * Unload module when import is commented out
  * Run as Jython unit-test won't work




### Environment, current working directory and arguments.

Unfortunately, Jython doesn't reinitialize command line arguments, working directory and enviroment when run multiple times in the same JVM. This is good (simultaneous runs won't rewrite any system field, modules are not unloaded). And this is bad (subsequent runs won't change argv and cwd).

We need to keep modules loaded just once, but update these:

* environment
* current working directory
* arguments


* Jython cwd and arguments should be forcefully reinitialized!

TODO: jython reloader, option to Eclipse


## The result

## Known limitations and TODOs

File not found - /opt/jython/jython-2.5.3/Lib/site.py (Too many open files) fixed. (close file after find_module)
File modification timestamp is 1 sec precision

Still I need to 

* embed nailgun binaries to pydev
* deal with debugging in some way
* impossible to stop script
