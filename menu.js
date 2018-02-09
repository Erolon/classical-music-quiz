$(document).ready(function() {
    $('.btn').each(function(i, button) {
        button.onclick = function() {
            localStorage.setItem("difficulty", $(button).val());
            window.location.href='game.html';
        };
    });
});
