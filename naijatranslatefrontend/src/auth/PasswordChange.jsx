
import { useForm } from "react-hook-form";

const PasswordChange = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // handle form submission
  const onSubmit = data => console.log(data);

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-4">Change Your Password</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email && (
            <p className="text-red-500">
              This field is required and must be a valid email address.
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="newPassword"
            type="password"
            placeholder="Enter your new password"
            {...register("newPassword", {
              required: true,
              minLength: 8,
              maxLength: 20,
            })}
          />
          {errors.newPassword && (
            <p className="text-red-500">
              This field is required and must be between 8 and 20 characters
              long.
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            {...register("confirmPassword", {
              required: true,
              // eslint-disable-next-line no-undef
              validate: (value) => value === watch("newPassword"),
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">
              This field is required and must match the new password.
            </p>
          )}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Next
        </button>
      </form>
    </div>
  );

  
 
}

export default PasswordChange;