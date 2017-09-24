function bindEvents(obj, events, fn) {
    if (window.addEventListener) {
        obj.addEventListener(events, function() {
            fn();
        });
    } else {
        obj.attachEvent('on' + events, fn);
    }
}

bindEvents(window, 'load', function() {
    var listUl = document.getElementsByClassName('list')[0];
    var list = listUl.getElementsByTagName('li');
    var audio = document.getElementsByTagName('audio')[0];
    var src = list[0].children[0].attributes['tg'].nodeValue;
    var order = list[0].children[0].attributes['order'].nodeValue;
    audio.setAttribute('src', src);
    audio.setAttribute('order', order);
    var forEach = Array.prototype.forEach.call(list, function(element) {
        bindEvents(element, 'dblclick', function() {

            var span = element.children[0];
            audio.setAttribute('src', span.attributes['tg'].nodeValue);
            audio.setAttribute('order', span.attributes['order'].nodeValue);
        });


    });
    bindEvents(audio, 'ended', function() {
        var order = parseInt(audio.attributes['order'].nodeValue);
        if (list[order] === undefined) {
            order = 0;
        }
        var src = list[order].children[0].attributes['tg'].nodeValue;
        audio.setAttribute('src', src);
        audio.setAttribute('order', order + 1);
    });




});