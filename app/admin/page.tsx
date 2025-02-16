export default function AdminPage() {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-indigo-400 mb-4">Welcome, Admin</h1>
          <p className="text-gray-300 text-lg">
            You have full control over the system. Manage users, update content, and oversee all operations.
          </p>
          <div className="mt-6 flex space-x-4 justify-center">
            <a
              href="/dashboard"
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 transition rounded-lg shadow-md"
            >
              Go to Dashboard
            </a>
            <a
              href="/settings"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 transition rounded-lg shadow-md"
            >
              Settings
            </a>
          </div>
        </div>
      </div>
    );
  }
  