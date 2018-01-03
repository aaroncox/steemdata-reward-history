#!/bin/bash
echo "Starting steem history export, this will take a while!"
echo "... exporting author rewards"
mongo --quiet queries/author_rewards.js > output/author_rewards.csv
echo "... exporting benefactor rewards"
mongo --quiet queries/beneficiary_rewards.js > output/beneficiary_rewards.csv
echo "... exporting curation rewards"
mongo --quiet queries/curation_rewards.js > output/curation_rewards.csv
echo "... exporting witness rewards"
mongo --quiet queries/witness_rewards.js > output/witness_rewards.csv
echo "Completed, CSVs can be found within the ./output folder. Running the script again will replace these files, so if you're performing this for multiple accounts make sure to copy them first."
