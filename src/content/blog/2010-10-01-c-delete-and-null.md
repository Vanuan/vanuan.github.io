---
description: Automatically generated description.
publishDate: 2010-10-01
published: true
title: C++ delete and NULL
---

	Странно, что delete лишь вызывает деструктор и освобождает память, но не изменяет указатель.


<pre><code>#include &lt;iostream&gt;
using namespace std;

class Test {
public:
   Test() {cout &lt;&lt; &quot;constructor&quot; &lt;&lt; endl;}
   ~Test() {cout &lt;&lt; &quot;destructor&quot; &lt;&lt; endl;}
};

int main(int argc, char*argv[]) {
  Test * test = new Test;
  cout &lt;&lt; test &lt;&lt; endl;
  delete test;
  cout &lt;&lt; test &lt;&lt; endl;
  return 0;
}</code></pre>

	Результат:


<pre><code>constructor
0x95f5008
destructor
0x95f5008</code></pre>

	<p>Почему delete не обнуляет указатель?<br />
Это избавило бы программиста от проблемы двойного освобождения памяти.</p>

	delete, однако, проверяет указатель на <span class="caps">NULL</span> перед вызовом деструктора.


	[SO Q&amp;A](http://stackoverflow.com/questions/704466/why-doesnt-delete-set-the-pointer-to-null)


	Ок, производительность, вот ответ.
