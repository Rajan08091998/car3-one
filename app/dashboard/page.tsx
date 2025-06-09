// app/dashboard/page.tsx (if using App Router)

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl max-w-2xl w-full p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome to your dashboard! 🎉</p>

        {/* Future widgets section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg shadow-inner text-center">
            <p className="text-indigo-800 font-medium">Widget 1</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg shadow-inner text-center">
            <p className="text-indigo-800 font-medium">Widget 2</p>
          </div>
        </div>
      </div>
    </div>
  );
}
