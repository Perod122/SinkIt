import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, TrendingUp, DollarSign, PieChart, Bell, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SinkingFund
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#benefits" className="text-gray-600 hover:text-blue-600 transition-colors">Benefits</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>
            <div className="flex space-x-4">
              <Link href="/login">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  <span>🚀</span>
                  <span>Smart Financial Planning</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Build Your
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Financial Future</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Create systematic savings plans, track your progress, and achieve your financial goals with our intelligent sinking fund management system.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/login">
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2">
                    <span>Start Building Your Fund</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/login">
                  <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors">
                    Watch Demo
                  </button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Bank-level security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>10,000+ users</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Emergency Fund</h3>
                    <span className="text-green-600 font-medium">68% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full" style={{width: '68%'}}></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-gray-900">$6,800</div>
                      <div className="text-sm text-gray-600">Current Amount</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600">$10,000</div>
                      <div className="text-sm text-gray-600">Target Goal</div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Monthly contribution: $500</span>
                    <span>6 months remaining</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl transform rotate-3 opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Profile Section */}
      <section id="developer" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            {/* Section Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <span>👨‍💻</span>
                <span>Meet the Developer</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900">Built by Monta</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                A passionate full-stack developer who believes in creating simple, powerful solutions for real-world financial challenges.
              </p>
            </div>

            {/* Developer Profile Card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-12 shadow-xl">
                <div className="flex flex-col items-center space-y-8">
                  {/* Profile Photo */}
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
                      <span className="text-5xl font-bold text-white">M</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  </div>

                  {/* Developer Info */}
                  <div className="text-center space-y-4">
                    <h3 className="text-3xl font-bold text-gray-900">Jasper Eldrich Ballesteros</h3>
                    <p className="text-lg text-blue-600 font-semibold">Full-Stack Developer & Financial Planning Enthusiast</p>
                    
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                      <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                        <div className="text-sm text-gray-600">Experience</div>
                        <div className="font-semibold text-gray-900">5+ Years</div>
                      </div>
                      <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                        <div className="text-sm text-gray-600">Specialization</div>
                        <div className="font-semibold text-gray-900">React & Node.js</div>
                      </div>
                      <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                        <div className="text-sm text-gray-600">Location</div>
                        <div className="font-semibold text-gray-900">Remote</div>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="w-full max-w-md">
                    <p className="text-sm text-gray-600 mb-4 text-center">Built with modern technologies:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Node.js'].map((tech, index) => (
                        <span key={index} className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm border border-blue-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Personal Quote */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 max-w-2xl">
                    <p className="text-gray-700 italic text-center">
                      "I created SinkingFund because I believe everyone deserves simple, effective tools to achieve their financial goals. 
                      As a developer, I understand the importance of clean, user-friendly interfaces that actually work."
                    </p>
                  </div>

                  {/* Connect Section */}
                  <div className="flex space-x-4">
                    <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
                      Connect on LinkedIn
                    </button>
                    <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                      View GitHub
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-indigo-400 rounded-full opacity-30"></div>
              <div className="absolute top-8 -right-6 w-4 h-4 bg-blue-300 rounded-full opacity-25"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Why Choose SinkingFund?</h2>
                <p className="text-xl text-blue-100">
                  Join thousands of users who have successfully achieved their financial goals with our proven system.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    number: "95%",
                    label: "Success Rate",
                    description: "of users reach their financial goals"
                  },
                  {
                    number: "$2.5M+",
                    label: "Total Saved",
                    description: "by our community of savers"
                  },
                  {
                    number: "6 months",
                    label: "Average Time",
                    description: "to build emergency fund"
                  }
                ].map((stat, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-3xl font-bold text-yellow-400">{stat.number}</div>
                    <div>
                      <div className="font-semibold text-lg">{stat.label}</div>
                      <div className="text-blue-100">{stat.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 space-y-6">
                <h3 className="text-2xl font-bold mb-6">Popular Sinking Fund Goals</h3>
                {[
                  { name: "Emergency Fund", amount: "$10,000", progress: 75 },
                  { name: "Vacation Fund", amount: "$5,000", progress: 45 },
                  { name: "Car Replacement", amount: "$15,000", progress: 30 },
                  { name: "Home Down Payment", amount: "$50,000", progress: 60 }
                ].map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{goal.name}</span>
                      <span className="text-sm">{goal.amount}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{width: `${goal.progress}%`}}
                      ></div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Start Your Financial Journey?</h2>
          <p className="text-xl text-gray-300">
            Join thousands of users who are already building their financial future with SinkingFund.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Link href="/login">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-200">
                Start Your Free Trial
              </button>
            </Link>
            <Link href="/login">
              <button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors">
                Schedule Demo
              </button>
            </Link>
          </div>
          <p className="text-sm text-gray-400">
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  SinkingFund
                </span>
              </div>
              <p className="text-gray-600">
                Empowering individuals and families to achieve their financial goals through systematic savings.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 SinkingFund. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

