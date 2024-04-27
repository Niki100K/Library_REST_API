import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function AddBook() {

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        author: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('book'));
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <Head title="Add Book" />

            <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-lg w-full">
                <div className="p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add a New Book</h2>
                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <InputLabel htmlFor="title" value="Title" />
                            <TextInput
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Enter title"
                                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-full"
                            />
                            <InputError message={errors.title} />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="author" value="Author" />
                            <TextInput
                                id="author"
                                value={data.author}
                                onChange={(e) => setData('author', e.target.value)}
                                placeholder="Enter author"
                                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-full"
                            />
                            <InputError message={errors.author} />
                        </div>

                        <div className="flex justify-end">
                            <PrimaryButton type="submit" disabled={processing}>Add Book</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
