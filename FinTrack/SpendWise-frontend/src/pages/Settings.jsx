import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Activity, AlertOctagon, ArrowDownLeft, ArrowLeft, ArrowLeftRight, ArrowRight, ArrowUpRight, Bell, CalendarDays, ChartNoAxesCombined, CheckCircle2, ChevronDown, CircleDollarSign, ClipboardList, CreditCard, Download, FileText, Gauge, Home, LayoutDashboard, Leaf, ListChecks, LogIn, LogOut, Menu, Plus, Repeat2, Search, ShieldAlert, Sparkles, TrendingDown, TrendingUp, UserRound, Users, Wallet, X, Zap } from 'lucide-react';
import { Heading, Panel, Stat, Quick, Empty, TransactionTable, monthlySeries, categorySeries } from "../components/Shared.jsx";
import { money, monthOf, today } from "../components/Shared.jsx";

export function SettingsPage({user}) { return <><Heading tag="ACCOUNT" title="Account settings" subtitle="Your signed-in profile and connection details."/><Panel title="Profile information" sub="Account currently signed in"><div className="settings-row"><div><b>Full name</b><p>{user.fullName||'Not provided'}</p></div><UserRound size={20}/></div><div className="settings-row"><div><b>Email address</b><p>{user.email}</p></div><CheckCircle2 className="ok-icon" size={20}/></div><div className="settings-row"><div><b>Backend connection</b><p>Spring Boot API · http://localhost:8080</p></div><span className="status-pill">Local API</span></div></Panel><div className="notice-card blue"><ShieldAlert size={20}/><div><b>Security note</b><p>Passwords should be hashed in the backend using BCrypt. Never store a plain-text password in browser storage or directly in the frontend code.</p></div></div></>; }
export default SettingsPage;
