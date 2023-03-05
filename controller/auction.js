// const bidController = require("../controller/bid");
const Bid = require("../model/bid");
const Campain = require("../model/campaign");


exports.selectBids = async (req, res) => {
    const { campaignId } = req.body;
    Bid.find({ campaignId: campaignId }).exec((err, bids) => {
        if (err) return { message: "cannot find bids" };
        if (bids) {
            const n = bids.length;
            let userIds = bids.map(a => a.userId);
            let bidAmt = bids.map(a => a.amountOffered);
            let equityInReturn = bids.map(a => a.equityAsked);
            let maxEquity = 0;
            Campain.findOne({ _id: campaignId }).exec((err, campaign) => {
                if (err) return { message: "cannot find campaign" };

                if (campaign) {
                    maxEquity = campaign.maxEquityToDilute;
                    var result = knapSack(maxEquity, equityInReturn, bidAmt, n);
                    console.log(result);
                    var usersChosen = [];
                    for (i = 0; i <= result.length; i++) {
                        usersChosen.push(userIds[result[i]]);
                    }
                    res.status(200).json({ message: usersChosen });
                    // res.json({ n: n, userIds: userIds, bidAmt: bidAmt, equityInReturn: equityInReturn, maxEquity: maxEquity });
                }
            });
        }
    })
}

function max(a, b) {
    return (a > b) ? a : b;
}

function knapSack(maxEquity, equityInReturn, bidAmt, n) {
    equityInReturn[1] = 3;
    console.log(maxEquity, equityInReturn, bidAmt, n);

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

    console.log(K);
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