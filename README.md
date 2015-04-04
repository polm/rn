            
 _ __ _ __  
| '__| '_ \ 
| |  | | | |
|_|  |_| |_|
=============

rn is a random name generator

It's not designed to be an all-purpose context-free-grammar generator; rather,
this is just when you need a stupid variable name or filler name for a file. 

Usage:

$ rn
# output: red-old-fish

Configuration:

Create a file at `~/.rn/config.yaml` like so:

    template: fixed-$replace-$change
    vocab:
      change: [ words, go, here]
      replace: [ more, words, here]

Replacement is done in a single pass, so no nesting. 

WTFPL, public domain, do as you like. -POLM
