import * as core from '@actions/core'
import * as util from './util'
import { AxiosResponse } from 'axios'

const setOutput = (res: void | AxiosResponse <any>) => {
    
    core.info("check !res");

    if(!res){
        throw new Error('No response from request')
    }

    core.info("validateStatusCode");
    util.validateStatusCode(res.status.toString());

    core.info("is_debug. buildOutput");
    if(core.getInput('is_debug') === 'true'){
        core.info(util.buildOutput(res));
    }

    core.info("setOutput. buildOutput");
    core.setOutput('response', util.buildOutput(res));
}


export default setOutput