import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabase';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('projects');
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [certs, setCerts] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    // Form State for Adding/Editing
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
        tech: '',
        name: '',
        logo: null,
        issuer: '',
        date: '',
        role: '',
        period: '',
        newPassword: ''
    });

    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigate = useNavigate();

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            setProjects(data || []);
        } catch (err) {
            console.error(err);
            setMessage('Gagal mengambil data proyek.');
        } finally {
            setLoading(false);
        }
    };

    const fetchSkills = async () => {
        try {
            const { data, error } = await supabase
                .from('skills')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            setSkills(data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchCerts = async () => {
        try {
            const { data, error } = await supabase
                .from('certificates')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            setCerts(data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchOrganizations = async () => {
        try {
            const { data, error } = await supabase
                .from('organizations')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            setOrganizations(data || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchAll = async () => {
            await Promise.all([fetchProjects(), fetchSkills(), fetchCerts(), fetchOrganizations()]);
        };
        fetchAll();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setMessage('Memperbarui password...');
        try {
            const { error } = await supabase.auth.updateUser({ password: formData.newPassword });
            if (error) throw error;
            setMessage('Password berhasil diperbarui!');
            setIsPasswordModalOpen(false);
        } catch (error) {
            setMessage('Gagal: ' + error.message);
        }
    };

    const handleOpenAdd = () => {
        setFormData({ title: '', description: '', image: null, tech: '', name: '', logo: null, issuer: '', date: '', role: '', period: '' });
        setIsModalOpen(true);
    };

    const uploadImage = async (file, folder) => {
        if (!file) return null;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('portfolio')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from('portfolio')
            .getPublicUrl(filePath);

        return data.publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Sedang menyimpan...');

        try {
            let insertData = {};
            let table = '';

            if (activeTab === 'projects') {
                table = 'projects';
                const imageUrl = await uploadImage(formData.image, 'projects');
                insertData = {
                    title: formData.title,
                    description: formData.description,
                    image: imageUrl,
                    tech: formData.tech.split(',').map(t => t.trim())
                };
            } else if (activeTab === 'skills') {
                table = 'skills';
                const logoUrl = await uploadImage(formData.logo, 'skills');
                insertData = {
                    name: formData.name,
                    logo: logoUrl
                };
            } else if (activeTab === 'certificates') {
                table = 'certificates';
                const certImageUrl = await uploadImage(formData.image, 'certificates');
                insertData = {
                    title: formData.title,
                    issuer: formData.issuer,
                    date: formData.date,
                    image: certImageUrl
                };
            } else if (activeTab === 'organizations') {
                table = 'organizations';
                const orgLogoUrl = await uploadImage(formData.logo, 'organizations');
                insertData = {
                    name: formData.name,
                    role: formData.role,
                    period: formData.period,
                    description: formData.description,
                    logo: orgLogoUrl
                };
            }

            const { error } = await supabase.from(table).insert([insertData]);
            if (error) throw error;

            setMessage('Data berhasil disimpan!');
            setIsModalOpen(false);
            if (activeTab === 'projects') fetchProjects();
            else if (activeTab === 'skills') fetchSkills();
            else if (activeTab === 'certificates') fetchCerts();
            else if (activeTab === 'organizations') fetchOrganizations();
        } catch (err) {
            console.error(err);
            setMessage('Error simpan data: ' + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Yakin ingin menghapus item ini?')) return;

        const table = activeTab === 'projects' ? 'projects' : activeTab === 'skills' ? 'skills' : activeTab === 'certificates' ? 'certificates' : 'organizations';

        try {
            const { error } = await supabase
                .from(table)
                .delete()
                .eq('id', id);

            if (error) throw error;

            if (activeTab === 'projects') fetchProjects();
            else if (activeTab === 'skills') fetchSkills();
            else if (activeTab === 'certificates') fetchCerts();
            else if (activeTab === 'organizations') fetchOrganizations();
        } catch (err) {
            console.error(err);
            setMessage('Error hapus data.');
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex text-white font-sans overflow-x-hidden">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                />
            )}

            <aside className={`w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8 border-b border-white/5 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold tracking-tighter bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">SUPABASE ADMIN</h2>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-2 font-medium">Portfolio Management</p>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-white/50 hover:text-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                    <button onClick={() => { setActiveTab('projects'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all ${activeTab === 'projects' ? 'bg-white text-black font-semibold' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        Kelola Proyek
                    </button>
                    <button onClick={() => { setActiveTab('skills'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all ${activeTab === 'skills' ? 'bg-white text-black font-semibold' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20v-6M6 20V10M18 20V4" /></svg>
                        Kelola Skills
                    </button>
                    <button onClick={() => { setActiveTab('certificates'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all ${activeTab === 'certificates' ? 'bg-white text-black font-semibold' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                        Sertifikasi
                    </button>
                    <button onClick={() => { setActiveTab('organizations'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all ${activeTab === 'organizations' ? 'bg-white text-black font-semibold' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        Organisasi
                    </button>
                    <button onClick={() => { setFormData({...formData, newPassword: ''}); setIsPasswordModalOpen(true); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all text-white/50 hover:text-white hover:bg-white/5">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        Ubah Password
                    </button>
                </nav>
                <div className="p-6 border-t border-white/5">
                    <button onClick={handleLogout} className="w-full px-4 py-3 text-sm text-red-400 bg-red-400/5 hover:bg-red-400/10 border border-red-400/10 rounded-xl transition-all flex items-center justify-between group">
                        Keluar
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    </button>
                </div>
            </aside>

            <main className="flex-1 h-screen overflow-y-auto">
                <header className="h-20 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 flex-shrink-0 sticky top-0 z-30">
                    <div className="flex items-center gap-3 md:gap-4">
                        <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-white/70 hover:text-white p-2 -ml-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                        <h1 className="text-sm md:text-lg font-medium text-white/90 truncate">{activeTab === 'projects' ? 'Daftar Proyek Portofolio' : activeTab === 'skills' ? 'Manajemen Keahlian' : activeTab === 'certificates' ? 'Manajemen Sertifikasi' : 'Manajemen Organisasi'}</h1>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                        {message && <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-1 md:px-3 border border-emerald-400/20 rounded-full hidden sm:block truncate max-w-[150px]">{message}</span>}
                        <a href="/" target="_blank" rel="noreferrer" className="text-[10px] md:text-xs text-white/60 hover:text-white transition-colors flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-xl whitespace-nowrap">
                            Website
                        </a>
                    </div>
                </header>

                <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        <div className="glass-card p-6 border-l-4 border-l-blue-500">
                            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Total Items</p>
                            <h3 className="text-3xl font-light text-white">
                                {activeTab === 'projects' ? projects.length : activeTab === 'skills' ? skills.length : activeTab === 'certificates' ? certs.length : organizations.length}
                            </h3>
                        </div>
                        <div className="glass-card p-6 border-l-4 border-l-purple-500">
                            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Status Storage</p>
                            <h3 className="text-xl font-light text-emerald-400">Connected</h3>
                        </div>
                    </div>

                    {activeTab === 'projects' ? (
                        <>
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 md:mb-10">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Koleksi Proyek</h2>
                                    <p className="text-white/40 text-xs md:text-sm mt-1">Total {projects.length} proyek tersimpan.</p>
                                </div>
                                <button onClick={handleOpenAdd} className="bg-white text-black px-4 py-3 md:px-6 md:py-3 rounded-xl font-bold text-xs md:text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2">Tambah Proyek Baru</button>
                            </div>
                            {loading ? <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{[1, 2, 3].map(i => <div key={i} className="h-64 bg-white/5 rounded-2xl animate-pulse"></div>)}</div> : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {projects.map((p) => (
                                        <div key={p.id} className="glass-card group overflow-hidden border-white/5 bg-white/[0.02]">
                                            <div className="h-44 bg-white/5 overflow-hidden"><img src={p.image} alt="" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" /></div>
                                            <div className="p-6">
                                                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                                                <p className="text-xs text-white/40 line-clamp-2 mb-4 font-light">{p.description}</p>
                                                <div className="flex gap-3"><button onClick={() => handleDelete(p.id)} className="px-4 py-2 text-xs bg-red-400/5 text-red-400 border border-red-400/20 rounded-lg">Hapus</button></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : activeTab === 'skills' ? (
                        <>
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 md:mb-10">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Keahlian & Teknologi</h2>
                                    <p className="text-white/40 text-xs md:text-sm mt-1">Total {skills.length} keahlian terdaftar.</p>
                                </div>
                                <button onClick={handleOpenAdd} className="bg-white text-black px-4 py-3 md:px-6 md:py-3 rounded-xl font-bold text-xs md:text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2">Tambah Skill</button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {skills.map((s) => (
                                    <div key={s.id} className="glass-card p-4 flex flex-col items-center text-center group bg-white/[0.02]">
                                        <div className="w-12 h-12 mb-3"><img src={s.logo} alt={s.name} className="w-full h-full object-contain" /></div>
                                        <p className="text-xs font-medium text-white/70">{s.name}</p>
                                        <button onClick={() => handleDelete(s.id)} className="mt-2 text-[10px] text-red-400">Hapus</button>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : activeTab === 'certificates' ? (
                        <>
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 md:mb-10">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Sertifikasi</h2>
                                    <p className="text-white/40 text-xs md:text-sm mt-1">Total {certs.length} sertifikat tersimpan.</p>
                                </div>
                                <button onClick={handleOpenAdd} className="bg-white text-black px-4 py-3 md:px-6 md:py-3 rounded-xl font-bold text-xs md:text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2">Tambah Sertifikat</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {certs.map((c) => (
                                    <div key={c.id} className="glass-card p-4 group bg-white/[0.02]">
                                        <div className="h-32 mb-4 bg-white/5 rounded-lg overflow-hidden">
                                            <img src={c.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <h4 className="text-sm font-bold">{c.title}</h4>
                                        <p className="text-[10px] text-white/40">{c.issuer} • {c.date}</p>
                                        <button onClick={() => handleDelete(c.id)} className="mt-4 text-[10px] text-red-400">Hapus</button>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 md:mb-10">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Pengalaman Organisasi</h2>
                                    <p className="text-white/40 text-xs md:text-sm mt-1">Total {organizations.length} rekam jejak organisasi.</p>
                                </div>
                                <button onClick={handleOpenAdd} className="bg-white text-black px-4 py-3 md:px-6 md:py-3 rounded-xl font-bold text-xs md:text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2">Tambah Organisasi</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {organizations.map((org) => (
                                    <div key={org.id} className="glass-card p-6 flex items-start gap-4 bg-white/[0.02]">
                                        <div className="w-16 h-16 bg-white/5 rounded-xl overflow-hidden flex-shrink-0">
                                            <img src={org.logo} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold">{org.name}</h4>
                                            <p className="text-sm text-cyan-400 mb-1">{org.role}</p>
                                            <p className="text-[10px] text-white/40 mb-3">{org.period}</p>
                                            <p className="text-xs text-white/60 line-clamp-2">{org.description}</p>
                                            <button onClick={() => handleDelete(org.id)} className="mt-3 text-[10px] text-red-400">Hapus</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md"></motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="glass-card w-full max-w-lg p-6 md:p-8 relative z-10 border-white/20 bg-[#0a0a0a] max-h-[90vh] overflow-y-auto">
                            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Tambah {activeTab === 'projects' ? 'Proyek' : activeTab === 'skills' ? 'Skill' : activeTab === 'certificates' ? 'Sertifikat' : 'Organisasi'} Baru</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {activeTab === 'projects' ? (
                                    <>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Nama Proyek" required />
                                        <textarea rows="3" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Deskripsi" required />
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-white/40 uppercase px-1">Foto Proyek</label>
                                            <input type="file" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" onChange={e => setFormData({ ...formData, image: e.target.files[0] })} required />
                                        </div>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" value={formData.tech} onChange={e => setFormData({ ...formData, tech: e.target.value })} placeholder="Tech Stack (koma)" required />
                                    </>
                                ) : activeTab === 'skills' ? (
                                    <>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Nama Teknologi" required />
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-white/40 uppercase px-1">Logo Teknologi</label>
                                            <input type="file" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" onChange={e => setFormData({ ...formData, logo: e.target.files[0] })} required />
                                        </div>
                                    </>
                                ) : activeTab === 'certificates' ? (
                                    <>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Nama Sertifikat" required />
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" value={formData.issuer} onChange={e => setFormData({ ...formData, issuer: e.target.value })} placeholder="Penerbit" required />
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} placeholder="Tanggal (e.g. Sep 2025)" required />
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-white/40 uppercase px-1">Foto Sertifikat</label>
                                            <input type="file" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" onChange={e => setFormData({ ...formData, image: e.target.files[0] })} required />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Nama Organisasi" required />
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} placeholder="Peran / Jabatan" required />
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" value={formData.period} onChange={e => setFormData({ ...formData, period: e.target.value })} placeholder="Periode (e.g. 2023 - 2024)" required />
                                        <textarea rows="3" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Deskripsi Singkat" required />
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-white/40 uppercase px-1">Foto Dokumentasi Pilihan (Logo/Aktivitas)</label>
                                            <input type="file" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" onChange={e => setFormData({ ...formData, logo: e.target.files[0] })} required />
                                        </div>
                                    </>
                                )}
                                <div className="flex gap-4 pt-6">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 rounded-xl border border-white/10">Batal</button>
                                    <button type="submit" className="flex-1 px-6 py-3 rounded-xl bg-white text-black font-bold">Simpan</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isPasswordModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsPasswordModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md"></motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="glass-card w-full max-w-sm p-6 md:p-8 relative z-10 border-white/20 bg-[#0a0a0a]">
                            <h2 className="text-xl font-bold mb-4 md:mb-6">Ubah Password</h2>
                            <form onSubmit={handleUpdatePassword} className="space-y-4">
                                <input type="password" minLength="6" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm" value={formData.newPassword} onChange={e => setFormData({ ...formData, newPassword: e.target.value })} placeholder="Password Baru (min 6 karakter)" required />
                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => setIsPasswordModalOpen(false)} className="flex-1 px-4 py-2 rounded-xl border border-white/10 text-sm">Batal</button>
                                    <button type="submit" className="flex-1 px-4 py-2 rounded-xl bg-white text-black font-bold text-sm">Simpan</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
