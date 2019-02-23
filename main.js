let url = window.location.href;

myStorage = window.localStorage;

if (url.match('masterani.me\/anime\/watch.+')) {
    removeAd();
    testasdasdasdasd();
    console.log('Anime page!');
} else {
    console.log('Fail');
}

function removeAd() {
    let ad = document.getElementsByClassName('sixteen wide column');
    for (let item of ad) {
        if (item.className != 'sixteen wide column' && item.className != 'sixteen wide column center aligned') {
            let place = document.getElementsByClassName(item.className)[0];
            place.innerHTML = '';
            var button = document.createElement('button');
            button.id = 'addaswatched';
            bText = 'Add as watched';
            if (myStorage.getItem(getAnimeName()).includes(getAnimeEpisode())) {
                bText = 'Remove as watched';
            }
            button.appendChild(document.createTextNode(bText));
            place.appendChild(button);
            place.appendChild(watch_status());
        }
    }
}

function getAnimeEpisode() {
    let info = document.getElementsByClassName('info')[1];
    return info.children[1].textContent.match('\\d+')[0];
    //return anime_name;
}

function getAnimeName() {
    let info = document.getElementsByClassName('info')[1];
    //let anime_name = 
    return info.children[0].textContent;
}

function testasdasdasdasd() {
    document.getElementById('addaswatched').addEventListener('click', function () {
        let info = document.getElementsByClassName('info')[1];
        let anime_name = info.children[0].textContent;
        let anime_episode = info.children[1].textContent.match('\\d+')[0];
        if (myStorage.getItem(getAnimeName()).includes(getAnimeEpisode())) {
            remove_anime_episode(anime_name, anime_episode);
        } else {
            add_anime_episode(anime_name, anime_episode);
        }
    });
}

function watch_status() {
    var element = document.createElement('p');
    try {
        if (myStorage.getItem(getAnimeName()).includes(getAnimeEpisode())) {
            var text = document.createTextNode('Watched!');
            element.appendChild(text);
            element.style.color = 'green';
        } else {
            var text = document.createTextNode('Not watched!');
            element.appendChild(text);
            element.style.color = 'red';
        }
    } catch (error) {
        var text = document.createTextNode('Not watched!');
        element.appendChild(text);
        element.style.color = 'pink';
    }

    return element;
}

function add_anime_episode(anime_name, episode) {
    let arr_old = myStorage.getItem(anime_name);
    let arr_new = [];
    if (arr_old != undefined) {
        arr_new.push(arr_old);
    }
    arr_new.push(episode);
    myStorage.setItem(anime_name, arr_new);
    removeAd();
}

function remove_anime_episode(anime_name, episode) {
    let arr_old = myStorage.getItem(anime_name);
    if (arr_old != undefined && myStorage.getItem(getAnimeName()).includes(getAnimeEpisode())) {
        arr_old = arr_remove(arr_old, episode);
    }
    myStorage.setItem(anime_name, arr_old);
    removeAd();
}

function arr_remove(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr
}

function clear_data() {

}