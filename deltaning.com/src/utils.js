// 将时间戳转化为年月日
/*
* @params timestamp 时间戳
* @params splitSymbol 分隔符，为'-'则返回1970-01-01；为其他则返回1970年01月01日
* @params isSecond 是否显示到秒
* */
export function timeStamp(timestamp, splitSymbol, isSecond) {
    var d = new Date(timestamp * 1000);
    var result = '';
    var secondText = '' + (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
    if (splitSymbol === '-') {
        result = d.getFullYear() + splitSymbol + (d.getMonth() + 1) + splitSymbol + d.getDate() + (isSecond ? secondText : '');
    } else {
        result = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日' + (isSecond ? secondText : '');
    }
    return result;

}

// 将时间戳转化为几天前几年前
export function timeFormat(timestamp) {
    if (timestamp <= 0) {
        return '';
    }
    var time = parseInt(timestamp) * 1000;
    var now = new Date().getTime();
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var d = now - time;
    if (d < 0) {
        return
    }

    var result = ''; // 返回的结果

    var monthC = d / month;
    var weekC = d / (7 * day);
    var dayC = d / day;
    var hourC = d / hour;
    var minuteC = d / minute;

    if (monthC >= 1) {
        if (monthC <= 12) {
            result = parseInt(monthC) + '月前';
        } else {
            result = parseInt(monthC / 12) + "年前";
        }
    } else if (weekC >= 1) {
        result = parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        result = parseInt(dayC) + '天前';
    } else if (hourC >= 1) {
        result = parseInt(hourC) + "小时前";
    } else if (minuteC >= 1) {
        result = parseInt(minuteC) + "分钟前";
    } else {
        result = '刚刚';
    }
    return result;
}

// 获取url上的参数
export function getUrlSearchArr() {
    var urlSearchParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
    let searchObj = {};
    if (urlSearchParams) {
        urlSearchParams.filter(item => {
            searchObj[item.split('=')[0]] = item.split('=')[1];
            return true;
        })
    }
    return searchObj;
}

export function setItem(key, value) {
    localStorage.setItem(key, value)
}

export function getItem(key) {
    return localStorage.getItem(key)
}

export function removeItem(key) {
    localStorage.removeItem(key)
}
