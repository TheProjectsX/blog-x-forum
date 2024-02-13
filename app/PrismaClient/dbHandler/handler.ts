import prisma from "../client";

type Type_table = "forumPosts" | "forumComments" | "blogPosts" | "blogComments";

// Return Type
export type Type_handlerReturn = {
  success: Boolean;
  data?: Object;
  error?: String;
};

// Table Names
const DBTables = {
  forumPosts: prisma.forumPosts,
  forumComments: prisma.forumComments,
  blogPosts: prisma.blogPosts,
  blogComments: prisma.blogComments,
};

// Create Task
const createItem = async (
  itemContent: Object,
  table: Type_table
): Promise<Type_handlerReturn> => {
  const currentTable: any = DBTables[table];

  try {
    const data = await currentTable.create({
      data: itemContent,
    });

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Read One Task
const getItem = async (
  id: String,
  table: Type_table
): Promise<Type_handlerReturn> => {
  const currentTable: any = DBTables[table];

  try {
    const data = await currentTable.findUniqueOrThrow({
      where: { id },
    });

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Read All Tasks
const getAllItems = async (table: Type_table): Promise<Type_handlerReturn> => {
  const currentTable: any = DBTables[table];

  const data = await currentTable.findMany();
  return { success: true, data };
};

// Update Task
const updateItem = async (
  searchQuery: { id: String; authorId: String },
  itemContent: Object,
  table: Type_table
): Promise<Type_handlerReturn> => {
  const currentTable: any = DBTables[table];

  try {
    const data = await currentTable.update({
      where: searchQuery,
      data: itemContent,
    });

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Delete Task
const deleteItem = async (
  searchQuery: { id: String; authorId: String },
  table: Type_table
): Promise<Type_handlerReturn> => {
  const currentTable: any = DBTables[table];

  try {
    const data = await currentTable.delete({
      where: searchQuery,
    });

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export { createItem, getItem, getAllItems, updateItem, deleteItem };
