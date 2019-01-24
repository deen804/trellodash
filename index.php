<?php

?>

<!DOCTYPE html>
<html>

<head>
    <title></title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.0/bootstrap-table.min.css">
    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="popbox.css">
</head>

<body>
    <meta name="viewport" content="width=380">
    <div data-popbox-id="mypopbox1" class="popbox">
       <div class="popbox_container">
        <div>
            <input type="text" name="trello_key_moh" class="trello_key_moh">
            <input type="text" name="trello_token_moh" class="trello_token_moh">
        </div>
        <button class="save_keys_form_moh">Save</button>
        <button data-popbox-close="mypopbox1">Close</button>
       </div>
     </div>
    <div id="moh_boards">
        <input class="search pull-left" style="width: 300px;" placeholder="Search" />
        <div class="pull-left boards_ul_container" >
            <ul class="list boards_ul_parent">
                
            </ul>
        </div>
        <div class="pull-right" >
            <button class="show_keys_form_moh">Enter Keys</button>
        </div>
    </div>
    <div class="clearfix"></div>
    <!-- <button class="fetch_my_all_actions">fetch_my_all_actions</button> -->
    <div class="table-responsive">
        <table class="table table_group" id="table">
        </table>
    </div>
</body>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/lodash/4.17.2/lodash.min.js"></script>
<script src="https://cdn.jsdelivr.net/lodash/4.17.2/lodash.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.0/bootstrap-table.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js"></script>

<script src="local-forage.min.js" type="text/javascript"></script>
<script src="popbox.js" type="text/javascript"></script>
<script src="table-format.js" type="text/javascript"></script>

<script type="text/javascript">

var trello_key_moh = '';
var trello_token_moh = '';

var KEY_AND_TOKEN = 'key='+trello_key_moh+'&token='+trello_token_moh;
var TRELLO_UBUNTU_RECENT_URL = 'https://api.trello.com/1/boards/tSTxbKha/actions?filter=createCard&fields=data&limit=5&' + KEY_AND_TOKEN;
var TRELLO_MY_ACTIONS_URL = 'https://api.trello.com/1/members/me/actions?filter=createCard,updateCard&limit=100&' + KEY_AND_TOKEN;
var TRELLO_GET_ATTACHMENTS_LINK_BEGIN = 'https://api.trello.com/1/cards/';
var TRELLO_GET_ATTACHMENTS_LINK_END = '/attachments?' + KEY_AND_TOKEN;
var TRELLO_MY_BOARDS_URL = 'https://api.trello.com/1/members/me/boards?limit=100&' + KEY_AND_TOKEN;

var BOARDS_TO_EXCLUDE = [
    'moh-wptc',
    'Pricing 3.0',
    'wptc customer queries'
];

function saveKeysFromLocalStorageMoh(){
    localforage.getItem('moh_trello_keys', function(err, value) {

        value = JSON.parse(value);

        trello_key_moh = value.trello_key_moh;
        trello_token_moh = value.trello_token_moh;

        KEY_AND_TOKEN = 'key='+trello_key_moh+'&token='+trello_token_moh;
        TRELLO_UBUNTU_RECENT_URL = 'https://api.trello.com/1/boards/tSTxbKha/actions?filter=createCard&fields=data&limit=5&' + KEY_AND_TOKEN;
        TRELLO_MY_ACTIONS_URL = 'https://api.trello.com/1/members/me/actions?filter=createCard,updateCard&limit=100&' + KEY_AND_TOKEN;
        TRELLO_GET_ATTACHMENTS_LINK_BEGIN = 'https://api.trello.com/1/cards/';
        TRELLO_GET_ATTACHMENTS_LINK_END = '/attachments?' + KEY_AND_TOKEN;
        TRELLO_MY_BOARDS_URL = 'https://api.trello.com/1/members/me/boards?limit=100&' + KEY_AND_TOKEN;
    });
}

</script>

<script type="text/javascript" src="index.js"></script>

</html>
