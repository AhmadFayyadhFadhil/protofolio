import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isResetMode, setIsResetMode] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            if (data.user) {
                navigate('/admin');
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: 'http://localhost:3000/admin',
            });
            if (resetError) throw resetError;
            setMessage('Tautan reset password telah dikirim ke email Anda! Periksa inbox/spam (link ini hanya berlaku sekali klik).');
        } catch (err) {
            setError(err.message || 'Gagal mengirim email reset password.');
        } finally {
            setLoading(false);
        }
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
                    <h2 className="text-2xl font-bold text-white mb-2">Supabase Auth</h2>
                    <p className="text-white/40 text-sm">Portfolio Management System</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-xs text-center">
                        {error}
                    </div>
                )}
                {message && (
                    <div className="mb-6 p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs text-center">
                        {message}
                    </div>
                )}

                <form onSubmit={isResetMode ? handleResetPassword : handleLogin} className="space-y-5">
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
                    
                    {!isResetMode && (
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-white/50 text-xs tracking-wide uppercase">Password</label>
                                <button type="button" onClick={() => { setIsResetMode(true); setError(''); setMessage(''); }} className="text-[10px] text-cyan-400 hover:text-cyan-300">
                                    Lupa Password?
                                </button>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white text-sm rounded-xl focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:outline-none transition-all placeholder-white/20"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`btn-primary w-full shadow-[0_4px_20px_rgba(255,255,255,0.1)] mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Memproses...' : (isResetMode ? 'Kirim Link Reset' : 'Authenticate')}
                    </button>

                    {isResetMode && (
                        <button 
                            type="button" 
                            onClick={() => { setIsResetMode(false); setError(''); setMessage(''); }}
                            className="w-full mt-2 text-xs text-white/40 hover:text-white"
                        >
                            Kembali ke Login
                        </button>
                    )}
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
