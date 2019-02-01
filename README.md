# Skullcode Disassembly Attempt

## Notes
+ `initial.js` is the initial javascript file referenced. It contains a large string of encrypted code and the code to decrypt it (and eval it).
+ The decrypted code that is `eval`'ed by `initial.js` can be found in `decrypted.js`.
+ The `asm.js` library code that is referenced in `decrypted.js` can be found in `asm.js`.
+ Unfinished disassembly attempt of the code dumped from 0x400 to 0x65af can be found in `disassembly.txt`.

## How-To
+ Head to http://skullcode.com
+ Scroll to `6666` and replace `21` with `20`
+ Scroll to `664c` and replace `245a` with `e45f`
+ Scroll to `6666` and replace `21` with `20`
+ Scroll to `6177` and replace `21` with `20`
+ Scroll to `664c` and replace `e45f` with `b061`
+ Scroll to `6666` and replace `21` with `20`
+ ???

## Todo
+ Finish full disassembly.

## Links
+ http://werc.iridia.fr/Blog/2015/12/13/0/ -> Important blog article on another useful disassembly attempt.
+ http://skullcode.com/bootstrap/hexboot.txt -> Read the blog to find out what this is...
+ https://gitlab.com/snippets/11804 -> Disassembly of code dumped from 0x4400 to 0x65af.
+ https://esolangs.org/logs/2016-08-23.html -> IRC logs of someone trying to figure this out
+ https://github.com/PhantomHoover/trepan -> Disassembly by the guy in the IRC log
+ http://fake-skullcode-1.shithouse.tv/ -> Fake Skullcode (???)
