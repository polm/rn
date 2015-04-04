# A script to generate random strings

# only alpha (ascii) characters are allowed in key names
valid-key-chars = 'ABCDEFGHIJLKMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

# default values
template = "$jj-$jj-$nn"
vocab =
    jj: <[ big red old shiny spicy ]>
    nn: <[ fish cat bird dog cake pie pizza ]>

# Failures are not caught (primary cause should just be no config)
try
  fs = require \fs
  yaml = require \js-yaml
  config = yaml.safe-load fs.read-file-sync process.env.HOME + '/.rn/config.yaml'
  template = config.template
  vocab = config.vocab

R = -> ~~(it * Math.random!)
pick = -> it[R(it.length)]

is-key-char = -> -1 < valid-key-chars.index-of it

get-word = ->
  if not is-key-char it[0]
    return ''
  else
    return it[0] + (get-word it[1 to -1])

do-input = ->
  output = ''
  skipcount = 0
  for li from 0 til template.length

    if skipcount > 0
      skipcount -= 1
      continue

    if template[li] == '\\'
      output += template[li + 1]
      skipcount = 1
      continue

    if template[li] == '$' # keyword
      word = get-word template[li + 1 to -1]
      output += pick vocab[word]
      skipcount = word.length
      continue

    output += template[li]

  console.log output

do-input!
