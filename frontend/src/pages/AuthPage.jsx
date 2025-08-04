import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

function AuthPage() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  return (
    <div className='max-w-md mx-auto mt-20  p-8 glow-border shadow-lg'>
      {showLoginForm ? (
        <LoginForm setShowLoginForm={setShowLoginForm} />
      ) : (
        <SignupForm setShowLoginForm={setShowLoginForm} />
      )}
    </div>
  );
}

export default AuthPage;
