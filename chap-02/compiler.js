// Find the max duration for a given expression
var maxTime = function(expr) {
    var tag = expr.tag;
    if (tag === 'note') {
        // If the tag is a 'note', just return the duration
        return expr.dur;
    } else if (tag === 'par') {
        // If 'PAR', we need the max of left and right chunks since
        // the chunks are played in parallel and the end time 
        return Math.max(maxTime(expr.left), maxTime(expr.right));
    } else {
        throw "maxTime() not defined for SEQ";
    }
};

var endTime = function (time, expr) {
    var t = time, tag = expr.tag;
    if (tag === 'seq') {
        if (expr.left) {
            t += endTime(0, expr.left);
        }
        if (expr.right) {
            t += endTime(0, expr.right);
        }
    } else if (tag === 'par') {
        // t += maxTime(expr);
        // The above part of endTime() can be written without using the maxTime() function since
        // the endTime for a PAR expr would just be the maximum of the endTimes of the
        // left and right expr as opposed to their sum as in the case of SEQ
        t += Math.max(endTime(0, expr.left), endTime(0, expr.right));
    } else {
        t += expr.dur;
    }
    return t;
};

var visit = function(startTime, accum, expr) {
    if (expr.tag === 'seq') {
        visit(startTime, accum, expr.left);
        startTime = endTime(startTime, expr.left);
        visit(startTime, accum, expr.right);
    } else if (expr.tag === 'par') {
        // for PAR both left and right should be played
        // simultaneously so don't update startTime when
        // dealing with 'left' and 'right' chunks of PAR
        visit(startTime, accum, expr.left);
        visit(startTime, accum, expr.right);
    } else {
        var e = {'tag': expr.tag,
            'pitch': expr.pitch,
            'start': startTime,
            'dur': expr.dur
        };
        accum.push(e);
    }
};

exports.compile = function (expr) {
    var accum = [];
    visit(0, accum, expr);
    return accum;
};
