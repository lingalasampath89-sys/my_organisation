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
  const [selectedGrade, setSelectedGrade] = useState(7);
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
    { id: 7, title: "AI Foundation", desc: "For Class 7: Logical thinking and basic AI patterns.", rating: 4.9, students: "12,400+", popular: true },
    { id: 8, title: "Neural Builder", desc: "For Class 8: Deep dive into ML and data perception.", rating: 4.8, students: "8,200+", popular: false },
    { id: 9, title: "System Innovator", desc: "For Class 9: Advanced Neural Nets and Python AI.", rating: 5.0, students: "5,600+", popular: true }
  ];

  const syllabusData = {
    7: {
      title: "The AI Explorer (Class 7)",
      level: "Foundation Roadmap",
      modules: [
        { 
          unit: "01", 
          title: "AI Mindset & Basics", 
          theory: "• Concepts: Intelligence vs Automation, Sensing vs Thinking.\n• Sub-topics: History (Alan Turing, Deep Blue), Types of AI (Narrow vs General), AI in Daily Life.\n• Concepts: How machines learn from experience.", 
          practical: "• Lab: AI Scavenger Hunt on smartphones.\n• Activity: Sorting 'Smart' vs 'Dumb' devices.",
          test: "MCQ Quiz (20 min) + Logic Puzzle"
        },
        { 
          unit: "02", 
          title: "Logic & Algorithms", 
          theory: "• Concepts: Boolean Logic, Conditionals, Flowcharts.\n• Sub-topics: Binary numbers (0s & 1s), Truth Tables (AND, OR, NOT), Sequencing.\n• Logic: Step-by-step problem solving.", 
          practical: "• Lab: Designing an algorithm for 'Robot Teacher' to draw a circle.\n• Game: Logic gate simulator.",
          test: "Algorithmic Flowchart Design Test"
        },
        { 
          unit: "03", 
          title: "Data Literacy", 
          theory: "• Concepts: Variables, Datasets, Patterns.\n• Sub-topics: Quantitative vs Qualitative data, Data Bias, Noise in Data.\n• Analysis: Finding trends in simple lists.", 
          practical: "• Lab: Creating a Class Hobby Dataset.\n• Project: Visualizing data using manual charts.",
          test: "Data Interpretation Lab Assessment"
        },
        { 
          unit: "04", 
          title: "Computer Vision Intro", 
          theory: "• Concepts: Image Pixels, RGB Color Model, Grayscale.\n• Sub-topics: Feature Extraction, Image classification basics, Filters.\n• Logic: How AI 'sees' shapes.", 
          practical: "• Lab: Training a Color Detector using block coding.\n• Activity: Image decomposition into pixels.",
          test: "Object Detection Practical Lab"
        },
        { 
          unit: "05", 
          title: "NLP Foundations", 
          theory: "• Concepts: Syntax, Semantics, Tokenization.\n• Sub-topics: Keywords, Rule-based Chatbots, Voice recognition logic.\n• Interaction: Communicating with AI.", 
          practical: "• Lab: Building 'Airi' - Your first rule-based Chatbot.\n• Activity: Voice command mapping.",
          test: "Chatbot Logic Mapping Project"
        },
        { 
          unit: "06", 
          title: "Ethics & Safety", 
          theory: "• Concepts: Privacy, Deepfakes, AI Safety.\n• Sub-topics: Digital footprints, Facial recognition ethics, Bias in data.\n• Policy: Rules for responsible AI usage.", 
          practical: "• Lab: Spotting a Deepfake Challenge.\n• Project: Creating an 'AI Bill of Rights'.",
          test: "Ethics Case Study Presentation"
        }
      ]
    },
    8: {
      title: "The AI Builder (Class 8)",
      level: "Intermediate Roadmap",
      modules: [
        { 
          unit: "01", 
          title: "Machine Learning Core", 
          theory: "• What is Machine Learning? How computers learn from examples.\n• Three ways ML works: Learning from labeled data, Finding patterns in unlabeled data, Learning by trying & getting rewards.\n• Simple 7-step process: Get data → Clean it → Choose model → Train → Test → Improve → Deploy.", 
          practical: "• Lab: Teach the computer to recognize gestures (hand signs) using Google's easy tool.\n• Project: Build a music player that plays songs when you make specific hand moves.",
          test: "Create a working AI model & explain how it learned"
        },
        { 
          unit: "02", 
          title: "Predicting Trends with Numbers", 
          theory: "• Finding patterns in data: If more rain happens, plants grow taller.\n• Simple line to show the connection between two things (X and Y on a graph).\n• How to spot trends: Is something going up, down, or staying same?\n• Basic math: Average (mean), and drawing a best-fit line through dots.", 
          practical: "• Lab: Use a plant - measure height & water given, create a chart.\n• Activity: Predict tomorrow's temperature based on past data in spreadsheets.",
          test: "Make predictions & check if they were correct"
        },
        { 
          unit: "03", 
          title: "Computer Vision Lab - Seeing with AI", 
          theory: "• How computers see: Breaking images into tiny squares (pixels).\n• Finding edges in pictures (where colors change sharply).\n• Face detection: Teaching AI to find faces in photos (like Instagram).\n• Recognizing humans and their body positions (sitting, standing, waving).", 
          practical: "• Lab: Build automatic attendance using face recognition - camera recognizes students.\n• Activity: Create a system that alerts when someone is not wearing a mask.",
          test: "Build a working AI system that recognizes & responds"
        },
        { 
          unit: "04", 
          title: "Teaching AI to Understand Feelings", 
          theory: "• How AI reads emotions from words: Happy, sad, angry, excited?\n• Breaking sentences into important words (ignoring 'the', 'is', 'a').\n• Counting good & bad words to understand emotions.\n• Challenge: Understanding sarcasm (when people say opposite of what they mean).", 
          practical: "• Lab: Build a Twitter-like tool that shows if comments are positive or negative.\n• Project: Create a friendly chatbot that replies in multiple languages.",
          test: "Build a tool that understands feelings in text"
        },
        { 
          unit: "05", 
          title: "Building the Brain - Simple Neural Networks", 
          theory: "• What is a neuron? A tiny decision-maker (like brain cells).\n• Connections & weights: Strong connections vs weak connections between neurons.\n• Layers of neurons: Information goes in → gets processed → comes out.\n• How to improve: Fix mistakes by going backward & adjusting (like learning from errors).", 
          practical: "• Interactive game: Watch a simple brain learn in real-time on screen.\n• Activity: Manually calculate how one neuron makes a decision.",
          test: "Explain how a simple brain thinks"
        },
        { 
          unit: "06", 
          title: "Decision Trees - AI Making Choices", 
          theory: "• Decision trees are like 'If-Then' games: If sick, go to doctor. If not, stay home.\n• Branches & leaves: Each question splits the path into new choices.\n• Building a tree: Ask yes/no questions to separate data into groups.\n• Random forests: Lots of trees voting together to make better decisions.", 
          practical: "• Lab: Build a 'Doctor AI' tree: Is it a cold, flu, or allergies? (based on symptoms).\n• Project: Create a simple game AI for Tic-Tac-Toe using decision logic.",
          test: "Design a decision tree for a real-world problem"
        }
      ]
    },
    9: {
      title: "The AI Innovator (Class 9)",
      level: "Advanced Roadmap",
      modules: [
        { 
          unit: "01", 
          title: "Learning Python the AI Way", 
          theory: "• How to write AI code in Python\n• Lists, dictionaries, and storing data\n• Making AI code neat and reusable\n• Handling mistakes in code", 
          practical: "• Build sorting and filtering tools\n• Create automation scripts\n• Practice writing clean code",
          test: "Python Skills Check"
        },
        { 
          unit: "02", 
          title: "Understanding Data with Tools", 
          theory: "• What are dataframes? (like super-smart spreadsheets)\n• Finding and fixing bad data\n• Combining datasets together\n• Organizing messy information", 
          practical: "• Analyze real datasets\n• Clean up messy data\n• Combine data from different sources",
          test: "Data Cleaning Challenge"
        },
        { 
          unit: "03", 
          title: "Math Behind the Magic", 
          theory: "• Statistics that AI uses\n• Understanding probabilities\n• Matrix math (for AI brains)\n• Why math matters in AI", 
          practical: "• Matrix math with code\n• Visualize patterns in data\n• Understand averages and spreads",
          test: "Math Problem Set"
        },
        { 
          unit: "04", 
          title: "Building Smart Brains - Deep Learning", 
          theory: "• How do neural networks really work?\n• Learning from mistakes (like humans)\n• Different types of neurons\n• Making AI smarter step by step", 
          practical: "• Train AI to recognize handwriting\n• Build a neural network from scratch\n• See how AI learns in real-time",
          test: "Build & Train a Model"
        },
        { 
          unit: "05", 
          title: "Teaching Computers to See", 
          theory: "• How computers 'look' at images\n• Finding objects in pictures\n• Real-time video processing\n• Using cameras with AI", 
          practical: "• Build gesture recognition (hand signals)\n• Create special visual effects\n• Process video from camera",
          test: "Live Vision Demo"
        },
        { 
          unit: "06", 
          title: "Your Real AI Project", 
          theory: "• Planning an AI project from idea to reality\n• How to deploy AI (make it live)\n• Presenting your work\n• Starting your AI career", 
          practical: "• Build your own AI project\n• Make it work on the web\n• Present to judges\n• Get feedback and improve",
          test: "Final Project Showcase"
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
        padding: '100px 0',
        background: 'linear-gradient(135deg, #0a0f2e 0%, #0d1b4b 40%, #0f2460 70%, #0a0f2e 100%)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Animated glowing orbs */}
        <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', right: '-60px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Top shimmer line */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent 0%, #2563EB 30%, #06B6D4 60%, #4f46e5 80%, transparent 100%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: '64px' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(37,99,235,0.15)',
                padding: '10px 26px',
                borderRadius: '50px',
                border: '1px solid rgba(37,99,235,0.4)',
                backdropFilter: 'blur(10px)',
                marginBottom: '20px'
              }}
            >
              <ShieldCheck size={16} color="#60A5FA" />
              <span style={{ color: '#60A5FA', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '3px' }}>TRUSTED & RECOGNIZED BY</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(26px, 4vw, 44px)',
                fontWeight: 900,
                color: 'white',
                margin: '0 0 12px',
                letterSpacing: '-0.02em'
              }}
            >
              Backed by India's{' '}
              <span style={{ background: 'linear-gradient(135deg, #60A5FA 0%, #06B6D4 50%, #818CF8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Top Authorities
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', maxWidth: '520px', margin: '0 auto', lineHeight: '1.7' }}
            >
              Our programs are nationally accredited by the most prestigious government bodies ensuring every certificate carries real weight.
            </motion.p>
          </motion.div>

          {/* Logo Cards — Animated Marquee Row */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Left fade */}
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '120px', background: 'linear-gradient(to right, #0a0f2e, transparent)', zIndex: 2, pointerEvents: 'none' }} />
            {/* Right fade */}
            <div style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '120px', background: 'linear-gradient(to left, #0a0f2e, transparent)', zIndex: 2, pointerEvents: 'none' }} />

            <motion.div
              style={{ display: 'flex', gap: '24px', width: 'max-content' }}
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
            >
              {[...Object.keys(recognitionsData), ...Object.keys(recognitionsData)].map((key, i) => {
                const realKey = Object.keys(recognitionsData)[i % Object.keys(recognitionsData).length];
                const rec = recognitionsData[realKey];
                return (
                  <motion.div
                    key={`${key}-${i}`}
                    whileHover={{ scale: 1.08, y: -8 }}
                    onClick={() => navigateTo('recognition-detail', realKey)}
                    style={{
                      cursor: 'pointer',
                      flexShrink: 0,
                      width: '200px',
                      padding: '28px 20px',
                      background: 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '24px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '16px',
                      minHeight: '170px',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(6,182,212,0.05) 100%)', borderRadius: '24px', pointerEvents: 'none' }} />
                    <div style={{
                      width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'white', borderRadius: '50%',
                      boxShadow: '0 0 0 4px rgba(255,255,255,0.1), 0 8px 24px rgba(0,0,0,0.3)',
                      position: 'relative', zIndex: 1
                    }}>
                      <img src={rec.logo} alt={rec.title} loading="lazy" style={{ height: '50px', maxWidth: '60px', objectFit: 'contain' }} />
                    </div>
                    <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                      <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.95)', textTransform: 'uppercase', letterSpacing: '0.8px', lineHeight: '1.4' }}>
                        {rec.title}
                      </span>
                      <span style={{ display: 'inline-block', marginTop: '8px', padding: '3px 10px', background: 'rgba(37,99,235,0.3)', borderRadius: '50px', fontSize: '9px', fontWeight: '700', color: '#93C5FD', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                        {rec.badge.split(' ')[0]}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(10px)',
              maxWidth: '900px',
              margin: '60px auto 0'
            }}
          >
            {[
              { value: '5', label: 'Govt. Recognitions', icon: '🏛️' },
              { value: '25K+', label: 'Certified Students', icon: '🎓' },
              { value: '100%', label: 'Verified Credentials', icon: '✅' },
              { value: '30+', label: 'Industry Partners', icon: '🤝' }
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  flex: '1 1 180px',
                  padding: '28px 24px',
                  textAlign: 'center',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none'
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{stat.icon}</div>
                <div style={{ fontSize: '28px', fontWeight: '900', color: 'white', fontFamily: 'Poppins, sans-serif', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '6px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div {...fadeIn} style={{ textAlign: 'center', marginTop: '48px' }}>
            <motion.button
              className="btn btn-primary btn-glow"
              style={{ padding: '14px 44px', fontSize: '15px', fontWeight: 700, background: 'linear-gradient(135deg, #2563EB 0%, #3B72F7 50%, #06B6D4 100%)', border: 'none', boxShadow: '0 8px 32px rgba(37,99,235,0.4)' }}
              onClick={() => navigateTo('recognitions')}
              whileHover={{ scale: 1.06, y: -4, boxShadow: '0 12px 40px rgba(37,99,235,0.55)' }}
              whileTap={{ scale: 0.96 }}
            >
              View All Recognitions <ArrowRight size={18} style={{ marginLeft: '10px' }} />
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom shimmer line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent 0%, #4f46e5 30%, #2563EB 60%, #06B6D4 80%, transparent 100%)' }} />
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
                {p.id === 7 ? <Brain /> : p.id === 8 ? <Zap /> : <Rocket />}
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

      {/* Grade Quick Selection Grid */}
      <div className="grade-selector-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
         {[7, 8, 9].map(grade => (
            <motion.div 
               key={grade}
               whileHover={{ y: -10 }}
               className="grade-card"
               style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border)', textAlign: 'center', cursor: 'pointer', boxShadow: 'var(--shadow)' }}
               onClick={() => navigateTo('syllabus', grade)}
            >
               <div style={{ width: '60px', height: '60px', background: 'var(--bg-subtle)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--primary)' }}>
                  <BookOpen size={28} />
               </div>
               <h3 style={{ fontSize: '24px', color: 'var(--navy)', marginBottom: '16px' }}>Class {grade}</h3>
               <p style={{ color: 'var(--text-dim)', marginBottom: '24px', fontSize: '14px', lineHeight: '1.6' }}>Explore the detailed AI/ML sessions, theory modules, and practical lab roadmap for Grade {grade}.</p>
               <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '14px' }}>View Full Syllabus →</span>
            </motion.div>
         ))}
      </div>
    </div>
  );

  const renderSyllabusPage = (grade) => {
    const gradeImages = {
      7: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80",
      8: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
      9: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80"
    };

    const gradeColors = {
      7: { primary: 'rgba(30, 58, 138, 0.7)', secondary: '#2563EB', accent: '#60A5FA' },
      8: { primary: 'rgba(79, 39, 245, 0.7)', secondary: '#7C3AED', accent: '#A78BFA' },
      9: { primary: 'rgba(30, 64, 175, 0.7)', secondary: '#1D4ED8', accent: '#3B82F6' }
    };

    const moduleIcons = {
      "Machine Learning Core": <Brain size={24} />,
      "Regression & Trends": <TrendingUp size={24} />,
      "Computer Vision Lab": <Eye size={24} />,
      "NLP & Sentiment": <MessageSquare size={24} />,
      "Intro to Neural Nets": <Zap size={24} />,
      "Decision Trees": <GitBranch size={24} />,
      "AI Mindset & Basics": <Lightbulb size={24} />,
      "Logic & Algorithms": <Code size={24} />,
      "Data Literacy": <BarChart3 size={24} />,
      "Computer Vision Intro": <Eye size={24} />,
      "NLP Foundations": <Volume2 size={24} />,
      "Ethics & Safety": <Shield size={24} />,
      "Advanced Python for AI": <Code size={24} />,
      "Data Engineering (Pandas)": <Database size={24} />,
      "Applied Math & Stats": <Calculator size={24} />,
      "Neural Networks Deep-Dive": <Cpu size={24} />,
      "OpenCV & Vision Systems": <Camera size={24} />,
      "Capstone AI Project": <Rocket size={24} />
    };

    const [expandedModule, setExpandedModule] = useState(null);

    return (
      <div className="syllabus-page">
        <section className="page-hero" style={{ 
          background: `linear-gradient(135deg, ${gradeColors[grade].primary} 0%, ${gradeColors[grade].secondary}66 100%), url(${gradeImages[grade]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white', 
          padding: '140px 0', 
          textAlign: 'center', 
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 20% 50%, ${gradeColors[grade].accent}22 0%, transparent 50%)`,
            pointerEvents: 'none'
          }}></div>
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <motion.div {...fadeIn}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '13px', fontWeight: '800', opacity: 0.85 }}>📚 Grade {grade} Curriculum</span>
              <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', margin: '20px 0', fontWeight: '900', textShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>{syllabusData[grade].title}</h1>
              <p style={{ fontSize: '18px', opacity: 0.88, marginBottom: '24px' }}>{syllabusData[grade].level}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.12)', padding: '12px 24px', borderRadius: '50px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>📊 {syllabusData[grade].modules.length} Units</span>
                <span style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>⏱️ ~120 Hours</span>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container section">
          <div style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <motion.button 
              className="btn btn-outline" 
              onClick={() => navigateTo('programs')} 
              whileHover={{ scale: 1.05 }}
              style={{ padding: '10px 24px', fontSize: '14px', fontWeight: '700' }}
            >
              ← Back to Programs
            </motion.button>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {[7, 8, 9].map(g => (
                <motion.button 
                  key={g} 
                  onClick={() => navigateTo('syllabus', g)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ 
                    padding: '11px 22px', 
                    borderRadius: '12px', 
                    border: '2px solid ' + (grade === g ? gradeColors[g].secondary : 'var(--border)'),
                    background: grade === g ? `linear-gradient(135deg, ${gradeColors[g].secondary} 0%, ${gradeColors[g].accent} 100%)` : 'var(--bg-card)',
                    color: grade === g ? 'white' : 'var(--navy)',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '14px',
                    transition: 'all 0.3s',
                    boxShadow: grade === g ? `0 8px 24px ${gradeColors[g].secondary}44` : 'none'
                  }}
                >
                  Class {g}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div
            key={grade}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
              {syllabusData[grade].modules.map((m, i) => (
                <motion.div
                  key={i}
                  layout
                  onClick={() => setExpandedModule(expandedModule === i ? null : i)}
                  whileHover={{ y: -8, boxShadow: `0 20px 40px ${gradeColors[grade].secondary}22` }}
                  style={{
                    background: 'var(--bg-card)',
                    border: `2px solid ${expandedModule === i ? gradeColors[grade].secondary : 'var(--border)'}`,
                    borderRadius: '20px',
                    padding: '28px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${gradeColors[grade].secondary}, ${gradeColors[grade].accent})`,
                    opacity: expandedModule === i ? 1 : 0.5
                  }}></div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '12px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${gradeColors[grade].secondary}22, ${gradeColors[grade].accent}22)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: gradeColors[grade].secondary,
                      flexShrink: 0
                    }}>
                      {moduleIcons[m.title] || <Code size={24} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: gradeColors[grade].secondary, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Unit {m.unit}</div>
                      <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--navy)', margin: 0 }}>{m.title}</h3>
                    </div>
                  </div>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: expandedModule === i ? 'auto' : 0, opacity: expandedModule === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden', marginTop: '16px', paddingTop: '16px', borderTop: `1px solid var(--border)` }}
                  >
                    <div style={{ marginBottom: '12px' }}>
                      <p style={{ fontSize: '13px', fontWeight: '700', color: gradeColors[grade].secondary, marginBottom: '8px' }}>📖 Theory</p>
                      <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-dim)', whiteSpace: 'pre-line', margin: 0 }}>{m.theory}</p>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <p style={{ fontSize: '13px', fontWeight: '700', color: gradeColors[grade].secondary, marginBottom: '8px' }}>🔬 Practical</p>
                      <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-dim)', whiteSpace: 'pre-line', margin: 0 }}>{m.practical}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '700', color: gradeColors[grade].secondary, marginBottom: '8px' }}>✅ Test</p>
                      <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-dim)', margin: 0 }}>{m.test}</p>
                    </div>
                  </motion.div>

                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px', fontStyle: 'italic' }}>
                    {expandedModule === i ? '▼ Click to collapse' : '▶ Click for details'}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Old table view as fallback */}
            <div style={{ marginTop: '60px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '24px', textAlign: 'center', color: 'var(--navy)' }}>Full Curriculum Table</h3>
              <div className="syllabus-view">
                <div className="syllabus-table">
                  <div className="table-header">
                    <div className="col-unit">Unit</div>
                    <div className="col-title">Module Title</div>
                    <div className="col-theory">Theory Sessions</div>
                    <div className="col-practical">Practical Labs</div>
                    <div className="col-test">Test Pattern</div>
                  </div>
                  {syllabusData[grade].modules.map((m, i) => (
                    <div key={i} className="table-row">
                      <div className="col-unit"><span>{m.unit}</span></div>
                      <div className="col-title"><strong>{m.title}</strong></div>
                      <div className="col-theory">{m.theory}</div>
                      <div className="col-practical">{m.practical}</div>
                      <div className="col-test" style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)' }}>{m.test}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <motion.button 
              className="btn btn-primary btn-glow"
              onClick={() => navigateTo('contact')}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
              style={{ padding: '14px 40px', fontSize: '16px', fontWeight: '700' }}
            >
              Enroll Now <ArrowRight size={20} style={{ marginLeft: '8px' }} />
            </motion.button>
            <motion.button 
              className="btn btn-outline" 
              onClick={() => navigateTo('home')}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
              style={{ padding: '14px 32px', fontSize: '16px', fontWeight: '700', marginLeft: '16px' }}
            >
              <ArrowLeft size={20} style={{ marginRight: '8px' }} /> Back to Home
            </motion.button>
          </div>
        </div>
      </div>
    );
  };

  // ========== CURRICULUM DATA ==========
  const curriculumData = {
    6: {
      title: "AISI AI Foundations – Level 1",
      subtitle: "Class 6 Curriculum",
      duration: "10 Days | 45 Hours",
      color: "#2563EB",
      icon: <Lightbulb size={28} />,
      days: [
        {
          day: 1,
          module: "Module 1: Introduction to Artificial Intelligence",
          topics: ["What is Artificial Intelligence?", "AI vs Human Intelligence", "History of AI", "AI Around Us", "Applications of AI"],
          practical: "Identifying AI in Daily Life"
        },
        {
          day: 2,
          module: "Module 2: Understanding How AI Works",
          topics: ["Data and Information", "Patterns and Predictions", "Decision Making in AI", "How AI Learns from Data"],
          practical: "Pattern Recognition Activities"
        },
        {
          day: 3,
          module: "Module 3: Computational Thinking",
          topics: ["Problem Solving Fundamentals", "Decomposition", "Pattern Recognition", "Logical Thinking", "Sequencing"],
          practical: "Real-World Problem Breakdown"
        },
        {
          day: 4,
          module: "Module 4: Algorithms in Everyday Life",
          topics: ["What is an Algorithm?", "Step-by-Step Instructions", "Everyday Algorithms", "Flow of Actions"],
          practical: "Design Your Daily Routine Algorithm"
        },
        {
          day: 5,
          module: "Module 5: Data Literacy",
          topics: ["What is Data?", "Types of Data", "Data Collection Methods", "Organizing Data", "Basic Data Visualization"],
          practical: "Classroom Survey Analysis"
        },
        {
          day: 6,
          module: "Module 6: Introduction to Generative AI",
          topics: ["What is Generative AI?", "AI Assistants", "Text Generation", "Image Generation", "Educational Uses of AI"],
          practical: "Exploring AI Tools"
        },
        {
          day: 7,
          module: "Module 7: Prompt Engineering Fundamentals",
          topics: ["What is a Prompt?", "Effective Questioning Techniques", "Good vs Poor Prompts", "Creative Prompting"],
          practical: "Prompt Design Challenge"
        },
        {
          day: 8,
          module: "Module 8: AI for Creativity",
          topics: ["AI Storytelling", "AI Art Creation", "AI Brainstorming", "AI-Powered Presentations"],
          practical: "Create an AI Storybook"
        },
        {
          day: 9,
          module: "Module 9: Responsible AI",
          topics: ["AI Ethics", "Privacy and Safety", "Understanding Bias", "Deepfakes Awareness", "Responsible AI Usage"],
          practical: "AI Ethics Discussion Activity"
        },
        {
          day: 10,
          module: "Module 10: Capstone Project & Showcase",
          topics: ["Project Themes: AI for Education, Environment, Community, Daily Life", "Project Planning", "Solution Design", "Presentation Skills", "Project Showcase"],
          practical: "Final Project Presentation"
        }
      ],
      outcomes: [
        "Understand AI fundamentals",
        "Identify AI applications in daily life",
        "Apply computational thinking skills",
        "Understand basic data concepts",
        "Use AI tools responsibly",
        "Create effective prompts",
        "Generate creative AI-assisted content",
        "Present AI-powered solutions"
      ],
      competencies: ["AI Literacy", "Digital Literacy", "Computational Thinking", "Problem Solving", "Data Awareness", "Prompt Engineering", "Creativity", "Communication", "Ethical AI Usage", "Innovation Mindset"]
    },
    7: {
      title: "AISI AI Explorer – Level 2",
      subtitle: "Class 7 Curriculum",
      duration: "10 Days | 45 Hours",
      color: "#7C3AED",
      icon: <Rocket size={28} />,
      days: [
        {
          day: 1,
          module: "Day 1: AI Revision & New AI Concepts",
          topics: ["Recap of Class 6 AI Concepts", "Types of AI", "AI Around Us", "Future of AI"],
          practical: "AI Hunt"
        },
        {
          day: 2,
          module: "Day 2: How AI Learns",
          topics: ["What is Machine Learning?", "Learning from Examples", "Predictions", "Smart Recommendations"],
          practical: "Train Your AI Game"
        },
        {
          day: 3,
          module: "Day 3: Understanding Data",
          topics: ["What is Data?", "Collecting Information", "Organizing Data", "Finding Patterns"],
          practical: "Class Survey Project"
        },
        {
          day: 4,
          module: "Day 4: Better Prompt Writing",
          topics: ["What is a Good Prompt?", "Asking Clear Questions", "Role-Based Prompting", "Creative Prompting"],
          practical: "Prompt Competition"
        },
        {
          day: 5,
          module: "Day 5: AI for School Work",
          topics: ["AI for Homework", "AI for Notes", "AI for Research", "AI for Presentations"],
          practical: "Create Study Notes with AI"
        },
        {
          day: 6,
          module: "Day 6: AI for Creativity",
          topics: ["AI Stories", "AI Images", "AI Posters", "AI Presentations"],
          practical: "Create an AI Poster"
        },
        {
          day: 7,
          module: "Day 7: Safe & Responsible AI",
          topics: ["AI Safety", "Fake Information", "Deepfakes", "Online Responsibility"],
          practical: "Fact Check Challenge"
        },
        {
          day: 8,
          module: "Day 8: AI in Different Fields",
          topics: ["AI in Hospitals", "AI in Farming", "AI in Schools", "AI in Space", "AI in Businesses"],
          practical: "Industry Exploration"
        },
        {
          day: 9,
          module: "Day 9: Solving Problems with AI",
          topics: ["Finding Problems", "Thinking of Solutions", "Using AI to Help", "Team Collaboration"],
          practical: "Solution Building Workshop"
        },
        {
          day: 10,
          module: "Day 10: Final AI Project",
          topics: ["Team Project", "Presentation", "Demonstration", "Certificate Distribution"],
          practical: "Final Project & Showcase"
        }
      ],
      outcomes: [
        "Deepen AI Understanding",
        "Develop Data Awareness",
        "Master Prompt Writing",
        "Enhance Creativity with AI",
        "Strengthen Problem Solving",
        "Build Teamwork Skills",
        "Improve Communication",
        "Practice Responsible AI Usage"
      ],
      competencies: ["AI Understanding", "Data Awareness", "Prompt Writing", "Creativity", "Problem Solving", "Teamwork", "Communication", "Responsible AI Usage"]
    },
    8: {
      title: "AISI AI Master – Level 3",
      subtitle: "Class 8 Curriculum",
      duration: "12 Days | 60 Hours",
      color: "#DC2626",
      icon: <Brain size={28} />,
      days: [
        {
          day: 1,
          module: "Day 1: What is Machine Learning?",
          topics: ["How computers learn from examples", "Types of learning: Supervised, Unsupervised", "Real-world examples", "How Netflix recommends movies"],
          practical: "Identify ML in your favorite apps"
        },
        {
          day: 2,
          module: "Day 2: Training an AI Model",
          topics: ["What is training?", "Good data vs bad data", "Testing your AI", "Accuracy and mistakes"],
          practical: "Train an AI to recognize emotions"
        },
        {
          day: 3,
          module: "Day 3: Understanding Data Better",
          topics: ["Collecting quality data", "Data organization", "Finding missing data", "Cleaning messy data"],
          practical: "Clean a real dataset"
        },
        {
          day: 4,
          module: "Day 4: Making Predictions",
          topics: ["Spotting trends in data", "Using graphs to predict", "Accuracy of predictions", "Real-world predictions"],
          practical: "Predict sales or weather patterns"
        },
        {
          day: 5,
          module: "Day 5: Teaching AI to See - Images",
          topics: ["How computers see pictures", "Finding objects in images", "Face recognition", "Using computer vision"],
          practical: "Build a face detector using tools"
        },
        {
          day: 6,
          module: "Day 6: Teaching AI to Understand Words",
          topics: ["How AI reads text", "Finding emotions in words", "Understanding language", "Building chatbots"],
          practical: "Build a chatbot that understands feelings"
        },
        {
          day: 7,
          module: "Day 7: AI Decision Making",
          topics: ["Decision trees explained simply", "If-Then logic at scale", "Voting systems in AI", "How AI makes choices"],
          practical: "Design a decision tree for a problem"
        },
        {
          day: 8,
          module: "Day 8: The Brain Inside AI - Neural Networks",
          topics: ["What is a neural network?", "Neurons and connections", "How networks learn", "Deep learning basics"],
          practical: "Watch a neural network learn in real-time"
        },
        {
          day: 9,
          module: "Day 9: AI Ethics & Safety",
          topics: ["Bias in AI systems", "Privacy concerns", "Fair AI decisions", "Responsible AI usage", "Laws about AI"],
          practical: "Spot bias in AI decisions"
        },
        {
          day: 10,
          module: "Day 10: Building Real AI Projects",
          topics: ["Project planning steps", "Choosing tools", "Testing your project", "Deploying AI"],
          practical: "Start your own AI project"
        },
        {
          day: 11,
          module: "Day 11: AI in Industry",
          topics: ["AI in hospitals saving lives", "AI in farming helping crops", "AI in schools teaching", "Career paths in AI"],
          practical: "Interview an AI professional"
        },
        {
          day: 12,
          module: "Day 12: Showcase Your AI Project",
          topics: ["Presenting your work", "Explaining AI decisions", "Demo your project", "Getting feedback"],
          practical: "Final Project Presentation & Awards"
        }
      ],
      outcomes: [
        "Understand machine learning deeply",
        "Build and train AI models",
        "Work with real data",
        "Make AI for images and text",
        "Understand AI decision-making",
        "Know AI ethics and safety",
        "Build real AI projects",
        "Explore AI career opportunities"
      ],
      competencies: ["Machine Learning", "Data Science", "AI Development", "Problem Solving", "Ethics & Safety", "Project Management", "Presentation", "Innovation"]
    },
    9: {
      title: "AISI AI Innovator – Level 4",
      subtitle: "Class 9 Curriculum",
      duration: "14 Days | 70 Hours",
      color: "#1E40AF",
      icon: <Cpu size={28} />,
      days: [
        {
          day: 1,
          module: "Day 1: Python Basics for AI",
          topics: ["Writing Python code", "Lists and dictionaries", "Functions and loops", "Organizing your code well"],
          practical: "Create a simple Python program"
        },
        {
          day: 2,
          module: "Day 2: Working with Data",
          topics: ["What are dataframes?", "Loading data", "Finding missing values", "Cleaning messy data"],
          practical: "Clean a real dataset"
        },
        {
          day: 3,
          module: "Day 3: Understanding Patterns in Data",
          topics: ["Spotting trends", "Calculating averages", "Finding outliers", "Visualization"],
          practical: "Analyze and visualize data"
        },
        {
          day: 4,
          module: "Day 4: Math for AI",
          topics: ["Statistics explained", "Probability basics", "Matrix math", "Why math matters for AI"],
          practical: "Math practice with Python"
        },
        {
          day: 5,
          module: "Day 5: How Neural Networks Work",
          topics: ["Brain-like computers", "Neurons and connections", "Learning from mistakes", "Activation functions"],
          practical: "Watch AI learn in real-time"
        },
        {
          day: 6,
          module: "Day 6: Training Your First AI",
          topics: ["Building networks", "Training process", "Testing accuracy", "Improving performance"],
          practical: "Train AI to recognize patterns"
        },
        {
          day: 7,
          module: "Day 7: Computer Vision Basics",
          topics: ["How AI 'sees' images", "Finding objects", "Real-time processing", "Using cameras"],
          practical: "Build a gesture detector"
        },
        {
          day: 8,
          module: "Day 8: Advanced Vision",
          topics: ["Video processing", "Object tracking", "Image effects", "Live applications"],
          practical: "Create cool visual effects"
        },
        {
          day: 9,
          module: "Day 9: Working with Real Data",
          topics: ["Large datasets", "Combining data sources", "Data validation", "Quality assurance"],
          practical: "Handle real-world messy data"
        },
        {
          day: 10,
          module: "Day 10: Building AI for Different Problems",
          topics: ["Classification (sorting)", "Prediction (guessing)", "Clustering (grouping)", "Choosing the right AI"],
          practical: "Solve different AI problems"
        },
        {
          day: 11,
          module: "Day 11: Making AI Available to Users",
          topics: ["Deploying models", "Web applications", "APIs and interfaces", "Testing in real world"],
          practical: "Deploy your AI online"
        },
        {
          day: 12,
          module: "Day 12: AI Ethics & Responsibility",
          topics: ["Fair AI decisions", "Privacy concerns", "Bias detection", "Laws about AI"],
          practical: "Audit your AI for bias"
        },
        {
          day: 13,
          module: "Day 13: Your AI Project Development",
          topics: ["Project planning", "Implementation", "Testing and debugging", "Documentation"],
          practical: "Build your final project"
        },
        {
          day: 14,
          module: "Day 14: Project Showcase & Next Steps",
          topics: ["Presenting your work", "Explaining AI decisions", "Getting feedback", "AI career paths"],
          practical: "Final Project Presentation & Awards"
        }
      ],
      outcomes: [
        "Master Python programming for AI",
        "Work with large, real-world datasets",
        "Build neural networks from scratch",
        "Apply computer vision techniques",
        "Deploy AI solutions",
        "Understand AI ethics and safety",
        "Complete professional AI project",
        "Prepare for AI careers"
      ],
      competencies: ["Python Programming", "Deep Learning", "Computer Vision", "Data Science", "Model Deployment", "Problem Solving", "Professional Development", "Innovation"]
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

  const toggleDay = (level, day) => {
    const key = `${level}-${day}`;
    setOpenDays(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderCurriculumPage = () => {
    const data = curriculumData[activeCurriculumLevel];
    
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
          {/* Level Switcher Tabs */}
          <motion.div {...fadeIn} style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '60px', flexWrap: 'wrap' }}>
            {[6, 7, 8, 9].map(level => (
              <motion.button
                key={level}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCurriculumLevel(level)}
                className="curriculum-level-btn"
                style={{
                  padding: '18px 36px',
                  borderRadius: '16px',
                  border: activeCurriculumLevel === level ? 'none' : '2px solid var(--border)',
                  background: activeCurriculumLevel === level
                    ? (level === 6 ? 'linear-gradient(135deg, #2563EB, #06B6D4)' : level === 7 ? 'linear-gradient(135deg, #7C3AED, #06B6D4)' : level === 8 ? 'linear-gradient(135deg, #DC2626, #F97316)' : 'linear-gradient(135deg, #1E40AF, #3B82F6)')
                    : 'var(--bg-card)',
                  color: activeCurriculumLevel === level ? 'white' : 'var(--navy)',
                  cursor: 'pointer',
                  fontWeight: '800',
                  fontSize: '16px',
                  fontFamily: 'Poppins, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: activeCurriculumLevel === level ? '0 8px 30px rgba(37, 99, 235, 0.3)' : 'var(--shadow)',
                  transition: 'all 0.3s ease'
                }}
              >
                {curriculumData[level].icon}
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '16px' }}>{level === 6 ? 'Level 1 – Foundations' : level === 7 ? 'Level 2 – Explorer' : level === 8 ? 'Level 3 – Master' : 'Level 4 – Innovator'}</div>
                  <div style={{ fontSize: '12px', fontWeight: '500', opacity: 0.8 }}>Class {level} • {curriculumData[level].duration}</div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Active Level Header */}
          <motion.div
            key={activeCurriculumLevel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '32px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
                {data.title}
              </h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '16px' }}>
                {data.subtitle} • {data.duration}
              </p>
            </div>

            {/* Day-by-Day Accordion */}
            <div className="curriculum-accordion" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
              {data.days.map((day) => {
                const isOpen = openDays[`${activeCurriculumLevel}-${day.day}`];
                return (
                  <motion.div
                    key={day.day}
                    className="curriculum-day-card"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: day.day * 0.04 }}
                    style={{
                      background: 'var(--bg-card)',
                      borderRadius: '20px',
                      border: isOpen ? `2px solid ${data.color}22` : '1px solid var(--border)',
                      boxShadow: isOpen ? `0 8px 32px ${data.color}15` : 'var(--shadow)',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {/* Accordion Header */}
                    <div
                      onClick={() => toggleDay(activeCurriculumLevel, day.day)}
                      style={{
                        padding: '24px 28px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease'
                      }}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        background: isOpen
                          ? (activeCurriculumLevel === 6 ? 'linear-gradient(135deg, #2563EB, #06B6D4)' : 'linear-gradient(135deg, #7C3AED, #06B6D4)')
                          : 'var(--bg-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isOpen ? 'white' : 'var(--primary)',
                        fontWeight: '900',
                        fontSize: '16px',
                        fontFamily: 'Poppins, sans-serif',
                        flexShrink: 0,
                        transition: 'all 0.3s ease'
                      }}>
                        {day.day < 10 ? `0${day.day}` : day.day}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 700, color: 'var(--navy)', margin: 0 }}>
                          {day.module}
                        </h4>
                        <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: '4px 0 0' }}>
                          {day.topics.length} topics • 1 practical activity
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ color: 'var(--primary)' }}
                      >
                        <ChevronDown size={22} />
                      </motion.div>
                    </div>

                    {/* Accordion Content */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ padding: '0 28px 28px', borderTop: '1px solid var(--border)' }}>
                            <div style={{ paddingTop: '24px' }}>
                              {/* Topics */}
                              <div style={{ marginBottom: '20px' }}>
                                <h5 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '14px' }}>
                                  <BookOpen size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Topics Covered
                                </h5>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                  {day.topics.map((topic, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', background: 'var(--bg-subtle)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                      <CheckCircle2 size={16} color={data.color} />
                                      <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--navy)' }}>{topic}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Practical */}
                              <div style={{
                                padding: '18px 20px',
                                background: `linear-gradient(135deg, ${data.color}08, ${data.color}15)`,
                                borderRadius: '14px',
                                border: `1px solid ${data.color}22`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '14px'
                              }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: data.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  <Monitor size={18} color="white" />
                                </div>
                                <div>
                                  <span style={{ fontSize: '11px', fontWeight: 700, color: data.color, textTransform: 'uppercase', letterSpacing: '1px' }}>Practical Activity</span>
                                  <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--navy)', margin: '2px 0 0' }}>{day.practical}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Learning Outcomes */}
            <motion.section {...fadeIn} style={{ marginTop: '80px' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px' }}>WHAT STUDENTS ACHIEVE</span>
                <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '32px', fontWeight: 800, color: 'var(--navy)', margin: '12px 0' }}>Learning Outcomes</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
                {data.outcomes.map((outcome, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4, scale: 1.02 }}
                    style={{
                      padding: '20px 24px',
                      background: 'var(--bg-card)',
                      borderRadius: '16px',
                      border: '1px solid var(--border)',
                      boxShadow: 'var(--shadow)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <CheckCircle2 size={20} color={data.color} />
                    <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--navy)' }}>{outcome}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Core Competencies */}
            <motion.section {...fadeIn} style={{ marginTop: '60px' }}>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 700, color: 'var(--navy)' }}>Core Competencies</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '800px', margin: '0 auto' }}>
                {data.competencies.map((comp, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '10px 22px',
                      background: `linear-gradient(135deg, ${data.color}10, ${data.color}18)`,
                      borderRadius: '50px',
                      border: `1px solid ${data.color}25`,
                      fontSize: '13px',
                      fontWeight: 700,
                      color: data.color,
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </motion.section>
          </motion.div>


          {/* Back Button */}
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <button className="btn btn-outline" onClick={() => navigateTo('home')}>
              <ArrowLeft size={20} style={{ marginRight: '8px' }} /> Back to Home
            </button>
          </div>
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
