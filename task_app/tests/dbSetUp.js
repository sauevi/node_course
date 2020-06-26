const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

module.exports = () => {
  // Connect to Mongoose
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/task_app_test`;
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  // Cleans up database between each test
  afterEach(async () => {
    await removeAllCollections();
  });

  // Disconnect Mongoose
  afterAll(async () => {
    await mongoose.connection.close();
  });
};
