import { useForm, type SubmitHandler } from "react-hook-form";
import { registerSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import useRegister from "../../../hooks/useRegister";
import { ImSpinner } from "react-icons/im";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function Register() {
  const { mutate, isPending, isSuccess, isError, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    mutate(data);
  };

  if (isSuccess) {
    return (
      <div className="status-container success-container">
        <h2>Thank you for your registration!</h2>
      </div>
    );
  }

  return (
    <>
    {isPending && (<ImSpinner className="animate-spin text-blue-500 w-6 h-6" />)}

      {isError && (
        <div className="status-container error-container">
          <h2>Error!</h2>
          {error && <p className="error-message">{error.message}</p>}
        </div>
      )}

      <form className="m-4" onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>

        {errors.root && <div className="error">{errors.root.message}</div>}

        <div>
          <input {...register("firstName")} placeholder="First Name" />
          {errors.firstName && (
            <div className="error">{errors.firstName.message}</div>
          )}
        </div>

        <div>
          <input {...register("lastName")} placeholder="Last Name" />
          {errors.lastName && (
            <div className="error">{errors.lastName.message}</div>
          )}
        </div>

        <div>
          <input {...register("email")} placeholder="Email Address" />
          {errors.email && <div className="error">{errors.email.message}</div>}
        </div>

        <div>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <div className="error">{errors.password.message}</div>
          )}
        </div>

        <div>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword.message}</div>
          )}
        </div>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Register"}
        </button>
      </form>
    </>
  );
}
