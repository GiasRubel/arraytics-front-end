import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddressBookForm = ({ onSubmit, initialData }) => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        // Set initial data if provided
        if (initialData) {
            Object.keys(initialData).forEach((key) => {
                setValue(key, initialData[key]);
            });
        }
    }, [initialData, setValue]);

    const handleFormSubmit = async (data) => {
        try {
            await onSubmit(data);
            if (!initialData){
                reset(); // Clear the form
            }

        } catch (error) {
             console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Contact Information</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <label>
                    <span>Name:</span>
                    <input {...register('name', { required: 'Name is required' })} />
                    <span className="error">{errors.name?.message}</span>
                </label>

                <label>
                    <span>Phone:</span>

                    <input
                        {...register('phone', {
                            required: 'Phone is required',
                            pattern: {
                                value: /^(01[3-9]\d{8})$/,
                                message: 'Enter a valid Phone number',
                            },
                        })}
                    />
                    <span className="error">{errors.phone?.message}</span>
                </label>

                <label>
                    <span>Email:</span>
                    <input
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Enter a valid email address',
                            },
                        })}
                    />
                    <span className="error">{errors.email?.message}</span>
                </label>

                <label>
                    <span>Website:</span>
                    <input
                        {...register('website', {
                            pattern: {
                                value: /^(ftp|http|https):\/\/[^ "]+$/,
                                message: 'Enter a valid URL',
                            },
                        })}
                    />
                    <span className="error">{errors.website?.message}</span>
                </label>

                <label>
                    <span>Gender:</span>
                    <select {...register('gender', { required: 'Gender is required' })}>
                        <option value="">Select...</option>
                        <option value="0">Male</option>
                        <option value="1">Female</option>
                    </select>
                    <span className="error">{errors.gender?.message}</span>
                </label>

                <label>
                    <span>Age:</span>
                    <input
                        {...register('age', {
                            required: 'Age is required',
                            pattern: {
                                value: /^\d+$/,
                                message: 'Age must be a number',
                            },
                            min: {
                                value: 0,
                                message: 'Age must be at least 0',
                            },
                            max: {
                                value: 120,
                                message: 'Age must be at most 120',
                            },
                        })}
                    />
                    <span className="error">{errors.age?.message}</span>
                </label>

                <label>
                    <span>Nationality:</span>
                    <input {...register('nationality')} />
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddressBookForm;
