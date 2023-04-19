import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateEventSchema,
  CreateEventSchemaType,
} from "../src/createEventSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc";
import { TRPCClientError } from "@trpc/client";

const CreatePage: NextPage = () => {
  const { mutateAsync } = trpc.create.useMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<CreateEventSchemaType>({
    resolver: zodResolver(CreateEventSchema),
  });

  const onSubmit: SubmitHandler<CreateEventSchemaType> = async (data) => {
    try {
      await mutateAsync(data);
    } catch (e) {
      if (e instanceof TRPCClientError) {
        setError("name", {
          message: e.message,
        });
      } else {
        setError("name", {
          message: "Unexpected error. Please try again later.",
        });
      }
    }
  };

  return (
    <div>
      <h1 className="font-medium text-4xl mb-16">Add a new meetup</h1>
      {isSubmitSuccessful ? (
        <div>
          <p>New meetup created successfully!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-2" htmlFor="name">
            Event name
          </label>
          <input
            disabled={isSubmitting}
            id="name"
            className="border rounded w-full text-lg px-4 py-2 block"
            {...register("name")}
          />
          {errors.name && (
            <p data-cy="name-error" className="text-red-600 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
          <label className="block mb-2 mt-8" htmlFor="description">
            Description
          </label>
          <textarea
            disabled={isSubmitting}
            rows={4}
            id="description"
            className="border rounded w-full text-lg px-4 py-2 block"
            {...register("description")}
          />
          {errors.description && (
            <p
              data-cy="description-error"
              className="text-red-600 text-sm mt-1"
            >
              {errors.description.message}
            </p>
          )}
          <label className="block mb-2 mt-8" htmlFor="location">
            Location
          </label>
          <input
            disabled={isSubmitting}
            id="location"
            className="border rounded w-full text-lg px-4 py-2 block"
            {...register("location")}
          />
          {errors.location && (
            <p data-cy="location-error" className="text-red-600 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
          <label className="block mb-2 mt-8" htmlFor="datetime">
            Time and Date
          </label>
          <input
            disabled={isSubmitting}
            id="datetime"
            type={"datetime-local"}
            className="border rounded w-full text-lg px-4 py-2 block"
            {...register("dateTime")}
          />
          {errors.dateTime && (
            <p data-cy="date-error" className="text-red-600 text-sm mt-1">
              {errors.dateTime.message}
            </p>
          )}
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 mt-8 rounded-sm text-white font-medium w-full"
          >
            Add a meetup
          </button>
        </form>
      )}
    </div>
  );
};

export default CreatePage;
