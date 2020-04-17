(function () {
    function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }

    function startTime() {
        var day = new Date(),
        		d = checkTime(day.getUTCDate()),
        		mo = checkTime(day.getUTCMonth() + 1),
            h = checkTime(day.getUTCHours()),
            m = checkTime(day.getUTCMinutes()),
            s = checkTime(day.getUTCSeconds());
        document.getElementById('clock').innerHTML = h + ":" + m + ":" + s + " UTC " + d + "/" + mo;
        t = setTimeout(function () {
            startTime()
        }, 500);
    }
    startTime();
})();
