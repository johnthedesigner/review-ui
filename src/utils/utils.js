// Indent console logs with a title
export function consoleGroup(title, logArray) {
  console.group(title)
  logArray.forEach( (line) => console.log(line) )
  console.groupEnd()
}
