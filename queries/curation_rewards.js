load('config.js')
load('helpers.js')

header(['date', 'vests'])

db.Operations.aggregate([
  {$match: {
    curator: account,
    type: 'curation_reward',
    timestamp: {
      $gt: new Date(year + '-01-01T00:00:00.000Z'),
      $lt: new Date(year + '-12-31T23:59:59.999Z')
    }
  }},
  {$group: {
    _id: {
      'year': { '$year': "$timestamp" },
      'month': { '$month': "$timestamp" },
      'day': { '$dayOfMonth': "$timestamp" }
    },
    vests: { $sum: '$reward.amount' }
  }},
  {$sort: {
    '_id.month': 1,
    '_id.day': 1
  }}
]).forEach((doc) => {
  row(doc, ['vests'])
})
