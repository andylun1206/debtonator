var otherUserName = document.getElementById("other_user").value;
var amountOwed = document.getElementById("amount_owed").value;

function enterUserName(){
	otherUserName = document.getElementById("other_user").value;
	alert(otherUserName);
}

function enterInput(){
	var input = document.getElementById("other_user").value;
	alert(input);
}

function addBubble( otherUserName, amountOwed ) {
    if ( amount != 0 ) {
        var added = false; var posn;

        for ( var i = 0; i < numBubbles && !added; i++ ) {
            if ( Math.abs( amount ) >= Math.abs( amounts[i] ) ) {
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

        names.insert( posn, name ); amounts.insert( posn, amount ); sizes.insert( posn, calculateSize( amount ) );
        numBubbles++;
    }

    redrawCanvas();
}




