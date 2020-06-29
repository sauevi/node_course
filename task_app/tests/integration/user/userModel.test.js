const { validateUser } = require('../../../src/user/domain/userModel');

describe('userModel test', () => {
  it('should validate a correct user ', () => {
    const user = {
      name: 'Test user',
      email: 'testuser@mail.com',
      password: '123456789'
    };

    const response = validateUser(user);
    expect(response.error).toBeFalsy();
  });

  it('should return erro if user is invalid', () => {
    const invalidUsers = [
      {
        email: 'testuser@mail.com',
        password: '123456789'
      },
      {
        name: 'test user',
        password: '123456789'
      },
      {
        name: 'test user',
        email: 'testuser@mail.com'
      },
      {
        name: 'test user',
        email: 'testuser@mail.com',
        password: '123'
      }
    ];

    invalidUsers.forEach((user) => {
      const response = validateUser(user);
      expect(response.error).toBeTruthy();
    });
  });

  it('should return error if user has more values than the valids', () => {
    const user = {
      name: 'Test user',
      email: 'testuser@mail.com',
      password: '123456789',
      age: 27
    };

    const response = validateUser(user);
    expect(response.error).toBeTruthy();
  });
});
