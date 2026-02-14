import { useForm, type SubmitHandler } from "react-hook-form"
import { registerSchema } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod/src/index.js"
import { ca } from "zod/locales"

type FormData = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}

export function Register() {
    const { register, handleSubmit, setError, watch, formState: { errors, isSubmitting } } = useForm<FormData>(
        {
            resolver: zodResolver(registerSchema)
        }
    )
    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate a network request
            throw new Error("Simulated server error") // Simulate a server error
            console.log(data)
        } catch (error) {
            setError("root", { message: "500 Error" })
            return
        }
        
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Register</h1>
                <p>This is the register page.</p>

                {errors.root && <div className="error">{errors.root.message}</div>}

                <div>
                    <input {...register('firstName')} placeholder="First Name" />
                    {errors.firstName && <div className="error">{errors.firstName.message}</div>}
                </div>

                <div>
                    <input {...register('lastName')} placeholder="Last Name" />
                    {errors.lastName && <div className="error">{errors.lastName.message}</div>}
                </div>

                <div>
                    <input {...register('email')} type="email" placeholder="Email Address" />
                    {errors.email && <div className="error">{errors.email.message}</div>}
                </div>

                <div>
                    <input {...register('password')} type="password" placeholder="Password" />
                    {errors.password && <div className="error">{errors.password.message}</div>}
                </div>

                <div>
                    <input {...register('confirmPassword')} type="password" placeholder="Confirm Password" />
                    {errors.confirmPassword && <div className="error">{errors.confirmPassword.message}</div>}
                </div>
                <button disabled={isSubmitting}>{isSubmitting ? "Loading..." : "Register"}</button>
            </form>
        </>

    )
}