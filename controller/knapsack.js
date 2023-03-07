var http = require("http");
const express = require("express");

var app = express();
app.use(express.json());

// Data to test
// {
//     "n": 5,
//     "userIds" : [1, 2, 3, 4, 5],
//     "bidAmt": [2, 4, 2, 3, 1],
//     "equityInReturn": [1, 3, 2, 2, 1],
//     "maxEquity": 3
// }


app.post('/allBids', function (req, res) {
    console.log(JSON.stringify(req.body));
    var n = req.body.n;
    var maxEquity = req.body.maxEquity;
    var bidAmt = req.body.bidAmt;
    var equityInReturn = req.body.equityInReturn;
    var userIds = req.body.userIds;

    var result = knapSack(maxEquity, equityInReturn, bidAmt, n);
    var usersChosen = [];
    for (i = 0; i <= result.length; i++) {
        usersChosen.push(userIds[result[i]]);
    }
    res.send("Users whose bids are selected : " + usersChosen);
})

function max(a, b) {
    return (a > b) ? a : b;
}


function knapSack(maxEquity, equityInReturn, bidAmt, n) {
    let i, j;
    let K = new Array(n + 1);

    for (i = 0; i <= n; i++) {
        K[i] = new Array(maxEquity + 1);
        for (j = 0; j <= maxEquity; j++) {
            if (i == 0 || j == 0) {
                K[i][j] = 0;
            }
            else if (equityInReturn[i - 1] <= j) {
                K[i][j] = max(
                    bidAmt[i - 1] + K[i - 1][j - equityInReturn[i - 1]],
                    K[i - 1][j]
                );
            }
            else {
                K[i][j] = K[i - 1][j];
            }
        }
    }


    var bidsAccepted = [];
    i = n - 1, j = maxEquity;
    while (i > 0 && j > 0) {
        if (K[i][j] == K[i - 1][j]) {
            i--;
        }
        else {
            bidsAccepted.push(i - 1);
            i--;
            j -= equityInReturn[i];
        }
    }

    return bidsAccepted;
}


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server listening");
})