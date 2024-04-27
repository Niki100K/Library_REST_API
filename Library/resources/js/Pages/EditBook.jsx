import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function EditBook({ book }) {

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        title: book.title,
        author: book.author,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('book.update', { id: book.id }), {
            title: data.title,
            author: data.author,
        });
    };

  return (
    <section className="max-w-md mx-auto">
      <header>
        <h2 className="text-lg font-medium text-gray-900">Edit Book</h2>
        <p className="mt-1 text-sm text-gray-600">Update book information.</p>
      </header>
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="title" value="Title" />
          <TextInput
            id="title"
            className="mt-1 block w-full rounded-md"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            required
          />
        <InputError className="mt-2" message={errors.title} />
        </div>
        <div>
          <InputLabel htmlFor="author" value="Author" />
          <TextInput
            id="author"
            className="mt-1 block w-full rounded-md"
            value={data.author}
            onChange={(e) => setData('author', e.target.value)}
            required
          />
        <InputError className="mt-2" message={errors.author} />
        </div>
        <div className="flex items-center gap-4">
            <PrimaryButton disabled={processing} type="submit">Save</PrimaryButton>
            <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <p className="text-sm text-gray-600">Saved.</p>
            </Transition>
        </div>
      </form>
    </section>
  );
}
