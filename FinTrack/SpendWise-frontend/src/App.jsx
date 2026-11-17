import { useEffect, useMemo, useState } from 'react';
import { NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import {
  Activity, AlertOctagon, ArrowDownLeft, ArrowLeftRight, ArrowRight, ArrowUpRight,
  Bell, CalendarDays, ChartNoAxesCombined, CheckCircle2, ChevronDown, CircleDollarSign,
  ClipboardList, CreditCard, Download, FileText, Gauge, Home, LayoutDashboard, Leaf,
  ListChecks, LogIn, LogOut, Menu, Plus, Repeat2, Search, ShieldAlert, Sparkles,
  TrendingDown, TrendingUp, UserRound, Users, Wallet, X, Zap,
} from 'lucide-react';
import { addExpense, deleteExpense, getExpenses, loginUser, registerUser, updateExpense } from './services/api';
import Dashboard from './pages/Dashboard.jsx';
import AddExpense from './pages/AddExpense.jsx';
import DailyExpenses from './pages/DailyExpenses.jsx';
import MonthlyExpenses from './pages/MonthlyExpenses.jsx';
import Transactions from './pages/Transactions.jsx';
import Analytics from './pages/Analytics.jsx';
import HighAlerts from './pages/HighAlerts.jsx';
import HighRiskPayments from './pages/HighRiskPayments.jsx';
import RecurringPayments from './pages/RecurringPayments.jsx';
import Reports from './pages/Reports.jsx';
import Settings from './pages/Settings.jsx';
import Landing from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import { alertCount, riskCount, pageTitle } from './components/Shared.jsx';

const money = (v) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(v || 0));
const today = () => new Date().toISOString().slice(0, 10);
const monthOf = (d) => String(d || '').slice(0, 7);
const COLORS = ['#6475f5', '#24b89a', '#f5a34b', '#ee6b78', '#48a4dc', '#9a83e8', '#69b7a5', '#d6b35a'];
const CATEGORIES = ['Food', 'Shopping', 'Transport', 'Bills', 'Entertainment', 'Health', 'Education', 'Travel', 'Salary', 'Freelance', 'Other'];

function App() {
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('spendwise_user') || 'null'); } catch { return null; } });
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const refresh = async () => {
    if (!user) return;
    setLoading(true); setError('');
    try { const { data } = await getExpenses(); setExpenses(Array.isArray(data) ? data : []); }
    catch { setError('Could not load transactions. Check that Spring Boot is running and the /api/expenses endpoint is available.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { if (user) refresh(); }, [user]);
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);
  useEffect(() => { if (!notice) return; const t = setTimeout(() => setNotice(''), 3500); return () => clearTimeout(t); }, [notice]);

  const totals = useMemo(() => {
    const income = expenses.filter(e => e.type === 'INCOME').reduce((s, e) => s + Number(e.amount || 0), 0);
    const spent = expenses.filter(e => e.type === 'EXPENSE').reduce((s, e) => s + Number(e.amount || 0), 0);
    return { income, spent, balance: income - spent };
  }, [expenses]);

  const save = async (data, id) => {
    try { if (id) await updateExpense(id, data); else await addExpense(data); await refresh(); setNotice(id ? 'Transaction updated.' : 'Transaction saved.'); navigate('/transactions'); }
    catch (e) { throw new Error(e?.response?.data?.message || 'Unable to save transaction. Check the backend connection.'); }
  };
  const remove = async (id) => {
    if (!window.confirm('Delete this transaction?')) return;
    try { await deleteExpense(id); await refresh(); setNotice('Transaction deleted.'); }
    catch { setNotice('Unable to delete transaction.'); }
  };
  const handleAuth = async (mode, form) => {
    try {
      const response = mode === 'login'
        ? await loginUser({ email: form.email, password: form.password })
        : await registerUser({ fullName: form.fullName, email: form.email, password: form.password });
      const payload = response.data || {};
      if (payload.token) localStorage.setItem('spendwise_token', payload.token);
      const profile = payload.user || { fullName: form.fullName || payload.fullName || form.email.split('@')[0], email: form.email };
      localStorage.setItem('spendwise_user', JSON.stringify(profile));
      setUser(profile); setNotice(mode === 'login' ? 'Welcome back!' : 'Account created successfully.'); navigate('/dashboard');
    } catch (e) {
      const status = e?.response?.status;
      if (!e?.response) throw new Error('Cannot reach /api/auth. Your Spring Boot backend must provide the login/signup endpoints.');
      throw new Error(e.response.data?.message || (status === 409 ? 'This email is already registered.' : 'Authentication failed. Check your details and backend API.'));
    }
  };
  const logout = () => { localStorage.removeItem('spendwise_token'); localStorage.removeItem('spendwise_user'); setUser(null); setExpenses([]); navigate('/'); };

  if (!user && !isAuthPage) return <Landing onLogin={() => navigate('/login')} onSignup={() => navigate('/signup')} />;
  if (!user && isAuthPage) return <AuthPage mode={location.pathname === '/signup' ? 'signup' : 'login'} onSubmit={handleAuth} onSwitch={(p) => navigate(p)} />;

  const navGroups = [
    {
      title: 'MAIN MENU', links: [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/analytics', label: 'Analytics', icon: ChartNoAxesCombined },
        { to: '/transactions', label: 'All Transactions', icon: ArrowLeftRight },
      ]
    },
    {
      title: 'EXPENSE MANAGEMENT', links: [
        { to: '/add', label: 'Add Expense / Income', icon: Plus },
        { to: '/daily', label: 'Daily Expenses', icon: CalendarDays },
        { to: '/monthly', label: 'Monthly Expenses', icon: Activity },
        { to: '/recurring', label: 'Recurring Schedule', icon: Repeat2 },
      ]
    },
    {
      title: 'INSIGHTS & REPORTS', links: [
        { to: '/alerts', label: 'High Alert Expenses', icon: AlertOctagon, badge: alertCount(expenses) || null, badgeTone: 'amber' },
        { to: '/risk', label: 'High Risk Payments', icon: ShieldAlert, badge: riskCount(expenses) || null, badgeTone: 'red' },
        { to: '/reports', label: 'Reports / PDF', icon: FileText },
      ]
    },
  ];
  return <div className="app-shell">
    {mobileOpen && <button className="scrim" onClick={() => setMobileOpen(false)} aria-label="Close menu" />}
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Wallet size={21} /></div><div><b>SPENDWISE</b><span>PERSONAL FINANCE</span></div><button className="side-close" onClick={() => setMobileOpen(false)}><X size={18} /></button></div>
      <div className="profile-strip"><div className="avatar">{(user.fullName || user.email || 'U').slice(0, 1).toUpperCase()}</div><div className="profile-copy"><b>{user.fullName || 'My Account'}</b><span>{user.email}</span></div><ChevronDown size={15} /></div>
      <nav className="side-nav">{navGroups.map(g => <div className="nav-group" key={g.title}><p>{g.title}</p>{g.links.map(link => <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><link.icon size={18} /><span>{link.label}</span>{link.badge && <i className={`nav-badge ${link.badgeTone}`}>{link.badge}</i>}</NavLink>)}</div>)}</nav>
      <div className="sidebar-bottom"><div className="side-tip"><Sparkles size={17} /><b>Smart money habits</b><p>Review your spending every week to stay on track.</p><NavLink to="/analytics">View insights <ArrowRight size={13} /></NavLink></div><button className="nav-link" onClick={() => navigate('/settings')}><UserRound size={18} /><span>Account Settings</span></button><button className="nav-link logout" onClick={logout}><LogOut size={18} /><span>Sign out</span></button></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="top-left"><button className="menu-toggle" onClick={() => setMobileOpen(true)}><Menu size={21} /></button><div className="crumb">Workspace <span>/</span> <b>{pageTitle(location.pathname)}</b></div></div><div className="top-right"><div className="date-chip"><CalendarDays size={15} />{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div><button className="bell-btn" onClick={() => navigate('/alerts')} title="Alerts"><Bell size={18} />{(alertCount(expenses) + riskCount(expenses)) > 0 && <i />}</button><div className="top-avatar">{(user.fullName || 'U').slice(0, 1).toUpperCase()}</div></div></header>
      {error && <div className="error-banner">{error}<button onClick={refresh}>Retry</button></div>}
      {notice && <div className="toast">{notice}<button onClick={() => setNotice('')}><X size={15} /></button></div>}
      <div className="page-content">{loading ? <div className="loading"><span className="spinner" />Loading your finance data...</div> : <Routes>
        <Route path="/dashboard" element={<Dashboard expenses={expenses} totals={totals} />} />
        <Route path="/add" element={<AddExpense onSave={save} />} />
        <Route path="/daily" element={<DailyExpenses expenses={expenses} onDelete={remove} />} />
        <Route path="/monthly" element={<MonthlyExpenses expenses={expenses} />} />
        <Route path="/transactions" element={<Transactions expenses={expenses} onDelete={remove} onSave={save} />} />
        <Route path="/analytics" element={<Analytics expenses={expenses} totals={totals} />} />
        <Route path="/alerts" element={<HighAlerts expenses={expenses} />} />
        <Route path="/risk" element={<HighRiskPayments expenses={expenses} />} />
        <Route path="/recurring" element={<RecurringPayments expenses={expenses} />} />
        <Route path="/reports" element={<Reports expenses={expenses} totals={totals} />} />
        <Route path="/settings" element={<Settings user={user} />} />
        <Route path="*" element={<Dashboard expenses={expenses} totals={totals} />} />
      </Routes>}</div>
      <footer className="footer">© {new Date().getFullYear()} SpendWise <span>Make every rupee count.</span></footer>
    </main>
  </div>;
}


export default App;
