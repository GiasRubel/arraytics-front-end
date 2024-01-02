import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import the CSS file

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://arraytic-backend.test';
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiBaseUrl}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.status === 'success') {
                // Store the token in local storage
                localStorage.setItem('token', result.data.access_token);

                // Display a success message
                toast.success(result.message);

                // Navigate to the homepage
                navigate('/');
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('Error during login ');
            console.error('Error during login:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <h2>Login</h2>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" {...register("email", { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid email address" } })} />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" {...register("password", { required: "Password is required" })} />
                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                </div>

                <button type="submit" className="submit-button" disabled={loading}> {loading ? 'Logging in...' : 'Login'}</button>
            </form>
        </div>
    );
}

export default LoginPage;
