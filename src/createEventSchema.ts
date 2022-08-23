import { z } from "zod";

export const CreateEventSchema = z.object({
  name: z
    .string()
    .min(1, "Please enter a name for the meetup.")
    .max(64, "Maximum length 64 characters."),
  description: z.string().max(1024, "Maximum length 1024 characters."),
  location: z
    .string()
    .min(1, "Please enter a location for the meetup.")
    .max(64, "Maximum length 64 characters."),
  dateTime: z.string().refine(
    (val) => {
      const date = new Date(val);
      return !Number.isNaN(date.getTime()) && date > new Date();
    },
    { message: "Please enter a date that is in the future." }
  ),
});

export type CreateEventSchemaType = z.input<typeof CreateEventSchema>;
