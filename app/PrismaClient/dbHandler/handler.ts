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
  searchQuery: { id?: any; authorId?: String; postId?: String },
  table: Type_table,
  include: Object = {}
): Promise<Type_handlerReturn> => {
  const currentTable: any = DBTables[table];

  try {
    const data = await currentTable.findUniqueOrThrow({
      where: searchQuery,
      include: include,
    });

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Read All Tasks
const getAllItems = async (
  searchQuery: Object = {},
  table: Type_table,
  include: Object = {},
  filter: (elm: any) => {} = (elm: any) => elm
): Promise<Type_handlerReturn> => {
  const currentTable: any = DBTables[table];

  const data = await currentTable.findMany({
    where: searchQuery,
    include: include,
  });

  // Filter and Give the
  if (table === "forumPosts") {
    data.map(filter);
  }

  return { success: true, data };
};

// Update Task
const updateItem = async (
  searchQuery: { id?: String; authorId?: String; postId?: String },
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
  searchQuery: { id?: String; authorId?: String; postId?: String },
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
