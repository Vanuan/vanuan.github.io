---
published: false
---

## Python static analysis



### AST.Attribute

    Attribute(expr value, identifier attr, expr_context ctx)
    expr_context = Load | Store | Del | AugLoad | AugStore | Param

Let's look what AST would be produced for an "a.b.c" expression:

<script type="gviz" data-layout="dot"><![CDATA[
digraph G {
labelloc="t";
        label="AST tree of 'a.b.c' expression";
        // General Settings
        graph [
            truecolor=true
            bgcolor="#FFFFFF00"
            fontname = "Ubuntu"
        ];
        node [
            shape=box
            style="filled"
            fillcolor="#FFFFFF"
        ];
        attr1 [label="Attribute 'c'"];
        attr2 [label="Attribute 'b'"];
        name [label="Name 'a'"];
        attr1 -> attr2 [label="value"];
        attr2 -> name [label="value"];
    }
]]></script>

So, how would we implement semantics of this?

First, we rewind to the first non-attribute node, while saving attribute names
on the stack. Then we infer this node into an object.
Then we move forward using attribute names from the stack.
If the attribute doesn't exist we should check the context
and, if it is "Store", create a reference to a newly created attribute.


#### Attribute context

    a.b # Load
    a.b = 1 # Store
    del a.b # Del
    
* http://stackoverflow.com/questions/6679171/python-ast-several-semantics-unclear-e-g-expr-context   

### Links

* http://stackoverflow.com/questions/6025714/tools-for-static-type-checking-in-python?lq=1
* http://yinwang0.wordpress.com/2010/09/12/pysonar/
* https://github.com/yinwang0/mini-pysonar
* http://docs.python.org/devguide/compiler.html
* [Static analysis of dynamic scripting languages](http://paulbiggar.com/research/wip-optimizer.pdf)