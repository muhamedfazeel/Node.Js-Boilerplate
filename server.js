const app = require('./src/app');
const { PORT } = require('./src/utils/constants');
const { logger } = require('./src/utils/logger');

app.listen(PORT, () => logger.info('Server running at : ' + PORT));
