"use strict";
exports.__esModule = true;
var requestconf_1 = require("./requestconf");
var core = require("@actions/core");
var fs = require("fs");
var util_1 = require("./util");
try {
    if (core.getInput('custom-config')) {
        var configPath = core.getInput('custom-config');
        var basePath = process.env.GITHUB_WORKSPACE;
        var path = basePath + "/" + configPath;
        core.info("Path is " + path);
        if (configPath.split('.').pop() !== 'json') {
            throw new Error('Config must be json file');
        }
        if (!fs.existsSync(path)) {
            throw new Error('Config file not found, meybe you need to use action/checkout before this step or there is typo on file name');
        }
        var customConfig = JSON.parse(fs.readFileSync(path).toString());
        util_1.sendRequestWithRetry(customConfig);
    }
    else {
        core.info("config");
        core.info(JSON.stringify(requestconf_1["default"]));
        util_1.sendRequestWithRetry(requestconf_1["default"]);
    }
}
catch (err) {
    core.setFailed(err.message);
}
