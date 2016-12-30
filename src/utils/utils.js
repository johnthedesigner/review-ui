import { browserHistory } from 'react-router'

// Indent console logs with a title
export function consoleGroup(title, logArray) {
  if (process.env.NODE_ENV === 'development') {
    console.group(title)
    logArray.forEach( (line) => console.log(line) )
    console.groupEnd()
  }
}

// Redirect unauthenticated users to Log In Page
export function noAuthRedirect(props) {
  if (!props.user.isLoggedIn && !props.user.isLoading) browserHistory.push('/login')
}