import { consoleGroup } from '../../utils/utils'

export const RESET_CURRENT_ERROR = "RESET_CURRENT_ERROR"
export const RESET_CURRENT_ALERT = "RESET_CURRENT_ALERT"

export function resetCurrentError() {
  return {
    type: RESET_CURRENT_ERROR
  }
}

export function resetCurrentAlert() {
  return {
    type: RESET_CURRENT_ALERT
  }
}

// Populates current error or alert if present and keeps a tally of both
export function messages(state = {}, action) {
  const { error, alert, type } = action

  if (type === RESET_CURRENT_ERROR) {
    consoleGroup('*** Reset Error ***',[action])
    return Object.assign({},state,{
      currentError: {}
    })
  } else if (type === RESET_CURRENT_ALERT) {
    consoleGroup('*** Reset Alert ***',[action])
    return Object.assign({},state,{
      currentAlert: {}
    })
  } else if (error) {
    consoleGroup('*** New Error ***',[action])
    return Object.assign({},state,{
      errorList: Object.assign({},{
        ...state.errorList,
        error
      }),
      currentError: error
    })
  } else if (alert) {
    consoleGroup('*** New Alert ***',[action])
    return Object.assign({},state,{
      alertList: Object.assign({},{
        ...state.alertList,
        alert
      }),
      currentAlert: alert
    })
  }

  return state
}
