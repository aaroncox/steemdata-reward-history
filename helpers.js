load('historical/mvest_history.js')
load('historical/steem_history.js')
load('historical/sbd_history.js')

function formatDate(doc) {
  return [doc['_id']['year'], doc['_id']['month'], doc['_id']['day']].join('-')
}

function header(fields) {
  print(fields.join(","))
}

function row(doc, fields) {
  if(fields.indexOf('vests') >= 0) {
    fields.push('sp')
    doc.sp = mvest_to_sp(doc)
  }
  fields.push('usd_steem_gain')
  doc.usd_steem_gain = steem_to_usd(doc)
  fields.push('usd_sbd_gain')
  doc.usd_sbd_gain = sbd_to_usd(doc)
  fields.push('usd_total_gain')
  doc.usd_total_gain = steem_to_usd(doc) + sbd_to_usd(doc)
  print(formatDate(doc) + "," + fields.map((field) => doc[field]).join(','))
}

function mvest_to_sp(doc) {
  date = [doc['_id']['year'], doc['_id']['month'], doc['_id']['day']].join('-')
  return mvest_history[date] * doc.vests
}

function steem_to_usd(doc) {
  date = [doc['_id']['year'], doc['_id']['month'], doc['_id']['day']].join('-')
  usd = 0
  if(doc.sp) {
    usd += steem_history[date] * doc.sp
  }
  if(doc.steem) {
    usd += steem_history[date] * doc.steem
  }
  return usd
}

function sbd_to_usd(doc) {
  date = [doc['_id']['year'], doc['_id']['month'], doc['_id']['day']].join('-')
  usd = 0
  if(doc.sbd) {
    usd += sbd_history[date] * doc.sbd
  }
  return usd
}
