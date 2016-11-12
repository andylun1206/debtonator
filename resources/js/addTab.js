// addTab.js

function getUserInput() {
    var other_person;

    if ( ( other_person = document.getElementById( "other_user" ).value ) != null ) {
    } else if ( ( other_person = document.getElementById( "other_name" ).value ) != null ) { }

    if ( document.getElementById( "first_selection" ).value === document.getElementById( "second_selection" ).value ) {
        alert( "Borrower = Loaner" );
    } else {
        addBubble( other_person, document.getElementById( "amount_owed" ).value );
    }
}

function addBubble( otherUserName, amountOwed ) {
    if ( !isNaN( amountOwed ) ) {
        if ( amountOwed != 0 ) {
            var added = false;
            var posn;
            var numBubbles = sessionStorage.getItem( "numBubbles" );

            if ( document.getElementById( "first_selection" ).value != "You" ) {
                amountOwed *= -1;
            }

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
            temp = sessionStorage.getObject( "images" ); temp.insert( posn, "default" ); sessionStorage.setObject( "images", temp );
            sessionStorage.setObject( "numBubbles", sessionStorage.getObject( "numBubbles" ) + 1 );
        } else {
            alert( "Amount is zero!" );
        }
    } else {
        alert( "Amount is not a number!" );
    }
}

function updateOptionsUserName() {
    var otherUserName = document.getElementById( "other_user" ).value;
    document.getElementById( "other_option" ).text = otherUserName;
    document.getElementById( "other_option2" ).text = otherUserName;
}

function updateOptionsName() {
    var otherName = document.getElementById( "other_name" ).value;
    document.getElementById( "other_option" ).text = otherName;
    document.getElementById( "other_option2" ).text = otherName;
}





