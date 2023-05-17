
import { useForm } from "react-hook-form";

export default function OrgLogin() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-md"> 
        <input
          {...register("firstName", { required: true })}
          aria-invalid={errors.Name ? "true" : "false"}
        />
        {errors.firstName?.type === "required" && (
          <p role="alert">Name is required</p>
        )}

        <input
          {...register("mail", { required: "Email Address is required" })}
          aria-invalid={errors.mail ? "true" : "false"}
        />
        {errors.mail && <p role="alert">{errors.mail?.message}</p>}

        <input
          {...register("password", { required: true })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.firstName?.type === "required" && (
          <p role="alert">password is required</p>
        )}

        <input
          {...register("confirm password", { required: true })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.firstName?.type === "required" && (
          <p role="alert">confirm password is required</p>
        )}

        <input type="submit" />
      </form>
  );
}
