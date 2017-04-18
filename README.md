# Skullcode Disassembly Attempt

## Notes
+ `initial.js` is the initial javascript file referenced. It contains a large string of encrypted code and the code to decrypt it (and eval it).
+ The decrypted code that is `eval`'ed by `initial.js` can be found in `decrypted.js`.
+ The `asm.js` library code that is referenced in `decrypted.js` can be found in `asm.js`.
+ Unfinished disassembly attempt of the code dumped from 0x400 to 0x65af can be found in `disassembly.txt`.

## Todo
+ Finish full disassembly.

## Links
+ http://werc.iridia.fr/Blog/2015/12/13/0/ -> Important blog article on another useful disassembly attempt.
+ http://skullcode.com/bootstrap/hexboot.txt -> Read the blog to find out what this is...
+ https://gitlab.com/snippets/11804 -> Dissassembly of code dumped from 0x4400 to 0x65af.
+ http://jsbeautifier.org/ -> Javascript Beautifier
