#!/usr/local/bin/node

const dft200Options = [
  {
    title: 'Start',
    arg: 'start'
  },
  {
    title: 'Stop',
    arg: 'stop'
  },
  {
    title: 'Pause',
    arg: 'pause'
  },
  ...[1, 2, 3, 4, 5].map(speed => ({
    title: `Speed ${speed}`,
    arg: `speed ${speed}`
  }))
]

function toAlfred(option) {
  return {
    uid: option.arg.replace(" ", "_"),
    title: option.title,
    arg: option.arg,
    match: option.title,
    autocomplete: option.title
  }
}

console.log(JSON.stringify({items: dft200Options.map(toAlfred)}));
