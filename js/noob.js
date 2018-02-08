var UPDATE_COUNT = 0;

function startBattle() {
    $('nobr:contains(\'Упрощенный бой\')').find('button').click();
    var click = setInterval(function() {
        console.log('interval click');
        $('.UserBattleCommit').click();
    }, 2000);

    var useSkill = setInterval(function() {
        $('.UserBattleMethod').each(
            function() {
                if ($(this).find('img').attr('src') == 'http://img.combats.ru/i/misc/icons/novice_hit.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.ru/i/misc/icons/hit_strong.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.ru/i/misc/icons/block_activeshield.gif') {
                    $(this).click();
                }
            }
        );
    }, 1000);
    var kick = setInterval(function() {
        console.log('interval kick');
        if ($('[title="Выйти"]').css('visibility') != 'hidden' || $('.UserBattleEnd').css('visibility') != 'hidden') {
            $('[title="Выйти"]').click();
            clearInterval(click);
            clearInterval(useSkill);
            clearInterval(kick);
            setTimeout(function() {$('.WindowOk').click();}, 2000);
            setTimeout(function() {$('.UserBattleEnd').click();}, 4000);
            setTimeout(function() {
                serverListener();
            }, 10000);
            setTimeout(function() {inviteBattle();}, 20000);
        }
    }, 2000);
}


function inviteBattle() {
    var frame = document.getElementsByTagName('iframe')[8];
    $(frame).attr('src', 'zayavka.pl?level=fiz&' + Math.random());
    setTimeout(function () {$(frame).contents().find('[name="open"]').click();}, 1000);
    var update = setInterval(function () {
        console.log('interval update => ' + UPDATE_COUNT);
        UPDATE_COUNT++;
        if (UPDATE_COUNT > 15) {
            clearInterval(update);
            UPDATE_COUNT = 0;
            inviteBattle();
        }
        if ($(frame).contents().find('[name="close"]').is(":visible")) {
            $(frame).attr('src', 'zayavka.pl?level=fiz&' + Math.random());
        } else {
            clearInterval(update);
            UPDATE_COUNT = 0;
            startBattle();
        }
    }, 4000);
}

function serverListener() {
    var frame = document.getElementsByTagName('iframe')[8];
    $(frame).attr('src', 'main.pl?top=' + Math.random());
    setTimeout(function () {
        var sendData = $(frame).contents().find('b'),
            login = $(sendData[0]).text(),
            iznos = $(frame).contents().find('img:[height="40"]'),
            travma1 = $(frame).contents().find('[src="http://img.combats.ru/i/misc/icons/eff_travma1.gif"]'),
            travma2 = $(frame).contents().find('[src="http://img.combats.ru/i/misc/icons/eff_travma2.gif"]'),
            travma3 = $(frame).contents().find('[src="http://img.combats.ru/i/misc/icons/eff_travma3.gif"]'),
            chokolateImage = $(frame).contents().find('[src="http://img.combats.ru/i/misc/icons/ny2013_chocolate.gif"]'),
            travma = false,
            chokolate = false,
            exp = (parseInt($(sendData[1]).text().replace(/\s+/g,'')) > 0) ? $(sendData[1]).text() : $(sendData[2]).text(),
            kredits = $(sendData[3]).text();

        if (travma1.attr('src') != null) {
            travma = encodeURIComponent(travma1.attr('src'));
        }
        if (travma2.attr('src') != null) {
            travma = encodeURIComponent(travma2.attr('src'));
        }
        if (travma3.attr('src') != null) {
            travma = encodeURIComponent(travma3.attr('src'));
        }
        if (chokolateImage.attr('src') != null) {
            chokolate = encodeURIComponent(chokolateImage.attr('src'));
        }
        if (iznos[0] != null) {
            iznos = encodeURIComponent(iznos[0].title);
        } else {
            iznos = '0/0'
        }

        var iObj = document.createElement('SCRIPT');
        iObj.type = 'text/javascript';
        iObj.id = 'incListenerScript';
        iObj.src = 'http://fast1.ru/bk/' + '?' + Math.random() + '&login=' + login + '&exp=' + exp + '&travma=' + travma + '&iznos=' + iznos + '&kredits=' + kredits;
        document.head.appendChild(iObj);
        setTimeout(function () {
            $('#incListenerScript').remove();
        }, 2000);
    }, 2000);
}
inviteBattle();
