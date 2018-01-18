#!/bin/bash
echo "Starting steem history export, this will take a while!"
echo "... exporting author rewards"
mongo mongodb://mongo1.steemdata.com:27017/SteemData -u steemit -p steemit --quiet queries/author_rewards.js > output/author_rewards.csv
echo "... exporting benefactor rewards"
mongo mongodb://mongo1.steemdata.com:27017/SteemData -u steemit -p steemit --quiet queries/beneficiary_rewards.js > output/beneficiary_rewards.csv
echo "... exporting curation rewards"
mongo mongodb://mongo1.steemdata.com:27017/SteemData -u steemit -p steemit --quiet queries/curation_rewards.js > output/curation_rewards.csv
echo "... exporting witness rewards"
mongo mongodb://mongo1.steemdata.com:27017/SteemData -u steemit -p steemit --quiet queries/witness_rewards.js > output/witness_rewards.csv
echo "Completed, CSVs can be found within the ./output folder. Running the script again will replace these files, so if you're performing this for multiple accounts make sure to copy them first."
