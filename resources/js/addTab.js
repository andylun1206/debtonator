// GENERAL JS

var otherUserName;
var amountOwed;

function enterUserName() {
    otherUserName = document.getElementById("other_user").value;
    amountOwed = document.getElementById("amount_owed").value;
    if ( amountOwed != 0 ) {
        var added = false; var posn;
        var numBubbles = sessionStorage.getItem( "numBubbles" );

        for ( var i = 0; i < numBubbles && !added; i++ ) {
            if ( Math.abs( amountOwed ) >= Math.abs( sessionStorage.getObject( "amounts" )[i] ) ) {
                posn = i;
                added = true;
            }
        }

        if ( !added ) {
            if ( numBubbles == 0 ) {
                posn = 0;
            } else {
                posn = numBubbles;
            }
        }

        var temp;
        temp = sessionStorage.getObject( "names" ); temp.insert( posn, otherUserName ); sessionStorage.setObject( "names", temp );
        temp = sessionStorage.getObject( "amounts" ); temp.insert( posn, amountOwed ); sessionStorage.setObject( "amounts", temp );
        temp = sessionStorage.getObject( "sizes" ); temp.insert( posn, calculateSize( amountOwed ) ); sessionStorage.setObject( "sizes", temp );
        sessionStorage.setObject( "numBubbles", sessionStorage.getObject( "numBubbles" ) + 1 );
    }
}

function enterInput(){
	var input = document.getElementById("other_user").value;
	alert(input);
}

