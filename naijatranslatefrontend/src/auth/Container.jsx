// import { useForm } from "react-hook-form";

// export default function InSignup() {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm();
//   const onSubmit = (data) => console.log(data);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-md">
//       <input
//         className="text-dark "
//         {...register("firstName", { required: true })}
//         aria-invalid={errors.Name ? "true" : "false"}
//       />
//       {errors.firstName?.type === "required" && (
//         <p role="alert " className="text-dark ">
//           {" "}
//           Name is required
//         </p>
//       )}

//       <input
//         className="text-dark "
//         {...register("mail", { required: "Email Address is required" })}
//         aria-invalid={errors.mail ? "true" : "false"}
//       />
//       {errors.mail && (
//         <p role="alert" className="text-dark ">
//           {errors.mail?.message}
//         </p>
//       )}

//       <input
//         className="text-dark "
//         {...register("password", { required: true })}
//         aria-invalid={errors.password ? "true" : "false"}
//       />
//       {errors.firstName?.type === "required" && (
//         <p role="alert" className="text-dark ">
//           password is required
//         </p>
//       )}

//       <input
//         className="text-dark "
//         {...register("confirm password", { required: true })}
//         aria-invalid={errors.password ? "true" : "false"}
//       />
//       {errors.firstName?.type === "required" && (
//         <p role="alert" className="text-dark ">
//           confirm password is required
//         </p>
//       )}

//       <input type="submit" className="text-dark " />
//     </form>
//   );
// }


import Signup from "../button/signup/Signup";
import Title from "../components/Title";
import InSignup from "./InSignup";

const Container = () => {
  return (
    <main className="w-full mx-auto justify-center align-middle p-sm">
      <div className="flex flex-row justify-start">
        <Title />
      </div>
      <div className="flex flex-col mt-lg">
        <h1 className="text-dark text-center mt-lg pb-md font-bold">Sign up for your free account</h1>
        <Signup />
        <InSignup />
        
      </div>
    </main>
  );
};

export default Container;
