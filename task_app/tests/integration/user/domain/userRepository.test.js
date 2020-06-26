const {
  getAllUsers,
  saveUser,
  findUserById,
  findUserByEmail,
  deleteUser,
  updateUser
} = require('../../../../src/user/domain/userRepository');
const { TaskModel } = require('../../../../src/task/domain/taskModel');
const dbSetUp = require('../../../dbSetUp');
const mongoose = require('mongoose');
const lodash = require('lodash');

describe('User Repository', () => {
  dbSetUp();
  it('should save the user in the db and return the created user', async () => {
    const newUser = {
      name: 'test user',
      email: 'test@email.com',
      password: 'testPassword'
    };

    const savedUser = await saveUser(newUser);

    expect(savedUser).toHaveProperty('id');
    expect(savedUser).toHaveProperty('name', newUser.name);
    expect(savedUser).toHaveProperty('email', newUser.email);
    expect(savedUser).toHaveProperty('password');
    expect(savedUser).toHaveProperty('tasks');
    expect(savedUser).toHaveProperty('avatarImg');
  });

  it('should throw an exception if an invalid user is passed', () => {
    const badUsers = [
      {
        name: 'test user',
        password: 'testPassword'
      },
      {
        name: 'test user',
        email: 'test@email.com'
      }
    ];

    badUsers.forEach(async (user) => {
      await expect(() => saveUser(user)).rejects.toThrowError(
        new Error('ERROR_SAVING_NEW_USER')
      );
    });
  });

  it('should throw an exception if a email already exist in the db', async () => {
    const user = {
      name: 'test user 1',
      email: 'test1@email.com',
      password: 'testPassword1'
    };

    const duplicateUserEmail = {
      name: 'test user 2',
      email: 'test1@email.com',
      password: 'testPassword2'
    };
    await saveUser(user);
    await expect(() => saveUser(duplicateUserEmail)).rejects.toThrowError(
      new Error('ERROR_SAVING_NEW_USER')
    );
  });

  it('should return an user by its id with its taks', async () => {
    const newUser = {
      name: 'test user',
      email: 'test@email.com',
      password: 'testPassword'
    };

    const savedUser = await saveUser(newUser);

    const task = {
      description: 'test task',
      completed: true,
      owner: savedUser.id
    };

    const taskModel = new TaskModel(task);
    await taskModel.save();

    const foundUser = await findUserById(savedUser.id);

    expect(foundUser).toHaveProperty('id', savedUser.getId());
    expect(foundUser).toHaveProperty('name', savedUser.getName());
    expect(foundUser).toHaveProperty('email', savedUser.getEmail());
    expect(foundUser).toHaveProperty('password', savedUser.getPassword());
    expect(foundUser).toHaveProperty('tasks');
    expect(foundUser.getTasks().length).toBe(1);
  });

  it('should throw an exception if an invalid id is passed in findUserById', async () => {
    await expect(() => findUserById(1)).rejects.toThrowError(
      new Error('ERROR_SEARCHING_USER_BY_ID')
    );
  });

  it('should return an empty object if not user was found by id', async () => {
    const id = mongoose.Types.ObjectId();
    const foundUser = await findUserById(id);

    expect(lodash.isEmpty(foundUser)).toBeTruthy();
  });

  it('should return an array with all users', async () => {
    await Promise.all([
      saveUser({
        name: 'test user 1',
        email: 'test1@email.com',
        password: 'testPassword1'
      }),
      saveUser({
        name: 'test user 2',
        email: 'test2@email.com',
        password: 'testPassword2'
      }),
      saveUser({
        name: 'test user 3',
        email: 'test3@email.com',
        password: 'testPassword3'
      })
    ]);

    const allUsers = await getAllUsers();
    expect(Array.isArray(allUsers) && allUsers.length).toBeTruthy();
    expect(allUsers.length).toBe(3);
  });

  it('should return an empty array if not users in the db', async () => {
    const allUsers = await getAllUsers();
    expect(Array.isArray(allUsers)).toBeTruthy();
    expect(allUsers.length).toBeFalsy();
  });

  it('should return an user by its email', async () => {
    const newUser = {
      name: 'test user',
      email: 'test@email.com',
      password: 'testPassword'
    };

    const savedUser = await saveUser(newUser);

    const foundUser = await findUserByEmail(savedUser.email);

    expect(foundUser).toMatchObject(savedUser);
  });

  it('should return an empty object if not user was found by email', async () => {
    const foundUser = await findUserByEmail('test@email.com');
    expect(lodash.isEmpty(foundUser)).toBeTruthy();
  });

  it('should delete an user and its tasks by id', async () => {
    const newUser = {
      name: 'test user',
      email: 'test@email.com',
      password: 'testPassword'
    };

    const savedUser = await saveUser(newUser);

    const task = {
      description: 'test task',
      completed: true,
      owner: savedUser.id
    };

    const taskModel = new TaskModel(task);
    const savedTask = await taskModel.save();

    await deleteUser(savedUser.id);

    const foundUser = await findUserById(savedUser.id);
    const foundTask = await TaskModel.findOne({ _id: savedTask._id });

    expect(lodash.isEmpty(foundUser)).toBeTruthy();
    expect(lodash.isEmpty(foundTask)).toBeTruthy();
  });

  it('should throw an exception if an invalid id is passed in deleteUser', async () => {
    await expect(() => deleteUser(1)).rejects.toThrowError(
      new Error('ERROR_DELETING_USER')
    );
  });

  it('should update an user', async () => {
    const user = {
      name: 'test user',
      email: 'test@email.com',
      password: 'testPassword'
    };

    const newUser = {
      name: 'new test user',
      password: 'testNewPassword'
    };

    const oldUser = await saveUser(user);

    const updatedUser = await updateUser(oldUser.getId(), newUser);

    expect(updatedUser.getName()).toBe(newUser.name);
    expect(updatedUser).toHaveProperty('password');
  });

  it('should return an empty user if not user found when update', async () => {
    const id = mongoose.Types.ObjectId();
    const newUser = {
      name: 'new test user'
    };

    const updatedUser = await updateUser(id, newUser);

    expect(lodash.isEmpty(updatedUser)).toBeTruthy();
  });

  it('should throw an error when an invalid id is passed in updateUser', async () => {
    await expect(() => updateUser(1)).rejects.toThrowError(
      new Error('ERROR_UPDATING_USER')
    );
  });
});
