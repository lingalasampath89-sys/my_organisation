import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
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
  X
} from 'lucide-react';
import './App.css';
import logo from './assets/logo_pro.png';
// Optimized Cloud Images (Faster & Higher Clarity)
const heroImage = "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80";
const workshop1 = "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80";
import tarunImg from './assets/tarun.jpg';
import avinashImg from './assets/avinash.png';
import chandanaImg from './assets/chandana.png';
// NOTE: Make sure to save the uploaded image as 'sampath.png' in src/assets
import sampathImg from './assets/sampath.png';
const ws1 = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80";
const ws2 = "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80";
const ws3 = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedGrade, setSelectedGrade] = useState(7);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Backend Integration States
  const [contactForm, setContactForm] = useState({ name: '', email: '', school: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

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
          theory: "• Concepts: Supervised, Unsupervised, Reinforcement Learning.\n• Sub-topics: Training vs Testing sets, Accuracy metrics, Overfitting basics.\n• Workflow: The 7 steps of Machine Learning.", 
          practical: "• Lab: Teachable Machine (Google) - Multi-class classification.\n• Project: Gesture-controlled music player.",
          test: "Model Training Accuracy Report"
        },
        { 
          unit: "02", 
          title: "Regression & Trends", 
          theory: "• Concepts: Linear Regression, Prediction, Correlation.\n• Sub-topics: X-Y Variables, Line of Best Fit, Trend analysis.\n• Math: Basics of calculating averages and slopes.", 
          practical: "• Lab: Predicting plant growth based on water/light data.\n• Activity: Graphing data trends in spreadsheets.",
          test: "Prediction Accuracy Lab Test"
        },
        { 
          unit: "03", 
          title: "Computer Vision Lab", 
          theory: "• Concepts: Edge Detection, Face Recognition vs Detection.\n• Sub-topics: Haar Cascades, Biometric security, Landmark detection.\n• Logic: Identifying human poses.", 
          practical: "• Lab: Building a Smart Attendance System (Face-based).\n• Activity: Mask-detection alert system.",
          test: "CV System Implementation Exam"
        },
        { 
          unit: "04", 
          title: "NLP & Sentiment", 
          theory: "• Concepts: Sentiment Analysis, Bag of Words, Stopwords.\n• Sub-topics: Text mining, Emotion detection (Positive/Negative).\n• Logic: How AI understands sarcasm.", 
          practical: "• Lab: Twitter-style Sentiment Analyzer project.\n• Project: Multi-lingual greeting bot.",
          test: "Text Analysis Project Review"
        },
        { 
          unit: "05", 
          title: "Intro to Neural Nets", 
          theory: "• Concepts: Neurons (Bio vs Artificial), Weights, Biases.\n• Sub-topics: Layers (Input, Hidden, Output), Thresholds, Activation.\n• Logic: How signals travel in networks.", 
          practical: "• Sim: Neural Network Playground - visual training.\n• Activity: Hand-calculating a single neuron output.",
          test: "Neural Logic Concept Quiz"
        },
        { 
          unit: "06", 
          title: "Decision Trees", 
          theory: "• Concepts: Tree-based logic, Nodes, Leaves, Splitting.\n• Sub-topics: 'If-This-Then-That' at scale, Random Forests intro.\n• Logic: Sorting complex data based on features.", 
          practical: "• Lab: Building a 'Symptom-to-Disease' Diagnostic Tree.\n• Project: Game-playing AI (Tic-Tac-Toe logic).",
          test: "Tree Logic Construction Test"
        }
      ]
    },
    9: {
      title: "The AI Innovator (Class 9)",
      level: "Advanced Roadmap",
      modules: [
        { 
          unit: "01", 
          title: "Advanced Python for AI", 
          theory: "• Concepts: Data structures for AI (Lists, Dictionaries, Tuples).\n• Sub-topics: List Comprehensions, Lambda functions, Exception handling.\n• Logic: Writing clean, efficient AI code in Python.", 
          practical: "• Lab: Creating a Data Sorter and Filter in pure Python.\n• Project: Automation scripts for file handling.",
          test: "Python Coding Proficiency Exam"
        },
        { 
          unit: "02", 
          title: "Data Engineering (Pandas)", 
          theory: "• Concepts: Dataframes, Series, Vectorized operations.\n• Sub-topics: Handling Missing Values, Merging datasets, GroupBy logic.\n• Science: Cleaning real-world messy data.", 
          practical: "• Lab: Analyzing the 'Titanic Dataset' for survivors.\n• Project: Cleaning a 10,000-row healthcare dataset.",
          test: "Data Cleaning & Wrangling Lab"
        },
        { 
          unit: "03", 
          title: "Applied Math & Stats", 
          theory: "• Concepts: Statistics for AI (Mean, Std Dev, Normal Dist).\n• Sub-topics: Probability basics, Matrices (addition/multiplication).\n• Science: Why math is the language of Neural Networks.", 
          practical: "• Lab: NumPy Matrix Math lab.\n• Project: Visualizing Bell Curves for exam data.",
          test: "Statistical Analysis Problem Set"
        },
        { 
          unit: "04", 
          title: "Neural Networks Deep-Dive", 
          theory: "• Concepts: Backpropagation, Gradient Descent, Loss Functions.\n• Sub-topics: Activation functions (ReLU, Softmax, Sigmoid), Epochs.\n• Logic: How models 'correct' their mistakes.", 
          practical: "• Lab: Training a Multi-Layer Perceptron (MLP) in Python.\n• Project: Handwritten Digit Recognition (MNIST).",
          test: "Model Training & Tuning Report"
        },
        { 
          unit: "05", 
          title: "OpenCV & Vision Systems", 
          theory: "• Concepts: Real-time Frame processing, Contours, Filtering.\n• Sub-topics: Color-space (HSV/YUV), Object Tracking, YOLO intro.\n• Tech: Integrating AI with hardware cameras.", 
          practical: "• Lab: Real-time 'Air Writing' (Gesture to Text) project.\n• Project: Invisible Cloak effect using OpenCV.",
          test: "Vision Application Live Demo"
        },
        { 
          unit: "06", 
          title: "Capstone AI Project", 
          theory: "• Concepts: Project Lifecycle, Requirement gathering, Deployment.\n• Sub-topics: Scaling AI models, Documentation, Presentation skills.\n• Career: Building a professional AI portfolio.", 
          practical: "• Final Project: Student's choice (e.g., Stock Predictor, Crop Doctor AI).\n• Lab: Deploying model as a local web-app.",
          test: "Final Viva Voce & Portfolio Review"
        }
      ]
    }
  };

  const testimonials = [
    { name: "Siddharth Verma", school: "Leading Private School", text: "The hands-on approach of AISI is unparalleled. My students are now building basic chatbots on their own!", role: "Computer Science HOD" },
    { name: "Meera Krishnan", school: "Academic Parent", text: "Finally, an AI curriculum that doesn't just talk about robots but teaches the actual logic behind them. Exceptional!", role: "Parent" },
    { name: "Aryan Goel", school: "Innovation Lab Student", text: "The workshop at our school was the best experience. The AI-drone demo was mind-blowing!", role: "AI Innovator" }
  ];

  const navigateTo = (page, data = null) => {
    setCurrentPage(page);
    if (page === 'syllabus' && data) setSelectedGrade(data);
    if (page === 'team-detail' && data) setSelectedMember(data);
    setMobileMenuOpen(false); // Close mobile menu on navigate
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderTeamMemberDetail = () => {
    const member = teamData[selectedMember];
    if (!member) return null;

    return (
      <div className="member-detail">
        <section className="page-hero" style={{ 
          background: `linear-gradient(135deg, rgba(30, 64, 175, 0.9) 0%, rgba(37, 99, 235, 0.9) 100%), url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80)`, 
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
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                   <Linkedin style={{ cursor: 'pointer' }} />
                   <Twitter style={{ cursor: 'pointer' }} />
                   <Mail style={{ cursor: 'pointer' }} />
                </div>
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
    <nav style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      background: 'var(--glass-bg)', 
      backdropFilter: 'blur(10px)', 
      borderBottom: '1px solid var(--border)',
      transition: 'all 0.3s ease'
    }}>
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
          {['home', 'about', 'programs', 'workshops', 'contact'].map(page => (
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
              {page === 'home' ? 'Home' : page === 'about' ? 'About Us' : page}
            </a>
          ))}
          
          <button 
            onClick={toggleTheme}
            style={{ 
              background: 'var(--bg-subtle)', 
              border: '1px solid var(--border)', 
              color: 'var(--navy)', 
              padding: '8px', 
              borderRadius: '12px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button className="btn btn-primary" onClick={() => navigateTo('contact')}>Join Now</button>
        </div>

        {/* Mobile Toggle & Theme Toggle */}
        <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={toggleTheme}
            style={{ 
              background: 'var(--bg-subtle)', 
              border: '1px solid var(--border)', 
              color: 'var(--navy)', 
              padding: '6px', 
              borderRadius: '10px', 
              cursor: 'pointer'
            }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <div onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ cursor: 'pointer', color: 'var(--navy)' }}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
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
          {['home', 'about', 'programs', 'workshops', 'contact'].map(page => (
            <a 
              key={page} 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigateTo(page); }}
              style={{ textDecoration: 'none', color: 'var(--navy)', fontWeight: '800', fontSize: '20px' }}
            >
              {page === 'home' ? 'Home' : page === 'about' ? 'About Us' : page.toUpperCase()}
            </a>
          ))}
          <button className="btn btn-primary" onClick={() => navigateTo('contact')} style={{ padding: '16px' }}>Get Started</button>
        </motion.div>
      )}
    </nav>
  );

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
      alt: "Classroom Training and Expert Teaching"
    },
    {
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1600&q=80",
      alt: "Intensive Machine Learning & Coding"
    },
    {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
      alt: "Hands-on Practical Labs and Robotics"
    },
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
      alt: "Collaborative Team Projects"
    },
    {
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
      alt: "Live Coding and Software Development"
    },
    {
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1600&q=80",
      alt: "Skill Testing and Data Analysis"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (currentPage !== 'home') return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000); // Auto slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentPage, heroSlides.length]);

  const nextSlide = () => setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
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
      <header className="hero-banner" style={{ 
        minHeight: '90vh', 
        padding: 0, 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
        background: '#000'
      }}>
        {/* Slider Images */}
        {heroSlides.map((slide, index) => (
          <div 
            key={index} 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${slide.image}) center/cover no-repeat`,
              zIndex: 0
            }}
          />
        ))}

        {/* Slider Controls */}
        <button onClick={prevSlide} style={{ position: 'absolute', left: '20px', zIndex: 10, background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '15px', cursor: 'pointer', borderRadius: '50%', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={30} />
        </button>
        <button onClick={nextSlide} style={{ position: 'absolute', right: '20px', zIndex: 10, background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '15px', cursor: 'pointer', borderRadius: '50%', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronRight size={30} />
        </button>

        {/* Hero Content */}
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'left', width: '100%' }}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '800px', color: 'white' }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', background: 'rgba(255,255,255,0.1)', padding: '8px 20px', borderRadius: '50px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <span style={{ color: '#60a5fa', fontWeight: '800', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '2px' }}>
                STRATEGIC PARTNER:
              </span>
              <a href="https://strinttechnologies.com/" target="_blank" rel="noreferrer" style={{ fontWeight: '800', fontSize: '14px', color: 'white', textDecoration: 'none' }}>
                STRINT TECHNOLOGIES
              </a>
            </div>
            
            <h1 style={{ fontSize: '64px', lineHeight: '1.1', marginBottom: '24px' }}>
              Bringing Future <br/>
              <span style={{ color: 'var(--primary)', textShadow: '0 0 20px rgba(0, 101, 255, 0.4)' }}>Into Your Hands</span>
            </h1>
            
            <p style={{ fontSize: '20px', opacity: 0.9, marginBottom: '40px', lineHeight: '1.6', maxWidth: '600px' }}>
              Artificial Intelligence Society India (AISI) is on a mission to democratize AI literacy for every K-12 student in India.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start' }}>
              <button className="btn btn-primary" onClick={() => navigateTo('register')} style={{ padding: '16px 40px', fontSize: '16px' }}>
                Get Started for Free <ArrowRight size={20} style={{ marginLeft: '8px' }} />
              </button>
            </div>
            
            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '8px', marginTop: '60px' }}>
              {heroSlides.map((_, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setCurrentSlide(idx)}
                  style={{ 
                    width: currentSlide === idx ? '30px' : '10px', 
                    height: '10px', 
                    borderRadius: '5px', 
                    background: currentSlide === idx ? 'var(--primary)' : 'rgba(255,255,255,0.5)', 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }} 
                />
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      <section className="container section">
        <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px' }}>
          <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px' }}>OUR VISION</span>
          <h2 style={{ fontSize: '48px', margin: '16px 0', color: 'var(--navy)' }}>Standardizing AI Excellence</h2>
          <p style={{ fontSize: '20px', color: 'var(--text-dim)', lineHeight: '1.6' }}>
            We have a bold vision to integrate AI education into the national curriculum, creating a generation of problem solvers and innovators.
          </p>
          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <div style={{ height: '4px', width: '60px', background: 'var(--primary)', borderRadius: '2px' }}></div>
            <div style={{ height: '4px', width: '20px', background: 'var(--border)', borderRadius: '2px' }}></div>
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
          <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '14px' }}>OUR PROGRAMS</span>
          <h2>A Curriculum for Tomorrow</h2>
          <p>Join the ranks of thousands of students mastering Artificial Intelligence through our structured, practical roadmap.</p>
        </motion.div>
        <div className="program-grid">
          {programs.map((p, i) => (
            <motion.article
              key={p.id}
              className="program-card"
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
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
                <button className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '13px' }} onClick={() => navigateTo('syllabus', p.id)}>View Details</button>
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
            <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '14px' }}>CERTIFICATION</span>
            <h2 style={{ fontSize: '48px', margin: '16px 0' }}>Join 25,000+ Certified Innovators</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '18px', marginBottom: '32px' }}>
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
            <button className="btn btn-primary">Download Sample <ArrowRight size={18} style={{ marginLeft: '8px' }} /></button>
          </motion.div>
        </div>
      </section>

      <section className="container section">
        <motion.div className="section-header" {...fadeIn}>
          <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '14px' }}>TESTIMONIALS</span>
          <h2>Words from our Community</h2>
        </motion.div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="program-card"
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              style={{ padding: '40px' }}
            >
              <div style={{ color: 'var(--primary)', marginBottom: '24px' }}><MessageCircle size={32} /></div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-main)', marginBottom: '24px', fontSize: '16px', lineHeight: '1.6' }}>"{t.text}"</p>
              <div>
                <h4 style={{ fontWeight: '800' }}>{t.name}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-dim)' }}>{t.role} • {t.school}</p>
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
              <h3 style={{ marginBottom: '24px' }}>Verify Certificate</h3>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="Enter Certificate ID (e.g. AISI-2026-XXXX)" 
                  style={{ width: '100%', padding: '18px 24px', borderRadius: '16px', border: 'none', background: 'var(--glass-bg)', color: 'white', fontSize: '16px', marginBottom: '16px' }}
                />
                <button className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>Verify Credential</button>
              </div>
              <p style={{ marginTop: '20px', fontSize: '13px', opacity: 0.6, textAlign: 'center' }}>
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
              <button className="btn btn-outline" onClick={() => navigateTo('workshops')}>Explore Our Impact <ArrowRight size={18} style={{ marginLeft: '8px' }} /></button>
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
            <button className="btn btn-primary">Subscribe Now</button>
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
          { title: "Intensive Training", icon: <Brain />, desc: "Training To understand  algorithms.", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80" },
          { title: "Practical Lab", icon: <Monitor />, desc: "Hands-on experience how to use ai ", img: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=400&q=80" },
          { title: "Skill Test", icon: <ClipboardCheck />, desc: "skill based assessment.", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80" },
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
      9: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80" // High-tech Neural AI
    };

    return (
      <div className="syllabus-page">
        <section className="page-hero" style={{ 
          background: `linear-gradient(135deg, ${grade === 7 ? 'rgba(30, 58, 138, 0.9)' : grade === 8 ? 'rgba(49, 46, 129, 0.9)' : 'rgba(30, 64, 175, 0.9)'} 0%, rgba(0, 101, 255, 0.8) 100%), url(${gradeImages[grade]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white', padding: '120px 0', textAlign: 'center', position: 'relative'
        }}>
          <div className="container">
            <motion.div {...fadeIn}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px', fontWeight: '800', opacity: 0.8 }}>Grade {grade} Curriculum</span>
              <h1 style={{ fontSize: '48px', margin: '16px 0' }}>{syllabusData[grade].title}</h1>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>{syllabusData[grade].level}</p>
            </motion.div>
          </div>
        </section>

      <div className="container section">
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn btn-outline" onClick={() => navigateTo('programs')} style={{ padding: '8px 20px' }}>← Back to Programs</button>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[7, 8, 9].map(g => (
              <button 
                key={g} 
                onClick={() => navigateTo('syllabus', g)}
                style={{ 
                  padding: '10px 20px', 
                  borderRadius: '12px', 
                  border: '1px solid var(--border)',
                  background: grade === g ? 'var(--primary)' : 'var(--bg-card)',
                  color: grade === g ? 'white' : 'var(--navy)',
                  cursor: 'pointer',
                  fontWeight: '700',
                  transition: 'all 0.2s'
                }}
              >
                Class {g}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={grade}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="syllabus-view"
        >
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
        </motion.div>
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
        background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.85) 0%, rgba(37, 99, 235, 0.85) 100%), url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80)', 
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
                style={{ width: '100%', fontSize: '13px' }}
                onClick={() => navigateTo('team-detail', key)}
              >
                Know About {teamData[key].gender === 'female' ? 'Her' : 'Him'}
              </button>
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
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--navy) 100%)', color: 'white', padding: '120px 0', textAlign: 'center' }}>
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
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)', color: 'white', padding: '120px 0', textAlign: 'center' }}>
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
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #000 100%)', color: 'white', padding: '120px 0', textAlign: 'center' }}>
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
        background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.9) 0%, rgba(37, 99, 235, 0.9) 100%), url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80)', 
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
        background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.9) 0%, rgba(37, 99, 235, 0.9) 100%), url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1600&q=80)', 
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

  return (
    <div className="app">
      {renderNav()}
      <main>
        {currentPage === 'home' && renderHome()}
        {currentPage === 'programs' && renderProgramsView()}
        {currentPage === 'syllabus' && renderSyllabusPage(selectedGrade)}
        {currentPage === 'workshops' && renderWorkshopsPage()}
        {currentPage === 'about' && renderAboutUs()}
        {currentPage === 'contact' && renderContactPage()}
        {currentPage === 'vision-democratization' && renderDemocratizationPage()}
        {currentPage === 'vision-mastery' && renderPracticalMasteryPage()}
        {currentPage === 'vision-leadership' && renderFutureLeadershipPage()}
      </main>

      <footer>
        <div className="container">
          <div className="footer-main">
            <div className="footer-col" style={{ gridColumn: 'span 2' }}>
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
                <span style={{ 
                  fontSize: '24px', 
                  fontWeight: '900', 
                  color: 'var(--primary)',
                  background: 'linear-gradient(45deg, var(--primary), var(--primary-hover))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>AISI</span>
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
    name: "Tarun",
    role: "FOUNDER, STRINT TECHNOLOGIES | PARTNER, AISI",
    gender: "male",
    img: tarunImg,
    bio: "Leading the technology and infrastructure to make interactive AI learning accessible anywhere.",
    fullBio: "Coming Soon: Detailed technical journey and partnership goals.",
    highlights: ["Tech Visionary", "Infrastructure Expert", "Strategic Partner"]
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

export default App;
