myStorage = window.localStorage;

var LoadAnimeInfo = null;

function main() {
    let url = window.location.href;

    if (url.match('masterani.me\/anime\/watch.+')) {
        removeAd();
        console.log('ADDON: Anime Watch page!');
    } else if (url.match('masterani.me\/anime\/info.+')) {
        try {
            LoadAnimeInfo = setInterval(function () { main_info(); }, 100);
            //This should work, just need to find a way to break it!
        } catch (error) {
            console.log('ADDON: ' + error)
        }
        console.log('ADDON: Anime Info page!');
    } else {
        console.log('ADDON: Fail');
    }
    console.log('ADDON: Loaded!')
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
            try {
                if (myStorage.getItem(getAnimeName()).includes(getAnimeEpisode())) {
                    bText = 'Remove as watched';
                }
            } catch (error) {
                console.log('ADDON: ' + error)
            }

            button.appendChild(document.createTextNode(bText));
            place.appendChild(button);
            place.appendChild(watch_status());
            testasdasdasdasd();
        }
    }
}

function getAnimeEpisode() {
    let info = document.getElementsByClassName('info')[1];
    return info.children[1].textContent.match('\\d+')[0];
}

function getAnimeName() {
    let info = document.getElementsByClassName('info')[1];
    return info.children[0].textContent;
}

function testasdasdasdasd() {
    document.getElementById('addaswatched').addEventListener('click', function () {
        let info = document.getElementsByClassName('info')[1];
        let anime_name = info.children[0].textContent;
        let anime_episode = info.children[1].textContent.match('\\d+')[0];
        try {
            if (myStorage.getItem(anime_name).includes(anime_episode)) {
                remove_anime_episode(anime_name, anime_episode);
            } else {
                add_anime_episode(anime_name, anime_episode);
            }
        } catch (error) {
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
        if (!arr_old.includes(episode)) {
            arr_new.push(episode);
        } else {
            console.log('ADDON: Episode already added!')
        }
    }
    arr_new.push(arr_old);
    myStorage.setItem(anime_name, arr_new);
    removeAd();
}

function remove_anime_episode(anime_name, episode) {
    let arr_old = myStorage.getItem(anime_name);
    if (arr_old != undefined && myStorage.getItem(getAnimeName()).includes(getAnimeEpisode())) {
        arr_old = remove_array_element(arr_old, episode);
    }
    myStorage.setItem(anime_name, arr_old);
    removeAd();
}

function remove_array_element(arr, n) {
    try {
        var sarr = arr.split(',')
        var index = sarr.indexOf(n);
        if (index > -1) {
            sarr.splice(index, 1);
        }
    } catch (error) {
        console.log('ADDON: ' + error)
    }
    return sarr;
}

function clear_data() {
    document.getElementById('addasremove_data').addEventListener('click', function () {
        if (confirm('Are you sure you want to delete progress for this anime?')) {
            anime_titel = document.getElementsByClassName('right floated sixteen wide mobile ten wide tablet twelve wide computer column')
            let regex = /[ \t]+$/
            title = anime_titel[0].children[0].childNodes[0].data.replace(regex, '')
            myStorage.setItem(title, '')
            main_info()
        } else {
            console.log('noty!')
        }
    });
}

function main_info() {
    thumbnail_blur = document.getElementsByClassName('thumbnail blur')
    anime_titel = document.getElementsByClassName('right floated sixteen wide mobile ten wide tablet twelve wide computer column')
    title = anime_titel[0].children[0].childNodes[0].data
    let regex = /[ \t]+$/
    let watched = myStorage.getItem(title.replace(regex, ''))
    //console.log(title.replace(regex, ''))
    try {
        if(document.getElementById('addasremove_data') == undefined){
            var button = document.createElement('button');
            button.className = "item";
            button.style = "background-color: rgba(0, 0, 0, 0);"
            button.id = 'addasremove_data';
            button.appendChild(document.createTextNode('Remove all watch status'));
        }
    } catch (error) {
        
    }
    document.getElementsByClassName('ui tag horizontal list')[0].appendChild(button);
    try {
        for (let item of thumbnail_blur) {
            let info = item.children[1].children[0]
            let ep = info.children[1].innerHTML.match('\\d+')[0]
            if (watched.includes(ep)) {
                info.children[0].style.color = "green"
            } else {
                info.children[0].style.color = "red"
            }
        }
    } catch (error) {
        
    }
    clear_data()
    if (title != "") {
        clearInterval(LoadAnimeInfo)
    }
}

main()