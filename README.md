## Cli reference
https://webdriver.io/docs/gettingstarted/

# Prerequisites
Use the version 16 of NodeJS. Execute in command line: `nvm use 16`

# Executions

## To run your tests, execute
    ENVIRONMENT=test npm run doit --spec test/test_web/test_testing/specs/login.js
basically the "doit" is the name of the script as specified in scripts in package.json

## Raw execution using also an environment variable:
    ENVIRONMENT=test npx wdio run wdio.conf.js --spec test/test_web/test_testing/specs/example.e2e.js

# References / Cheatsheets
https://www.npmjs.com/package/expect-webdriverio/v/1.2.0
https://webdriver.io/docs/api/expect-webdriverio
https://mochajs.org/

# NodeJS prerequisites
Make sure you have nvm in case you need to work with multiple Node versions:  
## Install nvm:  
    `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash`  
    Nvm cheatsheet:  
        - `nvm ls-remote` # lists all of the available versions of NodeJs & iojs  
        - `nvm ls` # list locally installed version  
        - `nvm install 0.12.3` # install the version 0.12.3 (see ls-remote for available options)  
        - `nvm use 0.12.3` # switch to and use the installed 0.12.3 version  
        - `nvm which 0.12.2` # the path to the installed node version  
        - `nvm current` # what is the current installed nvm version  
        - `nvm alias default 0.10.32` # set the default node to the installed 0.10.32 version  
        - `nvm --help` # the help documents

## Upgrade Node
### Upgrade global node modules
    npm update -g
### Install npm check updates module globally
`npm install -g npm-check-updates`  
npm-check-updates and ncu as short will be two new commands available in terminal
### Upgrade package.json with latest versions
`npm-check-updates -u`  
or  
`ncu -u`
### Install node modules based on upgraded package.json
`npm install`
### Update node modules
`npm update`

### How to get a new browser after execution of each "it" inside the "describe" ?
By default you separate your test cases per file having a single "describe" inside, and each will have a new separate web browser
If you really want to have a completely new session on each "it" or whenever you want then you need to call the "await browser.reloadSession()"
However consider using the already existing same session to speed up the process
