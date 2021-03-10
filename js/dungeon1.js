/**
 * javascript:dung_link('get=426839') - гайка
 */
var COMMAND_MAP = {
    suncity: [
        'up','up','left','up','left','up','up','up','left','up','right','up','up','up','up','up','up',
        'right','up','up','up','up','right','up','up','up','up','right','up','up','up','right','up','up','up',
        'right','up','right','useObject(\'Ниша в стене\', 1)','left','useObject(\'Заросший тайник\', 1)','right','up','right','up',
        'left','up','up','left','up','useObject(\'Заросший проход\', 1)','right','up','left','up',
        'useObject(\'Ниша в стене\', 1)','left','up','up','left','up','left','up','up','left','up','useObject(\'Ниша в стене\', 1)',
        'left','up','right','up','up','up','left','up','left','up','right','up','up','up','right','up','left','useObject(\'Заросший проход\', 1)',
        'left','up','up','right','right','up','up','right','useObject(\'Заросший проход\', 1)','right','up','left','up',
        'right','up','up','up','right','up','right','up','left','up','up','left','up','left','up','right','up','left','up','right','up','up',
        'up','up','right','up','up','right','up','up','right','up','up','left','up','up','left','up','right','up','left','up','left',
        'useObject(\'Спуск\', 1)','up','right','up','up','right','up','left','up','up','left','up','up',
        'left','up','up','up','right','right','up','up','left','useObject(\'Ниша в полу\', 1)','right','up','left','up','right','up','left','up','up',
        'left','up','up','left','up','right','up','up','up','right','up','right','up','up','left','up','up','left','up','up','up',
        'right','up','up','left','up','left','up','right','up','right','up','left','left','up','right','useObject(\'Ниша в стене\', 1)',
        'right','right','up','left','up','right','up','right','up','up','left','useObject(\'Спуск в нору\', 1)','up',
        'useObject(\'Заросший тайник\', 1)','right','right','useObject(\'Подъем\', 1)',
        'left','up','right','up','up','right','up','up','right','up','left','up','useObject(\'Хитиновый люк\', 1)','up',
        'useObject(\'Заросший тайник\', 3)',
        /**
         * На третий этаж
         */
        'right','right','up','useObject(\'Хитиновый люк\', 1)','up','right','up','left','up','up','left','up','up','left','up','up','up','right','up','right',
        'useObject(\'Спуск в Глубины Грибницы\', 1)','right','up','up','up','up','up','up','up','left','up','useObject(\'Светляк\', 1)','right',
        'up','up','left','up','right','up','left','left','up','left','up','right','up','up','left','up','right','up','up','up','up','up','up','right','up',
        'up','up','up','up','up','up','up','up','up','right','up','up','up','right','up','useObject(\'Светляк\', 1)','left','up','up','left',
        'up','up','up','left','up','up','up','up','left','up','up','up','right','right','up','left','up','up','left','up',
        'up','up','left','up','up','left','left','up','up','right','up','up','left','up','up','left','up',
        'up','right','up','up','right','up','left','up','left','left','up','right','up','left','up','up','left','up','up',
        'up','up','left','up','up','right','up','up','right','up','up','left','up','right',
        'up','right','up','left','up','left','up','right','up','left','up','up','right','up','up','right','up','up','left',
        'up','up','up','up','left','up','right','right','up','left','up','up','right','up','up','right','up','left','up','up','left','up','up','left','up','up'
    ],
    dreamscity: [

    ]
    },
    CONFIG = location.hostname.split('.')[0],
    CURRENT_COMMAND,
    DELAY = 1000,
    DAEMON_INTERVAL = 0;
    SWEEP_ITEMS = [
        'http://img.combats.com/i/items/cureMana500_0_gg.gif', //гайка
        'http://img.combats.com/i/items/cureMana250_0.gif', //гайка
    ];

/**
 * Демон посещения пещеры.
 *
 * @returns {number}
 */
function dungeonDaemon()
{
    overMission(function () {
        DAEMON_INTERVAL = setInterval(riskyControl, DELAY * 10);
    });
}

/**
 * Контроль риска посещаем пещеру по возможносте.
 */
function riskyControl()
{
    var frame = document.getElementsByTagName('iframe')[8],
        riskyInfo = $(frame).contents().find('h3[style="font-size: small; "]').text().replace(/[^+\d.]/g, ''),
        pay = parseInt(riskyInfo.substr(0, 2)),
        current = parseInt(riskyInfo.substr(2, 4));

    if (current >= pay)
        applyMission(enterDungeon);
}

/**
 * Вход в подземку
 */
function enterDungeon() {
    var frame = document.getElementsByTagName('iframe')[8];
    $(frame).contents().find('input[name="pass"]').val('005');

    setTimeout(function () {
        var frame = document.getElementsByTagName('iframe')[8],
            createButton = $(frame).contents().find('input[value="Создать группу"]');

        createButton[0].onclick = '';
        createButton[0].click();
        setTimeout(function () {
            var frame = document.getElementsByTagName('iframe')[8],
                enterButton = $(frame).contents().find('input[value="Начать"]');

            enterButton[0].click();
            setTimeout(function () {
                var frame = document.getElementsByTagName('iframe')[8],
                    updateButton = $(frame).contents().find('input[value="Обновить"]');

                updateButton[0].click();
                setTimeout(function () {
                    runNextCommand();
                }, DELAY * 5);
            }, DELAY * 5);
        }, DELAY * 2);
    }, DELAY * 2);
}

/**
 * Взять задание.
 */
function applyMission(callback) {
    var frame = document.getElementsByTagName('iframe')[8],
        missionButton = $(frame).contents().find('input[value="Задания"]');

    missionButton[0].click();

    setTimeout(function () {
        var frame = document.getElementsByTagName('iframe')[8],
            applyButton = $(frame).contents().find('input[value="Получить задание"]');

        if (applyButton.length) {
            applyButton[0].click();
        }

        setTimeout(function () {
            var frame = document.getElementsByTagName('iframe')[8],
                returnButton = $(frame).contents().find('input[value="Вернуться"]');

            returnButton[0].click();
            setTimeout(function () {
                callback();
            }, DELAY);
        }, DELAY * 2);
    }, DELAY);
}

/**
 * Завершить задания
 */
function overMission(callback) {
    var frame = document.getElementsByTagName('iframe')[8],
        missionButton = $(frame).contents().find('input[value="Задания"]');

    missionButton[0].click();

    setTimeout(function () {
        var frame = document.getElementsByTagName('iframe')[8],
            overButton = $(frame).contents().find('input[value="Завершить задание"]'),
            delay = 0;

        overButton.each(function (i, button) {
            delay = i * DELAY;

            setTimeout(function () {
                var frame = document.getElementsByTagName('iframe')[8],
                    overButton = $(frame).contents().find('input[value="Завершить задание"]');

                console.log(overButton[0]);
                overButton[0].click();
            }, delay);
        });

        setTimeout(function () {
            var frame = document.getElementsByTagName('iframe')[8],
                returnButton = $(frame).contents().find('input[value="Вернуться"]');

            returnButton[0].click();
            setTimeout(function () {
                callback();
            }, DELAY);
        }, delay + DELAY);
    }, DELAY);
}

/**
 * Покинуть подземелье.
 */
function leave()
{
    var frame = document.getElementsByTagName('iframe')[8],
        exitLink = $(frame).contents().find('a:contains(\'Выйти\')');

    exitLink[0].onclick = '';
    exitLink[0].click();
}

/**
 * Проверяем не посетил ли нас йобаный гоблин...
 *
 * @returns {boolean}
 */
function checkFuckingGoblin() {
    var frame = document.getElementsByTagName('iframe')[8],
        fuckingLink = $(frame).contents().find('a:contains(\'Ээээ....\')');

    if (fuckingLink.length === 0) {
        attackNpc();
        return true;
    }

    console.log('Пидар тут нам пизда');
    fuckingLink[0].click();

    startAnswerGoblin()
}

function startAnswerGoblin() {
    setTimeout(function () {
        var frame = document.getElementsByTagName('iframe')[8],
            fuckingLink = $(frame).contents().find('a');

        // Кликаем на первую ссылку
        fuckingLink[3].click();
        setTimeout(function () {
            // Проверяем угадали ли
            var frame = document.getElementsByTagName('iframe')[8],
                fuckingLink = $(frame).contents().find('a:contains(\'Какую?\')');

            // Если не угадали отвечаем опять
            if (fuckingLink.length === 0) {
                startAnswerGoblin()
            } else {
                fuckingLink[0].click();
                setTimeout(function () {
                    var frame = document.getElementsByTagName('iframe')[8],
                        fuckingLink = $(frame).contents().find('a:contains(\'И что там у тебя есть?\')');

                    fuckingLink[0].click();
                    setTimeout(function () {
                        var frame = document.getElementsByTagName('iframe')[8],
                            fuckingLink = $(frame).contents().find('a:contains(\'Спасибо за это.\')');

                        CURRENT_COMMAND-= 1;
                        fuckingLink[0].click();
                        attackNpc();
                    }, DELAY);
                }, DELAY);
            }
        }, DELAY);
    }, DELAY);
}

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

    if (typeof COMMAND_MAP[CONFIG][CURRENT_COMMAND] === 'undefined') {
        console.log('Поздравляю подземелье пройдено');
        CURRENT_COMMAND = undefined;
        leave();
        dungeonDaemon();
        return false;
    }

    console.log('Запуск ' + CURRENT_COMMAND);
    run(COMMAND_MAP[CONFIG][CURRENT_COMMAND]);
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
            var delay = DELAY * i;
            setTimeout(function () {
                console.log('Проверка нычки попытка ' + Date.now() + ' из '+attemps)
                object[0].click();
            }, delay, attemps, object);
        }

        setTimeout(function () {
            attackNpc();
        }, DELAY * attemps + DELAY);
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
        ObjectsMap = $(frame).contents().find('map#ObjectsMap area'),
        MoveMap = $(frame).contents().find('map#MoveMap area')
        positionString = '';

    ObjectsMap.each(function (i, element) {
        positionString+= element.coords;
    });
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
    }, DELAY * 2);

    var useSkill = setInterval(function() {
        $('.UserBattleMethod').each(
            function() {
                if (
                    $.inArray($(this).find('img').attr('src'),
                    [
                        'http://img.combats.com/i/misc/icons/preparation.gif',
                        'http://img.combats.com/i/misc/icons/hit_empower.gif',
                        'http://img.combats.com/i/misc/icons/krit_deepwounds.gif',
                        'http://img.combats.com/i/misc/icons/hp_enrage.gif',
                        'http://img.combats.com/i/misc/icons/hp_cleance.gif',
                    ]
                ) !== -1) {
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

dungeonDaemon();
