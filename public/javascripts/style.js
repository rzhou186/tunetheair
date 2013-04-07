/*
 * File: style.js
 * ----------------------------------------
 * Fixes heights and widths of webpage.
 * 
 */

/*
 * Function: 'setUsersHeight'
 * Correct heights of left sidebar and app window
 * 
 */
function setUsersHeight() {

  // Initialize heights and widths to 100%
  $('.sidebar-left').height($(document).height());
  $('.app-window').height($(document).height());
  $('.app-window').width($(document).width());

  // Correct heights and widths
  $('.sidebar-left').height($('.sidebar-left').height() - 80);
  $('.app-window').height($('.app-window').height() - 230);
  $('.app-window').width($('.app-window').width() - 401);

}

// Set sidebar and app window heights right when the page begins loading.
setUsersHeight();

// Recompute sidebar height whenever client changes window size
// Use clearTimeout to prevent multiple firings of resize()
var id;
$(window).resize(function() {
  clearTimeout(id);
  id = setTimeout(setUsersHeight, 500);
});
