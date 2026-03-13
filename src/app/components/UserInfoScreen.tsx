import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { ChevronRight, Calendar, Laptop, MessageSquare, TrendingUp, CheckSquare, Lightbulb } from 'lucide-react';
import nelissaLogo from 'figma:asset/df61b6f2193a78afb780969de31b920fd241cf00.png';

interface UserInfoScreenProps {
  onContinue: (name: string, email: string) => void;
  onAdminClick?: () => void;
  onModuleClick?: () => void;
}

export function UserInfoScreen({ onContinue, onAdminClick, onModuleClick }: UserInfoScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const isFormValid = name.trim().length > 0 && email.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onContinue(name, email);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-8 bg-white relative overflow-hidden">
      {/* ========== BACKGROUND DECORATIVE ELEMENTS ========== */}
      
      {/* Abstract Shapes - Soft Circles and Dots - MORE VISIBLE */}
      
      {/* Top Left - Large Purple Circle */}
      <div 
        className="absolute pointer-events-none rounded-full"
        style={{
          top: '5%',
          left: '2%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(135deg, rgba(174, 84, 255, 0.15), rgba(196, 181, 253, 0.12))',
          filter: 'blur(25px)',
          zIndex: 0
        }}
      />
      
      {/* Top Right - Orange Gradient Circle */}
      <div 
        className="absolute pointer-events-none rounded-full"
        style={{
          top: '8%',
          right: '5%',
          width: '240px',
          height: '240px',
          background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.18), rgba(253, 186, 116, 0.12))',
          filter: 'blur(28px)',
          zIndex: 0
        }}
      />
      
      {/* Bottom Left - Yellow Circle */}
      <div 
        className="absolute pointer-events-none rounded-full"
        style={{
          bottom: '12%',
          left: '8%',
          width: '180px',
          height: '180px',
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.16), rgba(254, 240, 138, 0.12))',
          filter: 'blur(22px)',
          zIndex: 0
        }}
      />
      
      {/* Bottom Right - Green Circle */}
      <div 
        className="absolute pointer-events-none rounded-full"
        style={{
          bottom: '8%',
          right: '4%',
          width: '220px',
          height: '220px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(134, 239, 172, 0.12))',
          filter: 'blur(24px)',
          zIndex: 0
        }}
      />
      
      {/* Additional Middle Purple Circle */}
      <div 
        className="absolute pointer-events-none rounded-full"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(174, 84, 255, 0.06) 0%, transparent 70%)',
          filter: 'blur(35px)',
          zIndex: 0
        }}
      />
      
      {/* Small Decorative Dots - MORE VISIBLE */}
      <div 
        className="absolute pointer-events-none rounded-full"
        style={{
          top: '25%',
          left: '15%',
          width: '14px',
          height: '14px',
          backgroundColor: 'rgba(174, 84, 255, 0.35)',
          zIndex: 1
        }}
      />
      <div 
        className="absolute pointer-events-none rounded-full"
        style={{
          top: '70%',
          left: '12%',
          width: '10px',
          height: '10px',
          backgroundColor: 'rgba(251, 191, 36, 0.4)',
          zIndex: 1
        }}
      />
      <div 
        className="absolute pointer-events-none rounded-full"
        style={{
          top: '35%',
          right: '18%',
          width: '12px',
          height: '12px',
          backgroundColor: 'rgba(251, 146, 60, 0.38)',
          zIndex: 1
        }}
      />
      <div 
        className="absolute pointer-events-none rounded-full"
        style={{
          bottom: '28%',
          right: '15%',
          width: '16px',
          height: '16px',
          backgroundColor: 'rgba(16, 185, 129, 0.35)',
          zIndex: 1
        }}
      />
      
      {/* Additional decorative dots */}
      <div 
        className="absolute pointer-events-none rounded-full"
        style={{
          top: '60%',
          left: '18%',
          width: '8px',
          height: '8px',
          backgroundColor: 'rgba(251, 146, 60, 0.3)',
          zIndex: 1
        }}
      />
      <div 
        className="absolute pointer-events-none rounded-full"
        style={{
          top: '20%',
          right: '25%',
          width: '10px',
          height: '10px',
          backgroundColor: 'rgba(174, 84, 255, 0.32)',
          zIndex: 1
        }}
      />
      
      {/* Curved Abstract Lines - MORE VISIBLE */}
      <svg 
        className="absolute pointer-events-none"
        style={{ top: '15%', left: '5%', width: '120px', height: '120px', opacity: 0.15, zIndex: 1 }}
        viewBox="0 0 120 120"
        fill="none"
      >
        <path 
          d="M20 60 Q 60 20, 100 60" 
          stroke="#AE54FF" 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
      </svg>
      
      <svg 
        className="absolute pointer-events-none"
        style={{ bottom: '20%', right: '8%', width: '100px', height: '100px', opacity: 0.18, zIndex: 1 }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <path 
          d="M10 50 Q 50 10, 90 50 T 90 90" 
          stroke="#10B981" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>
      
      <svg 
        className="absolute pointer-events-none"
        style={{ top: '30%', right: '12%', width: '90px', height: '90px', opacity: 0.16, zIndex: 1 }}
        viewBox="0 0 90 90"
        fill="none"
      >
        <path 
          d="M10 45 Q 45 10, 80 45" 
          stroke="#FB923C" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>
      
      {/* Office Icons - STATIC (NO ANIMATION), VISIBLE, COLORFUL */}
      
      {/* Top Left - Laptop Icon */}
      <div
        className="absolute pointer-events-none"
        style={{ top: '10%', left: '6%', zIndex: 1 }}
      >
        <Laptop className="w-20 h-20" style={{ color: '#AE54FF', opacity: 0.25 }} strokeWidth={1.5} />
      </div>
      
      {/* Top Right - Calendar Icon */}
      <div
        className="absolute pointer-events-none"
        style={{ top: '12%', right: '8%', zIndex: 1 }}
      >
        <Calendar className="w-24 h-24" style={{ color: '#FB923C', opacity: 0.28 }} strokeWidth={1.5} />
      </div>
      
      {/* Middle Left - Lightbulb Icon */}
      <div
        className="absolute pointer-events-none"
        style={{ top: '45%', left: '4%', zIndex: 1 }}
      >
        <Lightbulb className="w-18 h-18" style={{ color: '#FBBF24', opacity: 0.26 }} strokeWidth={1.5} />
      </div>
      
      {/* Middle Right - Message Icon */}
      <div
        className="absolute pointer-events-none"
        style={{ top: '48%', right: '4%', zIndex: 1 }}
      >
        <MessageSquare className="w-20 h-20" style={{ color: '#AE54FF', opacity: 0.24 }} strokeWidth={1.5} />
      </div>
      
      {/* Bottom Left - CheckSquare Icon */}
      <div
        className="absolute pointer-events-none"
        style={{ bottom: '16%', left: '7%', zIndex: 1 }}
      >
        <CheckSquare className="w-22 h-22" style={{ color: '#10B981', opacity: 0.27 }} strokeWidth={1.5} />
      </div>
      
      {/* Bottom Right - TrendingUp Icon */}
      <div
        className="absolute pointer-events-none"
        style={{ bottom: '10%', right: '6%', zIndex: 1 }}
      >
        <TrendingUp className="w-24 h-24" style={{ color: '#FB923C', opacity: 0.25 }} strokeWidth={1.5} />
      </div>
      
      {/* Wave Shapes */}
      <svg 
        className="absolute pointer-events-none"
        style={{ top: '40%', left: '3%', width: '140px', height: '80px', opacity: 0.05 }}
        viewBox="0 0 140 80"
        fill="none"
      >
        <path 
          d="M0 40 Q 35 20, 70 40 T 140 40" 
          stroke="rgba(251, 146, 60, 0.4)" 
          strokeWidth="2" 
          strokeLinecap="round"
          fill="none"
        />
        <path 
          d="M0 55 Q 35 35, 70 55 T 140 55" 
          stroke="rgba(251, 146, 60, 0.3)" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* ========== MAIN CONTENT (UNCHANGED) ========== */}
      <div className="w-full max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Branding & Welcome */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Nelisa Logo */}
            <div className="flex items-center gap-3">
              <img 
                src={nelissaLogo} 
                alt="Nelisa" 
                className="h-7"
              />
            </div>

            {/* Welcome Text */}
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Začni zde
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed max-w-md">
                Pro pokračování v testu potřebujeme tvůj <span className="font-bold text-gray-900">pracovní (firemní) e-mail</span>. Slouží k identifikaci účastníka a přiřazení výsledků testu.
              </p>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-10">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Přihlásit se do testu</h2>
                <p className="text-sm text-gray-600">Vyplň prosím své údaje pro pokračování</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Jméno
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border focus:outline-none transition-all text-base"
                    style={{
                      backgroundColor: '#FFFFFF',
                      color: '#111111',
                      borderWidth: '1px',
                      borderColor: '#E5E7EB'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderWidth = '2px';
                      e.currentTarget.style.borderColor = '#AE54FF';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(174, 84, 255, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderWidth = '1px';
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    placeholder="Zadejte své jméno"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Pracovní e-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border focus:outline-none transition-all text-base"
                    style={{
                      backgroundColor: '#FFFFFF',
                      color: '#111111',
                      borderWidth: '1px',
                      borderColor: '#E5E7EB'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderWidth = '2px';
                      e.currentTarget.style.borderColor = '#AE54FF';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(174, 84, 255, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderWidth = '1px';
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    placeholder="Zadejte pracovní e-mail (např. jmeno@firma.cz)"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={
                      isFormValid
                        ? { backgroundColor: '#9333EA', color: '#ffffff', borderRadius: '12px' }
                        : { backgroundColor: '#e5e7eb', color: '#9ca3af', borderRadius: '12px' }
                    }
                    onMouseEnter={(e) => {
                      if (isFormValid) {
                        e.currentTarget.style.backgroundColor = '#7C3AED';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isFormValid) {
                        e.currentTarget.style.backgroundColor = '#9333EA';
                      }
                    }}
                  >
                    Pokračovat
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </form>

              {/* Privacy note */}
              <p className="text-xs text-gray-500 mt-6 text-center">
                Tvé údaje používáme pouze pro účely tohoto kurzu.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Module button — above Admin */}
      {onModuleClick && (
        <button
          onClick={onModuleClick}
          className="absolute z-10 flex items-center gap-2 text-xs font-semibold text-white transition-all hover:opacity-90"
          style={{
            bottom: onAdminClick ? '36px' : '16px',
            right: '24px',
            background: 'linear-gradient(135deg, #AE54FF 0%, #8B35D6 100%)',
            border: 'none',
            borderRadius: '20px',
            padding: '7px 16px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(174,84,255,0.35)',
            fontFamily: 'Poppins, sans-serif'
          }}
        >
          📱 Jak fungují reklamy na soc. sítích
        </button>
      )}

      {/* Admin access — subtle link in bottom-right corner */}
      {onAdminClick && (
        <button
          onClick={onAdminClick}
          className="absolute bottom-4 right-6 text-xs text-gray-400 hover:text-gray-600 transition-colors z-10"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Admin
        </button>
      )}

      {/* Input placeholder styling */}
      <style>{`
        input::placeholder {
          color: #9CA3AF !important;
          opacity: 1 !important;
        }
        
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px #FFFFFF inset !important;
          -webkit-text-fill-color: #111111 !important;
          box-shadow: 0 0 0px 1000px #FFFFFF inset !important;
        }
      `}</style>
    </div>
  );
}