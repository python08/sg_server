import { TypeOf, object, string } from "zod";

export const payload = {
  body: object({
    user: string({ required_error: "User is required" }),
    updateTitle: string({ required_error: "Update title is required" }).max(
      50,
      "Title should be maximum 120 character long"
    ),
    updateDescription: string({ required_error: "Update description is required" }).max(
      120,
      "Update description should be maximum 120 character long"
    ),
  }),
};

export const params = {
  params: object({
    updatesId: string({ required_error: "Update ID is required" }),
  }),
};

export const createUpdatesSchema = object({
  ...payload,
});

export const updateUpdatesSchema = object({
  ...payload,
  ...params,
});

export const getUpdatesSchema = object({
  ...params,
});

export const deleteUpdatesSchema = object({
  ...params,
});

export type CreateUpdatesInput = TypeOf<typeof createUpdatesSchema>;
export type UpdateUpdatesInput = TypeOf<typeof updateUpdatesSchema>;
export type GetUpdatesInput = TypeOf<typeof getUpdatesSchema>;
export type DeleteUpdatesInput = TypeOf<typeof deleteUpdatesSchema>;
