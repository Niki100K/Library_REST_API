import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

export default function Dashboard({ auth, books }) {
    const { delete: destroy } = useForm({});
    const deleteBook = (id) => {
        destroy(route('book.destroy', { id: id }))
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold mb-4">{books.length > 0 ? 'My Books' : 'Upload your first book'}</h1>
                            {books.length > 0 &&
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {books.map(book => (
                                            <tr key={book.id}>
                                                <td>{book.title}</td>
                                                <td>{book.author}</td>
                                                <td>
                                                    <Link href={`/book/${book.id}`}>
                                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                                                    </Link>
                                                    <button onClick={() => deleteBook(book.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            }
                            <Link href={route('book')}>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload Book</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
