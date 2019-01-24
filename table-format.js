function appendExtraFields(colObj) {
    var userDefinedCols = [
        'list', 'board', 'date'
    ];
    _.each(userDefinedCols, function(vv, kk) {
        var cur = {
            field: vv,
            title: vv,
            class: vv + '_dev',
            sortable: true,
        };

        cur = includeHideClassForMobile(vv, cur);

        colObj.push(cur);
    });

    return colObj;
}

function includeHideClassForMobile(key, cur){
    if(key != 'name'){
        cur.class = cur.class + ' hidden-xs hidden-sm';
    }

    return cur;
}

function filterNeededColFields(colObj) {
    var userDefinedColsArr = [
        'shortLink',
        'name',
        'list',
        'board',
        'date'
    ];

    colObj = _.filter(colObj, function(child) {
        return _.find(userDefinedColsArr, function(o, bbb) {
            return child.field == o;
        });
    });

    return colObj;
}

function filterNeededRowFields(rowObj) {
    var userDefinedColsArr = [
        'shortLink',
        'name',
        'list',
        'board',
        'date'
    ];

    var someObj = {};
    _.map(rowObj, function(child, childKey) {
        var result = _.find(userDefinedColsArr, function(vvv) {
            return vvv == childKey;
        });
        if (result) {
            someObj[childKey] = child;
            return rowObj;
        }
    });

    return someObj;
}