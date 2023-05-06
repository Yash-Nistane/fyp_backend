// const bidController = require("../controller/bid");
const Bid = require("../model/bid");
const Campain = require("../model/campaign");
const User = require("../model/user");


exports.selectBids = async (req, res) => {
    const { campaignId } = req.body;
    console.log("campaignId = ", campaignId);
    Bid.find({ campaignId: campaignId }).exec((err, bids) => {
        if (err) return { message: "cannot find bids" };
        if (bids) {
            console.log("bids = ", bids);
            const n = bids.length;
            if (n == 0) {
                return res.status(400).json({ message: "No bids found" });
            }
            let userIds = bids.map(a => a.userId);
            let bidAmt = bids.map(a => a.amountOffered);
            let equityInReturn = bids.map(a => a.equityAsked);
            let maxEquity = 0;
            Campain.findOne({ _id: campaignId }).exec((err, campaign) => {
                if (err) return { message: "cannot find campaign" };

                if (campaign) {
                    maxEquity = campaign.maxEquityToDilute;
                    var result = knapSack(maxEquity, equityInReturn, bidAmt, n);
                    console.log("result = ", result);
                    console.log("user ids = ", userIds);
                    var usersChosen = [];
                    for (i = 0; i <= result.length; i++) {
                        if (result[i] == 1)
                            usersChosen.push(userIds[result[i]]);
                    }
                    console.log(usersChosen);
                    User.find({ _id: { $in: usersChosen } }, { "firstName": 1, "lastName": 1 }).exec((err, winners) => {
                        if (err) return res.status(400).json({ message: err });

                        if (winners) {
                            res.status(200).json({ message: winners });
                        }
                    });

                }
            });
        }
    })
}

function max(a, b) {
    return (a > b) ? a : b;
}

function knapSack(maxEquity, equityInReturn, bidAmt, n) {
    // to make algo work for decimal values in equityInReturn array
    // multiply equities by 10 to remove decimal value.
    // ASSUMPTION : equity values are upto 1 decimal places;
    equityInReturn = equityInReturn.map(function (x) { return x * 10; });
    maxEquity = maxEquity * 10;

    let i, j;
    let K = new Array(n + 1);
    for (i = 0; i <= n; i++) {
        K[i] = new Array(n + 1);
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
    i = n, j = maxEquity;
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