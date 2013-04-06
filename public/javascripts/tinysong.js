/*
 * File: tinysong.js
 * ----------------------------------------
 * Initializes song searching and sharing using the Tinysong API.
 *  
 */

 function initTinysong(){

 	$('#songsearch').submit(function(){

 		event.preventDefault();

		$.ajax({
			url : 'http://tinysong.com/a/Beethoven?format=json&key=6517bdd939f3858691d9f529decc890d',
			type : 'get',
			dataType : 'json',
			success : function(response){
				console.log(response);
			}
    });

	});

 }