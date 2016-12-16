import ReactGA from 'react-ga'

module.exports = {
  logPageView: logPageView()
}

function logPageView() {
  ReactGA.set({page: window.location.pathname})
  ReactGA.pageview(window.location.pathname)
  console.log(`'${window.location.pathname}' hit logged`)
}
