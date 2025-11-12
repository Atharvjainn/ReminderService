const cron = require('node-cron');

const setupJobs = () => {
    cron.schedule('* * * * *', () => {
        console.log('running a task every minute');
        });
}

module.exports = setupJobs