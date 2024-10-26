import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Logo from '@/components/Logo';

export default function VerifyEmail() {
  const [loading, setLoading] = useState(false);
  const { currentUser, sendVerificationEmail } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const saveUserData = async () => {
      if (!currentUser) return;
      
      try {
        const userRef = doc(db, 'waitinglist', currentUser.uid);
        await setDoc(userRef, {
          email: currentUser.email,
          verifiedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
        }, { merge: true });
        
        // Also create a user profile
        const profileRef = doc(db, 'users', currentUser.uid);
        await setDoc(profileRef, {
          email: currentUser.email,
          createdAt: serverTimestamp(),
        }, { merge: true });
        
        navigate('/dashboard');
      } catch (error) {
        console.error('Error saving user data:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to save user data. Please try again.",
        });
      }
    };

    const checkVerification = async () => {
      if (!currentUser) return;
      
      try {
        await currentUser.reload();
        if (currentUser.emailVerified) {
          await saveUserData();
        }
      } catch (error) {
        console.error('Error checking verification:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to verify email status. Please try again.",
        });
      }
    };

    const interval = setInterval(checkVerification, 3000);
    return () => clearInterval(interval);
  }, [currentUser, navigate, toast]);

  const handleResendEmail = async () => {
    try {
      setLoading(true);
      await sendVerificationEmail();
      toast({
        title: "Verification email sent!",
        description: "Please check your inbox.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send verification email.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    navigate('/signup');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-xl text-center">
        <div className="flex justify-center mb-8">
          <Logo className="scale-75" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-6">Verify Your Email</h2>
        <p className="text-gray-300 mb-6">
          We've sent a verification email to <span className="font-semibold">{currentUser.email}</span>. 
          Please verify your email to continue.
        </p>
        <Button
          onClick={handleResendEmail}
          className="bg-blue-600 hover:bg-blue-700 w-full"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Resend Verification Email'}
        </Button>
      </div>
    </div>
  );
}