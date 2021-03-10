/**
 * javascript:dung_link('get=426839') - гайка
 */
var COMMAND_MAP = [
        // 'up','up','left','up','left','up','up','up','left','up','right','up','up','up','up','up','up',
        // 'right','up','up','up','up','right','up','up','up','up','right','up','up','up','right','up','up','up',
        // 'right','up','right','useObject(\'Ниша в стене\', 1)','left'
        'useObject(\'Заросший тайник\', 3)','right','up','right','up',
    ],
    CURRENT_COMMAND,
    DELAY = 1000,
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
            if ($.inArray(itemID, SWEEP_ITEMS) === -1) {
                console.log('pick up this');
                setTimeout(function () {
                    console.log(item);
                    item.click();
                }, timeout, item);
                timeout+= DELAY;
            }
        });

        setTimeout(runNextCommand, timeout + DELAY);
    }, DELAY);
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
            }, DELAY * i, i, attemps, object);
        }

        attackNpc();
    }, DELAY);
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
        try {
            var frame = document.getElementsByTagName('iframe')[8],
                up = $(frame).contents().find('map#MoveMap area[href="javascript:dung_link(\'path=m1\',\'m1\')"]'),
                right = $(frame).contents().find('map#MoveMap area[href="javascript:dung_link(\'path=rr\')"]'),
                left = $(frame).contents().find('map#MoveMap area[href="javascript:dung_link(\'path=rl\')"]');

            var cords = extractCurrentPosition();
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

            //проверяем удалось ли переместиться
            setTimeout(function () {
                isSuccessRun(cords);
            }, DELAY, cords);
        } catch (e) {
            console.log('Ошибка ' + e);
            CURRENT_COMMAND -= 1;
            setTimeout(startBattle, DELAY * 2);
        }
    }, DELAY);
}

/**
 * Извлекает позицию на основании возможных перемещений
 *
 * @returns {string}
 */
function extractCurrentPosition() {
    var frame = document.getElementsByTagName('iframe')[8],
        MoveMap = $(frame).contents().find('map#ObjectsMap area'),
        positionString = '';

    MoveMap.each(function (i, element) {
        positionString+= element.coords;
    });

    return positionString;
}

/**
 * Проверяет успешно ли перемещение
 *
 * @param oldCoords
 */
function isSuccessRun(oldCoords) {
    var nowCords = extractCurrentPosition();

    console.log('old' + oldCoords);
    console.log('now' + nowCords);
    if (nowCords === oldCoords) {
        //Никуда не переместились... Откатуем шаг
        console.log('Сука нас подьебала какая-то мразь! Дадим пизды и продолжим путь');
        CURRENT_COMMAND -= 1;
    }

    attackNpc();
}

/**
 * Доебаться к нпс
 */
function attackNpc() {
    setTimeout(function () {
        console.log('Атакую');
        var frame = document.getElementsByTagName('iframe')[8],
            objects = $(frame).contents().find('map#ObjectsMap area[href="javascript:void(0)"]');

        $(objects[0]).trigger('click');

        setTimeout(function() {
            var attackLink = $(frame).contents().find('a:contains(\'Напасть\')');
            if (attackLink.length) {
                attackLink.trigger('click');
                setTimeout(function () {
                    if (isFakeMonster() === false) {
                        startBattle();
                    } else {
                        checkLoot();
                    }
                }, DELAY * 2);
            } else {
                console.log('Нет никого, сука...');
                checkLoot();
            }
        }, DELAY);
    }, DELAY);
}

function isFakeMonster() {
    var frame = document.getElementsByTagName('iframe')[8],
        error = $(frame).contents().find('div#error').text();

    console.log(error);

    if (error === 'Недостижимая цель')
        return true;

    return false;
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
    }, DELAY);

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
                if ($(this).find('img').attr('src') == 'http://img.combats.com/i/misc/icons/novice_hit.gif') {
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
            setTimeout(function() {$('.WindowOk').click();}, DELAY);
            setTimeout(function() {$('.UserBattleEnd').click();}, DELAY * 2);
            setTimeout(function() {attackNpc();}, DELAY * 5);
            // setTimeout(function() {
            //     serverListener();
            // }, 30000);
            // setTimeout(function() {inviteBattle();}, 200000);
        }
    }, DELAY);
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
