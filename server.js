const app = require('./src/app');
const config = require('./src/config/config');
const { logger } = require('./src/utils/logger');

app.listen(config.PORT, () => logger.info('Server running at : ' + config.PORT));
