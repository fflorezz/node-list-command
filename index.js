#!/usr/bin/env node

const fs = require("fs");
const { lstat } = fs.promises;
const chalk = require("chalk");
const targetDir = process.argv[2] || process.cwd();
const path = require("path");

fs.readdir(targetDir, async function(err, fileNames) {
	if (err) {
		throw new Error(err);
	}
	const statPromises = fileNames.map((fileName) => {
		return lstat(path.join(targetDir, fileName));
	});

	const allStats = await Promise.all(statPromises);

	for (let stat of allStats) {
		const index = allStats.indexOf(stat);

		if (stat.isFile(stat)) {
			console.log(fileNames[index]);
		}
		else {
			console.log(chalk.blue(fileNames[index]));
		}
	}
});
