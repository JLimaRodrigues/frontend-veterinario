import React, { useState } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

interface IFormInput {
  name: string;
  description: string;
  images: { path: string }[];
}

const schema = yup.object().shape({
  name: yup.string().min(3).max(255).required('Name is required'),
  description: yup.string().min(3).max(1000).required('Description is required'),
  images: yup.array().of(
    yup.object().shape({
      path: yup.string().url('Invalid URL').required('Image path is required'),
    })
  ).required('At least one image is required'),
});

const FormNewProduct: React.FC = () => {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  });

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/products', data);
      console.log(response);
      setFeedback({ type: 'success', message: 'Product created successfully!' });
      reset();
    } catch (error) {
      setFeedback({ type: 'error', message: 'Error creating product. Please try again.' });
    }
  };

  return (
    <div className="m-4 flex flex-col items-center justify-center bg-gray dark:bg-gray-900">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-lg">
        {feedback && (
          <div className={`mb-4 p-3 text-center rounded ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {feedback.message}
          </div>
        )}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">New Product</h2>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">Add a new product by filling out the form below.</p>
          <div className="mt-4 flex justify-center">
            <nav className="text-sm text-gray-500 dark:text-gray-400">
              <a href="/admin/products" className="hover:underline">List Products</a> &gt; <span className="font-medium text-gray-700 dark:text-gray-300">New Product</span>
            </nav>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">Name</label>
              <input
                type="text"
                placeholder="Enter product name"
                {...register('name')}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">Description</label>
              <textarea
                placeholder="Enter product description"
                {...register('description')}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.description && <span className="text-red-500">{errors.description.message}</span>}
            </div>
            <div className="mb-4.5 col-span-1 sm:col-span-2">
              <label className="mb-2.5 block text-black dark:text-white">Images</label>
              <div>
                {fields.map((field, index) => (
                  <div key={field.id} className="mb-2 flex items-center">
                    <input
                      type="text"
                      placeholder="Enter image URL"
                      {...register(`images.${index}.path`)}
                      className="w-full mr-2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {index > 0 && (
                      <button type="button" className="text-red-500" onClick={() => remove(index)}>
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 text-blue-500"
                  onClick={() => append({ path: '' })}
                >
                  Add Image
                </button>
                {errors.images && <span className="text-red-500">{errors.images.message}</span>}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded bg-primary py-3 font-medium text-gray-100 hover:bg-opacity-90"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormNewProduct;
