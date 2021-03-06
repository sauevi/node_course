const {
  saveTask,
  getAllTaks,
  findTaskById,
  deleteById,
  updateTask
} = require('../../../src/task/domain/taskRepository');
const dbSetUp = require('../../dbSetUp');
const mongoose = require('mongoose');
const lodash = require('lodash');

describe('taskRepository', () => {
  dbSetUp();

  it('should save a valid task', async () => {
    const task = {
      description: 'test task',
      completed: true,
      owner: mongoose.Types.ObjectId()
    };

    const savedTask = await saveTask(task);

    expect(savedTask).toHaveProperty('id');
  });

  it('should throw and exception if a task is invalid when save', async () => {
    const task = {
      description: 'test task',
      completed: true,
      owner: 1
    };

    await expect(() => saveTask(task)).rejects.toThrowError(
      new Error('ERROR_SAVING_NEW_TASK')
    );
  });

  it('should return a task by its id', async () => {
    const task = {
      description: 'test task',
      completed: true,
      owner: mongoose.Types.ObjectId()
    };

    const savedTask = await saveTask(task);
    const foundTask = await findTaskById(savedTask.getId());

    expect(foundTask).toHaveProperty('id', savedTask.getId());
    expect(foundTask).toHaveProperty('description', savedTask.getDescription());
  });

  it('should throw an exception if an id is invalid when search a task', async () => {
    await expect(() => findTaskById(1)).rejects.toThrowError(
      new Error('ERROR_GETTING_TASK_BY_ID')
    );
  });

  it('should update a task', async () => {
    ownerId = mongoose.Types.ObjectId();

    const task = {
      description: 'test task',
      completed: false,
      owner: ownerId
    };

    const taskNewValues = {
      description: 'updated test task',
      completed: true
    };

    const savedTask = await saveTask(task);
    const foundTask = await updateTask(
      savedTask.getId(),
      taskNewValues,
      ownerId
    );

    expect(foundTask.getDescription()).toBe(taskNewValues.description);
    expect(foundTask.isCompleted()).toBe(taskNewValues.completed);
  });

  it('should throw an exception if an id is invalid when update a task', async () => {
    const fakeRequest = [
      {
        taskId: 1,
        task: {},
        ownerId: mongoose.Types.ObjectId()
      },
      {
        taskId: mongoose.Types.ObjectId(),
        task: {},
        ownerId: 1
      }
    ];

    fakeRequest.forEach(async (request) => {
      const { taskId, task, ownerId } = request;
      await expect(() =>
        updateTask(taskId, task, ownerId)
      ).rejects.toThrowError(new Error('ERROR_UPDATING_TASK'));
    });
  });

  it('should return an empty object when task to update is not found', async () => {
    ownerId = mongoose.Types.ObjectId();
    taskId = mongoose.Types.ObjectId();

    const task = {
      description: 'updated test task',
      completed: true
    };

    const foundTask = await updateTask(taskId, task, ownerId);

    expect(lodash.isEmpty(foundTask)).toBeTruthy();
  });

  it('should delete a task by its id', async () => {
    const ownerId = mongoose.Types.ObjectId();

    const task = {
      description: 'test task',
      completed: true,
      owner: ownerId
    };

    const savedTask = await saveTask(task);

    await deleteById(savedTask.getId(), ownerId);

    const foundTask = await findTaskById(savedTask.getId(), ownerId);

    expect(lodash.isEmpty(foundTask)).toBeTruthy();
  });

  it('should throw an exception if an id is invalid when deleting a task', async () => {
    const invalidIds = [
      {
        ownerId: mongoose.Types.ObjectId(),
        taskId: 1
      },
      {
        taskId: mongoose.Types.ObjectId(),
        ownerId: 1
      }
    ];

    invalidIds.forEach(async (invalidId) => {
      const { ownerId, taskId } = invalidId;

      await expect(() => deleteById(taskId, ownerId)).rejects.toThrowError(
        new Error('ERROR_DELETING_TASK_BY_ID')
      );
    });
  });

  it('should get all task in the database for the owner', async () => {
    const sameOwnerId = mongoose.Types.ObjectId();

    await Promise.all([
      saveTask({
        description: 'test task',
        completed: true,
        owner: mongoose.Types.ObjectId()
      }),
      saveTask({
        description: 'test task 2',
        completed: false,
        owner: sameOwnerId
      }),
      saveTask({
        description: 'test task 3',
        completed: false,
        owner: sameOwnerId
      })
    ]);

    const searchParams = {
      owner: sameOwnerId
    };

    const allTask = await getAllTaks(searchParams, 10, 0, {});

    expect(allTask.length).toBe(2);
  });

  it('should return an empty array when no task found in the database for the owner', async () => {
    await Promise.all([
      saveTask({
        description: 'test task',
        completed: true,
        owner: mongoose.Types.ObjectId()
      }),
      saveTask({
        description: 'test task 2',
        completed: false,
        owner: mongoose.Types.ObjectId()
      }),
      saveTask({
        description: 'test task 3',
        completed: false,
        owner: mongoose.Types.ObjectId()
      })
    ]);

    const searchParams = {
      owner: mongoose.Types.ObjectId()
    };

    const allTask = await getAllTaks(searchParams, 10, 0, {});

    expect(lodash.isEmpty(allTask)).toBeTruthy();
  });

  it('should get all task in the database for the owner and limit the elements', async () => {
    const sameOwnerId = mongoose.Types.ObjectId();

    await Promise.all([
      saveTask({
        description: 'test task',
        completed: true,
        owner: mongoose.Types.ObjectId()
      }),
      saveTask({
        description: 'test task 2',
        completed: false,
        owner: sameOwnerId
      }),
      saveTask({
        description: 'test task 3',
        completed: false,
        owner: sameOwnerId
      })
    ]);

    const searchParams = {
      owner: sameOwnerId
    };

    const limit = 1;

    const allTask = await getAllTaks(searchParams, limit, 0, {});

    expect(allTask.length).toBe(1);
  });

  it('should get all task in the database for the owner and skip the first element', async () => {
    const sameOwnerId = mongoose.Types.ObjectId();

    await Promise.all([
      saveTask({
        description: 'test task',
        completed: true,
        owner: mongoose.Types.ObjectId()
      }),
      saveTask({
        description: 'test task 2',
        completed: false,
        owner: sameOwnerId
      }),
      saveTask({
        description: 'test task 3',
        completed: false,
        owner: sameOwnerId
      })
    ]);

    const searchParams = {
      owner: sameOwnerId
    };

    const skip = 1;

    const allTask = await getAllTaks(searchParams, 10, skip, {});

    expect(allTask[0].description).toBe('test task 3');
  });

  it('should throw an exception when an invalid ownerId is passed', async () => {
    const searchParams = {
      owner: 1
    };

    await expect(() =>
      getAllTaks(searchParams, 10, 0, {})
    ).rejects.toThrowError(new Error('ERROR_GETTING_ALL_TASK'));
  });
});
