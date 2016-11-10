var canvas; var context; var box;

var canvasWidth = 1920; var canvasHeight = 825; var windowOffsetX = 120;
var boxWidth; var ratio;

var MAX_BUBBLE_SIZE = 400;
var red = '#FF0000'; var black = '#000000';

function initialize() {
    if ( typeof( Storage ) !== "undefined" ) {
        if ( sessionStorage.getObject( "numBubbles" ) === null ) {
            sessionStorage.setObject( "names", [] );
            sessionStorage.setObject( "amounts", [] );
            sessionStorage.setObject( "sizes", [] );
            sessionStorage.setObject( "numBubbles", 0 );
        }

        redrawCanvas();
    } else {
        console.log( "Browser does not support web storage." );
    }
}

function addBubble() {
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

        sessionStorage.setObject( "names", sessionStorage.getObject( "names" ).insert( posn, otherUserName ) );
        sessionStorage.setObject( "amounts", sessionStorage.getObject( "amounts" ).insert( posn, amountOwed ) );
        sessionStorage.setObject( "sizes", sessionStorage.getObject( "sizes" ).insert( posn, calculateSize( amountOwed ) ) );
        sessionStorage.setItem( "numBubbles", sessionStorage.getItem( "numBubbles" ) + 1 );
    }

    redrawCanvas();
}

function redrawCanvas() {
    canvas = document.getElementById( 'bubblesCanvas' );
    context = canvas.getContext( '2d' );
    box = document.getElementById( 'box' );

    boxWidth = box.clientWidth - windowOffsetX;
    canvas.width = boxWidth;
    ratio = boxWidth / canvasWidth;

    var points = generatePoints();

    for ( var i = 0; i < sessionStorage.getObject( "numBubbles" ); i++ ) {
        drawBubble( points[i][0], points[i][1], sessionStorage.getObject("sizes")[i] * ratio, sessionStorage.getObject("names")[i], sessionStorage.getObject("amounts")[i] );
    }
}

function drawBubble( x, y, diameter, name, amount ) {
    var radius = diameter / 2;
    var arcX = x + radius; var arcY = y + radius;

    var img = document.createElement( "img" );
    img.src = "resources/img/defaultProfilePic.png";
    img.onload = function() {
        context.drawImage( img, x, y, diameter, diameter );

        context.beginPath();
        context.arc( arcX, arcY, radius, 0, 2 * Math.PI, false );
        context.lineWidth = 3;
        context.strokeStyle = getColour( amount );
        context.stroke();

        var amountText = "$".concat( Math.abs( amount ) );
        context.font = "12px sans-serif";  // dynamic ratio?
        context.fillText( name, centerText( name, arcX ), arcY + radius - 17 );
        context.fillText( amountText, centerText( amountText, arcX ), arcY + radius - 5 );
    };
}

function calculateSize( amount ) {
    var size;
    amount = Math.abs( amount );

    if ( amount > 150 ) {
        size = MAX_BUBBLE_SIZE;
    } else {
        size = -0.00894062 * Math.pow( amount, 2 ) + 3.33388 * amount + 100.057;
    }

    return size;
}

function centerText( text, posn ) {
    return posn - context.measureText( text ).width / 2;
}

function getColour( amount ) {
    var colour;

    if ( amount > 0 ) {
        colour = red;
    } else {
        colour = black;
    }

    return colour;
}

function generatePoints() {
    var points = [];
    var x; var y; var radius; var radiusOffset = 0; var bubbleDistance = 25;
    var halfWidth = boxWidth / 2; var halfHeight = canvasHeight / 2;
    var angle = 0; var deltaAngle = 0; var savedRadius = 0; var offset;

    for ( var i = 0; i < sessionStorage.getObject( "numBubbles" ); i++ ) {
        radius = ( sessionStorage.getObject( "sizes" )[i] * ratio ) / 2;

        if ( i == 0 ) {
            x = halfWidth - radius;
            y = halfHeight - radius;
            radiusOffset = radius;
        } else {
            if ( i == 1 ) {
                angle = Math.random() * 2 * Math.PI;
                deltaAngle = Math.PI / 3;
                savedRadius = radius;
            } else if ( i == 7 ) {
                radiusOffset += ( savedRadius * 2 ) + ( bubbleDistance * ratio );
                angle = Math.random() * 2 * Math.PI;
                deltaAngle = Math.PI / 6;
            } else {
                angle += deltaAngle;
            }

            offset = radiusOffset + radius + ( bubbleDistance * ratio );
            x = ( halfWidth - radius ) + ( Math.cos( angle ) * offset );
            y = ( halfHeight - radius ) + ( Math.sin( angle ) * offset );
        }

        points.push( [x, y] );
    }

    return points;
}

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
}

Storage.prototype.setObject = function( key, object ) {
    return this.setItem( key, JSON.stringify( object ) );
}

Storage.prototype.getObject = function ( key ) {
    return JSON.parse( this.getItem( key ) );
}












// var canvas; var context; var box;
//
// var names = []; var amounts = []; var sizes = [];
// var numBubbles = 0;
//
// var canvasWidth = 1920; var canvasHeight = 825; var windowOffsetX = 120;
// var boxWidth; var ratio;
//
// var MAX_BUBBLE_SIZE = 400;
// var red = '#FF0000'; var black = '#000000';
// var rings = [1, 6, 10, 13];
//
// function initialize() {
//     canvas = document.getElementById( 'bubblesCanvas' );
//     context = canvas.getContext( '2d' );
//     box = document.getElementById( 'box' );
//     redrawCanvas();
// }
//
// function addBubble( name, amount ) {
//     if ( amount != 0 ) {
//         var added = false; var posn;
//
//         for ( var i = 0; i < numBubbles && !added; i++ ) {
//             if ( Math.abs( amount ) >= Math.abs( amounts[i] ) ) {
//                 posn = i;
//                 added = true;
//             }
//         }
//
//         if ( !added ) {
//             if ( numBubbles == 0 ) {
//                 posn = 0;
//             } else {
//                 posn = numBubbles;
//             }
//         }
//
//         names.insert( posn, name ); amounts.insert( posn, amount ); sizes.insert( posn, calculateSize( amount ) );
//         numBubbles++;
//     }
//
//     redrawCanvas();
// }
//
// function redrawCanvas() {
//     boxWidth = box.clientWidth - windowOffsetX;
//     canvas.width = boxWidth;
//     ratio = boxWidth / canvasWidth;
//
//      var points = generatePoints();
//
//     for ( var i = 0; i < numBubbles; i++ ) {
//         drawBubble( points[i][0], points[i][1], sizes[i] * ratio, names[i], amounts[i] );
//     }
// }
//
// function drawBubble( x, y, diameter, name, amount ) {
//     var radius = diameter / 2;
//     var arcX = x + radius; var arcY = y + radius;
//
//     var img = new Image();
//     img.src = "resources/img/defaultProfilePic.png";
//     context.drawImage( img, x, y, diameter, diameter );
//
//     context.beginPath();
//     context.arc( arcX, arcY, radius, 0, 2 * Math.PI, false );
//     context.lineWidth = 3;
//     context.strokeStyle = getColour( amount );
//     context.stroke();
//
//     var amountText = "$".concat( Math.abs( amount ) );
//     context.font = "12px sans-serif";  // dynamic ratio?
//     context.fillText( name, centerText( name, arcX ), arcY + radius - 17 );
//     context.fillText( amountText, centerText( amountText, arcX ), arcY + radius - 5 );
// }
//
// function calculateSize( amount ) {
//     var size;
//     amount = Math.abs( amount );
//
//     if ( amount > 150 ) {
//         size = MAX_BUBBLE_SIZE;
//     } else {
//         size = -0.00894062 * Math.pow( amount, 2 ) + 3.33388 * amount + 100.057;
//     }
//
//     return size;
// }
//
// function centerText( text, posn ) {
//     return posn - context.measureText( text ).width / 2;
// }
//
// function getColour( amount ) {
//     var colour;
//
//     if ( amount > 0 ) {
//         colour = red;
//     } else {
//         colour = black;
//     }
//
//     return colour;
// }
//
// function generatePoints() {
//     var points = [];
//     var x; var y; var radius; var radiusOffset = 0; var bubbleDistance = 25;
//     var halfWidth = boxWidth / 2; var halfHeight = canvasHeight / 2;
//     var angle = 0; var deltaAngle = 0; var savedRadius = 0; var offset;
//
//     for ( var i = 0; i < numBubbles; i++ ) {
//         radius = ( sizes[i] * ratio ) / 2;
//
//         if ( i == 0 ) {
//             x = halfWidth - radius;
//             y = halfHeight - radius;
//             radiusOffset = radius;
//         } else {
//             if ( i == 1 ) {
//                 angle = Math.random() * 2 * Math.PI;
//                 deltaAngle = Math.PI / 3;
//                 savedRadius = radius;
//             } else if ( i == 7 ) {
//                 radiusOffset += ( savedRadius * 2 ) + ( bubbleDistance * ratio );
//                 angle = Math.random() * 2 * Math.PI;
//                 deltaAngle = Math.PI / 6;
//             } else {
//                 angle += deltaAngle;
//             }
//
//             offset = radiusOffset + radius + ( bubbleDistance * ratio );
//             x = ( halfWidth - radius ) + ( Math.cos( angle ) * offset );
//             y = ( halfHeight - radius ) + ( Math.sin( angle ) * offset );
//         }
//
//         points.push( [x, y] );
//     }
//
//     return points;
// }
//
// Array.prototype.insert = function ( index, item ) {
//     this.splice( index, 0, item );
// }
