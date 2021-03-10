"use strict";
exports.__esModule = true;
var core = require("@actions/core");
var util = require("./util");
var setOutput = function (res) {
    if (!res) {
        throw new Error('No response from request');
    }
    util.validateStatusCode(res.status.toString());
    if (core.getInput('is_debug') === 'true') {
        core.info(util.buildOutput(res));
    }
    core.setOutput('response', util.buildOutput(res));
};
exports["default"] = setOutput;
