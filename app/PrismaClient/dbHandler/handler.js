import prismaDB from "../client";

// Create Task
const createTask = async (taskContent) => {
  try {
    const task = await prismaDB.create({
      data: taskContent,
    });

    return task;
  } catch (error) {
    return { error: error.message };
  }
};

// Read One Task
const getTask = async (id) => {
  try {
    const task = await prismaDB.findUniqueOrThrow({
      where: { id },
    });

    return task;
  } catch (error) {
    return { error: error.message };
  }
};

// Read All Tasks
const getAllTasks = async () => {
  const tasks = await prismaDB.findMany();
  return tasks;
};

// Update Task
const updateTask = async (id, taskContent) => {
  try {
    const task = await prismaDB.update({
      where: { id },
      data: taskContent,
    });

    return task;
  } catch (error) {
    return { error: error.message };
  }
};

// Delete Task
const deleteTask = async (id) => {
  try {
    const task = await prismaDB.delete({
      where: { id },
    });

    return task;
  } catch (error) {
    return { error: error.message };
  }
};

export { createTask, getTask, getAllTasks, updateTask, deleteTask };
