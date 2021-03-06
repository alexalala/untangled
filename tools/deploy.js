var Log = require('log');
var colors = require('colors');
var moment = require('moment');
var shelljs = require('shelljs');

var logger = new Log('info');
logger.info(colors.yellow('Deploying updates to Github...'));

if(!shelljs.which('hugo')) { 
    logger.warning(colors.red('Hugo is required in $PATH to deploy, https://gohugo.io'));S
    shelljs.exit(1);
}
if(!shelljs.which('git')) {
    logger.warning(colors.red('Git is required in $PATH... what are you even doing?'));
    shelljs.exit(1);
}

logger.info(colors.yellow('Running Hugo...'));
shelljs.exec('hugo');
logger.info(colors.green('OK'));

logger.info(colors.yellow('Adding changes to git...'));
shelljs.exec('git add -A');
shelljs.exec('git commit -m "Rebuilding site '+ moment().format('dddd, MMMM Do YYYY, h:mm:ss a') +'."');
shelljs.exec('git push origin master');
logger.info(colors.green('OK'));

logger.info(colors.yellow('Pushing subtree...'));
shelljs.exec('git subtree push --squash --prefix=public git@github.com:anthony-neontribe/untangled.git gh-pages');
logger.info(colors.green('FIN..'));
