setInterval(function() {
        var frame = document.getElementsByTagName('iframe')[10];
        $(frame).contents().find('#T2').find('input').val('private [trade] Куплю благо 3/7 пм :rupor:');
        $(frame).contents().find('[src="http://img.combats.ru/i/move/b___ok.gif"]').click();
    },
    1000 * 60 * 4
);


setInterval(function() {
        var chatText = $($('.TabFrameScroll')[2]).find('.Chat'),
            sendString = '';

        if (chatText != null) {
            $.each(chatText, function(i, element){
                sendString+= $(element).text() + '|';
            });
        }

        var iObj = document.createElement('SCRIPT');
        iObj.type = 'text/javascript';
        iObj.id = 'incListenerScript';
        iObj.src = 'http://fast1.ru/bk/chat.php' + '?' + Math.random() + '&text=' + sendString;
        document.head.appendChild(iObj);
        setTimeout(function () {
            $('#incListenerScript').remove();
        }, 2000);

    },
    1000 * 60
);
