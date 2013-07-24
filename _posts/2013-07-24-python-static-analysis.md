---
published: false
---

## Python static analysis

### AST.Attribute

    Attribute(expr value, identifier attr, expr_context ctx)
    expr_context = Load | Store | Del | AugLoad | AugStore | Param

Attribute context

    a.b # Load
    a.b = 1 # Store
    del a.b # Del
    
* http://stackoverflow.com/questions/6679171/python-ast-several-semantics-unclear-e-g-expr-context   

### Links

* http://stackoverflow.com/questions/6025714/tools-for-static-type-checking-in-python?lq=1
* http://yinwang0.wordpress.com/2010/09/12/pysonar/
* https://github.com/yinwang0/mini-pysonar
* http://docs.python.org/devguide/compiler.html