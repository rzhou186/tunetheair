/*
 * File: cookies.js
 * ----------------------------------------
 * Handles retrieval, modification, and verification of cookies.
 * Web application uses one cookie per client, for tracking the current room
 * 
 */

/*
 * Function: setCookie()
 * Sets the name, value, and expiration date of cookie
 * 
 */
function setCookie(name, value, numDays){

	// Set expiration date
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() + numDays);

	// Encode cookie value
	var encodedValue = escape(value)  + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	
	// Set current cookie
	document.cookie = name + "=" + encodedValue;

}

/*
 * Function: getCookie()
 * Finds, decodes, and returns the value of a client's cookie
 * 
 */
function getCookie(name){

	// Retrieve all cookies in new array
  var i, x, y, cookies = document.cookie.split(";");

  // Loop through cookies array
  for (i = 0; i < cookies.length; i++){

    x = cookies[i].substr(0, cookies[i].indexOf("="));
    y = cookies[i].substr(cookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");

    // If the cookie is found, return its value
    if (x === name){
      return unescape(y);
    }
  }

  // Else if the cookie was not found, return null
  return null;

}