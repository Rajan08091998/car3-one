'use client';

import { useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserMenu } from '@/components/auth/UserMenu';
import {
  Car,
  Shield,
  Zap,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Globe
} from 'lucide-react';
import { AuthModal } from '@/components/auth/AuthModel';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showAuthModal, setShowAuthModal] = useState(false);

  function openModal(mode: 'signin' | 'signup') {
    setAuthMode(mode);
    setShowAuthModal(true);
  }

  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();
  return (
    <div className="min-h-screen bg-white">
      {/* Sign In Modal */}
      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        mode={authMode}
      />

      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Car3 ONE</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>

              {isLoading ? (
                <div className="w-8 h-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
              ) : isAuthenticated && user ? (
                <div className="flex items-center space-x-4">
                  <Button asChild>
                    <a href="/dashboard">Dashboard</a>
                  </Button>
                  <UserMenu user={user} />
                </div>
              ) : (
                <>
                  <Button variant="outline" onClick={() => openModal('signin')}>
                    Sign In
                  </Button>
                  <Button onClick={() => openModal('signup')}>
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:text-blue-600">How It Works</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Pricing</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Contact</a>

              {isAuthenticated && user ? (
                <div className="px-3 py-2">
                  <Button asChild className="w-full">
                    <a href="/dashboard">Dashboard</a>
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2 px-3 py-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => openModal('signin')}>
                    Sign In
                  </Button>
                  <Button size="sm" className="flex-1" onClick={() => openModal('signup')}>
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge variant="secondary" className="mb-4">
                  Next Generation Platform
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Welcome to the Future of
                  <span className="text-blue-600"> Automotive</span>
                </h1>
                <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                  Car3 ONE revolutionizes how you buy, sell, service, and experience automotive.
                  One platform, infinite possibilities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                    <a href="/dashboard">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                ) : (
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => openModal('signup')}>
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8">
                <div>
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">1M+</div>
                  <div className="text-sm text-gray-600">Transactions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.pexels.com/photos/3768909/pexels-photo-3768909.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Modern car dashboard"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Core Features</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From vehicle discovery to maintenance tracking, Car3 ONE provides a comprehensive
              ecosystem for all your automotive needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Car,
                title: "Smart Vehicle Discovery",
                description: "AI-powered recommendations help you find the perfect vehicle based on your preferences and needs."
              },
              {
                icon: Shield,
                title: "Secure Transactions",
                description: "Bank-level security with escrow services ensures safe and protected transactions for all parties."
              },
              {
                icon: Zap,
                title: "Instant Connectivity",
                description: "Connect instantly with dealers, service providers, and other users in your automotive network."
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Join a thriving community of automotive enthusiasts sharing reviews, tips, and experiences."
              },
              {
                icon: MapPin,
                title: "Location Services",
                description: "Find nearby services, charging stations, and automotive facilities with precise location data."
              },
              {
                icon: Star,
                title: "Premium Support",
                description: "24/7 customer support with automotive experts ready to assist with any questions or issues."
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Simple Process</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              How Car3 ONE Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started is easy. Follow these simple steps to begin your automotive journey with us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Sign up and create your personalized automotive profile with preferences and requirements."
              },
              {
                step: "02",
                title: "Explore & Connect",
                description: "Browse vehicles, services, and connect with verified dealers and service providers in your area."
              },
              {
                step: "03",
                title: "Complete Your Transaction",
                description: "Secure transactions with built-in escrow, documentation, and support throughout the process."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Customer Stories</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Car Buyer",
                image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
                testimonial: "Car3 ONE made buying my first car incredibly easy. The platform connected me with trusted dealers and guided me through every step."
              },
              {
                name: "Mike Chen",
                role: "Service Provider",
                image: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400",
                testimonial: "As a mechanic, Car3 ONE has transformed my business. I now reach more customers and manage appointments seamlessly."
              },
              {
                name: "Emily Rodriguez",
                role: "Car Enthusiast",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
                testimonial: "The community aspect is amazing! I've connected with fellow car enthusiasts and learned so much about maintenance and upgrades."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  />
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">"{testimonial.testimonial}"</p>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Flexible Pricing</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're an individual user or a business, we have the perfect plan for your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Individual",
                price: "Free",
                description: "Perfect for personal automotive needs",
                features: [
                  "Basic vehicle search",
                  "Community access",
                  "Standard support",
                  "Mobile app access",
                  "Basic profile"
                ]
              },
              {
                name: "Professional",
                price: "$29/month",
                description: "Ideal for dealers and service providers",
                features: [
                  "Advanced analytics",
                  "Priority listings",
                  "Custom branding",
                  "API access",
                  "Priority support",
                  "Lead management"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "Tailored solutions for large organizations",
                features: [
                  "Custom integrations",
                  "Dedicated support",
                  "White-label options",
                  "Advanced security",
                  "Custom features",
                  "SLA guarantee"
                ]
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 border-2' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">{plan.price}</div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => {
                      if (plan.price === 'Custom') {
                        // Scroll to contact section
                        const contactEl = document.getElementById('contact');
                        if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        openModal('signup');
                      }
                    }}
                  >
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </Button>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Get In Touch</Badge>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Automotive Experience?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of users who have already revolutionized their automotive journey with Car3 ONE.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone Support</div>
                    <div className="text-gray-600">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email Support</div>
                    <div className="text-gray-600">support@car3one.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Online Support</div>
                    <div className="text-gray-600">24/7 Live Chat Available</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl">Start Your Journey Today</CardTitle>
                <CardDescription>
                  Create your account and experience the future of automotive.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => openModal('signup')}>
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Car className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">Car3 ONE</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing the automotive industry with innovative technology and seamless user experiences.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 Car3 ONE. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}