import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AuthButtons } from '@/components/auth/AuthButtons';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'signin' | 'signup';
}

export function AuthModal({ open, onOpenChange, mode }: AuthModalProps) {
  const title = mode === 'signin' ? 'Sign In' : 'Get Started';
  const authTitle = mode === 'signin' ? 'Welcome Back!' : 'Create Your Account';
  const description =
    mode === 'signin'
      ? 'Please sign in to continue.'
      : 'Join us and start your automotive journey.';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent >
        <DialogHeader>
        </DialogHeader>
        <AuthButtons mode={mode} title={authTitle} description={description} />
      </DialogContent>
    </Dialog>
  );
}
