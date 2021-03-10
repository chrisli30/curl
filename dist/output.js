"use strict";
exports.__esModule = true;
var core = require("@actions/core");
var util = require("./util");
var setOutput = function (res) {
    if (!res) {
        throw new Error('No response from request');
    }
    core.info("validateStatusCode");
    util.validateStatusCode(res.status.toString());
    core.info("is_debug. buildOutput");
    if (core.getInput('is_debug') === 'true') {
        core.info(util.buildOutput(res));
    }
    core.info("setOutput. buildOutput");
    core.setOutput('response', util.buildOutput(res));
};
exports["default"] = setOutput;
