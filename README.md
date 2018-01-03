# Steem Rewards CSV Generator

This tool uses [SteemData.com](https://SteemData.com) to export a year's worth of rewards for a single account into multiple CSVs for accounting purposes.

### Requirements

- `mongo` shell: command line interface for interacting with MongoDB. You must be able to type `mongo` from the command line and fire up an instance of the mongo shell.

### Setup

1. Rename `config.example.js` to `config.js`.
2. Edit `config.js` to choose which account to export and the year to analyze.
3. Run `./run.sh` from the root folder of this repository.
4. Wait. This script could potentially take hours to complete depending on the current load of SteemData.
5. Once completed, your CSV files will exist within the `./output` folder.

### Multiple Accounts

If you are running this script for more than one account, you will have to do it one account at a time. After you run each account, you can simply rename the `./output` folder to the name of the account (and perhaps year), recreate the `./output folder`, and run again. For example, if I wanted to run against the `jesta` and `chainbb` accounts for 2017, I would:

- Setup `config.js` file for `jesta` and `2017`
- Start `./run.sh`
- `mv ./output ./jesta-2017`
- `mkdir ./output`
- Setup `config.js` file for `chainbb` and `2017`
- Start `./run.sh`
- `mv ./output ./chainbb-2017`

Now I have 2 folders, one for each account, for the year 2017.
