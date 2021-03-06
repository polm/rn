// Generated by LiveScript 1.2.0
(function(){
  var validKeyChars, template, vocab, fs, yaml, config, R, pick, isKeyChar, getWord, doInput, slice$ = [].slice;
  validKeyChars = 'ABCDEFGHIJLKMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  template = "$jj-$jj-$nn";
  vocab = {
    jj: ['big', 'red', 'old', 'shiny', 'spicy'],
    nn: ['fish', 'cat', 'bird', 'dog', 'cake', 'pie', 'pizza']
  };
  try {
    fs = require('fs');
    yaml = require('js-yaml');
    config = yaml.safeLoad(fs.readFileSync(process.env.HOME + '/.rn/config.yaml'));
    template = config.template;
    vocab = config.vocab;
  } catch (e$) {}
  R = function(it){
    return ~~(it * Math.random());
  };
  pick = function(it){
    return it[R(it.length)];
  };
  isKeyChar = function(it){
    return -1 < validKeyChars.indexOf(it);
  };
  getWord = function(it){
    if (!isKeyChar(it[0])) {
      return '';
    } else {
      return it[0] + getWord(slice$.call(it, 1, -1 + 1 || 9e9));
    }
  };
  doInput = function(){
    var output, skipcount, i$, to$, li, word;
    output = '';
    skipcount = 0;
    for (i$ = 0, to$ = template.length; i$ < to$; ++i$) {
      li = i$;
      if (skipcount > 0) {
        skipcount -= 1;
        continue;
      }
      if (template[li] === '\\') {
        output += template[li + 1];
        skipcount = 1;
        continue;
      }
      if (template[li] === '$') {
        word = getWord(slice$.call(template, li + 1, -1 + 1 || 9e9));
        output += pick(vocab[word]);
        skipcount = word.length;
        continue;
      }
      output += template[li];
    }
    return console.log(output);
  };
  doInput();
}).call(this);
