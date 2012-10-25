---
layout: default
published: false
---

# Jython startup time, nailgun and eclipse

Being frustrated about Jython startup time that forced me to run unittest rarely, I decided to investigate ways to improve it.

Unfortunately, there is not much to do about it: http://stackoverflow.com/questions/1467827/how-do-i-make-pydev-jython-to-startup-faster-when-running-a-script
http://bugs.jython.org/issue1380

The suggestion is to run JVM once and reuse that instance.

The project to do that is Nailgun: http://www.martiansoftware.com/nailgun/background.html

So I decided to extend PyDev with the ability to use Nailgun.

Issues I've encountered:

* module (not) reloading
* ValueError: ('unsupported operand type', op) when using re.compile
* * Never reload sre_constants module!

TODO:

* reload only changed (hook on save action, make hook on import, save modified timestamp )
* recursive reloading: http://www.indelible.org/ink/python-reloading/
* start nailgun server by pydev (restart on demand)
* embed nailgun binaries to pydev
* deal with debugging in some way