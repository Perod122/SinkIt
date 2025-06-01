import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, TrendingUp, DollarSign, PieChart, Bell, Users, CheckCircle, Star, Zap, Lock, BarChart3, Target, Calendar, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SinkIt
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#benefits" className="text-gray-600 hover:text-blue-600 transition-all duration-200 font-medium hover:scale-105">Benefits</a>
              <a href="#developer" className="text-gray-600 hover:text-blue-600 transition-all duration-200 font-medium hover:scale-105">About</a>
            </div>
            <div className="flex space-x-4">
              <Link href="/login">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 font-semibold">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-12">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-indigo-100/30 to-transparent rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-blue-200/50">
                  <Zap className="w-4 h-4" />
                  <span>Smart Financial Planning Made Simple</span>
                </div>
                <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Build Your
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block"> Financial Future</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Create systematic savings plans, track your progress, and achieve your financial goals with our intelligent sinking fund management system powered by modern technology.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <Link href="/login">
                  <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105">
                    <span>Start Building Your Fund</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
              <div className="flex items-center space-x-8 text-sm text-gray-500 pt-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Bank-level security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">End-to-end encryption</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200/50">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Emergency Fund</h3>
                        <p className="text-sm text-gray-600">Goal: ₱10,000</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">68%</div>
                      <div className="text-sm text-gray-600">Complete</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full shadow-sm" style={{width: '68%'}}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₱6,800 saved</span>
                      <span>₱3,200 remaining</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200/50">
                      <div className="text-2xl font-bold text-blue-600">₱500</div>
                      <div className="text-sm text-gray-600">Monthly Goal</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200/50">
                      <div className="text-2xl font-bold text-green-600">6 mo</div>
                      <div className="text-sm text-gray-600">Remaining</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Next contribution: Dec 15</span>
                    </div>
                    <Bell className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl transform rotate-2 opacity-10 scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-3xl transform -rotate-1 opacity-10 scale-110"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits/Testimonials Section */}
      <section id="benefits" className="py-14 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
              <Users className="w-4 h-4" />
              <span>User Success Stories</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900">Loved by Thousands</h2>
            <p className="text-xl text-gray-600">See how SinkIt has helped people achieve their financial goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rey Aaron Buaya",
                role: "Software Engineer",
                avatar: "RB",
                content: "SinkIt helped me save ₱15,000 for my dream vacation to Europe. The automated savings made it so easy!",
                rating: 5
              },
              {
                name: "Kyle Andre Lim",
                role: "Software Developer",
                avatar: "KL",
                content: "I've built multiple sinking funds for different goals. The progress tracking keeps me motivated every day.",
                rating: 5
              },
              {
                name: "Brayl James Amaquin",
                role: "Software Developer",
                avatar: "BA",
                content: "The smart reminders and goal setting features transformed how I approach saving. Highly recommended!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
            
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 text-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold">Ready to Start Your Financial Journey?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Contact Jasper Eldrich Ballesteros for an account and start saving smarter today.
            </p>
          </div>
        </div>
      </section>
      {/* Developer Profile Section */}
      <section id="developer" className="py-14 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            {/* Section Header */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-blue-200 px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
                <span>👨‍💻</span>
                <span>Meet the Developer</span>
              </div>
            </div>

            {/* Developer Profile Card */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
                <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
                  {/* Profile Photo */}
                  <div className="relative flex-shrink-0">
                    <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white/30 bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                      <Image 
                        src="/perods.png" 
                        alt="Jasper Eldrich Ballesteros" 
                        width={192} 
                        height={192} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Developer Info */}
                  <div className="text-center lg:text-left space-y-6 flex-1">
                    <div>
                      <h3 className="text-4xl font-bold text-white mb-2">Jasper Eldrich Ballesteros</h3>
                      <p className="text-xl text-blue-200 font-semibold">Full-Stack Developer & Software Engineer</p>
                    </div>

                    {/* Personal Quote */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <p className="text-blue-100 italic text-lg leading-relaxed">
                        "I created SinkingFund because I believe everyone deserves simple, effective tools to achieve their financial goals. 
                        As a developer, I understand the importance of clean, user-friendly interfaces that actually work."
                      </p>
                    </div>

                    {/* Connect Section */}
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center lg:justify-start">
                      <Link href="https://www.linkedin.com/in/jasper-eldrich-ballesteros-8b2540303/" target="_blank">
                        <button className="bg-white text-blue-900 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 transform hover:scale-105">
                          Connect on LinkedIn
                        </button>
                      </Link>
                      <Link href="https://github.com/perod122" target="_blank">
                        <button className="border-2 border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200">
                          View GitHub
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mt-12 pt-8 border-t border-white/20">
                  <p className="text-blue-200 mb-6 text-center text-lg">Built with modern technologies:</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Node.js', 'Vercel'].map((tech, index) => (
                      <span key={index} className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-medium border border-white/30 hover:bg-white/30 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-400/30 rounded-full"></div>
              <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-indigo-400/30 rounded-full"></div>
              <div className="absolute top-12 -right-8 w-6 h-6 bg-blue-300/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-50 to-blue-50 text-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         
          <div className="text-center text-gray-400">
            <p>&copy; 2025 SinkIt. All rights reserved. Built with ❤️ by Jasper Eldrich Ballesteros</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

