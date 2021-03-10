/**
 * javascript:dung_link('get=426839') - гайка
 */
var COMMAND_MAP = [
        'up',
        'right',
        'battle',
        'up',
        'left',
        'up',
        'battle',
        'up',
        'left',
        'useObject(\'Забытая экипировка\', 1)',
        'left',
        'up',
        'up',
        'right',
        'up',
        'battle',
        'up',
    ],
    CURRENT_COMMAND,
    SWEEP_ITEMS = [
    'http://img.combats.com/i/items/mater_small_lvl4_reward.gif' //гайка
];

/**
 * Запускает комманду.
 *
 * @param command
 */
function run(command)
{
    console.log('Комманда ' + command);
    if ($.inArray(command, ['up', 'right', 'left']) !== -1) {
        move(command);
        return true;
    }

    if (command === 'battle') {
        attackNpc();
        return true;
    }

    eval(command);
}

/**
 * Запустить следующую комманду.
 */
function runNextCommand() {
    if (typeof CURRENT_COMMAND === 'undefined') {
        CURRENT_COMMAND = 0;
    } else {
        CURRENT_COMMAND+= 1;
    }

    if (typeof COMMAND_MAP[CURRENT_COMMAND] === 'undefined') {
        console.log('Поздравляю подземелье пройдено');

        return false;
    }

    console.log('Запуск ' + CURRENT_COMMAND);
    run(COMMAND_MAP[CURRENT_COMMAND]);
}

/**
 * Поднять лут
 */
function checkLoot() {
    setTimeout(function () {
        console.log('Проверяю лут');
        var frame = document.getElementsByTagName('iframe')[8],
            lootItems = $(frame).contents().find('div#items a[style="cursor:pointer"]'),
            timeout = 100;

        lootItems.each(function(i, item) {
            var href = item.href,
                image = item.firstElementChild,
                itemID = image.src;

            console.log(image);
            if ($.inArray(itemID, SWEEP_ITEMS) !== -1) {
                console.log('pick up this');
                 setTimeout(function () {
                    console.log(item);
                    item.click();
                 }, timeout, item);
                timeout+= 1000;
            }
        });

        setTimeout(runNextCommand, timeout + 1000);
    }, 2000);
}

/**
 * Активирует обьект.
 *
 * @param title
 * @param attemps
 */
function useObject(title, attemps) {
    setTimeout(function () {
        var frame = document.getElementsByTagName('iframe')[8],
            object = $(frame).contents().find('map#ObjectsMap area[title="'+title+'"]');

        for (var i = 0; i < attemps; i++) {
            setTimeout(function () {
                console.log('Проверка нычки попытка '+i+' из '+attemps)
                object[0].click();
            }, 1000 * attemps, i, attemps, object);
        }

        checkLoot();
    }, 2000);
}

/**
 * Двигать жопу
 *
 * @param action
 */
function move(action)
{
    setTimeout(function () {
        console.log('Иду ' + action);
        var frame = document.getElementsByTagName('iframe')[8],
            up = $(frame).contents().find('map#MoveMap area[href="javascript:dung_link(\'path=m1\',\'m1\')"]'),
            right = $(frame).contents().find('map#MoveMap area[href="javascript:dung_link(\'path=rr\')"]'),
            left = $(frame).contents().find('map#MoveMap area[href="javascript:dung_link(\'path=rl\')"]');

        switch (action) {
            case 'up':
                up[0].click();
                break;
            case 'left':
                left[0].click();
                break;
            case 'right':
                right[0].click();
                break;
            default:
                break;
        }

        checkLoot();
    }, 2000);
}

/**
 * Доебаться к нпс
 */
function attackNpc() {
    setTimeout(function () {
        console.log('Атакую');
        var frame = document.getElementsByTagName('iframe')[8],
            objects = $(frame).contents().find('map#ObjectsMap area');

        $(objects[0]).trigger('click');

        setTimeout(function() {
            var attackLink = $(frame).contents().find('a:contains(\'Напасть\')');
            if (attackLink.length) {
                attackLink.trigger('click');
                setTimeout(startBattle, 4000);
            } else {
                console.log('Нет никого, сука...');
                checkLoot();
            }
        }, 2000);
    }, 2000);
}

/**
 * Стартует битву
 */
function startBattle() {
    console.log('Дерусь');
    $('nobr:contains(\'Упрощенный бой\')').find('button').click();
    var click = setInterval(function() {
        //console.log('interval click');
        $('.UserBattleCommit').click();
    }, 3000);

    var useSkill = setInterval(function() {
        $('.UserBattleMethod').each(
            function() {
                if ($(this).find('img').attr('src') == 'http://img.combats.com/i/misc/icons/preparation.gif') {
                    $(this).click();
                }
                //Приемы воина.
                if ($(this).find('img').attr('src') == 'http://img.combats.com/i/misc/icons/hit_strong.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.com/i/misc/icons/block_wrath.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.com/i/misc/icons/block_path.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.com/i/misc/icons/block_restore.gif') {
                    $(this).click();
                }
            }
        );
    }, 1000);
    var kick = setInterval(function() {
        //console.log('interval kick');
        if ($('[title="Выйти"]').css('visibility') != 'hidden' || $('.UserBattleEnd').css('visibility') != 'hidden') {
            $('[title="Выйти"]').click();
            clearInterval(click);
            clearInterval(useSkill);
            clearInterval(kick);
            setTimeout(function() {$('.WindowOk').click();}, 2000);
            setTimeout(function() {$('.UserBattleEnd').click();}, 4000);
            setTimeout(function() {checkLoot();}, 10000);
            // setTimeout(function() {
            //     serverListener();
            // }, 30000);
            // setTimeout(function() {inviteBattle();}, 200000);
        }
    }, 2000);
}



/*

var frame = document.getElementsByTagName('iframe')[8],
    objects = $(frame).contents().find('map#ObjectsMap area'),
    MoveVariants = $(frame).contents().find('div.Move'),
    MoveMap = $(frame).contents().find('map#MoveMap area');


$(objects[0]).trigger('click');

$(frame).contents().find('a:contains(\'Напасть\')').trigger('click');

objects.forEach(function (value) {
    console.log(value)
})*/
