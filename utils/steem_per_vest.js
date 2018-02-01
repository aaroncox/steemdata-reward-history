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
    'deposited.amount': 1,
    'withdrawn.amount': 1,
    same_account: {
      $cmp: ['$to_account', '$from_account']
    },
  }},
  {$match: {
    same_account: 0
  }},
  {$group: {
    _id: {
      $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
    },
    vests: {$sum: '$deposited.amount'},
    steem: {$sum: '$withdrawn.amount'}
  }},
  {$project: {
    _id: 1,
    rate: {
      $divide: ['$vests', '$steem']
    }
  }},
  {$sort: {
    _id: -1,
  }},
], {
  allowDiskUse: true
}).forEach((doc) => {
  print(['_id', 'rate'].map((field) => doc[field]).join(','))
})
