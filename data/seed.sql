INSERT INTO challenges(challenge_id, lang, dsa, difficulty) values ('582c297e56373f0426000098', 'javascript', 'linkedlist', 'novice' );

INSERT INTO challenges(challenge_id, lang, dsa, difficulty) values ('57e5279b7cf1aea5cf000359', 'c#', 'trees', 'novice');


INSERT INTO challenges(challenge_id, lang, dsa, difficulty) values ('57b06f90e298a7b53d000a86', 'javascript', 'queue', 'novice');


INSERT INTO challenges(challenge_id, lang, dsa, difficulty) values ('526233aefd4764272800036f', 'javascript', 'graph', 'advanced');


INSERT INTO challenges(challenge_id, lang, dsa, difficulty) values ('5efae11e2d12df00331f91a6', 'javascript', 'hashset', 'novice');

INSERT INTO technical(question, answer) values ('Is JavaScript a case-sensitive language? a) Yes b) No', 'a');

INSERT INTO technical(question, answer) values ('What does MERN stack stands for? a) Mongo Express React Node.js b) Mongo Express Angular Node.js ', 'a');

INSERT INTO technical(question, answer) values ('Inside which HTML element do we put the JavaScript? a) <scripting> b) <script> ', 'b');

INSERT INTO technical(question, answer) values ('The external JavaScript file must contain the <script> tag? a) False b) True', 'a');

INSERT INTO technical(question, answer) values ('How do you call a function named "myFunction"? a) myFunction() b) call myFunction', 'a');

INSERT INTO technical(question, answer) values ('How can you add a comment in a JavaScript? a) *This is a comment b) //This is a comment', 'b');

INSERT INTO technical(question, answer) values ('Which syntax is correct to start a FOR loop? a) for(let i = 0; i < 5; i++) b) for (i = 1 to 5; i ++', 'a');

INSERT INTO technical(question, answer) values ('What is the correct way to write a JavaScript array? a) var colors = (1:"red", 2:"blue") b) var colors = ["red", "blue", "green"]', 'b');

INSERT INTO technical(question, answer) values ('Is JavaScript is the same as Java? a) True b) False', 'b');

INSERT INTO technical(question, answer) values ('Which example is a correct way to declare a JavaScript variable? a) variable === varName b) let varName = 0', 'b');

INSERT INTO knowledge(keyword, knowledge) values('binary tree','In computer science, a binary tree is a tree data structure in which each node has at most two children, which are referred to as the left child and the right child. A recursive definition using just set theory notions is that a (non-empty) binary tree is a tuple (L, S, R), where L and R are binary trees or the empty set and S is a singleton set containing the root.');
INSERT INTO knowledge(keyword, knowledge) VALUES('binary search tree degradtion','A degenerate (or pathological) tree is where each parent node has only one associated child node. This means that the tree will behave like a linked list data structure');
INSERT INTO knowledge(keyword, knowledge) VALUES('pre order traversal','Algorithm Preorder(tree)
      1. Visit the root.
      2. Traverse the left subtree, i.e., call Preorder(left-subtree)
      3. Traverse the right subtree, i.e., call Preorder(right-subtree)');
INSERT INTO knowledge(keyword,knowledge) VALUES('in order traversal', 'In this traversal method, the left subtree is visited first, then the root and later the right sub-tree. We should always remember that every node may represent a subtree itself. If a binary tree is traversed in-order, the output will produce sorted key values in an ascending order. We start from A, and following in-order traversal, we move to its left subtree B. Bis also traversed in-order. The process goes on until all the nodes are visited.');
INSERT INTO knowledge(keyword, knowledge) VALUES('hash set', 'he HashSet class implements the Set interface, backed by a hash table which is actually a HashMap instance. No guarantee is made as to the iteration order of the set which means that the class does not guarantee the constant order of elements over time. This class permits the null element. The class also offers constant time performance for the basic operations like add, remove, contains, and size assuming the hash function disperses the elements properly among the buckets, which we shall see further in the article.  

Few important features of HashSet are: 

Implements Set Interface.
The underlying data structure for HashSet is Hashtable.
As it implements the Set Interface, duplicate values are not allowed.
Objects that you insert in HashSet are not guaranteed to be inserted in the same order. Objects are inserted based on their hash code.
NULL elements are allowed in HashSet.
HashSet also implements Serializable and Cloneable interfaces.');


