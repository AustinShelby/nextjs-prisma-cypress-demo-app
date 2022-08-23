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
  dateTime: z
    .preprocess(
      (val) => typeof val == "string" && new Date(val),
      z
        .date({
          invalid_type_error: "Please enter a valid date.",
        })
        .refine((date) => date > new Date(), {
          message: "Please enter a date that is not in the past.",
        })
    )
    .transform((date) => date.toISOString()),
});

export type CreateEventSchemaType = z.infer<typeof CreateEventSchema>;
