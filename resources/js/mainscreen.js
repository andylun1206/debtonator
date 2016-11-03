function updateBubbles( img, locationX, locationY, size, colour ) {
    var canvas = document.getElementById( 'bubblesCanvas' );
    var context = canvas.getContext( '2d' );

    var centerX = locationX;
    var centerY = locationY;
    var radius = size;

    var profilePic = new Image();
    profilePic.src = img;
    profilePic.onload = function() {
        context.beginPath();
        context.arc( centerX-50, centerY-50, radius, 0, 2 * Math.PI, false );
        context.fillStyle = context.createPattern( this, "no-repeat" );
        context.fill();
        context.lineWidth = 3;
        context.strokeStyle = colour;
        context.stroke();
    }
}