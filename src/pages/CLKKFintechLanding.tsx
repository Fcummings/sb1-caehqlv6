import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { Zap, Smartphone, BarChart, Shield, ChevronDown, ChevronUp } from "lucide-react"
import { saveIconAsPNG } from "@/utils/saveIcon"
import Logo from "@/components/Logo"
import AnimatedTagline from "@/components/AnimatedTagline"

export default function CLKKFintechLanding() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setEmail("")
  }

  const handleJoinClick = () => {
    navigate('/signup')
  }

  const handleSaveLogo = () => {
    saveIconAsPNG()
  }

  const faqs = [
    {
      question: "How does CLKK ensure transaction security?",
      answer: "CLKK utilizes advanced encryption and blockchain technology to ensure all transactions are secure, transparent, and immutable."
    },
    {
      question: "Can CLKK integrate with existing POS systems?",
      answer: "Yes, CLKK is designed to seamlessly integrate with most modern POS systems, making adoption easy for businesses."
    },
    {
      question: "What are the fees associated with using CLKK?",
      answer: "CLKK offers competitive rates with no hidden fees. Businesses pay a small percentage per transaction, significantly lower than traditional payment processors."
    },
    {
      question: "How quickly are funds available after a transaction?",
      answer: "With CLKK, funds are available instantly. Our real-time settlement ensures you have access to your money immediately after each transaction."
    }
  ]

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <header className="w-full max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="flex flex-col items-center justify-center">
          <div 
            id="clkk-logo"
            className="group cursor-pointer transition-transform hover:scale-105"
            onClick={handleSaveLogo}
            title="Click to download logo"
          >
            <Logo />
          </div>
          <p className="mt-6 mb-4 text-2xl font-light text-gray-300">Next-Generation Payment Solutions</p>
          <AnimatedTagline />
          <Button 
            onClick={handleJoinClick}
            className="mt-8 bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Join the Future of Payments
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <section className="w-full py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Why Choose CLKK?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Zap, title: "Instant Payments", description: "Real-time transactions and settlements" },
              { icon: Smartphone, title: "User-Friendly", description: "Intuitive mobile app for seamless payments" },
              { icon: BarChart, title: "Business Insights", description: "Advanced analytics for informed decisions" },
              { icon: Shield, title: "Secure & Compliant", description: "Bank-grade security and regulatory compliance" }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-600 hover:shadow-xl">
                <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-700 rounded-lg transition-all duration-300">
                <button
                  className="flex w-full items-center justify-between p-4 text-left font-semibold"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  {faq.question}
                  {expandedFaq === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {expandedFaq === index && (
                  <div className="p-4 pt-0 text-gray-300">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="mb-8 text-4xl font-bold">Ready to Transform Your Payment Experience?</h2>
          <p className="mb-8 text-xl text-gray-200">Join the CLKK revolution and experience seamless payments</p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white text-gray-900 placeholder-gray-500"
              />
              <Button type="submit" className="bg-gray-900 hover:bg-gray-800 transition-colors duration-300">
                Get Early Access
              </Button>
            </div>
          </form>
          {isSubmitted && (
            <p className="mt-4 text-gray-200">Thank you for your interest! We'll be in touch soon.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <Link to="/" className="inline-block">
                <Logo className="scale-75 origin-left" />
              </Link>
              <p className="text-gray-400 mt-4">Revolutionizing payments with cutting-edge fintech solutions.</p>
            </div>
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">Features</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">For Businesses</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">Support</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <Link key={social} to="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    <span className="sr-only">{social}</span>
                    <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CLKK. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}