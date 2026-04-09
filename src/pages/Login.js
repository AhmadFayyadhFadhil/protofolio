import { useState } from 'react';
import { motion } from 'framer-motion';
// import { signInWithEmailAndPassword } from 'firebase/auth'; // Will add later
// import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Temporary bypass for UI building
        if (email === 'admin@example.com' && password === 'admin') {
            navigate('/admin');
        } else {
            setError('Invalid credentials (use admin@example.com / admin for preview)');
        }

        /* 
        try {
          await signInWithEmailAndPassword(auth, email, password);
          navigate('/admin');
        } catch (err) {
          setError(err.message);
        }
        */
    };

    return (
        <div className="min-h-screen bg-darkBg flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card w-full max-w-md p-8 md:p-10 relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl mx-auto flex items-center justify-center mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Secure Access</h2>
                    <p className="text-white/40 text-sm">Portfolio Management System</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-xs text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-white/50 text-xs tracking-wide uppercase mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white text-sm rounded-xl focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:outline-none transition-all placeholder-white/20"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white/50 text-xs tracking-wide uppercase mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white text-sm rounded-xl focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:outline-none transition-all placeholder-white/20"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full shadow-[0_4px_20px_rgba(255,255,255,0.1)] mt-4">
                        Authenticate
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <a href="/" className="text-white/30 hover:text-white/60 text-xs flex items-center justify-center gap-2 transition-colors">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                        Return to Portfolio
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
