"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function PostsPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.slice(0, 12)))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (postId) => {
    // Yalnız local state-dən silirik (jsonplaceholder əslində silmir)
    setPosts((prev) => prev.filter((post) => post.id !== postId));
    // İstəyirsinizsə DELETE sorğusu da göndərə bilərsiniz:
    // fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, { method: "DELETE" });
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900">Posts</h1>
        <p className="mt-1 text-slate-600">The latest from the team feed.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="font-semibold capitalize text-slate-900">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-slate-600">{post.body}</p>

              {user?.role === "ADMIN" && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="mt-4 self-start rounded-lg bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}