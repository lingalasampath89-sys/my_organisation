import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Mail,
  GraduationCap,
  Award,
  CheckCircle2,
  Rocket,
  Brain,
  Zap,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  ArrowRight,
  HeartHandshake as Handshake,
  MessageCircle,
  ShieldCheck,
  Radio,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Calendar,
  BookOpen,
  Monitor,
  ClipboardCheck,
  ArrowLeft,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Quote,
  Clock,
  Target,
  Lightbulb,
  Star,
  Layers,
  TrendingUp,
  Eye,
  MessageSquare,
  GitBranch,
  BarChart3,
  Code,
  Shield,
  Database,
  Calculator,
  Cpu,
  Camera,
  Volume2
} from 'lucide-react';
import './App.css';
import logo from './assets/logo_pro.png';

// 4K Ultra HD Transparent Recognition Logos
import nipLogo from './assets/recognitions/nip_logo.png';
import nsdcLogo from './assets/recognitions/nsdc_logo.png';
import aicteLogo from './assets/recognitions/aicte_logo.png';
import msmeLogo from './assets/recognitions/msme_logo.png';
import skillIndiaLogo from './assets/recognitions/skill_india_logo.png';
// Optimized Cloud Images (Faster & Higher Clarity)
const heroImage = "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80";
const workshop1 = "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80";
import tarunImg from './assets/tarun.jpg';
import koyaSubbaraoImg from './assets/koya_subbarao.png';
import avinashImg from './assets/avinash.png';
import chandanaImg from './assets/chandana.png';
// NOTE: Make sure to save the uploaded image as 'sampath.png' in src/assets
import sampathImg from './assets/sampath.png';
// Book Cover Images
import bookCover1 from './assets/book_cover_1.png';
import bookCover2 from './assets/book_cover_2.png';
import bookCover3 from './assets/book_cover_3.png';
import bookCover4 from './assets/book_cover_4.png';
const ws1 = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80";
const ws2 = "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80";
const ws3 = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80";

const fadeIn = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
};

// Stats Section with animated counters
  const renderStats = () => (
    <section className="stats-section" style={{ padding: 'var(--space-12) 0' }}>
      <div className="container stats-container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon"><Users size={28} /></div>
            <h2><AnimatedCounter target={25000} suffix="+" /></h2>
            <p>Students</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><GraduationCap size={28} /></div>
            <h2><AnimatedCounter target={12} suffix="+" /></h2>
            <p>Programs</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Award size={28} /></div>
            <h2><AnimatedCounter target={1500} suffix="+" /></h2>
            <p>Workshops</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Mail size={28} /></div>
            <h2><AnimatedCounter target={30} suffix="+" /></h2>
            <p>Partners</p>
          </div>
        </div>
      </div>
    </section>
  );

// Animated counter component
function AnimatedCounter({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const numericTarget = parseFloat(target.toString().replace(/[^0-9.]/g, ''));
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * numericTarget));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(numericTarget);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedGrade, setSelectedGrade] = useState(6);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedRecognition, setSelectedRecognition] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Backend Integration States
  const [contactForm, setContactForm] = useState({ name: '', email: '', school: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Curriculum Modal State
  const [showCurriculumModal, setShowCurriculumModal] = useState(false);

  // Certificate Verification State
  const [certId, setCertId] = useState('');
  const [certVerifying, setCertVerifying] = useState(false);
  const [certResult, setCertResult] = useState(null); // null | 'success' | 'error' | 'invalid'

  // Workshop Request Form State
  const [workshopForm, setWorkshopForm] = useState({ schoolName: '', city: '', contactNumber: '' });
  const [workshopSubmitting, setWorkshopSubmitting] = useState(false);
  const [workshopSubmitted, setWorkshopSubmitted] = useState(false);

  // Book Reader State
  const [bookPageIndex, setBookPageIndex] = useState(0);
  const [pageTurning, setPageTurning] = useState(null); // 'forward' | 'backward' | null

  // API Base URL - Update this after hosting the backend
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const programs = [
    { id: 6, title: "AI Foundations", desc: "For Class 6: AI awareness, logical thinking & digital world basics.", rating: 4.9, students: "15,200+", popular: false },
    { id: 7, title: "AI Explorer", desc: "For Class 7: ML basics, data patterns & Scratch block coding start.", rating: 4.9, students: "12,400+", popular: true },
    { id: 8, title: "AI Master", desc: "For Class 8: AI systems understanding & advanced block coding.", rating: 4.8, students: "8,200+", popular: false },
    { id: 9, title: "AI Innovator", desc: "For Class 9: Python intro, real AI projects & career awareness.", rating: 5.0, students: "5,600+", popular: true }
  ];

  const syllabusData = {
    6: {
      title: "AI Foundations (Class 6)",
      level: "🟢 Beginner — AI Awareness + Logical Thinking",
      modules: [
        {
          unit: "01",
          title: "Introduction to AI",
          theory: "• What is Artificial Intelligence?\n• AI vs Human vs Machine — differences & similarities\n• AI in daily life: examples around us\n• How machines think and make decisions",
          practical: "• Activity: Identify AI devices at home\n• Game: Smart vs Non-Smart device sorting challenge",
          test: "AI Awareness Quiz + Discussion"
        },
        {
          unit: "02",
          title: "Computers & Digital World",
          theory: "• Input – Process – Output model explained\n• Hardware vs Software — what's the difference?\n• Digital devices around us: computers, tablets, phones\n• How data moves through a computer",
          practical: "• Lab: Identify hardware & software on a computer\n• Activity: Input-Process-Output chart for daily tasks",
          test: "Digital World MCQ Quiz"
        },
        {
          unit: "03",
          title: "Thinking Like a Computer",
          theory: "• Step-by-step thinking — breaking problems into parts\n• Instructions vs Commands — how computers understand us\n• Introduction to Algorithms: what and why\n• Sequencing: order matters in computing",
          practical: "• Activity: Write instructions to make a sandwich (algorithm)\n• Game: Sequence sorting activity",
          test: "Algorithm Design Mini-Test"
        },
        {
          unit: "04",
          title: "Introduction to Data",
          theory: "• What is data? Why does it matter?\n• Simple examples: text, images, numbers\n• Data in real life: surveys, weather, scores\n• How AI uses data to learn and make decisions",
          practical: "• Lab: Class survey — collect & organize data\n• Project: Create a simple bar chart from collected data",
          test: "Data Literacy Assessment"
        }
      ]
    },
    7: {
      title: "AI Explorer (Class 7)",
      level: "🟡 Intermediate — Data + ML Basics + Scratch Coding",
      modules: [
        {
          unit: "01",
          title: "How AI Learns",
          theory: "• Machine Learning basics — what it means\n• Learning from examples: how AI trains on data\n• Prediction concept: how AI guesses the future\n• Smart recommendations: YouTube, Netflix, Spotify",
          practical: "• Lab: Train Your AI Game (Teachable Machine)\n• Activity: Feed examples and see AI predictions",
          test: "ML Concept Quiz + Prediction Challenge"
        },
        {
          unit: "02",
          title: "Data & Patterns",
          theory: "• Types of data: numbers, images, text, audio\n• Organizing data into tables and charts\n• Pattern recognition: finding hidden trends\n• How patterns help AI make smarter decisions",
          practical: "• Lab: Class Hobby Dataset — organize & chart data\n• Activity: Find patterns in weather or sports data",
          test: "Data Pattern Recognition Lab"
        },
        {
          unit: "03",
          title: "Computational Thinking",
          theory: "• Decomposition: breaking big problems into small parts\n• Sequence: putting steps in the right order\n• Logic building: IF-THEN thinking\n• Abstraction: focusing on what's important",
          practical: "• Activity: Decompose a school event planning problem\n• Game: Logic puzzle solving challenge",
          test: "Computational Thinking Problem Set"
        },
        {
          unit: "04",
          title: "Programming Basics (Scratch)",
          theory: "• What is coding? Why do we code?\n• Block coding introduction — no typing needed!\n• Events: what happens when you click Start or press a key\n• Simple animations: making sprites move and talk",
          practical: "• Lab: Create your first Scratch project\n• Project: Build a simple animated story or game",
          test: "Scratch Project Showcase"
        }
      ]
    },
    8: {
      title: "AI Master (Class 8)",
      level: "🔵 Advanced — AI Systems + Advanced Block Coding",
      modules: [
        {
          unit: "01",
          title: "Machine Learning Deep Basics",
          theory: "• How AI models are trained — step by step\n• Good data vs bad data: why quality matters\n• Predictions in AI: accuracy and errors\n• Supervised vs Unsupervised learning overview",
          practical: "• Lab: Train an AI to recognize gestures (Teachable Machine)\n• Activity: Compare good data vs bad data results",
          test: "ML Model Training Challenge"
        },
        {
          unit: "02",
          title: "AI Applications",
          theory: "• AI for images (Computer Vision): how machines see\n• AI for text (Natural Language Processing): how machines read\n• Real-world AI examples: healthcare, agriculture, transport\n• How AI is changing every industry",
          practical: "• Lab: Explore computer vision using Teachable Machine\n• Activity: Build a basic text classifier",
          test: "AI Applications Presentation"
        },
        {
          unit: "03",
          title: "Programming — Advanced Scratch",
          theory: "• Conditions (IF logic): making decisions in code\n• Loops (repeat idea): doing things multiple times\n• Variables in Scratch: storing information\n• Game development basics: characters, scores, levels",
          practical: "• Lab: Build a quiz game with IF conditions\n• Project: Create a complete game with loops and scoring",
          test: "Scratch Advanced Game Project"
        },
        {
          unit: "04",
          title: "AI Ethics & Safety",
          theory: "• Safe AI usage: rules for responsible AI\n• Privacy awareness: your digital footprint\n• Responsible AI: bias, fairness, transparency\n• Deepfakes and misinformation awareness",
          practical: "• Lab: Spot the Deepfake challenge\n• Project: Create an AI Safety Poster or Bill of Rights",
          test: "AI Ethics Case Study Presentation"
        }
      ]
    },
    9: {
      title: "AI Innovator (Class 9)",
      level: "🔴 Expert — Python Intro + Real AI Projects",
      modules: [
        {
          unit: "01",
          title: "AI in the Real World",
          theory: "• AI in healthcare: diagnosis, treatment, research\n• AI in transport: self-driving cars, navigation\n• AI in education: personalized learning\n• Industry applications & future of AI",
          practical: "• Activity: Research real AI applications in India\n• Discussion: How AI will change your career",
          test: "Industry AI Awareness Quiz"
        },
        {
          unit: "02",
          title: "Problem Solving with AI",
          theory: "• Real-world problem identification techniques\n• AI solution thinking: how to frame problems\n• Project planning: from idea to prototype\n• Team collaboration in tech projects",
          practical: "• Workshop: Identify a community problem & design AI solution\n• Activity: Create a project proposal",
          test: "Problem-Solution Proposal"
        },
        {
          unit: "03",
          title: "Python Programming Basics",
          theory: "• What is Python? Why Python for AI?\n• Variables: storing and using data in Python\n• Input/Output: getting data from users\n• Writing simple Python programs step by step",
          practical: "• Lab: Write first Python programs (calculator, greeter)\n• Activity: Build a simple number guessing game in Python",
          test: "Python Basics Coding Test"
        },
        {
          unit: "04",
          title: "AI Projects",
          theory: "• Mini AI project design: planning and building\n• Team project: working together to solve real problems\n• Presentation skills: how to showcase your work\n• Career awareness: AI jobs and opportunities",
          practical: "• Build a mini AI project (chatbot, classifier, or predictor)\n• Team project showcase and demonstration\n• Present to judges and receive feedback",
          test: "Final AI Project Showcase"
        }
      ]
    }
  };

  const testimonials = [
    { name: "Koya Subbarao", school: "KKR and KSR Institute of Technology and Sciences", text: "A visionary initiative designed to prepare the next generation for an AI-powered future.", role: "Chairman", img: koyaSubbaraoImg },
    { name: "Velluri Tarun Shetty", school: "Strint Technologies", text: "Empowering young minds with future-ready AI skills to innovate, create, and lead in the digital world.", role: "CEO", img: tarunImg },
    { name: "Siddharth Verma", school: "Leading Private School", text: "The hands-on approach of AISI is unparalleled. My students are now building basic chatbots on their own!", role: "Computer Science HOD" },
    { name: "Meera Krishnan", school: "Academic Parent", text: "Finally, an AI curriculum that doesn't just talk about robots but teaches the actual logic behind them. Exceptional!", role: "Parent" },
    { name: "Aryan Goel", school: "Innovation Lab Student", text: "The workshop at our school was the best experience. The AI-drone demo was mind-blowing!", role: "AI Innovator" }
  ];

  const navigateTo = (page, data = null) => {
    setCurrentPage(page);
    if (page === 'syllabus' && data) setSelectedGrade(data);
    if (page === 'team-detail' && data) setSelectedMember(data);
    if (page === 'recognition-detail' && data) setSelectedRecognition(data);
    setMobileMenuOpen(false); // Close mobile menu on navigate
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderTeamMemberDetail = () => {
    const member = teamData[selectedMember];
    if (!member) return null;

    return (
      <div className="member-detail">
        <section className="page-hero" style={{ 
          background: `linear-gradient(135deg, rgba(30, 64, 175, 0.7) 0%, rgba(37, 99, 235, 0.65) 100%), url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80)`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white', 
          padding: '120px 0', 
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="hero-blob" style={{ background: 'rgba(255,255,255,0.1)', top: '-50%', left: '20%' }}></div>
          <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.img 
              src={member.img} 
              alt={member.name} 
              className="photo-enhanced"
              loading="lazy"
              style={{ width: '180px', height: '180px', borderRadius: '50%', border: '8px solid rgba(255,255,255,0.2)', marginBottom: '32px', objectFit: 'cover' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            />
            <motion.h1 style={{ fontSize: '42px', marginBottom: '16px' }} {...fadeIn}>{member.name}</motion.h1>
            <motion.p style={{ fontSize: '18px', opacity: 0.9, fontWeight: '700', letterSpacing: '1px' }} {...fadeIn}>{member.role}</motion.p>
          </div>
        </section>

        <section className="container section">
          <div className="grid" style={{ gridTemplateColumns: '1.5fr 1fr', gap: '80px' }}>
            <motion.div {...fadeIn}>
              <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Biography</h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '18px', lineHeight: '1.8', marginBottom: '32px' }}>
                {member.bio}
              </p>
              <div style={{ padding: '40px', background: 'var(--bg-subtle)', borderRadius: '32px', border: '1px solid var(--border)' }}>
                <h3 style={{ marginBottom: '16px' }}>Professional Philosophy</h3>
                <p style={{ color: 'var(--text-main)', fontStyle: 'italic' }}>
                  "{member.fullBio}"
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
              <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Expertise Highlights</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {member.highlights.map((h, i) => (
                  <div key={i} style={{ padding: '24px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: 'var(--shadow)' }}>
                    <div style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '50%' }}></div>
                    <span style={{ fontWeight: '700', fontSize: '16px', color: 'var(--navy)' }}>{h}</span>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '40px', padding: '32px', background: 'var(--navy)', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
                <h4 style={{ marginBottom: '12px' }}>Connect with {member.name.split(' ')[0]}</h4>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: member.profileLink ? '20px' : '0' }}>
                   <Linkedin style={{ cursor: 'pointer' }} />
                   <Twitter style={{ cursor: 'pointer' }} />
                   <Mail size={20} style={{ cursor: 'pointer' }} />
                </div>
                {member.profileLink && (
                  <a
                    href={member.profileLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 28px',
                      background: 'linear-gradient(135deg, #2563EB 0%, #3B72F7 100%)',
                      color: 'white',
                      borderRadius: '9999px',
                      textDecoration: 'none',
                      fontWeight: '700',
                      fontSize: '14px',
                      boxShadow: '0 4px 16px rgba(37,99,235,0.4)',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    View Full Profile <ArrowRight size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <button className="btn btn-outline" onClick={() => navigateTo('about')}>
              <ArrowLeft size={20} style={{ marginRight: '8px' }} /> Back to Leadership
            </button>
          </div>
        </section>
      </div>
    );
  };

  const renderNav = () => (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={isScrolled ? 'scrolled' : ''}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}
    >
      <div className="container nav-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
        <motion.div 
          className="logo" 
          onClick={() => navigateTo('home')} 
          whileHover={{ scale: 1.05 }}
          style={{ 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            padding: '8px 16px',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--shadow)',
            transition: 'all 0.3s ease'
          }}
        >
              <img 
                src={logo} 
                alt="AISI" 
                loading="lazy"
                style={{ 
                  height: '38px', 
                  filter: theme === 'dark' ? 'brightness(1.2) contrast(1.1)' : 'none',
                  transition: 'filter 0.3s ease'
                }} 
              />
          <span style={{ 
            fontSize: '24px', 
            fontWeight: '950', 
            color: 'var(--primary)', 
            letterSpacing: '1px',
            background: 'linear-gradient(45deg, var(--primary), var(--primary-hover))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: theme === 'dark' ? '0 0 15px rgba(59, 130, 246, 0.3)' : '0 2px 10px rgba(0,101,255,0.1)'
          }}>AISI</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="nav-links desktop-only" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {['home', 'about', 'programs', 'curriculum', 'workshops', 'recognitions', 'contact'].map(page => (
            <a 
              key={page} 
              href="#" 
              className={currentPage === page ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); navigateTo(page); }}
              style={{ 
                textDecoration: 'none', 
                color: currentPage === page ? 'var(--primary)' : 'var(--navy)', 
                fontWeight: '700',
                fontSize: '15px',
                textTransform: 'capitalize',
                transition: 'color 0.3s ease'
              }}
            >
              {page === 'home' ? 'Home' : page === 'about' ? 'About Us' : page === 'curriculum' ? 'Curriculum' : page}
            </a>
          ))}
          
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <motion.button
            className="btn btn-primary btn-glow"
            onClick={() => navigateTo('contact')}
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.96 }}
            style={{ padding: '12px 32px', fontSize: '15px', fontWeight: 700, background: 'linear-gradient(135deg, #2563EB 0%, #3B72F7 100%)' }}
          >Join Now</motion.button>
        </div>

        {/* Mobile Toggle & Theme Toggle */}
        <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--navy)', display: 'flex', alignItems: 'center', padding: '4px' }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            position: 'absolute', 
            top: '80px', 
            left: 0, 
            width: '100%', 
            background: 'var(--bg-card)', 
            padding: '40px 20px', 
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            textAlign: 'center',
            zIndex: 999,
            borderBottom: '1px solid var(--border)'
          }}
        >
          {['home', 'about', 'programs', 'curriculum', 'workshops', 'recognitions', 'contact'].map(page => (
            <a 
              key={page} 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigateTo(page); }}
              style={{ textDecoration: 'none', color: 'var(--navy)', fontWeight: '800', fontSize: '20px' }}
            >
              {page === 'home' ? 'Home' : page === 'about' ? 'About Us' : page.toUpperCase()}
            </a>
          ))}
          <motion.button 
            className="btn btn-primary btn-glow" 
            onClick={() => navigateTo('contact')} 
            style={{ padding: '16px 40px', fontSize: '15px', fontWeight: 700, background: 'linear-gradient(135deg, #2563EB 0%, #3B72F7 100%)', width: '100%' }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      )}
    </nav>
  );

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=90",
      alt: "Students collaborating in AI classroom",
      tag: "🚀 AI Education Revolution",
      heading: "Bringing the Future",
      headingAccent: "Into Your Hands",
      sub: "Artificial Intelligence Society India (AISI) is on a mission to democratize AI literacy for every K-12 student in India."
    },
    {
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=90",
      alt: "Interactive AI workshop session",
      tag: "🧠 Hands-On Learning",
      heading: "Real Workshops,",
      headingAccent: "Real Impact",
      sub: "Over 1,500 workshops conducted across Andhra Pradesh — students don't just learn AI, they build it."
    },
    {
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1920&q=90",
      alt: "Robotics and AI innovation",
      tag: "🤖 Innovation Lab",
      heading: "Build Robots,",
      headingAccent: "Shape Tomorrow",
      sub: "From robotics to neural networks — our students create cutting-edge AI projects that solve real problems."
    },
    {
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=90",
      alt: "Technology and programming education",
      tag: "💻 Code & Create",
      heading: "Learn Python,",
      headingAccent: "Master AI",
      sub: "Structured coding programs from Class 6 to 9 — turning curious students into confident AI developers."
    },
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=90",
      alt: "Students engaged in group learning",
      tag: "🏆 25,000+ Certified",
      heading: "Join India's Largest",
      headingAccent: "AI Community",
      sub: "25,000+ students certified. 30+ partners. 12+ programs. Be part of the movement changing education forever."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlayProgress, setAutoPlayProgress] = useState(0);

  useEffect(() => {
    if (currentPage !== 'home') return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
      setAutoPlayProgress(0);
    }, 5000); // Auto slide every 5 seconds
    
    const progressInterval = setInterval(() => {
      setAutoPlayProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 100);
    
    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [currentPage, heroSlides.length]);

  // Keyboard Navigation (Accessibility)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (currentPage !== 'home') return;
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage]);

  const nextSlide = () => setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setContactForm({ name: '', email: '', school: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  const renderHome = () => (
    <>
      <header className="hero-banner">
        {/* Glowing Progress Bar */}
        <div className="hero-progress" style={{ width: `${autoPlayProgress}%` }} />

        {/* Floating Particles */}
        <div className="hero-particles">
          {[...Array(8)].map((_, i) => <div key={i} className="hero-particle" />)}
        </div>

        {/* Cinematic Ken Burns Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide${currentSlide === index ? ' active' : ''}`}
            style={{ opacity: currentSlide === index ? 1 : 0 }}
            aria-hidden={currentSlide !== index}
          >
            <div
              className="hero-slide-bg"
              style={{ backgroundImage: `url(${slide.image})` }}
              role="img"
              aria-label={slide.alt}
            />
            <div className="hero-slide-overlay" />
          </div>
        ))}

        {/* Premium Arrow: Previous */}
        <button
          className="hero-arrow hero-arrow--prev"
          onClick={prevSlide}
          onKeyDown={(e) => { if (e.key === 'Enter') prevSlide(); }}
          aria-label="Previous slide"
          tabIndex={0}
        >
          <ChevronLeft />
        </button>

        {/* Premium Arrow: Next */}
        <button
          className="hero-arrow hero-arrow--next"
          onClick={nextSlide}
          onKeyDown={(e) => { if (e.key === 'Enter') nextSlide(); }}
          aria-label="Next slide"
          tabIndex={0}
        >
          <ChevronRight />
        </button>

        {/* Hero Content */}
        <div className="container" style={{ position: 'relative', zIndex: 5, width: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 40, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ maxWidth: '820px', color: 'white' }}
            >
              {/* Slide Tag Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.5 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '22px', background: 'rgba(255,255,255,0.07)', padding: '9px 20px', borderRadius: '50px', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.18)', boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
              >
                <span style={{ fontWeight: '700', fontSize: '13px', color: 'rgba(255,255,255,0.95)', letterSpacing: '0.5px' }}>{heroSlides[currentSlide].tag}</span>
              </motion.div>

              {/* Dynamic Heading per slide */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(36px, 5.5vw, 72px)', lineHeight: '1.08', fontWeight: 900, marginBottom: '20px', letterSpacing: '-0.03em', textShadow: '0 4px 32px rgba(0,0,0,0.5)', color: 'white' }}
              >
                {heroSlides[currentSlide].heading} <br />
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', background: 'linear-gradient(135deg, #60A5FA 0%, #06B6D4 50%, #818CF8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 800 }}>{heroSlides[currentSlide].headingAccent}</span>
              </motion.h1>

              {/* Dynamic Subtext per slide */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.6 }}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.88)', marginBottom: '40px', lineHeight: '1.75', maxWidth: '540px', fontWeight: 400, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
              >
                {heroSlides[currentSlide].sub}
              </motion.p>

              {/* Fixed Partner Badge below subtext */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '32px', background: 'rgba(0,0,0,0.3)', padding: '7px 18px', borderRadius: '50px', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E', flexShrink: 0 }} />
                <span style={{ color: '#93C5FD', fontWeight: '700', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1.5px' }}>Strategic Partner:</span>
                <a href="https://strinttechnologies.com/" target="_blank" rel="noreferrer" style={{ fontWeight: '800', fontSize: '11px', color: 'white', textDecoration: 'none', letterSpacing: '0.5px' }}>STRINT TECHNOLOGIES</a>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}
              >
                <motion.button
                  className="btn btn-primary btn-glow btn-pulse"
                  onClick={() => navigateTo('contact')}
                  whileHover={{ scale: 1.06, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  style={{ padding: 'clamp(13px, 2vw, 18px) clamp(32px, 4vw, 52px)', fontSize: 'clamp(14px, 1.5vw, 17px)', fontWeight: 800, background: 'linear-gradient(135deg, #2563EB 0%, #3B72F7 60%, #06B6D4 100%)', boxShadow: '0 8px 32px rgba(37,99,235,0.5)', border: 'none' }}
                >
                  Get Started Free <ArrowRight size={20} />
                </motion.button>
                <motion.button
                  onClick={() => navigateTo('programs')}
                  whileHover={{ scale: 1.06, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  style={{ padding: 'clamp(13px, 2vw, 18px) clamp(28px, 4vw, 44px)', fontSize: 'clamp(14px, 1.5vw, 17px)', border: '2px solid rgba(255,255,255,0.35)', color: 'white', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', fontWeight: 700, borderRadius: '9999px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  View Curriculum
                </motion.button>
              </motion.div>

              {/* Dots + Counter Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '56px' }}
              >
                <div className="hero-dots">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      className={`hero-dot${currentSlide === idx ? ' active' : ''}`}
                      onClick={() => { setCurrentSlide(idx); setAutoPlayProgress(0); }}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <div className="hero-slide-counter">
                  <span className="current">{String(currentSlide + 1).padStart(2, '0')}</span>
                  <span style={{ margin: '0 4px', opacity: 0.4 }}>/</span>
                  <span>{String(heroSlides.length).padStart(2, '0')}</span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </header>

      {/* ===== RECOGNITIONS LOGO STRIP ON LANDING PAGE ===== */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(180deg, var(--bg-subtle) 0%, var(--bg-card) 100%)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Decorative background elements */}
        <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '4px', background: 'linear-gradient(90deg, var(--primary), #4f46e5, var(--primary))' }}></div>
        
        <div className="container">
          <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '12px', 
              background: 'linear-gradient(135deg, rgba(0,101,255,0.08), rgba(79,70,229,0.08))', 
              padding: '10px 24px', 
              borderRadius: '50px',
              border: '1px solid rgba(0,101,255,0.15)',
              marginBottom: '16px'
            }}>
              <ShieldCheck size={18} color="var(--primary)" />
              <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '3px' }}>TRUSTED & RECOGNIZED BY</span>
            </div>
            <h2 style={{ fontSize: '32px', color: 'var(--navy)', margin: '12px 0 0', fontWeight: '800' }}>Our Government Recognitions</h2>
          </motion.div>

          {/* Logo Cards Grid */}
          <motion.div
            {...fadeIn}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '24px',
              maxWidth: '1100px',
              margin: '0 auto'
            }}
            className="recognitions-grid"
          >
            {Object.keys(recognitionsData).map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ scale: 1.08, y: -10, boxShadow: '0 20px 40px rgba(0,101,255,0.15)' }}
                onClick={() => navigateTo('recognition-detail', key)}
                style={{
                  cursor: 'pointer',
                  padding: '28px 20px',
                  background: 'var(--bg-card)',
                  borderRadius: '24px',
                  border: '2px solid var(--border)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  minHeight: '160px',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Subtle gradient overlay on hover */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 60%, rgba(0,101,255,0.03) 100%)',
                  borderRadius: '22px',
                  pointerEvents: 'none'
                }}></div>

                <div style={{
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'white',
                  borderRadius: '50%',
                  border: '2px solid #f0f4ff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <img
                    src={recognitionsData[key].logo}
                    alt={recognitionsData[key].title}
                    loading="lazy"
                    style={{
                      height: '50px',
                      maxWidth: '60px',
                      objectFit: 'contain',
                      filter: theme === 'dark' ? 'brightness(1.3) contrast(1.1)' : 'none',
                      transition: 'filter 0.3s ease'
                    }}
                  />
                </div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '800',
                  color: 'var(--navy)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  textAlign: 'center',
                  lineHeight: '1.3',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {recognitionsData[key].title}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeIn} style={{ textAlign: 'center', marginTop: '40px' }}>
            <motion.button 
              className="btn btn-primary btn-glow" 
              style={{ padding: '14px 40px', fontSize: '15px', fontWeight: 700, background: 'linear-gradient(135deg, #2563EB 0%, #3B72F7 100%)' }} 
              onClick={() => navigateTo('recognitions')}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              View All Recognitions <ArrowRight size={18} style={{ marginLeft: '10px' }} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section className="container section">
        <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px' }}>
          <span className="eyebrow">OUR VISION</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(30px, 4vw, 50px)', margin: '16px 0', fontWeight: 900 }}>Standardizing AI Excellence</h2>
          <p style={{ fontSize: '18px', color: 'var(--text-dim)', lineHeight: '1.75', maxWidth: '660px', margin: '0 auto' }}>
            We have a bold vision to integrate AI education into the national curriculum, creating a generation of problem solvers and innovators.
          </p>
          <div style={{ marginTop: '28px', display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ height: '3px', width: '48px', background: 'linear-gradient(90deg, var(--primary), var(--accent))', borderRadius: '2px' }}></div>
            <div style={{ height: '3px', width: '16px', background: 'var(--border)', borderRadius: '2px' }}></div>
          </div>
        </motion.div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {[
            { 
              id: 'vision-democratization',
              icon: <Users size={20} />, 
              title: "AI Democratization", 
              desc: "Accessible AI literacy for every student across India, bridging the digital divide.",
              color: 'var(--primary)',
              img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=200&h=200&q=80"
            },
            { 
              id: 'vision-mastery',
              icon: <Brain size={20} />, 
              title: "Practical Mastery", 
              desc: "Moving beyond theory to real-world AI implementation and computational thinking.",
              color: '#4f46e5',
              img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=200&h=200&q=80"
            },
            { 
              id: 'vision-leadership',
              icon: <Rocket size={20} />, 
              title: "Future Leadership", 
              desc: "Empowering the next generation to innovate, lead, and shape the global AI landscape.",
              color: 'var(--navy)',
              img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&h=200&q=80"
            }
          ].map((v, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              onClick={() => navigateTo(v.id)}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'var(--bg-card)',
                padding: '30px',
                borderRadius: '24px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <img src={v.img} alt={v.title} loading="lazy" className="photo-enhanced" style={{ width: '80px', height: '80px', borderRadius: '16px', objectFit: 'cover', border: '3px solid #f0f4ff' }} />
                <div style={{ 
                  width: '40px',
                  height: '40px',
                  background: v.color, 
                  color: 'white',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 8px 16px ${v.color}33`
                }}>{v.icon}</div>
              </div>
              
              <div>
                <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--navy)', fontWeight: '800' }}>{v.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: '1.6', margin: 0 }}>{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container section">
        <motion.div className="section-header" {...fadeIn}>
          <span className="eyebrow">OUR PROGRAMS</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, marginTop: '12px' }}>A Curriculum for Tomorrow</h2>
          <p>Join the ranks of thousands of students mastering Artificial Intelligence through our structured, practical roadmap.</p>
        </motion.div>
        <div className="program-grid">
          {programs.map((p, i) => (
            <motion.article
              key={p.id}
              className="program-card"
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -6, boxShadow: '0 20px 40px rgba(37,99,235,0.12)' }}
            >
              {p.popular && <span className="popular-badge">MOST POPULAR</span>}
              <div className="card-icon-box">
              {p.id === 6 ? <Lightbulb /> : p.id === 7 ? <Brain /> : p.id === 8 ? <Zap /> : <Rocket />}
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: 'var(--accent-yellow)', fontWeight: '800' }}>★ {p.rating}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-dim)', marginLeft: '8px' }}>({p.students})</span>
                </div>
                <motion.button 
                  className="btn btn-outline" 
                  style={{ padding: '10px 24px', fontSize: '13px', fontWeight: 700 }} 
                  onClick={() => navigateTo('syllabus', p.id)}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="container section" style={{ background: 'var(--bg-subtle)', borderRadius: '40px', padding: '100px 60px' }}>
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <motion.div
            className="certificate-preview"
            {...fadeIn}
            style={{
              background: '#fff',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 25px 60px rgba(0, 101, 255, 0.15)',
              border: '1px solid #e0e0e0',
              position: 'relative',
              aspectRatio: '1.414/1'
            }}
          >
            {/* Outer Border */}
            <div style={{ border: '12px solid var(--navy)', padding: '4px', height: '100%', position: 'relative' }}>
              {/* Inner Border */}
              <div style={{ border: '2px solid #d4af37', padding: '30px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'radial-gradient(circle, #ffffff 0%, #fdfbf7 100%)', position: 'relative', overflow: 'hidden' }}>
                
                {/* Background Watermark/Pattern */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.03, fontSize: '200px', pointerEvents: 'none' }}>
                  <Award />
                </div>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '24px', alignItems: 'flex-start' }}>
                  <img src={logo} alt="AISI" style={{ height: '35px' }} />
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', fontWeight: '900', color: 'var(--navy)', letterSpacing: '1px' }}>STRINT TECHNOLOGIES</div>
                    <div style={{ fontSize: '8px', color: '#666', marginTop: '2px' }}>Strategic Technology Partner</div>
                  </div>
                </div>

                {/* Title */}
                <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '28px', color: 'var(--navy)', marginBottom: '8px', fontWeight: '800', letterSpacing: '1px' }}>Certificate of Excellence</h3>
                <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#777' }}>This proudly certifies that</p>

                {/* Student Name */}
                <div style={{ margin: '24px 0', width: '80%', position: 'relative' }}>
                  <h2 style={{ fontFamily: '"Great Vibes", "Brush Script MT", cursive', fontSize: '42px', color: 'var(--primary)', margin: 0, fontWeight: 'normal' }}>Lingala Sampath Kumar</h2>
                  <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #d4af37, transparent)', marginTop: '8px' }}></div>
                </div>

                {/* Body Text */}
                <p style={{ fontSize: '11px', color: '#444', maxWidth: '340px', lineHeight: '1.8' }}>
                  has successfully completed the <strong style={{ color: 'var(--navy)' }}>AI System Innovator</strong> program with distinction, demonstrating advanced proficiency in Neural Networks, Machine Learning, and Python AI.
                </p>

                {/* Footer Signatures */}
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end', position: 'relative', zIndex: 2 }}>
                  
                  {/* Left Signature */}
                  <div style={{ textAlign: 'center', width: '120px' }}>
                    <div style={{ fontFamily: '"Autography", cursive', fontSize: '20px', color: '#111', marginBottom: '4px' }}>Tarun K.</div>
                    <div style={{ borderTop: '1px solid #777', paddingTop: '4px' }}>
                      <p style={{ fontSize: '8px', fontWeight: '800', color: 'var(--navy)', margin: 0 }}>DIRECTOR, STRINT</p>
                    </div>
                  </div>

                  {/* Gold Seal */}
                  <div style={{ position: 'relative', width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #f3ca58, #c69320)', border: '2px dashed #ffe699', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                    <div style={{ position: 'absolute', width: '60px', height: '60px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.5)' }}></div>
                    <Award size={32} color="#fff" />
                    {/* Ribbon effect */}
                    <div style={{ position: 'absolute', bottom: '-15px', left: '10px', width: '15px', height: '25px', background: '#c69320', zIndex: -1, transform: 'skewY(20deg)' }}></div>
                    <div style={{ position: 'absolute', bottom: '-15px', right: '10px', width: '15px', height: '25px', background: '#b08018', zIndex: -1, transform: 'skewY(-20deg)' }}></div>
                  </div>

                  {/* Right Signature */}
                  <div style={{ textAlign: 'center', width: '120px' }}>
                    <div style={{ fontFamily: '"Autography", cursive', fontSize: '20px', color: '#111', marginBottom: '4px' }}>L. Sampath</div>
                    <div style={{ borderTop: '1px solid #777', paddingTop: '4px' }}>
                      <p style={{ fontSize: '8px', fontWeight: '800', color: 'var(--navy)', margin: 0 }}>FOUNDER, AISI</p>
                    </div>
                  </div>

                </div>
                
                {/* Meta info */}
                <div style={{ position: 'absolute', bottom: '15px', left: '20px', fontSize: '7px', color: '#999', textAlign: 'left' }}>
                  ID: AISI-2026-9482<br/>
                  DATE: {new Date().toLocaleDateString('en-GB')}
                </div>

              </div>
            </div>
          </motion.div>
          <motion.div {...fadeIn}>
            <span className="eyebrow">CERTIFICATION</span>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(26px, 3.5vw, 46px)', margin: '16px 0', fontWeight: 900 }}>Join 25,000+ Certified Innovators</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '18px', marginBottom: '32px', lineHeight: '1.75' }}>
              Our certification is co-branded with <strong>Strint Technologies</strong>, ensuring your skills are recognized by the industry leaders.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <ShieldCheck size={24} color="var(--primary)" /> <strong style={{ fontSize: '15px' }}>Strint Verified</strong>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Award size={24} color="var(--primary)" /> <strong style={{ fontSize: '15px' }}>AISI Accredited</strong>
              </div>
            </div>
            <motion.button 
              className="btn btn-primary btn-glow"
              style={{ padding: '14px 40px', fontSize: '15px', fontWeight: 700, background: 'linear-gradient(135deg, #2563EB 0%, #3B72F7 100%)' }}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              Download Sample <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section className="container section">
        <motion.div className="section-header" {...fadeIn}>
          <span className="eyebrow">TESTIMONIALS</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 900 }}>Words from our Community</h2>
        </motion.div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="program-card"
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}
            >
              {/* Decorative top border for image testimonials */}
              {t.img && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: i === 0 ? 'linear-gradient(90deg, #2563EB, #06B6D4)' : 'linear-gradient(90deg, #7C3AED, #06B6D4)' }}></div>}
              <div style={{ color: 'var(--primary)', marginBottom: '24px' }}><MessageCircle size={32} /></div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-main)', marginBottom: '24px', fontSize: '16px', lineHeight: '1.6' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {t.img ? (
                  <img 
                    src={t.img} 
                    alt={t.name}
                    loading="lazy"
                    style={{ 
                      width: '52px', 
                      height: '52px', 
                      borderRadius: '50%', 
                      objectFit: 'cover', 
                      border: '3px solid var(--primary)',
                      boxShadow: '0 4px 12px rgba(0,101,255,0.2)'
                    }} 
                  />
                ) : (
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), #06B6D4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 800,
                    fontSize: '18px',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <div>
                  <h4 style={{ fontWeight: '800', margin: 0 }}>{t.name}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: '2px 0 0' }}>{t.role} • {t.school}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certificate Verification Section */}
      <section style={{ background: 'var(--navy)', padding: '100px 0', color: 'white', marginBottom: '80px', borderRadius: '0 0 60px 60px' }}>
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
            <motion.div {...fadeIn}>
              <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '14px', letterSpacing: '2px' }}>VERIFICATION</span>
              <h2 style={{ fontSize: '42px', margin: '20px 0', color: 'white' }}>Verify Student Excellence</h2>
              <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: '1.8' }}>
                Every AISI graduate receives a unique digital certificate. Institutions and parents can verify the authenticity of these credentials instantly using our secure verification portal.
              </p>
              <div style={{ marginTop: '32px', display: 'flex', gap: '20px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><ShieldCheck color="var(--primary)" /> 100% Secure</div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><ClipboardCheck color="var(--primary)" /> Instant Validation</div>
              </div>
            </motion.div>
            
            <motion.div {...fadeIn} style={{ background: 'var(--glass-bg)', padding: '40px', borderRadius: '32px', border: '1px solid var(--glass-border)', backdropFilter: 'blur(10px)' }}>
              <h3 style={{ marginBottom: '12px' }}>Verify Certificate</h3>
              <p style={{ fontSize: '14px', opacity: 0.75, marginBottom: '28px', lineHeight: '1.6' }}>
                Click below to open our secure certificate verification portal. Enter your Certificate ID to instantly verify authenticity.
              </p>
              <motion.a
                href="https://certificate-verify.strinttechnologies.com/"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '18px',
                  fontSize: '16px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #2563EB 0%, #3B72F7 100%)',
                  color: 'white',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 32px rgba(37,99,235,0.4)',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.3px',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{ scale: 1.03, y: -2, boxShadow: '0 12px 40px rgba(37,99,235,0.55)' }}
                whileTap={{ scale: 0.98 }}
              >
                <ShieldCheck size={20} />
                Open Verification Portal
                <ArrowRight size={18} />
              </motion.a>
              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', opacity: 0.6, fontSize: '12px' }}>
                <ShieldCheck size={14} />
                <span>Secured by Strint Technologies • certificate-verify.strinttechnologies.com</span>
              </div>
              <p style={{ marginTop: '16px', fontSize: '13px', opacity: 0.55, textAlign: 'center' }}>
                Lost your certificate? <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }} onClick={() => navigateTo('contact')}>Contact Support</a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workshop Preview Section */}
      <section className="container section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
           <motion.div {...fadeIn}>
              <img src={ws1} alt="Workshops" style={{ borderRadius: '40px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }} />
           </motion.div>
           <motion.div {...fadeIn}>
              <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '14px' }}>WORKSHOPS</span>
              <h2 style={{ fontSize: '36px', margin: '16px 0' }}>Real-World Impact in Guntur Schools</h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
                We've partnered with over 50 schools across Andhra Pradesh to deliver intensive AI workshops. Our students don't just learn—they create.
              </p>
              <motion.button 
                className="btn btn-outline"
                style={{ padding: '12px 32px', fontSize: '15px', fontWeight: 700 }}
                onClick={() => navigateTo('workshops')}
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                Explore Our Impact <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </motion.button>
           </motion.div>
        </div>
      </section>

      <section className="container section">
        <motion.div className="newsletter-banner" {...fadeIn}>
          <div className="newsletter-content" style={{ flex: 1.5 }}>
            <h3 style={{ fontSize: '36px', marginBottom: '16px' }}>Stay Ahead in the AI Revolution</h3>
            <p style={{ opacity: 0.9, fontSize: '18px' }}>Join our newsletter to receive the latest updates on bootcamps, workshops, and AI news.</p>
          </div>
          <div style={{ flex: 1, display: 'flex', gap: '12px', background: 'var(--bg-card)', padding: '8px', borderRadius: '50px' }}>
            <input type="email" placeholder="Your school email" style={{ flex: 1, border: 'none', padding: '12px 24px', outline: 'none', borderRadius: '50px' }} />
            <motion.button 
              className="btn btn-primary btn-glow"
              style={{ padding: '12px 36px', fontSize: '15px', fontWeight: 700, background: 'linear-gradient(135deg, #2563EB 0%, #3B72F7 100%)', whiteSpace: 'nowrap' }}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              Subscribe Now
            </motion.button>
          </div>
        </motion.div>
      </section>
    </>
  );

  const renderProgramsView = () => (
    <div className="container section">
      <div className="section-header">
        <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '14px' }}>OUR METHODOLOGY</span>
        <h1>How We Transform Students</h1>
        <p>A proven 5-step journey from basics to professional AI implementation.</p>
      </div>

      <div className="process-flow" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '100px' }}>
        {[
          { title: "Class Session", icon: <BookOpen />, desc: "Expert-led conceptual sessions.", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80" },
          { title: "Intensive Training", icon: <Brain />, desc: "Training to understand algorithms.", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80&fm=webp" },
          { title: "Practical Lab", icon: <Monitor />, desc: "Hands-on AI implementation experience.", img: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=400&q=80&fm=webp" },
          { title: "Skill Test", icon: <ClipboardCheck />, desc: "Skill-based assessment.", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80&fm=webp" },
          { title: "Certification", icon: <Award />, desc: "Official AISI credentials.", img: "https://images.unsplash.com/photo-1590402494610-2c378a9114c6?auto=format&fit=crop&w=400&q=80" }
        ].map((step, i) => (
          <motion.div key={i} className="program-card" style={{ padding: '0', overflow: 'hidden' }} {...fadeIn} transition={{ delay: i * 0.1 }}>
            <img src={step.img} alt={step.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
            <div style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>{step.icon}</div>
              <h4 style={{ fontWeight: '800', marginBottom: '8px' }}>{step.title}</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3D Bookshelf Display */}
      <div className="bookshelf-section">
        <motion.div className="bookshelf-header" {...fadeIn}>
          <span className="eyebrow">📚 OUR CURRICULUM BOOKS</span>
          <h2>Pick Your Level, Open Your Book</h2>
          <p>Each book is a complete AI learning journey. Click to open and explore the full syllabus inside.</p>
        </motion.div>

        <div className="bookshelf">
          {[
            { grade: 6, title: 'AI Foundations', classLabel: 'Class 6', level: 'Beginner', cover: bookCover1, spineColor: '#047857', spineColorLight: '#059669' },
            { grade: 7, title: 'AI Explorer', classLabel: 'Class 7', level: 'Intermediate', cover: bookCover2, spineColor: '#1D4ED8', spineColorLight: '#2563EB' },
            { grade: 8, title: 'AI Master', classLabel: 'Class 8', level: 'Advanced', cover: bookCover3, spineColor: '#6D28D9', spineColorLight: '#7C3AED' },
            { grade: 9, title: 'AI Innovator', classLabel: 'Class 9', level: 'Expert', cover: bookCover4, spineColor: '#B91C1C', spineColorLight: '#DC2626' }
          ].map((book, i) => (
            <motion.div
              key={book.grade}
              className="book-3d-wrapper"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => { setBookPageIndex(0); setPageTurning(null); navigateTo('syllabus', book.grade); }}
            >
              <div className="book-3d">
                {/* Front Cover — Real Book Image */}
                <div className="book-cover-front book-cover-image">
                  <img src={book.cover} alt={book.title} className="book-cover-img" draggable="false" />
                </div>
                {/* Spine */}
                <div className="book-spine" style={{ background: `linear-gradient(180deg, ${book.spineColor} 0%, ${book.spineColorLight} 50%, ${book.spineColor} 100%)` }}>
                  <span className="book-spine-text">{book.title}</span>
                </div>
                {/* Back */}
                <div className="book-back" style={{ background: book.spineColor }}></div>
                {/* Page edges */}
                <div className="book-pages-edge"></div>
                {/* Top page edge */}
                <div className="book-pages-top"></div>
              </div>
              <div className="book-label">
                <span>📖 Open {book.title}</span>
              </div>
            </motion.div>
          ))}
          <div className="shelf-wood"></div>
        </div>
      </div>
    </div>
  );

  const renderSyllabusPage = (grade) => {
    const gradeColors = {
      6: { secondary: '#059669', accent: '#34D399', name: 'AI Foundations' },
      7: { secondary: '#2563EB', accent: '#60A5FA', name: 'AI Explorer' },
      8: { secondary: '#7C3AED', accent: '#A78BFA', name: 'AI Master' },
      9: { secondary: '#DC2626', accent: '#F87171', name: 'AI Innovator' }
    };

    const modules = syllabusData[grade]?.modules || [];
    // Build page spreads: each spread has a left page and a right page
    // Page 0: Cover page (left) + Table of Contents (right)
    // Pages 1+: Module theory (left) + Module practical/test (right)
    const totalPages = 1 + modules.length; // 1 cover spread + N module spreads
    const safePageIndex = Math.min(bookPageIndex, totalPages - 1);
    const colors = gradeColors[grade];

    const handlePageTurn = (direction) => {
      // Strictly block if already turning — no rapid clicking allowed
      if (pageTurning) return;
      if (direction === 'forward' && safePageIndex >= totalPages - 1) return;
      if (direction === 'backward' && safePageIndex <= 0) return;
      
      setPageTurning(direction);
      // Wait for the full page turn animation to complete before changing content
      setTimeout(() => {
        setBookPageIndex(prev => direction === 'forward' ? prev + 1 : prev - 1);
        // Add extra delay after content change before allowing next turn
        setTimeout(() => {
          setPageTurning(null);
        }, 300);
      }, 800);
    };

    // Render left page content based on pageIndex
    const renderLeftPage = (pageIdx) => {
      if (pageIdx === 0) {
        // Cover / intro page
        return (
          <div className="page-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: `0 8px 24px ${colors.secondary}44` }}>
              <BookOpen size={32} color="white" />
            </div>
            <span className="page-unit-label" style={{ color: colors.secondary }}>AISI Curriculum</span>
            <h2 className="page-unit-title" style={{ fontSize: 28, marginBottom: 12 }}>{syllabusData[grade].title}</h2>
            <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, maxWidth: 280 }}>{syllabusData[grade].level}</p>
            <div style={{ marginTop: 24, padding: '8px 20px', background: `${colors.secondary}11`, borderRadius: 20, border: `1px solid ${colors.secondary}33` }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: colors.secondary }}>{modules.length} Units · ~120 Hours</span>
            </div>
          </div>
        );
      }
      // Module theory page
      const m = modules[pageIdx - 1];
      if (!m) return null;
      return (
        <div className="page-content">
          <span className="page-unit-label" style={{ color: colors.secondary }}>Unit {m.unit}</span>
          <h3 className="page-unit-title">{m.title}</h3>
          <div className="page-section-title" style={{ color: colors.secondary }}>📖 Theory</div>
          <div className="page-section-body">{m.theory}</div>
        </div>
      );
    };

    // Render right page content based on pageIndex
    const renderRightPage = (pageIdx) => {
      if (pageIdx === 0) {
        // Table of contents
        return (
          <div className="page-content">
            <span className="page-unit-label" style={{ color: colors.secondary }}>Contents</span>
            <h3 className="page-unit-title" style={{ fontSize: 20 }}>Table of Contents</h3>
            {modules.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px dashed rgba(0,0,0,0.08)', cursor: 'pointer' }}
                onClick={(e) => { e.stopPropagation(); setBookPageIndex(i + 1); }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 28, height: 28, borderRadius: 8, background: `${colors.secondary}15`, color: colors.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>{m.unit}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e' }}>{m.title}</span>
                </div>
                <span style={{ fontSize: 12, color: '#999', fontStyle: 'italic' }}>p.{i + 2}</span>
              </div>
            ))}
          </div>
        );
      }
      // Module practical + test page
      const m = modules[pageIdx - 1];
      if (!m) return null;
      return (
        <div className="page-content">
          <div className="page-section-title" style={{ color: colors.secondary }}>🔬 Practical Lab</div>
          <div className="page-section-body">{m.practical}</div>
          <div style={{ marginTop: 12, padding: 16, background: `${colors.secondary}08`, borderRadius: 12, border: `1px solid ${colors.secondary}18` }}>
            <div className="page-section-title" style={{ color: colors.secondary, marginBottom: 6 }}>✅ Assessment</div>
            <p style={{ fontSize: 13, color: '#3a3a4a', margin: 0, fontWeight: 600 }}>{m.test}</p>
          </div>
        </div>
      );
    };

    return (
      <div className="book-reader-page">
        <div className="container">
          {/* Back button */}
          <motion.button
            className="book-back-btn"
            onClick={() => navigateTo('programs')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={18} /> Back to Bookshelf
          </motion.button>

          {/* Header */}
          <motion.div className="book-reader-header" {...fadeIn}>
            <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: colors.secondary }}>📖 {colors.name}</span>
            <h1>{syllabusData[grade].title}</h1>
            <p>{syllabusData[grade].level}</p>
          </motion.div>

          {/* Grade tabs */}
          <div className="book-grade-tabs">
            {[6, 7, 8, 9].map(g => (
              <motion.button
                key={g}
                className={`book-grade-tab ${grade === g ? 'active' : ''}`}
                style={grade === g ? { background: `linear-gradient(135deg, ${gradeColors[g].secondary}, ${gradeColors[g].accent})`, boxShadow: `0 8px 24px ${gradeColors[g].secondary}44` } : {}}
                onClick={() => { setBookPageIndex(0); setPageTurning(null); navigateTo('syllabus', g); }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                Class {g}
              </motion.button>
            ))}
          </div>

          {/* The Open Book */}
          <div className="open-book-container">
            {/* Left arrow */}
            <motion.button
              className="book-nav-arrow"
              onClick={() => handlePageTurn('backward')}
              disabled={safePageIndex === 0 || pageTurning}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            <motion.div
              className="open-book"
              key={grade}
              initial={{ opacity: 0, scale: 0.92, rotateX: 8 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Left Page */}
              <div className="book-page-left">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`left-${safePageIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: pageTurning ? 0.4 : 0 }}
                    style={{ height: '100%' }}
                  >
                    {renderLeftPage(safePageIndex)}
                  </motion.div>
                </AnimatePresence>
                <span className="page-number page-number-left">{safePageIndex * 2 + 1}</span>
              </div>

              {/* Center spine */}
              <div className="book-spine-center"></div>

              {/* Right Page */}
              <div className="book-page-right">
                <div className="page-corner"></div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`right-${safePageIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: pageTurning ? 0.4 : 0 }}
                  >
                    {renderRightPage(safePageIndex)}
                  </motion.div>
                </AnimatePresence>
                <span className="page-number page-number-right">{safePageIndex * 2 + 2}</span>
              </div>

              {/* Page turn animation overlay */}
              {pageTurning && (
                <div className={`page-turn-area ${pageTurning === 'forward' ? 'turning-forward' : 'turning-backward'}`}>
                  <div className="page-turn-front">
                    <div className="page-content" style={{ opacity: 0.3 }}>
                      {pageTurning === 'forward' ? renderRightPage(safePageIndex) : renderRightPage(safePageIndex - 1)}
                    </div>
                  </div>
                  <div className="page-turn-back">
                    <div className="page-content" style={{ opacity: 0.3 }}>
                      {pageTurning === 'forward' ? renderLeftPage(safePageIndex + 1) : renderLeftPage(safePageIndex)}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right arrow */}
            <motion.button
              className="book-nav-arrow"
              onClick={() => handlePageTurn('forward')}
              disabled={safePageIndex >= totalPages - 1 || pageTurning}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Page dots */}
          <div className="page-dots">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`page-dot ${safePageIndex === i ? 'active' : ''}`}
                onClick={() => { if (!pageTurning) setBookPageIndex(i); }}
                style={safePageIndex === i ? { background: colors.secondary } : {}}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <motion.button
              className="btn btn-primary btn-glow"
              onClick={() => navigateTo('contact')}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
              style={{ padding: '14px 40px', fontSize: '16px', fontWeight: '700', background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})` }}
            >
              Enroll Now <ArrowRight size={20} style={{ marginLeft: '8px' }} />
            </motion.button>
          </div>
        </div>
      </div>
    );
  };

  // ========== CURRICULUM DATA ==========
  const curriculumData = {
    6: {
      title: "AI Foundations – Class 6",
      subtitle: "🟢 AI Awareness + Logical Thinking",
      duration: "3 Workshop Days | 3 Core Sessions",
      color: "#059669",
      icon: <Lightbulb size={28} />,
      days: [
        {
          day: 1,
          module: "Unit 1: Introduction to AI",
          topics: ["What is Artificial Intelligence?", "AI vs Human vs Machine", "AI in daily life", "Simple examples of AI around us"],
          practical: "Explore AI tools in daily life and sort smart vs non-smart devices"
        },
        {
          day: 2,
          module: "Unit 2: Computers & Digital World",
          topics: ["Input – Process – Output", "Hardware vs Software", "Digital devices around us", "How computers follow instructions"],
          practical: "Identify devices, hardware, software and complete an input-process-output chart"
        },
        {
          day: 3,
          module: "Unit 3: Thinking Like a Computer",
          topics: ["Step-by-step thinking", "Instructions vs Commands", "Algorithms basics", "Introduction to data and patterns"],
          practical: "Write simple instructions and solve a sequencing activity"
        }
      ],
      outcomes: [
        "Understand what AI is and how it works",
        "Distinguish AI from human and machine intelligence",
        "Identify AI in daily life",
        "Understand the input-process-output model",
        "Know the difference between hardware and software",
        "Think step-by-step like a computer",
        "Write simple instructions and algorithms",
        "Understand what data is and why it matters"
      ],
      competencies: ["AI Awareness", "Digital Literacy", "Logical Thinking", "Algorithm Design", "Data Literacy", "Computational Thinking", "Problem Solving", "Communication"]
    },
    7: {
      title: "AI Explorer – Class 7",
      subtitle: "🟡 ML Basics + Data + Scratch Start",
      duration: "5 Workshop Days | 5 Sessions",
      color: "#7C3AED",
      icon: <Brain size={28} />,
      days: [
        {
          day: 1,
          module: "Unit 1: How AI Learns",
          topics: ["Machine Learning basics", "Learning from examples", "Prediction concept", "Examples from apps like YouTube and Netflix"],
          practical: "Try a simple prediction activity using examples"
        },
        {
          day: 2,
          module: "Unit 2: Data & Patterns",
          topics: ["Types of data", "Organizing data", "Pattern recognition", "Data in real life"],
          practical: "Organize and analyze a class survey dataset"
        },
        {
          day: 3,
          module: "Unit 3: Computational Thinking",
          topics: ["Decomposition", "Sequence", "Logic building", "Breaking big problems into smaller steps"],
          practical: "Solve a simple problem using step-by-step logic"
        },
        {
          day: 4,
          module: "Unit 4: Programming Basics (Scratch Start)",
          topics: ["What is coding?", "Block coding introduction", "Events like start and click", "Simple animations"],
          practical: "Create a first Scratch animation"
        },
        {
          day: 5,
          module: "Workshop Day: Mini Scratch Project",
          topics: ["Combine AI ideas with Scratch", "Design an interactive project", "Present your project idea"],
          practical: "Build and present a mini Scratch project"
        }
      ],
      outcomes: [
        "Understand Machine Learning basics",
        "Know what data is and its types",
        "Identify patterns in data",
        "Apply computational thinking skills",
        "Use decomposition to break problems",
        "Write simple block code in Scratch",
        "Create animations using events",
        "Build a small Scratch project"
      ],
      competencies: ["ML Awareness", "Data Literacy", "Pattern Recognition", "Computational Thinking", "Problem Decomposition", "Block Coding", "Scratch Programming", "Creative Thinking"]
    },
    8: {
      title: "AI Master – Class 8",
      subtitle: "🔵 Advanced Scratch + AI Concepts",
      duration: "7 Workshop Days | 7 Sessions",
      color: "#DC2626",
      icon: <Zap size={28} />,
      days: [
        {
          day: 1,
          module: "Unit 1: Machine Learning Deep Basics",
          topics: ["How models are trained", "Good data vs bad data", "Predictions in AI", "Real examples from apps"],
          practical: "Compare good and bad training examples"
        },
        {
          day: 2,
          module: "Unit 2: AI Applications",
          topics: ["AI for images", "AI for text", "Real-world AI examples", "How AI is used in everyday life"],
          practical: "Explore AI use cases in images and text"
        },
        {
          day: 3,
          module: "Unit 3: Programming (Scratch Advanced)",
          topics: ["Conditions (IF logic)", "Loops (repeat idea)", "Game development basics", "Interactive controls"],
          practical: "Create a simple Scratch game with conditions"
        },
        {
          day: 4,
          module: "Unit 4: AI Ethics & Safety",
          topics: ["Safe AI usage", "Privacy awareness", "Responsible AI", "Bias and fairness"],
          practical: "Discuss safe and responsible AI use"
        },
        {
          day: 5,
          module: "Workshop Day: Logic Game Build",
          topics: ["Design a game flow", "Use logic blocks", "Test your project", "Improve the experience"],
          practical: "Build and test a mini logic-based game"
        },
        {
          day: 6,
          module: "Workshop Day: AI Demo Project",
          topics: ["Plan an AI-powered idea", "Connect concepts to a real problem", "Prepare a short demo"],
          practical: "Create a demo concept for an AI project"
        },
        {
          day: 7,
          module: "Workshop Day: Final Showcase",
          topics: ["Present your work", "Explain your logic", "Share feedback", "Improve your project"],
          practical: "Present the final Scratch-based AI showcase"
        }
      ],
      outcomes: [
        "Understand how AI models are trained",
        "Differentiate good and bad data",
        "Explore AI applications in vision and language",
        "Use advanced Scratch logic with conditions and loops",
        "Apply responsible AI and privacy awareness",
        "Create an interactive project",
        "Present ideas confidently"
      ],
      competencies: ["AI Systems", "Logic Building", "Scratch Advanced", "Ethics Awareness", "Problem Solving", "Creativity", "Communication", "Project Design"]
    },
    9: {
      title: "AI Innovator – Class 9",
      subtitle: "🔴 Python + Real Projects + Career Awareness",
      duration: "9 Workshop Days | 9 Sessions",
      color: "#1E40AF",
      icon: <Cpu size={28} />,
      days: [
        {
          day: 1,
          module: "Unit 1: AI in Real World",
          topics: ["AI in healthcare", "AI in transport", "AI in education", "Future of AI"],
          practical: "Discuss real-world AI applications"
        },
        {
          day: 2,
          module: "Unit 2: Problem Solving with AI",
          topics: ["Finding real-world problems", "AI solution thinking", "Project planning", "Team brainstorming"],
          practical: "Identify one problem that can be solved using AI"
        },
        {
          day: 3,
          module: "Unit 3: Python Programming Basics",
          topics: ["What is Python?", "Variables", "Input / Output", "Simple programs"],
          practical: "Write a simple Python program"
        },
        {
          day: 4,
          module: "Workshop Day: Variables and Input",
          topics: ["User input", "Storing values", "Basic calculations", "Simple interactive programs"],
          practical: "Build a small input-output program"
        },
        {
          day: 5,
          module: "Workshop Day: Logic and Conditions",
          topics: ["If conditions", "Decision making", "Simple logic flow", "Debugging basics"],
          practical: "Create a small decision-based program"
        },
        {
          day: 6,
          module: "Workshop Day: Mini AI Project Planning",
          topics: ["Project idea selection", "Data needs", "Tools and workflow", "Team roles"],
          practical: "Plan a mini AI project"
        },
        {
          day: 7,
          module: "Workshop Day: Project Development",
          topics: ["Build your solution", "Test your idea", "Improve the workflow", "Fix errors"],
          practical: "Develop the first version of the project"
        },
        {
          day: 8,
          module: "Workshop Day: Team Project Review",
          topics: ["Presentation preparation", "Peer feedback", "Final improvements", "Project confidence"],
          practical: "Refine the project and prepare the demo"
        },
        {
          day: 9,
          module: "Workshop Day: Presentation & Showcase",
          topics: ["Presenting your project", "Explaining the AI idea", "Career awareness", "Next steps"],
          practical: "Present the final project to the class"
        }
      ],
      outcomes: [
        "Understand AI applications in the real world",
        "Identify real-world problems for AI solutions",
        "Write simple Python programs",
        "Use variables and input-output in Python",
        "Build a mini AI project with teamwork",
        "Present ideas and solutions confidently",
        "Develop awareness of future AI careers"
      ],
      competencies: ["Python Programming", "Real-World Problem Solving", "Project Planning", "Teamwork", "Presentation Skills", "AI Innovation", "Critical Thinking", "Career Awareness"]
    }
  };

  const communityTestimonials = [
    {
      quote: "A visionary initiative designed to prepare the next generation for an AI-powered future.",
      name: "Koya Subbarao",
      title: "Chairman, KKR and KSR Institute of Technology and Sciences",
      initials: "KS"
    },
    {
      quote: "Empowering young minds with future-ready AI skills to innovate, create, and lead in the digital world.",
      name: "Velluri Tarun Shetty",
      title: "CEO, Strint Technologies",
      initials: "VT"
    }
  ];

  const [openDays, setOpenDays] = useState({});
  const [activeCurriculumLevel, setActiveCurriculumLevel] = useState(6);
  const [activeBookPage, setActiveBookPage] = useState(0);

  useEffect(() => {
    setActiveBookPage(0);
  }, [activeCurriculumLevel]);

  const toggleDay = (level, day) => {
    const key = `${level}-${day}`;
    setOpenDays(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderCurriculumPage = () => {
    const data = curriculumData[activeCurriculumLevel];
    const bookPages = [
      {
        title: 'Class Overview',
        subtitle: 'Opening page',
        accent: 'Overview'
      },
      {
        title: 'Learning Journey',
        subtitle: 'Units and workshops',
        accent: 'Units'
      },
      {
        title: 'Skills & Outcomes',
        subtitle: 'What learners gain',
        accent: 'Outcomes'
      }
    ];
    const currentPage = bookPages[activeBookPage] || bookPages[0];
    const totalPages = bookPages.length;

    return (
      <div className="curriculum-page">
        {/* Hero - Revamped */}
        <section className="page-hero" style={{
          background: `linear-gradient(135deg, ${activeCurriculumLevel === 6 ? 'rgba(37, 99, 235, 0.7)' : 'rgba(124, 58, 237, 0.7)'} 0%, rgba(6, 182, 212, 0.6) 100%), url(https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '120px 0 60px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '75vh',
          display: 'flex',
          alignItems: 'center'
        }}>
          {/* Subtle dark overlay at bottom for text readability */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '60%', background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)', zIndex: 0 }}></div>
          <div className="hero-blob" style={{ background: 'rgba(255,255,255,0.08)', top: '-40%', left: '60%' }}></div>
          <div className="hero-blob" style={{ background: 'rgba(255,255,255,0.05)', top: '60%', left: '-10%' }}></div>
          
          <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="curriculum-hero-grid">
              {/* Left: Text Content */}
              <motion.div {...fadeIn} style={{ textAlign: 'left' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.18)', padding: '10px 22px', borderRadius: '50px', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', marginBottom: '24px' }}>
                  <BookOpen size={16} />
                  <span style={{ fontWeight: '700', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>AISI Curriculum</span>
                </div>
                <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, marginBottom: '20px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  K-12 AI Education <br />
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#60A5FA', fontWeight: 700 }}>Curriculum</span>
                </h1>
                <p style={{ 
                  fontSize: 'clamp(15px, 2vw, 18px)', 
                  maxWidth: '520px', 
                  lineHeight: '1.8',
                  color: 'rgba(255,255,255,0.95)',
                  background: 'rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(8px)',
                  padding: '16px 24px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  marginBottom: '32px'
                }}>
                  Structured, day-by-day AI learning programs designed for Classes 6–7, covering fundamentals to advanced applications.
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <motion.button
                    className="btn btn-primary"
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      const el = document.querySelector('.curriculum-level-btn');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    style={{ padding: '16px 36px', fontSize: '16px', fontWeight: 700 }}
                  >
                    Explore Curriculum <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                  </motion.button>
                  <motion.button
                    className="btn btn-outline"
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigateTo('contact')}
                    style={{ padding: '16px 32px', fontSize: '16px', borderColor: 'rgba(255,255,255,0.4)', color: 'white', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
                  >
                    Get in Touch
                  </motion.button>
                </div>
              </motion.div>

              {/* Right: Visual Feature Cards */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                {[
                  { icon: <Brain size={24} />, label: 'AI Fundamentals', desc: 'Core concepts & logic' },
                  { icon: <Monitor size={24} />, label: 'Hands-on Labs', desc: 'Interactive coding sessions' },
                  { icon: <Target size={24} />, label: 'Project-Based', desc: 'Real-world AI applications' },
                  { icon: <Award size={24} />, label: 'Certified Program', desc: 'Industry-recognized certificates' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.12 }}
                    whileHover={{ x: -8, scale: 1.02 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      background: 'rgba(255,255,255,0.12)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '20px',
                      padding: '22px 28px',
                      cursor: 'default',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, rgba(96,165,250,0.3), rgba(6,182,212,0.3))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#60A5FA',
                      flexShrink: 0
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: 'white' }}>{item.label}</h4>
                      <p style={{ fontSize: '14px', margin: '4px 0 0', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: '28px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              opacity: 0.85
            }}
            onClick={() => {
              const el = document.querySelector('.curriculum-level-btn');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>Scroll Down</span>
            <ChevronDown size={24} color="rgba(255,255,255,0.9)" />
          </motion.div>
        </section>

        <div className="container section" style={{ paddingTop: '60px' }}>

          {/* Section header */}
          <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '13px', letterSpacing: '2.5px', textTransform: 'uppercase' }}>📚 SELECT YOUR LEVEL</span>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, color: 'var(--navy)', margin: '14px 0 12px', letterSpacing: '-0.02em' }}>Pick Your Book &amp; Explore</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '16px', maxWidth: '560px', margin: '0 auto', lineHeight: '1.7' }}>Each book is a complete AI learning journey. Choose your class to open the curriculum.</p>
          </motion.div>

          {/* Book Cover Selector — visual bookshelf style */}
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.1 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '28px', marginBottom: '60px', flexWrap: 'wrap', perspective: '1200px' }}
          >
            {[
              { level: 6, cover: bookCover1, spine: '#047857', spineLight: '#059669', badge: '🟢 Beginner', title: 'AI Foundations', sub: 'Class 6' },
              { level: 7, cover: bookCover2, spine: '#1D4ED8', spineLight: '#2563EB', badge: '🟡 Intermediate', title: 'AI Explorer', sub: 'Class 7' },
              { level: 8, cover: bookCover3, spine: '#6D28D9', spineLight: '#7C3AED', badge: '🔵 Advanced', title: 'AI Master', sub: 'Class 8' },
              { level: 9, cover: bookCover4, spine: '#B91C1C', spineLight: '#DC2626', badge: '🔴 Expert', title: 'AI Innovator', sub: 'Class 9' }
            ].map((book, i) => (
              <motion.div
                key={book.level}
                className="curriculum-book-3d-wrapper"
                onClick={() => { setActiveCurriculumLevel(book.level); setActiveBookPage(0); }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -12, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                  position: 'relative'
                }}
              >
                {/* Active glow ring */}
                {activeCurriculumLevel === book.level && (
                  <motion.div
                    layoutId="active-book-ring"
                    style={{
                      position: 'absolute',
                      inset: '-8px',
                      borderRadius: '18px',
                      border: `3px solid ${book.spineLight}`,
                      boxShadow: `0 0 32px ${book.spineLight}55, 0 0 60px ${book.spineLight}22`,
                      zIndex: 0,
                      pointerEvents: 'none'
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}

                {/* 3D Book */}
                <div
                  className="book-3d"
                  style={{
                    width: '140px',
                    height: '195px',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transform: activeCurriculumLevel === book.level
                      ? 'rotateY(-20deg) rotateX(4deg)'
                      : 'rotateY(-8deg) rotateX(2deg)',
                    transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                    zIndex: 1
                  }}
                >
                  {/* Front Cover */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '4px 6px 6px 4px',
                    overflow: 'hidden',
                    boxShadow: activeCurriculumLevel === book.level
                      ? `0 20px 50px ${book.spineLight}66, 0 8px 24px rgba(0,0,0,0.25)`
                      : '0 10px 30px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.12)',
                    transition: 'box-shadow 0.4s ease'
                  }}>
                    <img
                      src={book.cover}
                      alt={book.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      draggable={false}
                    />
                  </div>
                  {/* Spine */}
                  <div style={{
                    position: 'absolute',
                    left: '-28px',
                    top: 0,
                    width: '28px',
                    height: '100%',
                    background: `linear-gradient(180deg, ${book.spine} 0%, ${book.spineLight} 50%, ${book.spine} 100%)`,
                    transform: 'rotateY(-90deg) translateZ(0px)',
                    transformOrigin: 'right center',
                    borderRadius: '4px 0 0 4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.2)'
                  }}>
                    <span style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      fontSize: '9px',
                      fontWeight: 800,
                      color: 'rgba(255,255,255,0.9)',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      fontFamily: 'Poppins, sans-serif'
                    }}>{book.title}</span>
                  </div>
                  {/* Pages edge */}
                  <div style={{
                    position: 'absolute',
                    right: '-10px',
                    top: '4px',
                    width: '10px',
                    height: 'calc(100% - 8px)',
                    background: 'linear-gradient(90deg, #e8e4d8, #f5f2e8 30%, #ece8d8 70%, #e2dece)',
                    borderRadius: '0 2px 2px 0'
                  }} />
                </div>

                {/* Label below book */}
                <div style={{ textAlign: 'center', zIndex: 1 }}>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: activeCurriculumLevel === book.level ? book.spineLight : 'var(--text-dim)',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                    transition: 'color 0.3s ease'
                  }}>{book.badge}</div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 800,
                    color: 'var(--navy)',
                    fontFamily: 'Poppins, sans-serif'
                  }}>{book.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px' }}>{book.sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Open Book Content Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCurriculumLevel}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: '220px 1fr',
                gap: '0',
                borderRadius: '28px',
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(15, 23, 42, 0.18), 0 8px 24px rgba(15, 23, 42, 0.1)',
                border: `2px solid ${data.color}30`,
                background: 'var(--bg-card)',
                minHeight: '480px'
              }}
              className="curriculum-open-book"
            >
              {/* Left: Book Cover Panel */}
              <div style={{
                background: `linear-gradient(160deg, ${data.color}22 0%, ${data.color}08 100%)`,
                borderRight: `1px solid ${data.color}20`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px 20px',
                gap: '20px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Subtle background lines */}
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0,0,0,0.035) 28px, rgba(0,0,0,0.035) 29px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '-40px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: `${data.color}12`, filter: 'blur(40px)', pointerEvents: 'none' }} />

                {/* Book cover image */}
                <motion.div
                  whileHover={{ rotateY: -15, scale: 1.04 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: 'relative',
                    width: '130px',
                    height: '180px',
                    borderRadius: '4px 8px 8px 4px',
                    overflow: 'hidden',
                    boxShadow: `0 16px 48px ${data.color}44, 0 4px 16px rgba(0,0,0,0.2)`,
                    flexShrink: 0,
                    zIndex: 1,
                    cursor: 'default',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <img
                    src={activeCurriculumLevel === 6 ? bookCover1 : activeCurriculumLevel === 7 ? bookCover2 : activeCurriculumLevel === 8 ? bookCover3 : bookCover4}
                    alt={data.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    draggable={false}
                  />
                </motion.div>

                {/* Title + details */}
                <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '999px', background: `${data.color}18`, border: `1px solid ${data.color}30`, marginBottom: '10px' }}>
                    <BookOpen size={13} color={data.color} />
                    <span style={{ fontSize: '11px', fontWeight: 800, color: data.color, letterSpacing: '1px', textTransform: 'uppercase' }}>AISI Book</span>
                  </div>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 6px', lineHeight: 1.3 }}>{data.title}</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '0 0 8px' }}>{data.subtitle}</p>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: data.color, background: `${data.color}12`, padding: '5px 10px', borderRadius: '8px', display: 'inline-block' }}>
                    {data.duration}
                  </div>
                </div>

                {/* Quick stats */}
                <div style={{ width: '100%', display: 'grid', gap: '8px', position: 'relative', zIndex: 1 }}>
                  {[
                    { label: 'Sessions', val: data.days.length },
                    { label: 'Outcomes', val: data.outcomes.length },
                    { label: 'Skills', val: data.competencies.length }
                  ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dim)' }}>{s.label}</span>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: data.color }}>{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Book Content Pages */}
              <div style={{
                background: 'linear-gradient(135deg, #fdfbf3 0%, #f8f4e8 40%, #f5f1e0 100%)',
                padding: '36px 40px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Page lines texture */}
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(176,166,140,0.07) 28px, rgba(176,166,140,0.07) 29px)', pointerEvents: 'none' }} />
                {/* Spine shadow */}
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '32px', background: 'linear-gradient(90deg, rgba(0,0,0,0.07) 0%, transparent 100%)', pointerEvents: 'none' }} />
                {/* Page corner fold */}
                <div style={{ position: 'absolute', top: 0, right: 0, width: '24px', height: '24px', background: 'linear-gradient(225deg, #ece8d8 50%, rgba(0,0,0,0.03) 50%)', pointerEvents: 'none' }} />

                {/* Page navigation header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', position: 'relative', zIndex: 1 }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: data.color, display: 'block', marginBottom: '4px' }}>{currentPage.accent}</span>
                    <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '22px', fontWeight: 800, color: '#1a1a2e', margin: 0 }}>{currentPage.title}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* Page indicator dots */}
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      {bookPages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveBookPage(idx)}
                          style={{
                            width: idx === activeBookPage ? '24px' : '8px',
                            height: '8px',
                            borderRadius: '4px',
                            border: 'none',
                            background: idx === activeBookPage ? data.color : 'rgba(0,0,0,0.15)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            padding: 0
                          }}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: data.color, background: `${data.color}12`, padding: '6px 10px', borderRadius: '999px' }}>
                      {activeBookPage + 1} / {totalPages}
                    </span>
                  </div>
                </div>

                {/* Page Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCurriculumLevel}-${activeBookPage}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    style={{ flex: 1, position: 'relative', zIndex: 1 }}
                  >
                    {activeBookPage === 0 && (
                      <div style={{ display: 'grid', gap: '14px' }}>
                        <div style={{ padding: '16px 18px', borderRadius: '16px', background: `${data.color}10`, border: `1px solid ${data.color}22` }}>
                          <p style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: data.color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>What this class covers</p>
                          <p style={{ margin: 0, fontSize: '14px', color: '#2a2a3e', lineHeight: '1.7', fontWeight: 500 }}>{data.subtitle}</p>
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '4px' }}>Key Outcomes</div>
                        <div style={{ display: 'grid', gap: '10px' }}>
                          {data.outcomes.slice(0, 4).map((outcome, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)', border: '1px solid rgba(0,0,0,0.06)' }}>
                              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: `${data.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                                <CheckCircle2 size={13} color={data.color} />
                              </div>
                              <span style={{ fontSize: '13px', fontWeight: 600, color: '#2a2a3e', lineHeight: '1.5' }}>{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeBookPage === 1 && (
                      <div style={{ display: 'grid', gap: '12px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '4px' }}>Learning Journey — {data.days.length} Sessions</div>
                        {data.days.map((day, idx) => (
                          <div key={idx} style={{
                            padding: '14px 16px',
                            borderRadius: '14px',
                            background: 'rgba(255,255,255,0.7)',
                            border: '1px solid rgba(0,0,0,0.06)',
                            backdropFilter: 'blur(4px)'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '6px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '26px', height: '26px', borderRadius: '8px', background: `${data.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  <span style={{ fontSize: '11px', fontWeight: 800, color: data.color }}>{day.day}</span>
                                </div>
                                <strong style={{ fontSize: '13px', color: '#1a1a2e', fontWeight: 800 }}>{day.module}</strong>
                              </div>
                            </div>
                            <p style={{ margin: '0 0 0 36px', fontSize: '12px', color: '#5a5a6a', lineHeight: '1.5', fontStyle: 'italic' }}>{day.practical}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeBookPage === 2 && (
                      <div style={{ display: 'grid', gap: '16px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>All Learning Outcomes</div>
                        <div style={{ display: 'grid', gap: '8px' }}>
                          {data.outcomes.map((outcome, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(0,0,0,0.05)' }}>
                              <span style={{ fontSize: '11px', fontWeight: 800, color: data.color, minWidth: '20px', textAlign: 'right' }}>{String(idx + 1).padStart(2, '0')}.</span>
                              <span style={{ fontSize: '13px', fontWeight: 600, color: '#2a2a3e' }}>{outcome}</span>
                            </div>
                          ))}
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '4px' }}>Skills Developed</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {data.competencies.map((comp, idx) => (
                            <span key={idx} style={{ padding: '8px 14px', borderRadius: '999px', background: `${data.color}14`, border: `1px solid ${data.color}25`, color: data.color, fontSize: '12px', fontWeight: 800 }}>
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Page Turn Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px', position: 'relative', zIndex: 1, paddingTop: '20px', borderTop: '1px dashed rgba(0,0,0,0.08)' }}>
                  <button
                    onClick={() => setActiveBookPage(prev => Math.max(prev - 1, 0))}
                    disabled={activeBookPage === 0}
                    style={{ border: 'none', background: activeBookPage === 0 ? 'rgba(0,0,0,0.05)' : `${data.color}14`, color: activeBookPage === 0 ? '#aaa' : data.color, padding: '10px 18px', borderRadius: '999px', cursor: activeBookPage === 0 ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '13px', transition: 'all 0.3s' }}
                  >
                    <ChevronLeft size={15} /> Previous
                  </button>
                  <span style={{ fontSize: '12px', color: '#aaa', fontStyle: 'italic' }}>Page {activeBookPage + 1} of {totalPages}</span>
                  <button
                    onClick={() => setActiveBookPage(prev => Math.min(prev + 1, totalPages - 1))}
                    disabled={activeBookPage === totalPages - 1}
                    style={{ border: 'none', background: activeBookPage === totalPages - 1 ? 'rgba(0,0,0,0.05)' : data.color, color: activeBookPage === totalPages - 1 ? '#aaa' : 'white', padding: '10px 18px', borderRadius: '999px', cursor: activeBookPage === totalPages - 1 ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '13px', transition: 'all 0.3s', boxShadow: activeBookPage === totalPages - 1 ? 'none' : `0 6px 20px ${data.color}44` }}
                  >
                    Next <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CTA + Back Button */}
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '48px', flexWrap: 'wrap' }}>
            <motion.button
              className="btn btn-primary btn-glow"
              onClick={() => { setBookPageIndex(0); setPageTurning(null); navigateTo('syllabus', activeCurriculumLevel); }}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{ padding: '14px 36px', fontSize: '15px', fontWeight: 700, background: `linear-gradient(135deg, ${data.color}, ${data.color}cc)` }}
            >
              📖 Open Full Book Reader <ArrowRight size={17} style={{ marginLeft: '8px' }} />
            </motion.button>
            <button className="btn btn-outline" onClick={() => navigateTo('home')} style={{ padding: '14px 28px' }}>
              <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Back to Home
            </button>
          </motion.div>
        </div>
      </div>
    );
  };

  const renderAboutUs = () => (
    <div className="about-page">
      {/* About Us Hero */}
      <section className="page-hero" style={{ 
        background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.7) 0%, rgba(37, 99, 235, 0.65) 100%), url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white', 
        padding: '120px 0', 
        textAlign: 'center', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div className="hero-blob" style={{ background: 'rgba(255,255,255,0.1)', top: '-50%', left: '20%' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
           <motion.h1 style={{ fontSize: '48px', marginBottom: '24px' }} {...fadeIn}>The Future of Education</motion.h1>
           <motion.p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }} {...fadeIn} transition={{ delay: 0.1 }}>
             Artificial Intelligence Society India (AISI) is dedicated to democratizing AI literacy, building a nation of problem solvers and innovators.
           </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
           <motion.div {...fadeIn}>
              <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '14px' }}>OUR MISSION</span>
              <h2 style={{ margin: '16px 0', fontSize: '36px' }}>Empowering Every Student</h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
                We believe that Artificial Intelligence is not just a subject, but a fundamental skill for the 21st century. Our mission is to integrate hands-on, practical AI education into every K-12 school in the country.
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                 <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', fontWeight: '600' }}><CheckCircle2 color="var(--primary)" size={20} /> Hands-on Curriculum</li>
                 <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', fontWeight: '600' }}><CheckCircle2 color="var(--primary)" size={20} /> Expert Mentorship</li>
                 <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', fontWeight: '600' }}><CheckCircle2 color="var(--primary)" size={20} /> National Certification</li>
              </ul>
           </motion.div>
           <motion.div className="hero-image" {...fadeIn} transition={{ delay: 0.2 }}>
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team Collaboration" style={{ borderRadius: '24px' }} />
           </motion.div>
        </div>
      </section>

      {/* Team Section (Moved Up) */}
      <section className="container section" style={{ background: 'var(--bg-subtle)', borderRadius: '40px', padding: '100px 60px', marginBottom: '80px' }}>
        <div className="section-header" style={{ marginBottom: '60px' }}>
          <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '14px' }}>LEADERSHIP</span>
          <h1>Meet the Visionaries</h1>
          <p>The minds behind the Artificial Intelligence Society India.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
          {Object.keys(teamData).map((key) => (
            <motion.div 
              key={key} 
              className="team-card" 
              style={{ textAlign: 'center', padding: '40px 30px', background: 'var(--bg-card)', borderRadius: '20px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center' }} 
              {...fadeIn}
            >
              <img src={teamData[key].img} alt={teamData[key].name} style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px', border: '5px solid var(--bg-subtle)', background: 'var(--bg-subtle)' }} />
              <h3 style={{ fontWeight: '800', marginBottom: '8px' }}>{teamData[key].name}</h3>
              <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '13px', marginBottom: '16px', letterSpacing: '0.5px' }}>{teamData[key].role}</p>
              <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: '1.6', marginBottom: '24px', flex: 1 }}>{teamData[key].bio}</p>
              <button 
                className="btn btn-outline" 
                style={{ width: '100%', fontSize: '13px', marginBottom: teamData[key].profileLink ? '10px' : '0' }}
                onClick={() => navigateTo('team-detail', key)}
              >
                Know About {teamData[key].gender === 'female' ? 'Her' : 'Him'}
              </button>
              {teamData[key].profileLink && (
                <a
                  href={teamData[key].profileLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    width: '100%',
                    padding: '11px 24px',
                    fontSize: '13px',
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, #2563EB 0%, #3B72F7 100%)',
                    color: 'white',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(37,99,235,0.3)',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.3s ease'
                  }}
                >
                  View Profile <ArrowRight size={14} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>



      {/* Workshop Gallery Section - Premium Redesign */}
      <section className="container section">
        <div className="section-header" style={{ marginBottom: '60px', textAlign: 'center' }}>
          <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '14px', letterSpacing: '2px' }}>OUR IMPACT</span>
          <h1 style={{ fontSize: '42px', marginTop: '10px' }}>Workshops in Action</h1>
          <p style={{ maxWidth: '700px', margin: '20px auto 0', color: 'var(--text-dim)' }}>
            Real-world training sessions and hands-on AI learning moments captured across schools in Andhra Pradesh.
          </p>
        </div>
        
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {[
            { img: ws1, title: "Classroom Engagement", desc: "Interactive AI theory sessions.", tag: "THEORY", details: "Students exploring Neural Network fundamentals through interactive storytelling." },
            { img: ws2, title: "Practical Lab Work", desc: "Hands-on model building.", tag: "LAB", details: "Applying theoretical knowledge to build real-world AI models using Python." },
            { img: ws3, title: "Innovation Showcase", desc: "Student AI presentations.", tag: "EXPO", details: "Celebrating student creativity as they present their final AI solutions." }
          ].map((ws, i) => (
            <motion.article
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'var(--bg-card)',
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Image Container with Overlay - Optimized for Vertical Images */}
              <div style={{ 
                height: '450px', 
                position: 'relative', 
                overflow: 'hidden',
                cursor: 'pointer'
              }}>
                <motion.img 
                  src={ws.img} 
                  alt={ws.title} 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }} 
                />
                
                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0, 15, 45, 0.9) 0%, rgba(0, 15, 45, 0.3) 50%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '30px',
                  color: 'white'
                }}>
                  <span style={{ 
                    background: 'var(--primary)', 
                    padding: '4px 12px', 
                    borderRadius: '50px', 
                    fontSize: '11px', 
                    fontWeight: '800', 
                    width: 'fit-content',
                    marginBottom: '12px'
                  }}>
                    {ws.tag}
                  </span>
                  <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>{ws.title}</h2>
                  <p style={{ fontSize: '14px', opacity: 0.9 }}>{ws.desc}</p>
                </div>
              </div>

              {/* Bottom Card Area */}
              <div style={{ padding: '24px', background: 'var(--bg-card)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ color: 'var(--text-dim)', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                  {ws.details}
                </p>
                <button className="btn btn-outline" style={{ width: '100%', padding: '10px' }}>View Details</button>
              </div>
            </motion.article>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '80px' }}>
          <button className="btn btn-outline" onClick={() => navigateTo('home')}>
            <ArrowLeft size={20} style={{ marginRight: '8px' }} /> Back to Home
          </button>
        </div>
      </section>
    </div>
  );

  const renderDemocratizationPage = () => (
    <div className="vision-page">
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.7) 0%, rgba(15,23,42,0.75) 100%), url(https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', padding: '120px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <motion.h1 style={{ fontSize: '48px', marginBottom: '24px' }} {...fadeIn}>AI Democratization</motion.h1>
          <motion.p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }} {...fadeIn}>
            Ensuring that every student, regardless of their location or background, has the opportunity to master the language of the future.
          </motion.p>
        </div>
      </section>

      <section className="container section">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <motion.div {...fadeIn}>
            <h2 style={{ fontSize: '36px', marginBottom: '24px' }}>Bridging the Digital Divide</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '18px', lineHeight: '1.8' }}>
              Our democratization initiative focuses on bringing high-end AI labs and expert mentorship to rural and underprivileged areas across India. We believe that talent is universal, but opportunity is not. AISI works with government and private partners to build the infrastructure needed for AI literacy.
            </p>
          </motion.div>
          <motion.div {...fadeIn}>
            <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80" alt="Rural Education" style={{ borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} />
          </motion.div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '80px' }}>
          <button className="btn btn-outline" onClick={() => navigateTo('home')}>
            <ArrowLeft size={20} style={{ marginRight: '8px' }} /> Back to Overview
          </button>
        </div>
      </section>
    </div>
  );

  const renderPracticalMasteryPage = () => (
    <div className="vision-page">
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.7) 0%, rgba(49,46,129,0.7) 100%), url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', padding: '120px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <motion.h1 style={{ fontSize: '48px', marginBottom: '24px' }} {...fadeIn}>Practical Mastery</motion.h1>
          <motion.p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }} {...fadeIn}>
            Moving beyond textbooks to real-world implementation. We teach students how to build, deploy, and scale AI models.
          </motion.p>
        </div>
      </section>

      <section className="container section">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <motion.div {...fadeIn}>
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" alt="Practical Lab" style={{ borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} />
          </motion.div>
          <motion.div {...fadeIn}>
            <h2 style={{ fontSize: '36px', marginBottom: '24px' }}>Hands-on Innovation</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '18px', lineHeight: '1.8' }}>
              At AISI, every concept is backed by a lab session. From writing their first line of Python to training deep neural networks, our students gain the confidence to solve real-world problems. We use professional-grade tools and industry-standard workflows to ensure our students are future-ready.
            </p>
          </motion.div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '80px' }}>
          <button className="btn btn-outline" onClick={() => navigateTo('home')}>
            <ArrowLeft size={20} style={{ marginRight: '8px' }} /> Back to Overview
          </button>
        </div>
      </section>
    </div>
  );

  const renderFutureLeadershipPage = () => (
    <div className="vision-page">
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.7) 0%, rgba(0,0,0,0.7) 100%), url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', padding: '120px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <motion.h1 style={{ fontSize: '48px', marginBottom: '24px' }} {...fadeIn}>Future Leadership</motion.h1>
          <motion.p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }} {...fadeIn}>
            Nurturing the innovators who will lead India's technological revolution and shape the global AI landscape.
          </motion.p>
        </div>
      </section>

      <section className="container section">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <motion.div {...fadeIn}>
            <h2 style={{ fontSize: '36px', marginBottom: '24px' }}>Shaping Tomorrow's Leaders</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '18px', lineHeight: '1.8' }}>
              Education is the foundation, but leadership is the catalyst. We mentor our students to think critically about the ethical and social impacts of AI. Our leadership programs include public speaking, project management, and entrepreneurship, empowering students to lead innovation at the national and global levels.
            </p>
          </motion.div>
          <motion.div {...fadeIn}>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Leadership" style={{ borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} />
          </motion.div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '80px' }}>
          <button className="btn btn-outline" onClick={() => navigateTo('home')}>
            <ArrowLeft size={20} style={{ marginRight: '8px' }} /> Back to Overview
          </button>
        </div>
      </section>
    </div>
  );

  const renderWorkshopsPage = () => (
    <div className="workshops-page">
      <section className="page-hero" style={{ 
        background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.7) 0%, rgba(37, 99, 235, 0.65) 100%), url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white', 
        padding: '120px 0', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="hero-blob" style={{ background: 'rgba(255,255,255,0.1)', top: '-50%', left: '20%' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.h1 style={{ fontSize: '48px', marginBottom: '24px' }} {...fadeIn}>Workshops & Impact</motion.h1>
          <motion.p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }} {...fadeIn}>
            Bringing cutting-edge AI education to schools across Guntur and Andhra Pradesh through immersive, hands-on learning experiences.
          </motion.p>
        </div>
      </section>

      <section className="container section">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '14px' }}>OUR IMPACT</span>
          <h2>Workshops in Action</h2>
          <p>Captured moments from our intensive AI bootcamps across the state.</p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
           {[
             { img: ws1, title: "Problem Solving", desc: "Critical thinking in action." },
             { img: ws2, title: "Tech Innovation", desc: "Building the future today." },
             { img: ws3, title: "Future Leaders", desc: "Empowering young minds." },
             { img: heroImage, title: "Classroom Engagement", desc: "Interactive AI sessions." }
           ].map((item, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: idx * 0.1 }}
               whileHover={{ y: -15 }}
               style={{ 
                 position: 'relative', 
                 height: '450px', 
                 borderRadius: '32px', 
                 overflow: 'hidden', 
                 boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                 border: '1px solid var(--border)',
                 cursor: 'pointer'
               }}
             >
               <motion.img 
                 src={item.img} 
                 alt={item.title} 
                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                 whileHover={{ scale: 1.15 }}
                 transition={{ duration: 0.8 }}
               />
               <div style={{ 
                 position: 'absolute', 
                 inset: 0, 
                 background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 70%)',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'flex-end',
                 padding: '40px',
                 opacity: 1
               }}>
                 <h4 style={{ color: 'white', fontSize: '24px', marginBottom: '8px', fontWeight: '900', letterSpacing: '0.5px' }}>
                   {item.title}
                 </h4>
                 <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', fontWeight: '500' }}>{item.desc}</p>
               </div>
             </motion.div>
           ))}
        </div>
      </section>

      <section className="container section" style={{ background: 'var(--bg-subtle)', borderRadius: '40px', padding: '100px 60px', marginBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <div style={{ padding: '40px', background: 'var(--bg-card)', borderRadius: '32px', boxShadow: 'var(--shadow)' }}>
             <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '14px' }}>GET STARTED</span>
             <h2 style={{ fontSize: '36px', margin: '16px 0' }}>Host a Workshop</h2>
             <p style={{ color: 'var(--text-dim)', marginBottom: '32px', lineHeight: '1.8' }}>
               Bring the AISI excellence to your school. Our workshops are designed to be intensive, practical, and highly engaging for students of all levels.
             </p>
             <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px' }}>
               <li style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}><CheckCircle2 color="var(--primary)" /> 2-Day Intensive Hands-on Training</li>
               <li style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}><CheckCircle2 color="var(--primary)" /> Expert Mentorship from Industry Pros</li>
               <li style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}><CheckCircle2 color="var(--primary)" /> Digital Certification for Participants</li>
             </ul>
             <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigateTo('contact')}>Book for Your School</button>
          </div>
          <motion.div {...fadeIn}>
             <img src={ws1} alt="Workshop" style={{ borderRadius: '32px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }} />
          </motion.div>
        </div>
      </section>
      
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <button className="btn btn-outline" onClick={() => navigateTo('home')}>
          <ArrowLeft size={20} style={{ marginRight: '8px' }} /> Back to Home
        </button>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="contact-page">
      <section className="page-hero" style={{ 
        background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.7) 0%, rgba(37, 99, 235, 0.65) 100%), url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1600&q=80)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white', 
        padding: '120px 0', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="hero-blob" style={{ background: 'rgba(255,255,255,0.1)', top: '-50%', left: '20%' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.h1 style={{ fontSize: '48px', marginBottom: '24px' }} {...fadeIn}>Get in Touch</motion.h1>
          <motion.p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }} {...fadeIn}>
            Have questions about our programs or want to host a workshop? We're here to help.
          </motion.p>
        </div>
      </section>

      <section className="container section">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '80px' }}>
          <motion.div {...fadeIn}>
            <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Contact Information</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: '12px', color: 'var(--primary)' }}><MapPin size={24} /></div>
                <div>
                  <h4 style={{ marginBottom: '4px' }}>Headquarters</h4>
                  <p style={{ color: 'var(--text-dim)' }}>Guntur, Andhra Pradesh, India</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: '12px', color: 'var(--primary)' }}><MessageCircle size={24} /></div>
                <div>
                  <h4 style={{ marginBottom: '4px' }}>Email Us</h4>
                  <p style={{ color: 'var(--text-dim)' }}>contact@aisi.org.in</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: '12px', color: 'var(--primary)' }}><GraduationCap size={24} /></div>
                <div>
                  <h4 style={{ marginBottom: '4px' }}>Academic Support</h4>
                  <p style={{ color: 'var(--text-dim)' }}>support@aisi.org.in</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeIn} style={{ background: 'var(--bg-card)', padding: '48px', borderRadius: '32px', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}>
            <h3 style={{ marginBottom: '32px' }}>Send a Message</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleContactSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="input-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700' }}>Name</label>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-subtle)', color: 'var(--text-main)' }} 
                  />
                </div>
                <div className="input-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700' }}>Email</label>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-subtle)', color: 'var(--text-main)' }} 
                  />
                </div>
              </div>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700' }}>School Name</label>
                <input 
                  type="text" 
                  placeholder="Your School" 
                  required
                  value={contactForm.school}
                  onChange={(e) => setContactForm({...contactForm, school: e.target.value})}
                  style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-subtle)', color: 'var(--text-main)' }} 
                />
              </div>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700' }}>Message</label>
                <textarea 
                  rows="4" 
                  placeholder="How can we help you?" 
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-subtle)', color: 'var(--text-main)', resize: 'none' }}
                ></textarea>
              </div>
              <button className="btn btn-primary" style={{ padding: '16px' }} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitStatus === 'success' && <p style={{ color: '#10b981', textAlign: 'center', fontWeight: '700' }}>✓ Message sent successfully!</p>}
              {submitStatus === 'error' && <p style={{ color: '#ef4444', textAlign: 'center', fontWeight: '700' }}>✕ Failed to send. Please try again.</p>}
            </form>
          </motion.div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '80px' }}>
          <button className="btn btn-outline" onClick={() => navigateTo('home')}>
            <ArrowLeft size={20} style={{ marginRight: '8px' }} /> Back to Home
          </button>
        </div>
      </section>
    </div>
  );

  // ===== RECOGNITIONS LISTING PAGE =====
  const renderRecognitionsPage = () => (
    <div className="recognitions-page">
      <section className="page-hero" style={{
        background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.7) 0%, rgba(37, 99, 235, 0.65) 50%, rgba(79, 70, 229, 0.65) 100%), url(https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '120px 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="hero-blob" style={{ background: 'rgba(255,255,255,0.08)', top: '-40%', left: '15%' }}></div>
        <div className="hero-blob" style={{ background: 'rgba(255,255,255,0.05)', top: '20%', right: '-10%' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div {...fadeIn}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '14px', fontWeight: '800', opacity: 0.8 }}>Our Credentials</span>
            <h1 style={{ fontSize: '52px', margin: '16px 0', lineHeight: '1.1' }}>Recognitions & Accreditations</h1>
            <p style={{ fontSize: '20px', maxWidth: '700px', margin: '0 auto', opacity: 0.9, lineHeight: '1.6' }}>
              AISI is recognized and aligned with India's most prestigious government bodies and national skill development frameworks.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
          {Object.keys(recognitionsData).map((key, i) => {
            const rec = recognitionsData[key];
            return (
              <motion.div
                key={key}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -12, boxShadow: '0 25px 50px rgba(0,0,0,0.12)' }}
                onClick={() => navigateTo('recognition-detail', key)}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '28px',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Card Image Header */}
                <div style={{
                  height: '180px',
                  background: `linear-gradient(135deg, rgba(30, 64, 175, 0.85) 0%, rgba(79, 70, 229, 0.85) 100%), url(${rec.bgImage}) center/cover no-repeat`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '90px',
                    height: '90px',
                    background: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    border: '4px solid rgba(255,255,255,0.3)'
                  }}>
                    <img
                      src={rec.logo}
                      alt={rec.title}
                      loading="lazy"
                      style={{ height: '50px', maxWidth: '65px', objectFit: 'contain' }}
                    />
                  </div>
                  <span style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    padding: '6px 14px',
                    borderRadius: '50px',
                    fontSize: '11px',
                    fontWeight: '800',
                    color: 'white',
                    letterSpacing: '0.5px'
                  }}>{rec.badge}</span>
                </div>

                {/* Card Body */}
                <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--navy)', marginBottom: '8px' }}>{rec.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '700', marginBottom: '16px', letterSpacing: '0.3px' }}>{rec.subtitle}</p>
                  <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: '1.7', marginBottom: '24px', flex: 1 }}>
                    {rec.description.substring(0, 150)}...
                  </p>

                  {/* Stats Row */}
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                    {Object.entries(rec.stats).map(([statKey, statVal]) => (
                      <div key={statKey} style={{
                        flex: 1,
                        padding: '12px',
                        background: 'var(--bg-subtle)',
                        borderRadius: '12px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--navy)' }}>{statVal}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-dim)', textTransform: 'capitalize', marginTop: '2px' }}>{statKey}</div>
                      </div>
                    ))}
                  </div>

                  <button className="btn btn-outline" style={{ width: '100%', fontSize: '13px', padding: '12px' }}>
                    Learn More <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '80px' }}>
          <button className="btn btn-outline" onClick={() => navigateTo('home')}>
            <ArrowLeft size={20} style={{ marginRight: '8px' }} /> Back to Home
          </button>
        </div>
      </section>
    </div>
  );

  // ===== INDIVIDUAL RECOGNITION DETAIL PAGE =====
  const renderRecognitionDetailPage = () => {
    const rec = recognitionsData[selectedRecognition];
    if (!rec) return null;

    return (
      <div className="recognition-detail-page">
        {/* Hero Section */}
        <section className="page-hero" style={{
          background: `linear-gradient(135deg, rgba(30, 64, 175, 0.7) 0%, rgba(79, 70, 229, 0.65) 100%), url(${rec.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '120px 0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="hero-blob" style={{ background: 'rgba(255,255,255,0.08)', top: '-50%', left: '20%' }}></div>
          <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                width: '120px',
                height: '120px',
                background: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '32px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                border: '6px solid rgba(255,255,255,0.2)'
              }}
            >
              <img src={rec.logo} alt={rec.title} style={{ height: '65px', maxWidth: '85px', objectFit: 'contain' }} />
            </motion.div>
            <motion.span {...fadeIn} style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '8px 20px', borderRadius: '50px', fontSize: '12px', fontWeight: '800', letterSpacing: '1px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>
              {rec.badge}
            </motion.span>
            <motion.h1 {...fadeIn} style={{ fontSize: '52px', marginBottom: '16px', lineHeight: '1.1' }}>{rec.title}</motion.h1>
            <motion.p {...fadeIn} style={{ fontSize: '18px', opacity: 0.9, maxWidth: '600px' }}>{rec.subtitle}</motion.p>
          </div>
        </section>

        {/* Description Section */}
        <section className="container section">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
            <motion.div {...fadeIn}>
              <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px' }}>OVERVIEW</span>
              <h2 style={{ fontSize: '36px', margin: '16px 0', color: 'var(--navy)' }}>About This Recognition</h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '18px', lineHeight: '1.8', marginBottom: '32px' }}>
                {rec.description}
              </p>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {Object.entries(rec.stats).map(([statKey, statVal]) => (
                  <div key={statKey} style={{
                    padding: '20px 28px',
                    background: 'var(--bg-subtle)',
                    borderRadius: '20px',
                    border: '1px solid var(--border)',
                    textAlign: 'center',
                    minWidth: '120px'
                  }}>
                    <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--primary)' }}>{statVal}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-dim)', textTransform: 'capitalize', marginTop: '4px', fontWeight: '600' }}>{statKey}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
              <img
                src={rec.bgImage}
                alt={rec.title}
                loading="lazy"
                style={{ borderRadius: '32px', boxShadow: '0 30px 60px rgba(0,0,0,0.12)', width: '100%', height: '400px', objectFit: 'cover' }}
              />
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section style={{ background: 'var(--bg-subtle)', padding: '100px 0', borderRadius: '60px 60px 0 0' }}>
          <div className="container">
            <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: '60px' }}>
              <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '14px', letterSpacing: '2px' }}>THE PROCESS</span>
              <h2 style={{ fontSize: '42px', margin: '16px 0', color: 'var(--navy)' }}>How It Works</h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              {rec.howItWorks.map((step, i) => (
                <motion.div
                  key={i}
                  {...fadeIn}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -8 }}
                  style={{
                    background: 'var(--bg-card)',
                    padding: '36px',
                    borderRadius: '24px',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    fontSize: '80px',
                    fontWeight: '900',
                    color: 'var(--primary)',
                    opacity: 0.06,
                    lineHeight: 1
                  }}>{step.step}</div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, var(--primary), #4f46e5)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '900',
                    fontSize: '18px',
                    marginBottom: '20px',
                    boxShadow: '0 8px 20px rgba(0,101,255,0.25)'
                  }}>{step.step}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--navy)', marginBottom: '12px' }}>{step.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: '1.7' }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="container section">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <motion.div {...fadeIn}>
              <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '14px', letterSpacing: '2px' }}>KEY BENEFITS</span>
              <h2 style={{ fontSize: '36px', margin: '16px 0', color: 'var(--navy)' }}>What This Means for Students</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px' }}>
                {rec.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    {...fadeIn}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '20px 24px',
                      background: 'var(--bg-subtle)',
                      borderRadius: '16px',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <CheckCircle2 size={22} color="var(--primary)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--navy)' }}>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} style={{
              background: 'var(--navy)',
              borderRadius: '32px',
              padding: '48px',
              color: 'white',
              textAlign: 'center'
            }}>
              <img src={rec.logo} alt={rec.title} style={{ height: '80px', objectFit: 'contain', marginBottom: '24px', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
              <h3 style={{ fontSize: '28px', marginBottom: '16px' }}>{rec.title}</h3>
              <p style={{ opacity: 0.8, lineHeight: '1.8', marginBottom: '32px' }}>
                This accreditation ensures that our students' skills are nationally recognized and industry-validated.
              </p>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigateTo('contact')}>
                Get Started <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </button>
            </motion.div>
          </div>

          {/* Other Recognitions */}
          <div style={{ marginTop: '100px' }}>
            <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '14px', letterSpacing: '2px' }}>EXPLORE MORE</span>
              <h2 style={{ fontSize: '32px', margin: '16px 0', color: 'var(--navy)' }}>Other Recognitions</h2>
            </motion.div>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {Object.keys(recognitionsData).filter(k => k !== selectedRecognition).map((key) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.06, y: -5 }}
                  onClick={() => navigateTo('recognition-detail', key)}
                  style={{
                    cursor: 'pointer',
                    padding: '24px 32px',
                    background: 'var(--bg-card)',
                    borderRadius: '20px',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <img src={recognitionsData[key].logo} alt={recognitionsData[key].title} style={{ height: '40px', objectFit: 'contain' }} />
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--navy)' }}>{recognitionsData[key].title}</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{recognitionsData[key].badge}</p>
                  </div>
                  <ArrowRight size={18} color="var(--primary)" />
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <button className="btn btn-outline" onClick={() => navigateTo('recognitions')}>
              <ArrowLeft size={20} style={{ marginRight: '8px' }} /> All Recognitions
            </button>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="app">
      {renderNav()}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {currentPage === 'home' && ( <>
            {renderHome()}
            {renderStats()}
          </> )}

          {currentPage === 'programs' && renderProgramsView()}
          {currentPage === 'curriculum' && renderCurriculumPage()}
          {currentPage === 'syllabus' && renderSyllabusPage(selectedGrade)}
          {currentPage === 'workshops' && renderWorkshopsPage()}
          {currentPage === 'about' && renderAboutUs()}
          {currentPage === 'contact' && renderContactPage()}
          {currentPage === 'recognitions' && renderRecognitionsPage()}
          {currentPage === 'recognition-detail' && renderRecognitionDetailPage()}
          {currentPage === 'team-detail' && renderTeamMemberDetail()}
          {currentPage === 'vision-democratization' && renderDemocratizationPage()}
          {currentPage === 'vision-mastery' && renderPracticalMasteryPage()}
          {currentPage === 'vision-leadership' && renderFutureLeadershipPage()}
        </motion.main>
      </AnimatePresence>

      <footer>
        <div className="container">
          <div className="footer-main">
            <div className="footer-col">
              <div className="logo" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src={logo} 
                  alt="AISI" 
                  style={{ 
                    height: '40px', 
                    filter: theme === 'dark' ? 'brightness(1.2) contrast(1.1)' : 'none',
                    transition: 'filter 0.3s ease'
                  }} 
                />
                <span className="logo-text">AISI</span>
              </div>
              <p style={{ color: 'var(--text-dim)', maxWidth: '400px', lineHeight: '1.8' }}>
                Artificial Intelligence Society India is a non-profit organization dedicated to bringing AI literacy to every school in India.
              </p>
              <div style={{ marginTop: '24px' }}>
                <p style={{ fontWeight: '800', fontSize: '13px', color: 'var(--navy)' }}>POWERED BY:</p>
                <a href="https://strinttechnologies.com/" target="_blank" rel="noreferrer" style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary)', textDecoration: 'none' }}>
                  STRINT TECHNOLOGIES
                </a>
              </div>
              <div className="social-links">
                <a href="#" className="social-icon"><Linkedin size={20} /></a>
                <a href="#" className="social-icon"><Youtube size={20} /></a>
                <a href="#" className="social-icon"><Twitter size={20} /></a>
                <a href="#" className="social-icon"><Instagram size={20} /></a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Organization</h4>
              <a href="#" onClick={() => navigateTo('about')}>About Us</a>
              <a href="#" onClick={() => navigateTo('about')}>Our Team</a>
              <a href="#" onClick={() => navigateTo('workshops')}>School Partners</a>
              <a href="#" onClick={() => navigateTo('workshops')}>Workshops</a>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <a href="#" onClick={() => navigateTo('programs')}>AI Curriculum</a>
              <a href="#" onClick={() => navigateTo('contact')}>Inquiry</a>
              <a href="#" onClick={() => navigateTo('contact')}>Support</a>
              <a href="#" onClick={() => navigateTo('home')}>Verification</a>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-dim)' }}>&copy; 2026 AISI. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '32px' }}>
              <a href="#" style={{ fontSize: '14px', color: 'var(--text-dim)', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ fontSize: '14px', color: 'var(--text-dim)', textDecoration: 'none' }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Data for team members
const teamData = {
  sampath: {
    name: "Lingala Sampath Kumar",
    role: "FOUNDER, AISI",
    gender: "male",
    img: sampathImg,
    bio: "Dedicated to democratizing AI education and bringing world-class curriculum to every student in India.",
    fullBio: "Coming Soon: Detailed biography and vision for AISI.",
    highlights: ["10+ Years in Tech", "AI Evangelist", "Education Reformer"]
  },
  tarun: {
    name: "Velluri Tarun Shetty",
    role: "CEO, STRINT TECHNOLOGIES | STRATEGIC PARTNER, AISI",
    gender: "male",
    img: tarunImg,
    profileLink: "https://tarunshetty.strinttechnologies.com",
    bio: "Leading the technology and infrastructure to make interactive AI learning accessible anywhere. As CEO of Strint Technologies, Tarun drives strategic innovation and industry partnerships.",
    fullBio: "Velluri Tarun Shetty is the CEO of Strint Technologies and a strategic partner of AISI, committed to empowering young minds with future-ready AI skills to innovate, create, and lead in the digital world.",
    highlights: ["CEO, Strint Technologies", "Tech Visionary", "Strategic Partner"]
  },
  avinash: {
    name: "Avinash",
    role: "AI MENTOR",
    gender: "male",
    img: avinashImg,
    bio: "Guiding students through hands-on practical sessions and complex algorithm implementations.",
    fullBio: "Coming Soon: Deep dive into AI mentorship and student success stories.",
    highlights: ["Algorithm Expert", "Student Mentor", "AI Researcher"]
  },
  chandana: {
    name: "Lingala Chandana",
    role: "ML TRAINER",
    gender: "female",
    img: chandanaImg,
    bio: "Empowering the next generation of innovators by simplifying complex Machine Learning concepts into practical, hands-on learning experiences.",
    fullBio: "Coming Soon: Journey in Machine Learning and training methodologies.",
    highlights: ["ML Specialist", "Curriculum Design", "Practical Trainer"]
  }
};

// Data for recognitions
const recognitionsData = {
  nip: {
    title: "National Internship Portal",
    subtitle: "Ministry of Education, Govt. of India Partnership",
    logo: nipLogo,
    badge: "Government Portal Alignment",
    bgImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
    description: "AISI is integrated with the National Internship Portal of India to offer verified AI internships to K-12 and collegiate students. This ensures that the practical projects completed by our students are officially recognized and contribute to their academic and career profiles.",
    howItWorks: [
      { step: "01", title: "Enroll in AISI Programs", desc: "Students complete advanced AI modules (Neural Builder, System Innovator) and build their practical lab portfolios." },
      { step: "02", title: "Portal Registration", desc: "Eligible students are registered on the National Internship Portal with their AISI verified credentials." },
      { step: "03", title: "Match with Industry", desc: "Students are matched with official internship listings from tech partners and organizations under government guidelines." },
      { step: "04", title: "Verified Certification", desc: "Upon successful completion, students receive a government-recognized internship certificate that boosts college admissions." }
    ],
    features: [
      "Direct link with Ministry of Education systems",
      "Verified digital portfolio submission",
      "Access to corporate AI internships",
      "Official credit weightage for academic profiles"
    ],
    stats: {
      interns: "5,200+ Placed",
      rating: "4.9/5",
      partners: "120+ Companies"
    }
  },
  nsdc: {
    title: "NSDC Accreditation",
    subtitle: "National Skill Development Corporation Alignment",
    logo: nsdcLogo,
    badge: "Skill India Alignment",
    bgImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    description: "Our curriculum is aligned with the National Occupational Standards (NOS) set by the National Skill Development Corporation. This ensures that every student builds vocational skillsets that are directly mapped to India's national skill registry.",
    howItWorks: [
      { step: "01", title: "Skill Standard Mapping", desc: "Every AISI unit is mapped against NSDC's IT-ITeS sector skill council guidelines for artificial intelligence." },
      { step: "02", title: "Assessment Verification", desc: "Practical skill tests and final capstones are graded using national assessment frameworks." },
      { step: "03", title: "National Registry Listing", desc: "Certified AISI innovators get listed in the national skill repository, giving them a distinct advantage." },
      { step: "04", title: "Industry Recognition", desc: "Corporate HR departments instantly recognize NSDC-aligned credentials, streamlining job and internship placement." }
    ],
    features: [
      "Alignment with IT-ITeS Sector Skill Council",
      "National Skill Registry integration",
      "Assessment based on Occupational Standards",
      "Industry-verified learning outcomes"
    ],
    stats: {
      interns: "15,000+ Skilled",
      rating: "4.8/5",
      partners: "50+ Skill Hubs"
    }
  },
  aicte: {
    title: "AICTE Integration",
    subtitle: "All India Council for Technical Education Guidelines",
    logo: aicteLogo,
    badge: "Technical Education Standards",
    bgImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
    description: "AISI works in close alignment with AICTE guidelines for technical and computing education. Our programs adopt AICTE's model curricula structures, ensuring K-12 students transition seamlessly into higher engineering and technology courses.",
    howItWorks: [
      { step: "01", title: "Model Curriculum Adoption", desc: "Our lessons borrow pedagogical frameworks from AICTE’s high-tech curriculum guidelines." },
      { step: "02", title: "Collaborative Labs", desc: "Students work in digital labs utilizing open-source technical libraries approved by the council." },
      { step: "03", title: "Technical Assessments", desc: "Skill tests simulate standard engineering/technical examinations, raising analytical competence." },
      { step: "04", title: "Higher Education Leap", desc: "Graduates possess structural knowledge that aligns perfectly with top tier AICTE-approved engineering institutions." }
    ],
    features: [
      "AICTE model curriculum alignment",
      "Hands-on coding labs using open standards",
      "Focus on engineering and problem-solving pedagogy",
      "Pathways to higher technical education"
    ],
    stats: {
      interns: "8,500+ Qualified",
      rating: "5.0/5",
      partners: "40+ Tech Colleges"
    }
  },
  msme: {
    title: "MSME Alignment",
    subtitle: "Ministry of Micro, Small & Medium Enterprises",
    logo: msmeLogo,
    badge: "Enterprise & Innovation",
    bgImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    description: "We encourage entrepreneurial thinking. Our integration with MSME standards supports student innovators in launching micro-startups, registering their intellectual properties, and obtaining support under central entrepreneurship schemes.",
    howItWorks: [
      { step: "01", title: "Ideation & Capstones", desc: "Students design practical AI applications targeting local problems under MSME guidelines." },
      { step: "02", title: "Startup Mentorship", desc: "AISI mentors guide student teams to convert prototype projects into small enterprise models." },
      { step: "03", title: "Udyam Assist", desc: "We support advanced student teams in registering under Udyam (MSME) to access government incubation benefits." },
      { step: "04", title: "Funding & Showcases", desc: "Outstanding student startups get showcased at central MSME expos for incubation and funding opportunities." }
    ],
    features: [
      "Incubation and startup guidance",
      "IPR and patent awareness programs",
      "Direct exposure to MSME development schemes",
      "Support for registering student-led micro-enterprises"
    ],
    stats: {
      interns: "120+ Prototypes",
      rating: "4.9/5",
      partners: "15+ Incubators"
    }
  },
  skillindia: {
    title: "Skill India",
    subtitle: "Pradhan Mantri Kaushal Vikas Yojana Standards",
    logo: skillIndiaLogo,
    badge: "National Skilling Mission",
    bgImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    description: "Aligning with the Prime Minister's vision for a skilled nation, AISI brings specialized digital skills directly to K-12 classrooms. Our certifications are part of the larger mission to make the youth of India self-reliant and future-ready.",
    howItWorks: [
      { step: "01", title: "Grassroots Skilling", desc: "Special bootcamps are held across schools in tier-2 and tier-3 towns to democratize digital education." },
      { step: "02", title: "Verified Skills Assessment", desc: "Students go through practical coding assessments to prove their hands-on skills." },
      { step: "03", title: "Skill India Digital Profile", desc: "Verified credentials are linked directly to student portfolios, visible to national employers." },
      { step: "04", title: "Placement & Growth", desc: "Skilled youth gain access to the national job portal and localized skill development programs." }
    ],
    features: [
      "Integration with Skill India Digital Mission",
      "Focus on tier-2/3 school outreach",
      "Self-reliance and vocational AI enablement",
      "Verified skill credentials visible nationally"
    ],
    stats: {
      interns: "25,000+ Enrolled",
      rating: "4.8/5",
      partners: "60+ Districts"
    }
  }
};

export default App;
