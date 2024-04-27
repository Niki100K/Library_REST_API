<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        $book = Book::findOrFail($id);
    
        return Inertia::render('EditBook', [
            'book' => $book,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
        ]);
    
        $author = Author::firstOrCreate(['name' => $request->author]);
        $authorId = $author->id;
    
        $book = new Book();
        $book->title = $request->title;
        $book->author = $request->author;
        $book->save();
    
        $user = Auth::user();
        $book->authors()->attach($authorId);
        $book->users()->attach($user->id);
        return Redirect::to('/');
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        return Inertia::render('AddBook');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
        ]);

        $book = Book::findOrFail($id);

        $book->title = $request->title;
        $book->author = $request->author;
        $book->save();

        return Redirect::to('/');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $book = Book::findOrFail($id);

        $book->delete();

        $author = $book->author;
        $otherBooks = Book::where('author', $author)->exists();

        if (!$otherBooks) {
            Author::destroy($author);
        }

        return Redirect::to('/');
    }
}
