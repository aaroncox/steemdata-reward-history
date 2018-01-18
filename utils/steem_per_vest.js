load('config.js')

db.Operations.aggregate([
  {$match: {
    type: 'fill_vesting_withdraw',
    'deposited.asset': 'STEEM',
    'deposited.amount': {
      $gt: 0
    }
  }},
  {$project: {
    timestamp: 1,
    steem_per_vest: {
      $divide: ['$deposited.amount', '$withdrawn.amount']
    }
  }},
  {$group: {
    _id: {
      $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
    },
    rate: {
      $avg: '$steem_per_vest'
    },
  }},
  {$sort: {
    _id: -1,
  }},
], {
  allowDiskUse: true
}).forEach((doc) => {
  print(['_id', 'rate'].map((field) => doc[field]).join(','))
})
