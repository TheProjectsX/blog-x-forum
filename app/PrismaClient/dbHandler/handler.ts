import prisma from "../client";

type Type_table = "forumPosts" | "forumComments" | "blogPosts" | "blogComments";

// Return Type
export type Type_handlerReturn = {
  success: Boolean;
  data?: any;
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
  include: Object = {},
  select: Object = {}
): Promise<Type_handlerReturn> => {
  const currentTable: any = DBTables[table];

  try {
    const data = await currentTable.findUniqueOrThrow({
      where: searchQuery,
      ...(Object.keys(include).length === 0 ? {} : { include }),
      ...(Object.keys(select).length === 0 ? {} : { select }),
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

  // Filter the Array
  data.map(filter);
  if (table === "forumPosts") {
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
