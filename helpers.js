function formatDate(doc) {
  return [doc['_id']['year'], doc['_id']['month'], doc['_id']['day']].join('-')
}

function header(fields) {
  print(fields.join(","))
}

function row(doc, fields) {
  print(formatDate(doc) + "," + fields.map((field) => doc[field]).join(','))
}
