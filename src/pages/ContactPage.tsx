import React, { useState } from 'react';
import { Send } from 'lucide-react';
import SuccessMessage from '../components/SuccessMessage';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setShowSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
    
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">Contact</h1>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Ben Helin Olgaç. 2004 Mardin doğumlu, kendimi ifade etmeyi tek bir yola sığdıramayan multidisipliner çalışan bir sanatçıyım. Mimar Sinan Güzel Sanatlar Üniversitesi, Geleneksel bölümü öğrencisiyim. Görsel sanatları, dijital kolajı, metni, sesi ve bazen de hazır materyalleri bir araya getirerek; hem bireysel hem toplumsal kırılmaları görünür kılmaya çalışıyorum. İşlerimde duygu, kimlik, suç, aidiyet ve maneviyat gibi temaları işlerken; bu kavramların insanın ruhunda bıraktığı izleri görselleştiriyor, zaman zaman da içsel bir hesaplaşma alanı yaratıyorum. Parçalanmış formlar, bulanık yüzler, çarpık kompozisyonlar ve yazı katmanlarıyla; sizi rahatsız edecek kadar dürüst ama bir o kadar da duygusal bir yüzleşmeye davet ediyorum. Sanat benim için sadece üretmek değil, ifade biçimi, sorgulamak ve direnmek demek. Estetikten çok hakikati arıyorum. Her çalışmambir isyan, kişisel bir ağıt ve aynı zamanda evrensel bir çağrı. bu yazı olmalı
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {showSuccess ? (
            <div className="bg-green-50 rounded-lg p-8">
              <SuccessMessage message="Your message has been sent successfully! I'll get back to you soon." />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                  placeholder="Tell me about your vision, commission ideas, or any questions you have..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;