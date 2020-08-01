// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// Navigation options
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------

var startPage = 'home'

function loadPage(page) {
  $.ajax({
    url: '/pages/' + page + '.html',
    dataType: 'html',
  }).done(data => {
    const container = $('#main-content')
    container.removeClass()
    container.addClass(page)
    container.html(data)
    container.foundation()
  })
}

function navigateTo(page, replace = false) {
  const url = '/?page=' + page
  if (replace) {
    window.history.replaceState(null, '', url)
  } else {
    window.history.pushState(null, '', url)
  }
  loadPage(page)
}

function getParam(name) {
  if (
    (name = new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)').exec(
      location.search
    ))
  )
    return decodeURIComponent(name[1])
}

window.addEventListener('popstate', e => {
  const page = getParam('page') || startPage
  loadPage(page)
})

$(document).ready(() => {
  navigateTo(getParam('page') || startPage, true)
})
