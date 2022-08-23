import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateEventSchema,
  CreateEventSchemaType,
} from "../src/createEventSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../src/trpc";

const CreatePage: NextPage = () => {
  const { mutateAsync } = trpc.useMutation(["create"]);

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
      const res = await mutateAsync(data);
    } catch (e) {
      setError("dateTime", {
        message: "An unexpected error occurred, please try again later.",
      });
    }
  };

  return (
    <div>
      <h1 className="font-medium text-4xl mb-16">Add a new meetup</h1>
      {isSubmitSuccessful ? (
        <div>
          <p>New meetup created succesffully!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-2" htmlFor="name">
            Event name
          </label>
          <input
            id="name"
            className="border rounded w-full text-lg px-4 py-2 block"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
          <label className="block mb-2 mt-8" htmlFor="description">
            Description
          </label>
          <textarea
            rows={4}
            id="description"
            className="border rounded w-full text-lg px-4 py-2 block"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
          <label className="block mb-2 mt-8" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            className="border rounded w-full text-lg px-4 py-2 block"
            {...register("location")}
          />
          {errors.location && (
            <p className="text-red-600 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
          <label className="block mb-2 mt-8" htmlFor="datetime">
            Time and Date
          </label>
          <input
            id="datetime"
            type={"datetime-local"}
            className="border rounded w-full text-lg px-4 py-2 block"
            {...register("dateTime")}
          />
          {errors.dateTime && (
            <p className="text-red-600 text-sm mt-1">
              {errors.dateTime.message}
            </p>
          )}
          <button
            type="submit"
            className="bg-indigo-600 px-8 py-3 mt-8 rounded-sm text-white font-medium w-full"
          >
            Add a meetup
          </button>
        </form>
      )}
    </div>
  );
};

export default CreatePage;
