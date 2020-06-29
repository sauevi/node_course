const { validateTask } = require('../../../src/task/domain/taskModel');

describe('TaskModel validation', () => {
  it('should validate the correct task', () => {
    const task = {
      description: 'test description',
      completed: true
    };

    const response = validateTask(task);

    expect(response.error).toBeFalsy();
  });

  it('should return an error if task is invalid', () => {
    const task = {
      completed: false
    };

    const response = validateTask(task);

    expect(response.error).toBeTruthy();
  });

  it('should return an error if task have more values than the allows', () => {
    const task = {
      descrition: 'test',
      completed: false,
      name: 'test'
    };

    const response = validateTask(task);

    expect(response.error).toBeTruthy();
  });
});
