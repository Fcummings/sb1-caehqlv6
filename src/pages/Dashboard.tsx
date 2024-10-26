import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="flex justify-center mb-8">
            <Logo className="scale-75" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-6">Welcome to CLKK</h1>
          <p className="text-gray-300 mb-6">
            Thank you for joining our early access program! We'll keep you updated on our latest developments.
          </p>
          <p className="text-gray-300 mb-6">
            You're signed in as: <span className="font-semibold">{currentUser?.email}</span>
          </p>
          <Button
            onClick={logout}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}