var AJAX = {

    post: function(u, d, dt, cb) {
        dt = typeof dt !== 'undefined' ? dt : 'json';
        return $.ajax({
            url: u,
            data: d,
            type: 'POST',
            dataType: dt
        });
    },

    get: function(u, d, dt, cb) {
        dt = typeof dt !== 'undefined' ? dt : 'json';
        return $.ajax({
            url: u,
            data: d,
            type: 'GET',
            dataType: dt
        });
    },
};

// usage
var getData = function(url) {
    $.when(AJAX.get(url)).then(function(response) {
        generate_bootstrap_table('#table', response);
    });
};

var getDataSimple = function(url) {
    $.when(AJAX.get(url)).then(function(response) {
        fill_select_bars(response);
    });
};

function fill_select_bars(someObj){
    var someInnerHtml = '';

    someInnerHtml += '<option class="" value="" board_id=""><button class="board_names">Choose a board</button></option>';

    $.each(someObj, function(k, v){
        someInnerHtml += '<option class="fetch_this_board_recent" value="' + v.id + '" board_id="' + v.id + '">' + v.name + '</option>';
    });

    $('.boards_ul_parent').html(someInnerHtml);

    // var options = {
    //   valueNames: [ 'board_names' ]
    // };

    // var userList = new List('moh_boards', options);

    $('.boards_ul_parent').chosen().change(function(){
        var boardId = jQuery('.boards_ul_parent').val();
        var my_recent_url = 'https://api.trello.com/1/boards/' + boardId + '/actions?filter=createCard&fields=data&limit=100&' + KEY_AND_TOKEN;

        console.log(boardId);

        getData(my_recent_url);
    });
}

// var postData = function(url) {
//     var data = {};
//     $.when(AJAX.post(url, data))
//         .then(function(response) {
//             // console.log(response);
//             generate_bootstrap_table('#table', response);
//         });
// };

function generate_bootstrap_table(tableClassName, data) {
    var colObj = [];

    // console.log(data);

    jQuery.each(data[0]['data']['card'], function(k, v) {
        var cur = {
            field: k,
            title: k,
            class: k + '_dev',
            sortable: true,
        };

        cur = includeHideClassForMobile(k, cur);

        colObj.push(cur);

        return;
    });

    colObj = appendExtraFields(colObj);
    colObj = filterNeededColFields(colObj);

    // console.log('colObj', colObj);

    var valObj = [];

    _.each(data, function(value, key) {
        if (!_.isUndefined(value.data.card)) {
            var neededData = value.data.card;
            neededData = filterNeededRowFields(neededData);

            // console.log(value);

            if (!_.isUndefined(neededData.shortLink)) {
                neededData.shortLink = neededData.shortLink;
            }

            if (!_.isUndefined(value.data.list) && !_.isUndefined(value.data.list.name)) {
                neededData.list = value.data.list.name;
            }
            if (!_.isUndefined(value.data.board) && !_.isUndefined(value.data.board.name)) {
                neededData.board = value.data.board.name;
                // if(neededData.board == 'moh-wptc'){
                if( _.includes(BOARDS_TO_EXCLUDE, neededData.board) ){
                    return;
                }
            }
            if (!_.isUndefined(value.date) && !_.isUndefined(value.date)) {
                neededData.date = value.date;
            }

            valObj.push(neededData);
        }
    });

    // console.log('valObj', valObj);

    $('#table').bootstrapTable('destroy').bootstrapTable({
        data: valObj,
        columns: colObj,
        search: true,
        pagination: true,
    });
}

jQuery(document).ready(function($) {
    var popbox =   new Popbox({
        blur:true,
        overlay:true,
    });

    saveKeysFromLocalStorageMoh();

    setTimeout(function(){
        if(!trello_key_moh){
            popbox.open('mypopbox1');
        }

        $('.trello_key_moh').val(trello_key_moh);
        $('.trello_token_moh').val(trello_token_moh);

        getData(TRELLO_MY_ACTIONS_URL);
        getDataSimple(TRELLO_MY_BOARDS_URL);
    }, 2000);

    $(document).on('click', '.show_keys_form_moh', function(e) {
        popbox.open('mypopbox1');
    });

    $(document).on('click', '.save_keys_form_moh', function(e) {
        localforage.setItem('moh_trello_keys', JSON.stringify({
            trello_key_moh: jQuery('.trello_key_moh').val(),
            trello_token_moh: jQuery('.trello_token_moh').val()
        }));

        setTimeout(function(){
            location.reload()
        }, 2000)
    });

    $(document).on('click', '.fetch_this_board_recent', function(e) {
        var boardId = jQuery(this).attr('board_id');
        var my_recent_url = 'https://api.trello.com/1/boards/' + boardId + '/actions?filter=createCard&fields=data&limit=100&' + KEY_AND_TOKEN;
        getData(my_recent_url);
    });

    $(document).on('click', '.fetch_ubuntu_recent', function(e) {
        getData(TRELLO_UBUNTU_RECENT_URL);
    });

    $(document).on('click', '.fetch_my_all_actions', function(e) {
        getData(TRELLO_MY_ACTIONS_URL);
    });

    //actions
    jQuery(document).on('click', '.shortLink_dev', function(e) {
        var cardHash = jQuery(this).text();
        var cardAttachmentUrl = TRELLO_GET_ATTACHMENTS_LINK_BEGIN + cardHash + TRELLO_GET_ATTACHMENTS_LINK_END;

        $.when(AJAX.get(cardAttachmentUrl))
            .then(function(response) {

                // console.log(response);

                var win = window.open('https://trello.com/c/' + cardHash, '_blank');
            });
    });

    jQuery(document).on('click', '.name_dev', function(e) {
        var cardHash = jQuery(this).siblings('.shortLink_dev').text();
        var cardAttachmentUrl = TRELLO_GET_ATTACHMENTS_LINK_BEGIN + cardHash + TRELLO_GET_ATTACHMENTS_LINK_END;

        $.when(AJAX.get(cardAttachmentUrl))
            .then(function(response) {

                // console.log(response);

                if(_.isUndefined(response) || _.isEmpty(response)){
                    var win = window.open('https://trello.com/c/' + cardHash, '_blank');

                    return;
                }

                $.each(response, function(k, v){
                    if( v.url.search(/jpeg/i) == -1 && v.url.search(/png/i) == -1 && v.url.search(/jpg/i) == -1 ){
                        var win = window.open(v.url, '_blank');
                        // win.focus();
                    }
                });
            });
    });

});