'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { Check, Globe, Shield, FileText, Users, TrendingUp, Building2, ChevronRight, Moon, X } from 'lucide-react';
import { useAccount, useDisconnect } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import Image from 'next/image';

export default function SaotomeLandingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isDark, setIsDark] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();

  // Theme toggle
  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  // Initialize theme
  useEffect(() => {
    const currentTheme = document.documentElement.classList.contains('dark');
    setIsDark(currentTheme);
  }, []);

  // Page sections for sidebar navigation
  const pageSections = [
    { id: 'hero', label: 'Overview', description: 'Program introduction' },
    { id: 'about', label: 'About São Tomé', description: 'Island nation info' },
    { id: 'benefits', label: 'Benefits', description: 'Program advantages' },
    { id: 'partnership', label: 'Partnership', description: 'IOPn × Government' },
    { id: 'investment', label: 'Investment', description: 'Pricing options' },
    { id: 'process', label: 'Process', description: 'Application steps' },
    { id: 'eligibility', label: 'Eligibility', description: 'Requirements' },
    { id: 'agent', label: 'Agent', description: 'Authorized CBI agent' },
  ];

  const benefits = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Visa-Free Travel',
      description: 'Access to 70+ countries with visa-free or visa-on-arrival entry',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Full Citizenship',
      description: 'Complete citizenship rights with São Tomé and Príncipe passport',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Family Inclusion',
      description: 'Include spouse and children up to 30 years old in your application',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Tax Benefits',
      description: 'No wealth, gift, inheritance, foreign income, or capital gains tax',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'No Residency Requirement',
      description: 'No minimum stay or visit requirements to maintain citizenship',
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Dual Citizenship',
      description: 'Dual and multi-citizenship allowed - keep your current nationality',
    },
  ];

  const processSteps = [
    {
      number: '1',
      title: 'Onboarding',
      description: 'Complete KYC verification and initial payment',
    },
    {
      number: '2',
      title: 'Preparing',
      description: 'Submit required forms and documentation',
    },
    {
      number: '3',
      title: 'Processing',
      description: 'Background checking and due diligence review',
    },
    {
      number: '4',
      title: 'Granted',
      description: 'Approval in principle and contribution settlement',
    },
    {
      number: '5',
      title: 'Certified',
      description: 'Certificate of registration and passport issued',
    },
    {
      number: '6',
      title: 'Completion',
      description: 'Receive your citizenship certificate and passport',
    },
  ];

  const investmentOptions = [
    {
      name: 'Single Applicant',
      price: '$150,000',
      description: 'Individual citizenship',
      features: [
        'Full citizenship rights',
        'STP passport issued',
        'Visa-free access to 70+ countries',
        'No residency requirements',
        'Dual citizenship allowed',
      ],
    },
    {
      name: 'Couple',
      price: 'Contact Us',
      description: 'Main applicant + spouse',
      features: [
        'Citizenship for both spouses',
        'Two STP passports issued',
        'All individual benefits included',
        'Family reunification support',
        'Priority processing available',
      ],
      popular: true,
    },
    {
      name: 'Family',
      price: 'Contact Us',
      description: 'Parents + up to 2 children',
      features: [
        'Citizenship for entire family',
        'Passports for all members',
        'Children up to 30 years old',
        'Educational opportunities',
        'Multi-generational benefits',
      ],
    },
  ];

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Scroll tracking for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = pageSections.map(section => section.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-[#1a1d29] text-white z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '280px' }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-blue-600 flex items-center justify-center">
                  <Image 
                    src="/images/logos/iopn.jpg" 
                    alt="IOPn" 
                    width={48} 
                    height={48} 
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-white text-lg">São Tomé</h2>
                  <p className="text-sm text-gray-400">Citizenship Program</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:bg-gray-800 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Page Sections Navigation */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Page Sections
            </h3>
            <div className="space-y-0">
              {pageSections.map((section, index) => (
                <div key={section.id} className="relative">
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start gap-3 pb-4">
                      {/* Circle with connecting line */}
                      <div className="relative flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-colors ${
                            activeSection === section.id
                              ? 'bg-blue-600'
                              : 'bg-gray-700 hover:bg-gray-600'
                          }`}
                        >
                          <div className="w-4 h-4 rounded-full bg-gray-800" />
                        </div>
                        {/* Connecting line */}
                        {index < pageSections.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-700 absolute top-8" />
                        )}
                      </div>
                      {/* Text */}
                      <div className="flex-1 pt-0.5">
                        <h4 className={`font-medium text-sm mb-0.5 transition-colors ${
                          activeSection === section.id ? 'text-blue-400' : 'text-gray-300'
                        }`}>
                          {section.label}
                        </h4>
                        <p className="text-xs text-gray-500">{section.description}</p>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto space-y-3 p-4">
            {/* Dividing line */}
            <div className="border-t border-gray-700"></div>
            
            {/* Dark Mode Toggle */}
            <div className="flex justify-center py-2">
              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Moon className="w-5 h-5" />
              </button>
            </div>

            {/* Wallet Section */}
            {isConnected && address ? (
              <>
                <div 
                  className="w-full px-4 py-3 text-xs font-mono bg-gray-800/80 rounded-lg text-gray-300 text-center cursor-pointer hover:bg-gray-700/80 transition-colors"
                  onClick={() => navigator.clipboard.writeText(address)}
                  title="Click to copy address"
                >
                  {formatAddress(address)}
                </div>
                <button
                  onClick={() => disconnect()}
                  className="w-full px-4 py-3 text-sm font-medium text-gray-400 hover:text-white bg-transparent hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={() => open()}
                className="w-full px-4 py-3 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Toggle Button (when sidebar is closed) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed left-4 top-4 z-50 p-3 bg-[#1a1d29] text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Main Content */}
      <div className={`min-h-screen transition-all duration-300 ${
        sidebarOpen ? 'ml-[280px]' : 'ml-0'
      }`}>
        <div className="px-12 py-8">
          
          {/* Hero Section */}
          <section id="hero" className="py-12 lg:py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">
                <span className="text-gray-900 dark:text-white">São Tomé and Príncipe</span>
                <br />
                <span className="text-gray-700 dark:text-gray-300">Citizenship by Investment</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
                Secure your second citizenship in Africa's Hidden Paradise. A government-backed program 
                offering global mobility, tax advantages, and citizenship for your entire family.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/saotome/apply">
                  <Button variant="primary" size="lg">
                    Begin Application
                  </Button>
                </Link>
                <Button variant="secondary" size="lg">
                  Download Brochure
                </Button>
              </div>
            </div>
          </section>

          {/* All other sections remain the same... I'll include them for completeness */}
          
          {/* About Section */}
          <section id="about" className="py-12 lg:py-16">
            <GlassPanel className="p-6 md:p-8 lg:p-10">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    About São Tomé and Príncipe
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Nestled in the heart of the Gulf of Guinea, the Democratic Republic of São Tomé and 
                    Príncipe is a tranquil island nation celebrated for its pristine beaches, tropical 
                    landscapes, and welcoming culture.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Often called <strong>"Africa's Hidden Paradise"</strong>, the country embodies natural charm 
                    and a commitment to sustainable development. The Citizenship by Investment Program offers 
                    a secure and efficient pathway to global citizenship.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-500">Location</p>
                      <p className="font-semibold text-gray-900 dark:text-white">Gulf of Guinea</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-500">Population</p>
                      <p className="font-semibold text-gray-900 dark:text-white">~228,000</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-500">Language</p>
                      <p className="font-semibold text-gray-900 dark:text-white">Portuguese</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-500">Currency</p>
                      <p className="font-semibold text-gray-900 dark:text-white">Dobra (STN)</p>
                    </div>
                  </div>
                </div>
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
                  <img 
                    src="/api/placeholder/600/400" 
                    alt="São Tomé and Príncipe"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </GlassPanel>
          </section>

          {/* Benefits Grid */}
          <section id="benefits" className="py-12 lg:py-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Program Benefits
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                The São Tomé and Príncipe Citizenship by Investment Program offers comprehensive 
                benefits for you and your family.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <GlassPanel key={index} className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {benefit.description}
                  </p>
                </GlassPanel>
              ))}
            </div>
          </section>

          {/* Strategic Partnership */}
          <section id="partnership" className="py-12 lg:py-16">
            <GlassPanel variant="default" className="p-6 md:p-8 lg:p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  A Strategic Partnership
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  IOPn Luxury × São Tomé and Príncipe Government
                </p>
              </div>

              <div className="prose prose-sm max-w-none mb-8">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  IOPn Luxury has been selected as the exclusive digital platform for São Tomé and Príncipe's 
                  Citizenship by Investment program, bringing together the nation's commitment to sustainable 
                  development with cutting-edge blockchain technology. This partnership represents a new 
                  standard in citizenship processing with a secure, transparent, and efficient way.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    IOPn Delivers
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
                  <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Secure blockchain infrastructure for application processing</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Real-time application tracking and transparency</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Streamlined digital platform replacing traditional paperwork</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>White-glove service for high-net-worth applicants</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Cryptocurrency payment integration (USDC/USDT)</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Direct government integration for seamless processing</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Why This Partnership Works
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">Trust & Legitimacy</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Official government authorization ensures your citizenship application is processed through legitimate channels with full legal recognition.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">Modern Technology</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Blockchain technology brings transparency, security, and efficiency to a traditionally slow bureaucratic process.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">Exclusive Access</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      IOPn Luxury is the only digital platform authorized to process São Tomé citizenship applications, ensuring premium service quality.
                    </p>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </section>

          {/* Investment Options */}
          <section id="investment" className="py-12 lg:py-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Investment Options
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Choose the citizenship package that best suits your family's needs. All investments 
                are non-refundable contributions to the National Transformation Fund.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {investmentOptions.map((option, index) => (
                <GlassPanel
                  key={index}
                  className={`p-6 relative ${
                    option.popular ? 'ring-2 ring-blue-600' : ''
                  }`}
                >
                  {option.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {option.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {option.description}
                    </p>
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                      {option.price}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      + due diligence fees
                    </p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/saotome/apply">
                    <Button variant="primary" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </GlassPanel>
              ))}
            </div>
          </section>

          {/* Application Process */}
          <section id="process" className="py-12 lg:py-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Application Process
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our streamlined 6-step process makes obtaining your São Tomé citizenship straightforward 
                and efficient. Average processing time: 4-6 months.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <GlassPanel key={index} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </section>

          {/* Eligibility Requirements */}
          <section id="eligibility" className="py-12 lg:py-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Eligibility Requirements
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <GlassPanel className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Main Applicant</h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Must be at least 18 years old
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Valid source of income proof required
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Good health certification
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Clean criminal record
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    No security risk to the nation
                  </li>
                </ul>
              </GlassPanel>
              <GlassPanel className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Qualifying Dependents</h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Spouse (legally married)
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Unmarried children up to 30 years old
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Parents over 55 (financially dependent)
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Open to all nationalities (except North Korea)
                  </li>
                </ul>
              </GlassPanel>
            </div>
            <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                <strong>Note:</strong> Applicants with ongoing criminal investigations or who pose a potential 
                risk to national security or reputation will be rejected.
              </p>
            </div>
          </section>

          {/* Authorized Agent */}
          <section id="agent" className="py-12 lg:py-16">
            <GlassPanel className="p-6 md:p-8 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Authorized CBI Agent
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
                This program is administered through <strong>Carib International</strong>, a pioneering 
                specialized consultancy firm that introduced Citizenship by Investment to the MENA region 
                in 2006. With a proven track record and authorized local offices, all applications are 
                processed in compliance with the highest regulatory standards.
              </p>
              <div className="inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Shield className="w-5 h-5" />
                <span>Authorized & Regulated CBI Agent</span>
              </div>
            </GlassPanel>
          </section>

          {/* CTA Section */}
          <section className="py-12 lg:py-16 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Start your São Tomé and Príncipe citizenship application today and unlock global opportunities 
              for you and your family.
            </p>
            <Link href="/saotome/apply">
              <Button variant="primary" size="lg" className="text-lg px-8 py-4">
                Start Application Now
              </Button>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
              Have questions? Contact us at <a href="mailto:support@iopn.luxury" className="text-blue-600 hover:underline">support@iopn.luxury</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}