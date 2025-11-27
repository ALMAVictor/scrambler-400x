import { useState, useEffect, useRef } from 'react'
import specsData from './data/scramblerSpecs.json'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeSpecTab, setActiveSpecTab] = useState('motor')
  const [selectedColor, setSelectedColor] = useState('baja-orange')
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const heroVideoRef = useRef(null)

  // Parallax effect no hero
  useEffect(() => {
    const handleScroll = () => {
      if (heroVideoRef.current) {
        const scrolled = window.pageYOffset
        heroVideoRef.current.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer para animações de scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-slide-up')
    animatedElements.forEach(el => observer.observe(el))

    return () => {
      animatedElements.forEach(el => observer.unobserve(el))
    }
  }, [])
  
  // Array de vídeos de review
  const reviewVideos = [
    {
      id: 'video1',
      youtubeId: 'Z4jeGx7be78',
      startTime: 0,
      title: 'Review Completo',
      description: 'Análise detalhada da Scrambler 400X'
    },
    {
      id: 'video2',
      youtubeId: 'MfDYXfKRiyA',
      startTime: 8,
      title: 'Impressões e Viagem',
      description: 'Teste real em estrada'
    }
  ]

  const specifications = [
    { value: '398 cc', label: 'Cilindrada' },
    { value: '≈ 39 cv', label: 'Potência' },
    { value: '6 marchas', label: 'Câmbio' },
    { value: 'ABS', label: 'Segurança' },
  ]

  const specTabs = [
    { id: 'motor', label: 'Motor & Transmissão' },
    { id: 'chassi', label: 'Chassi & Suspensão' },
    { id: 'dimensoes', label: 'Dimensões & Ergonomia' },
    { id: 'equipamentos', label: 'Equipamentos' },
  ]

  const colorOptions = [
    { 
      id: 'khaki-green', 
      name: 'Matt Khaki Green', 
      color: '#2F4A3A',
      image: '/scrambler-400x-verde/scrambler 400 x_my24_matt khaki green_rhs.avif'
    },
    { 
      id: 'baja-orange', 
      name: 'Baja Orange', 
      color: '#D97706',
      image: '/scrambler-laranja-360/scrambler-laranja-grau1.avif'
    },
    { 
      id: 'phantom-black', 
      name: 'Phantom Black', 
      color: '#0C0F12',
      image: '/scrambler-400x-preta/scrambler-400x-preta1.avif'
    },
  ]

  const galleryImages = [
    { id: 1, src: '/scrambler-wallpaper-oficial.avif', alt: 'Triumph Scrambler 400X - Moto scrambler disponível em São José do Rio Preto' },
    { id: 2, src: '/scrambler-praia-wallpaper.jpeg', alt: 'Scrambler 400X na praia - Triumph em São José do Rio Preto' },
    { id: 3, src: '/scrambler-wallpaper-7.jpeg', alt: 'Scrambler 400X - Concessionária Triumph Euro Motors Rio Preto' },
    { id: 4, src: '/scrambler-wallpaper3.jpeg', alt: 'Triumph Scrambler 400X - Moto 400cc em São José do Rio Preto' },
    { id: 5, src: '/wallpaper-scrambler.jpeg', alt: 'Scrambler 400X - Test ride disponível em São José do Rio Preto' },
    { id: 6, src: '/scrambler-wallpaper-6.jpeg', alt: 'Triumph Scrambler 400X - Preço e ficha técnica em São José do Rio Preto' },
  ]


  return (
    <div className="min-h-screen bg-carbon-black text-warm-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 parallax overflow-hidden">
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110"
            poster="/landing-scrambler/public/scrambler-wallpaper-7.jpeg"
            aria-label="Vídeo de fundo da Scrambler 400X"
          >
            {/* Tente carregar vídeo local primeiro, depois fallback para vídeo online */}
            <source src="/hero-video.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            {/* Fallback para navegadores que não suportam vídeo */}
            <img 
              src="/landing-scrambler/public/scrambler-wallpaper-7.jpeg" 
              alt="Triumph Scrambler 400X"
              className="w-full h-full object-cover"
            />
          </video>
          {/* Overlay sutil para legibilidade do texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-carbon-black/80 via-carbon-black/40 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-6 max-w-[1100px] py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Text Content */}
            <div className="space-y-8 md:space-y-12 animate-fade-up">
              {/* Logo Triumph */}
              <div className="flex justify-center animate-fade-up mb-4">
              <img 
                src="/logo-sem-fundo1-triumph.png" 
                alt="Triumph Euro Motors - Concessionária Triumph em São José do Rio Preto" 
                className="h-28 md:h-40 lg:h-48 w-auto object-contain drop-shadow-2xl filter brightness-110"
              />
              </div>

              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-warm-white leading-[1.1] tracking-tight drop-shadow-2xl relative">
                Scrambler <span className="text-warm-white relative inline-block">400X</span>
              </h1>
              
              <div className="space-y-4">
                <p className="font-display text-2xl md:text-3xl lg:text-4xl text-warm-white tracking-wide">
                  Liberdade em duas rodas
                </p>
                <p className="font-body text-lg md:text-xl lg:text-2xl text-titanium-gray leading-relaxed max-w-2xl mx-auto">
                  Design clássico. Performance moderna. Para quem vive a estrada com propósito.
                </p>
                <p className="font-body text-base md:text-lg text-titanium-gray/80 leading-relaxed max-w-2xl mx-auto">
                  Disponível em São José do Rio Preto na <span className="text-warm-white font-semibold">Triumph Euro Motors</span>
                </p>
              </div>

              {/* CTA Buttons - Premium Liquid Glass */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <button 
                  className="group relative text-warm-white font-body font-semibold px-10 py-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-titanium-gray/40 text-base md:text-lg overflow-hidden button-premium-shine button-premium-pulse button-ripple"
                  style={{
                    background: 'rgba(12, 15, 18, 0.35)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(243, 244, 242, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.4)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(243, 244, 242, 0.3), 0 12px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(243, 244, 242, 0.3)'
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.2)'
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.15)'
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  }}
                  aria-label="Agende um test-ride"
                >
                  <span className="flex items-center gap-2 relative z-10">
                    Agende um test-ride
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                <button 
                  className="group relative border text-warm-white font-body font-semibold px-10 py-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-titanium-gray/30 text-base md:text-lg overflow-hidden button-premium-shine button-ripple"
                  style={{
                    background: 'rgba(12, 15, 18, 0.25)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(243, 244, 242, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.3)'
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(243, 244, 242, 0.2), 0 12px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.25)'
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.15)'
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  }}
                  aria-label="Ver galeria"
                  onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="relative z-10">Ver galeria</span>
                </button>
                <button 
                  className="group relative border text-warm-white font-body font-semibold px-10 py-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-titanium-gray/30 text-base md:text-lg overflow-hidden button-premium-shine button-ripple"
                  style={{
                    background: 'rgba(12, 15, 18, 0.25)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(243, 244, 242, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.3)'
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(243, 244, 242, 0.2), 0 12px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.25)'
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.15)'
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  }}
                  aria-label="Ver ficha técnica"
                  onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="relative z-10">Ficha Técnica</span>
                </button>
              </div>

              {/* Scroll Indicator */}
              <div className="pt-12 animate-bounce">
                <svg className="w-6 h-6 mx-auto text-titanium-gray/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Viewer & Color Customizer */}
      <section className="py-section-mobile md:py-section bg-carbon-black/30">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <h2 className="font-display text-display-md md:text-display-lg text-warm-white mb-8 md:mb-12 text-center">
            Monte Sua Scrambler 400X
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image Viewer */}
            <div className="relative">
              <div 
                className="relative aspect-square bg-white rounded-3xl overflow-hidden transition-all duration-300"
                style={{
                  border: '2px solid rgba(243, 244, 242, 0.6)',
                  boxShadow: '0 0 20px rgba(243, 244, 242, 0.3), 0 0 40px rgba(243, 244, 242, 0.15), 0 12px 48px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(243, 244, 242, 0.4)'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={colorOptions.find(c => c.id === selectedColor)?.image || '/scrambler-sem-fundo.avif'}
                    alt={`Scrambler 400X ${colorOptions.find(c => c.id === selectedColor)?.name}`}
                    className="w-full h-full object-contain p-0 transition-opacity duration-300 scale-150"
                    style={{ 
                      filter: selectedColor === 'phantom-black' ? 'brightness(0.7)' : 'none'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Color Selector & Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-display-sm text-warm-white mb-6">Escolha a Cor</h3>
                <div className="grid grid-cols-3 gap-4">
                  {colorOptions.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className="group relative p-4 rounded-2xl border-2 transition-all duration-500 overflow-hidden"
                      style={{
                        background: selectedColor === color.id 
                          ? 'rgba(12, 15, 18, 0.5)' 
                          : 'rgba(12, 15, 18, 0.3)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        border: selectedColor === color.id
                          ? '2px solid rgba(243, 244, 242, 0.6)'
                          : '2px solid rgba(243, 244, 242, 0.2)',
                        boxShadow: selectedColor === color.id
                          ? color.id === 'khaki-green'
                            ? '0 0 25px rgba(85, 107, 47, 0.6), 0 0 50px rgba(85, 107, 47, 0.4), 0 0 75px rgba(85, 107, 47, 0.2), 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(243, 244, 242, 0.3)'
                            : color.id === 'baja-orange'
                            ? '0 0 25px rgba(217, 119, 6, 0.6), 0 0 50px rgba(217, 119, 6, 0.4), 0 0 75px rgba(217, 119, 6, 0.2), 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(243, 244, 242, 0.3)'
                            : '0 0 25px rgba(12, 15, 18, 0.7), 0 0 50px rgba(12, 15, 18, 0.5), 0 0 75px rgba(12, 15, 18, 0.3), 0 8px 32px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(243, 244, 242, 0.3)'
                          : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedColor !== color.id) {
                          e.currentTarget.style.border = '2px solid rgba(243, 244, 242, 0.4)'
                          e.currentTarget.style.boxShadow = '0 0 10px rgba(243, 244, 242, 0.3), 0 12px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.2)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedColor !== color.id) {
                          e.currentTarget.style.border = '2px solid rgba(243, 244, 242, 0.2)'
                          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
                        }
                      }}
                    >
                      <div 
                        className="w-full h-20 rounded-lg mb-3 transition-transform group-hover:scale-105"
                        style={{ backgroundColor: color.color }}
                      />
                      <p className={`text-xs font-body text-center transition-colors ${
                        selectedColor === color.id ? 'text-warm-white' : 'text-titanium-gray'
                      }`}>
                        {color.name}
                      </p>
                      {selectedColor === color.id && (
                        <div className="absolute top-2 right-2">
                          <svg className="w-5 h-5 text-warm-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Specs */}
              <div 
                className="rounded-2xl p-6 transition-all duration-300"
                style={{
                  background: 'rgba(12, 15, 18, 0.3)',
                  backdropFilter: 'blur(30px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                  border: '1px solid rgba(243, 244, 242, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
                }}
              >
                <h3 className="font-display text-display-sm text-warm-white mb-4">Especificações Rápidas</h3>
                <div className="grid grid-cols-2 gap-4">
                  {specifications.map((spec, index) => (
                    <div key={index} className="border-b border-titanium-gray/10 pb-3 last:border-0">
                      <div className="font-body text-xs text-titanium-gray mb-1">{spec.label}</div>
                      <div className="font-display text-lg text-warm-white">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div 
                className="rounded-2xl p-6 text-center transition-all duration-300"
                style={{
                  background: 'rgba(12, 15, 18, 0.4)',
                  backdropFilter: 'blur(30px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                  border: '2px solid rgba(243, 244, 242, 0.3)',
                  boxShadow: '0 0 20px rgba(243, 244, 242, 0.2), 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(243, 244, 242, 0.2)'
                }}
              >
                <p className="font-body text-sm text-titanium-gray mb-2">A partir de</p>
                <p className="font-display text-3xl md:text-4xl text-warm-white mb-4">R$ 34.490,00</p>
                <button 
                  className="mt-4 w-full text-warm-white font-body font-semibold px-6 py-3 rounded-xl transition-all duration-300 overflow-hidden button-premium-shine button-ripple"
                  style={{
                    background: 'rgba(12, 15, 18, 0.5)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(243, 244, 242, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.5)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(243, 244, 242, 0.3), 0 12px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(243, 244, 242, 0.3)'
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.3)'
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.2)'
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  }}
                >
                  <span className="relative z-10">Agende um test-ride</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial / Video Review */}
      <section className="py-section-mobile md:py-section">
        <div className="container mx-auto px-6 max-w-[1100px]">
          {/* Testimonial Text Inspirador */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-display-md md:text-display-lg text-warm-white mb-6">
              Mais Que Uma Moto, Uma Experiência
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="font-body text-xl md:text-2xl text-titanium-gray italic leading-relaxed mb-4">
                "A estrada não escolhe seus pilotos. Mas a Scrambler 400X escolhe quem está pronto para viver cada curva, cada trilha, cada momento como se fosse o último."
              </p>
              <p className="font-body text-lg text-warm-white font-medium">
                É sobre liberdade. É sobre descobrir quem você realmente é quando não há nada entre você e o horizonte.
              </p>
            </div>
          </div>

          {/* Video Reviews Grid */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {reviewVideos.map((video) => (
              <div key={video.id} className="relative group">
                <button
                  onClick={() => {
                    setSelectedVideo(video)
                    setIsVideoModalOpen(true)
                  }}
                  className="relative w-full aspect-video rounded-3xl overflow-hidden transition-all duration-500"
                  style={{
                    background: 'rgba(12, 15, 18, 0.12)',
                    backdropFilter: 'blur(50px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(50px) saturate(200%)',
                    border: '2px solid rgba(243, 244, 242, 0.8)',
                    boxShadow: '0 0 20px rgba(243, 244, 242, 0.4), 0 0 40px rgba(243, 244, 242, 0.2), 0 12px 48px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(243, 244, 242, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '2px solid rgba(243, 244, 242, 1)'
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(243, 244, 242, 0.6), 0 0 60px rgba(243, 244, 242, 0.3), 0 16px 64px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(243, 244, 242, 0.4)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '2px solid rgba(243, 244, 242, 0.8)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(243, 244, 242, 0.4), 0 0 40px rgba(243, 244, 242, 0.2), 0 12px 48px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(243, 244, 242, 0.3)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {/* Thumbnail do YouTube */}
                  <img 
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay escuro sutil */}
                  <div className="absolute inset-0 bg-carbon-black/5 group-hover:bg-carbon-black/0 transition-colors duration-300"></div>
                  
                  {/* Play Button - Liquid Glass Ultra Transparente */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 relative"
                      style={{
                        background: 'rgba(243, 244, 242, 0.08)',
                        backdropFilter: 'blur(2px) saturate(200%)',
                        WebkitBackdropFilter: 'blur(2px) saturate(200%)',
                        border: '1px solid rgba(243, 244, 242, 0.15)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
                        zIndex: 20
                      }}
                    >
                      {/* Camada acima do botão */}
                      <div 
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'rgba(243, 244, 242, 0.05)',
                          backdropFilter: 'blur(1px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(1px) saturate(180%)',
                          zIndex: 1
                        }}
                      ></div>
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-warm-white ml-1 relative z-10" fill="currentColor" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }}>
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Video Info - Ultra Transparente */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-3 md:p-4 transition-all duration-300"
                    style={{
                      background: 'rgba(12, 15, 18, 0.05)',
                      backdropFilter: 'blur(1px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(1px) saturate(180%)',
                      borderTop: '1px solid rgba(243, 244, 242, 0.08)',
                    }}
                  >
                    <h3 className="font-display text-base md:text-lg text-warm-white mb-1 font-bold" style={{ 
                      textShadow: '0 3px 20px rgba(0, 0, 0, 1), 0 0 40px rgba(0, 0, 0, 0.8), 0 6px 12px rgba(0, 0, 0, 1), -1px -1px 0 rgba(0, 0, 0, 0.8), 1px 1px 0 rgba(0, 0, 0, 0.8)',
                      letterSpacing: '0.5px',
                      color: '#FFFFFF'
                    }}>
                      {video.title}
                    </h3>
                    <p className="font-body text-xs md:text-sm text-warm-white font-bold" style={{ 
                      textShadow: '0 3px 16px rgba(0, 0, 0, 1), 0 0 30px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(0, 0, 0, 1), -1px -1px 0 rgba(0, 0, 0, 0.8), 1px 1px 0 rgba(0, 0, 0, 0.8)',
                      color: '#FFFFFF'
                    }}>
                      {video.description}
                    </p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{
            background: 'rgba(12, 15, 18, 0.85)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)'
          }}
          onClick={() => {
            setIsVideoModalOpen(false)
            setSelectedVideo(null)
          }}
        >
          <div 
            className="relative w-full max-w-5xl rounded-3xl overflow-hidden transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(12, 15, 18, 0.4)',
              backdropFilter: 'blur(60px) saturate(180%)',
              WebkitBackdropFilter: 'blur(60px) saturate(180%)',
              border: '2px solid rgba(243, 244, 242, 0.8)',
              boxShadow: '0 0 40px rgba(85, 107, 47, 0.4), 0 0 80px rgba(85, 107, 47, 0.25), 0 0 120px rgba(85, 107, 47, 0.15), 0 20px 80px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(243, 244, 242, 0.3)'
            }}
          >
            {/* Close Button - Liquid Glass */}
            <button
              className="absolute top-4 right-4 z-20 text-warm-white rounded-full p-3 transition-all duration-300 hover:scale-110"
              onClick={() => {
                setIsVideoModalOpen(false)
                setSelectedVideo(null)
              }}
              aria-label="Fechar vídeo"
              style={{
                background: 'rgba(12, 15, 18, 0.3)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(243, 244, 242, 0.15)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(243, 244, 242, 0.2)'
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Title - Liquid Glass */}
            <div 
              className="absolute top-4 left-4 z-10 px-4 py-2 rounded-xl"
              style={{
                background: 'rgba(12, 15, 18, 0.3)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(243, 244, 242, 0.1)',
                boxShadow: 'inset 0 1px 0 rgba(243, 244, 242, 0.1)'
              }}
            >
              <h3 className="font-display text-lg text-warm-white" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>{selectedVideo.title}</h3>
            </div>

            {/* YouTube Video */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%', background: 'rgba(12, 15, 18, 0.2)' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-3xl"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&start=${selectedVideo.startTime}&rel=0&modestbranding=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Especificações Visuais - Destaques */}
      <section className="py-section-mobile md:py-section">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <h2 className="font-display text-display-md md:text-display-lg text-warm-white mb-8 md:mb-12 text-center">
            Por Que Escolher a Scrambler 400X?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Card 1 - Potência */}
            <div 
              className="group relative rounded-3xl p-6 md:p-8 transition-all duration-300 animate-fade-up overflow-hidden"
              style={{
                background: 'rgba(12, 15, 18, 0.3)',
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                border: '1px solid rgba(243, 244, 242, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.2)'
                e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(243, 244, 242, 0.2)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.1)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{
                  background: 'rgba(243, 244, 242, 0.08)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(243, 244, 242, 0.15)',
                  boxShadow: 'inset 0 1px 0 rgba(243, 244, 242, 0.2)'
                }}
              >
                <svg className="w-8 h-8 text-warm-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="font-display text-4xl md:text-5xl text-warm-white mb-2">≈ 39 cv</div>
              <h3 className="font-display text-lg text-warm-white mb-2">Potência</h3>
              <p className="font-body text-sm text-titanium-gray">Motor single-cylinder de 398cc com resposta imediata</p>
            </div>

            {/* Card 2 - ABS */}
            <div 
              className="group relative rounded-3xl p-6 md:p-8 transition-all duration-300 animate-fade-up overflow-hidden"
              style={{
                background: 'rgba(12, 15, 18, 0.3)',
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                border: '1px solid rgba(243, 244, 242, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.1)',
                animationDelay: '0.1s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.2)'
                e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(243, 244, 242, 0.2)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.1)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{
                  background: 'rgba(243, 244, 242, 0.08)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(243, 244, 242, 0.15)',
                  boxShadow: 'inset 0 1px 0 rgba(243, 244, 242, 0.2)'
                }}
              >
                <svg className="w-8 h-8 text-warm-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="font-display text-4xl md:text-5xl text-warm-white mb-2">ABS</div>
              <h3 className="font-display text-lg text-warm-white mb-2">Segurança</h3>
              <p className="font-body text-sm text-titanium-gray">Sistema de freios ABS para máxima segurança</p>
            </div>

            {/* Card 3 - 6 Marchas */}
            <div 
              className="group relative rounded-3xl p-6 md:p-8 transition-all duration-300 animate-fade-up overflow-hidden"
              style={{
                background: 'rgba(12, 15, 18, 0.3)',
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                border: '1px solid rgba(243, 244, 242, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.1)',
                animationDelay: '0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.2)'
                e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(243, 244, 242, 0.2)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.1)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{
                  background: 'rgba(243, 244, 242, 0.08)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(243, 244, 242, 0.15)',
                  boxShadow: 'inset 0 1px 0 rgba(243, 244, 242, 0.2)'
                }}
              >
                <svg className="w-8 h-8 text-warm-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="font-display text-4xl md:text-5xl text-warm-white mb-2">6</div>
              <h3 className="font-display text-lg text-warm-white mb-2">Marchas</h3>
              <p className="font-body text-sm text-titanium-gray">Câmbio de 6 velocidades com troca suave</p>
            </div>

            {/* Card 4 - Design */}
            <div 
              className="group relative rounded-3xl p-6 md:p-8 transition-all duration-300 animate-fade-up overflow-hidden"
              style={{
                background: 'rgba(12, 15, 18, 0.3)',
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                border: '1px solid rgba(243, 244, 242, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.1)',
                animationDelay: '0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.2)'
                e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(243, 244, 242, 0.2)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.1)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{
                  background: 'rgba(243, 244, 242, 0.08)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(243, 244, 242, 0.15)',
                  boxShadow: 'inset 0 1px 0 rgba(243, 244, 242, 0.2)'
                }}
              >
                <svg className="w-8 h-8 text-warm-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div className="font-display text-4xl md:text-5xl text-warm-white mb-2">100%</div>
              <h3 className="font-display text-lg text-warm-white mb-2">Scrambler</h3>
              <p className="font-body text-sm text-titanium-gray">DNA autêntico Triumph com design atemporal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle / Experiência */}
      <section className="py-section-mobile md:py-section bg-carbon-black/30">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Texto */}
            <div className="space-y-6 animate-fade-up">
              <h2 className="font-display text-display-md md:text-display-lg text-warm-white">
                Mais Que Uma Moto, Um Estilo de Vida
              </h2>
              <div className="space-y-4">
                <p className="font-body text-lg text-titanium-gray leading-relaxed">
                  A Scrambler 400X não é apenas uma motocicleta. É sua passagem para explorar estradas menos percorridas, descobrir novos horizontes e viver cada momento com intensidade.
                </p>
                <p className="font-body text-lg text-titanium-gray leading-relaxed">
                  Com seu design clássico reinterpretado e tecnologia moderna, ela combina o melhor dos dois mundos: a autenticidade de uma scrambler britânica e a confiabilidade que você precisa para qualquer aventura.
                </p>
                <p className="font-body text-lg text-warm-white font-medium italic">
                  "Não se trata de chegar ao destino. Trata-se de cada curva, cada trilha, cada momento em que você se sente verdadeiramente livre."
                </p>
              </div>
            </div>

            {/* Imagens Lifestyle */}
            <div className="grid grid-cols-2 gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative aspect-square rounded-xl overflow-hidden border border-titanium-gray/20 group hover:border-titanium-gray/40 transition-all">
                <img 
                  src="/scrambler-praia-wallpaper.jpeg"
                  alt="Scrambler 400X lifestyle na praia"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon-black/60 to-transparent"></div>
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden border border-titanium-gray/20 group hover:border-titanium-gray/40 transition-all">
                <img 
                  src="/wallpaper-scrambler.jpeg"
                  alt="Scrambler 400X lifestyle"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon-black/60 to-transparent"></div>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-titanium-gray/20 group hover:border-titanium-gray/40 transition-all col-span-2">
                <img 
                  src="/scrambler-wallpaper-oficial.avif"
                  alt="Scrambler 400X em ação"
                  className="w-full h-full object-contain bg-graphite-deep/30 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ficha Técnica Completa */}
      <section id="specs" className="py-section-mobile md:py-section bg-graphite-deep/50">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <h2 className="font-display text-display-md md:text-display-lg text-warm-white mb-8 md:mb-12 text-center">
            Ficha Técnica Completa
          </h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
            {specTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSpecTab(tab.id)}
                className="px-6 py-3 rounded-xl font-body font-medium transition-all duration-300"
                style={activeSpecTab === tab.id ? {
                  background: 'rgba(243, 244, 242, 0.95)',
                  color: '#0C0F12',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(243, 244, 242, 1)',
                  boxShadow: '0 0 15px rgba(243, 244, 242, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                } : {
                  background: 'rgba(12, 15, 18, 0.3)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(243, 244, 242, 0.15)',
                  color: '#98A0AD',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
                }}
                onMouseEnter={(e) => {
                  if (activeSpecTab !== tab.id) {
                    e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.3)'
                    e.currentTarget.style.color = '#F3F4F2'
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(243, 244, 242, 0.2), 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.2)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSpecTab !== tab.id) {
                    e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.15)'
                    e.currentTarget.style.color = '#98A0AD'
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Motor & Transmissão */}
          {activeSpecTab === 'motor' && (
            <div 
              className="rounded-3xl p-6 md:p-10 transition-all duration-300"
              style={{
                background: 'rgba(12, 15, 18, 0.3)',
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                border: '1px solid rgba(243, 244, 242, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
              }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(specsData.motor).map(([key, value]) => (
                  <div key={key} className="border-b border-titanium-gray/20 pb-4 last:border-0">
                    <div className="font-body text-sm text-titanium-gray mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim().replace(/diametro/i, 'Diâmetro').replace(/curso/i, 'Curso').replace(/compressao/i, 'Compressão').replace(/maxima/i, 'Máxima').replace(/maximo/i, 'Máximo').replace(/alimentacao/i, 'Alimentação').replace(/transmissao/i, 'Transmissão').replace(/final/i, 'Final')}
                    </div>
                    <div className="font-body text-base md:text-lg text-warm-white font-medium">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chassi & Suspensão */}
          {activeSpecTab === 'chassi' && (
            <div 
              className="rounded-3xl p-6 md:p-10 transition-all duration-300"
              style={{
                background: 'rgba(12, 15, 18, 0.3)',
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                border: '1px solid rgba(243, 244, 242, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
              }}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-display-sm text-warm-white mb-4">Chassi</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="font-body text-sm text-titanium-gray mb-1">Quadro</div>
                      <div className="font-body text-base text-warm-white">{specsData.chassi.quadro}</div>
                    </div>
                    <div>
                      <div className="font-body text-sm text-titanium-gray mb-1">Braço Oscilante</div>
                      <div className="font-body text-base text-warm-white">{specsData.chassi.bracoOscilante}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-display text-display-sm text-warm-white mb-4">Suspensão</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="font-body text-sm text-titanium-gray mb-1">Dianteira</div>
                      <div className="font-body text-base text-warm-white">{specsData.chassi.suspensaoDianteira}</div>
                    </div>
                    <div>
                      <div className="font-body text-sm text-titanium-gray mb-1">Traseira</div>
                      <div className="font-body text-base text-warm-white">{specsData.chassi.suspensaoTraseira}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-display-sm text-warm-white mb-4">Rodas & Pneus</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="font-body text-sm text-titanium-gray mb-1">Dianteira</div>
                      <div className="font-body text-base text-warm-white">{specsData.chassi.rodas.dianteira}</div>
                    </div>
                    <div>
                      <div className="font-body text-sm text-titanium-gray mb-1">Traseira</div>
                      <div className="font-body text-base text-warm-white">{specsData.chassi.rodas.traseira}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-display-sm text-warm-white mb-4">Freios</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="font-body text-sm text-titanium-gray mb-1">Dianteiro</div>
                      <div className="font-body text-base text-warm-white">{specsData.chassi.freios.dianteiro}</div>
                    </div>
                    <div>
                      <div className="font-body text-sm text-titanium-gray mb-1">Traseiro</div>
                      <div className="font-body text-base text-warm-white">{specsData.chassi.freios.traseiro}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dimensões & Ergonomia */}
          {activeSpecTab === 'dimensoes' && (
            <div 
              className="rounded-3xl p-6 md:p-10 transition-all duration-300"
              style={{
                background: 'rgba(12, 15, 18, 0.3)',
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                border: '1px solid rgba(243, 244, 242, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
              }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(specsData.dimensoes).map(([key, value]) => (
                  <div key={key} className="border-b border-titanium-gray/20 pb-4 last:border-0">
                    <div className="font-body text-sm text-titanium-gray mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim().replace(/altura/i, 'Altura').replace(/assento/i, 'Assento').replace(/distancia/i, 'Distância').replace(/entre/i, 'Entre').replace(/eixos/i, 'Eixos').replace(/largura/i, 'Largura').replace(/guidao/i, 'Guidão').replace(/capacidade/i, 'Capacidade').replace(/tanque/i, 'Tanque').replace(/peso/i, 'Peso').replace(/ordem/i, 'Ordem').replace(/marcha/i, 'Marcha')}
                    </div>
                    <div className="font-body text-base md:text-lg text-warm-white font-medium">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Equipamentos */}
          {activeSpecTab === 'equipamentos' && (
            <div 
              className="rounded-3xl p-6 md:p-10 transition-all duration-300"
              style={{
                background: 'rgba(12, 15, 18, 0.3)',
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                border: '1px solid rgba(243, 244, 242, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
              }}
            >
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-display-sm text-warm-white mb-4">Iluminação</h3>
                  <div className="font-body text-base text-warm-white">{specsData.equipamentos.iluminacao}</div>
                </div>
                
                <div>
                  <h3 className="font-display text-display-sm text-warm-white mb-4">Painel</h3>
                  <div className="font-body text-base text-warm-white">{specsData.equipamentos.painel}</div>
                </div>

                <div>
                  <h3 className="font-display text-display-sm text-warm-white mb-4">Sistemas de Segurança</h3>
                  <ul className="space-y-2">
                    {specsData.equipamentos.seguranca.map((item, index) => (
                      <li key={index} className="font-body text-base text-warm-white flex items-start">
                        <span className="text-warm-white mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-display-sm text-warm-white mb-4">Ergonomia</h3>
                  <div className="font-body text-base text-warm-white">{specsData.equipamentos.ergonomia}</div>
                </div>
              </div>
            </div>
          )}

          {/* Características Diferenciais */}
          <div 
            className="mt-8 rounded-3xl p-6 md:p-10 transition-all duration-300"
            style={{
              background: 'rgba(12, 15, 18, 0.3)',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              border: '1px solid rgba(243, 244, 242, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
            }}
          >
            <h3 className="font-display text-display-sm text-warm-white mb-6">Características & Diferenciais</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {specsData.caracteristicas.map((caracteristica, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-khaki-green mr-3 mt-1">✓</span>
                  <span className="font-body text-base text-warm-white">{caracteristica}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-section-mobile md:py-section">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <h2 className="font-display text-display-md md:text-display-lg text-warm-white mb-12 text-center">
            Galeria
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300"
                onClick={() => setSelectedImage(image)}
                style={{
                  border: '1px solid rgba(243, 244, 242, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.3)'
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(243, 244, 242, 0.2), 0 12px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(243, 244, 242, 0.2)'
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.1)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.1)'
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="300"
                />
                <div className="absolute inset-0 bg-carbon-black/0 group-hover:bg-carbon-black/20 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: 'rgba(12, 15, 18, 0.95)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              border: '2px solid rgba(243, 244, 242, 0.6)',
              boxShadow: '0 0 30px rgba(243, 244, 242, 0.4), 0 0 60px rgba(243, 244, 242, 0.2), 0 20px 80px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(243, 244, 242, 0.3)'
            }}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              className="absolute top-4 right-4 text-warm-white rounded-full p-3 transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(12, 15, 18, 0.5)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(243, 244, 242, 0.3)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.2)'
              }}
              onClick={() => setSelectedImage(null)}
              aria-label="Fechar imagem"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Localização / Concessionária */}
      <section className="py-section-mobile md:py-section bg-graphite-deep/30">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <h2 className="font-display text-display-md md:text-display-lg text-warm-white mb-8 md:mb-12 text-center">
            Concessionária Triumph em São José do Rio Preto
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Informações da Concessionária */}
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-display-sm text-warm-white mb-4">
                  Triumph Euro Motors - São José do Rio Preto
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-warm-white mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-body text-warm-white font-medium mb-1">Endereço</p>
                      <p className="font-body text-titanium-gray">
                        Av. Pres. Juscelino K. de Oliveira, 3600 - Loja B<br />
                        Jardim Moyses Miguel Haddad<br />
                        São José do Rio Preto - SP<br />
                        CEP: 15093-225
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-warm-white mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="font-body text-warm-white font-medium mb-1">Telefone</p>
                      <a href="tel:+551733541300" className="font-body text-titanium-gray hover:text-warm-white transition-colors">
                        (17) 3354-1300
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-warm-white mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-body text-warm-white font-medium mb-1">Horário de Funcionamento</p>
                      <p className="font-body text-titanium-gray">
                        Segunda a Sexta: 8h às 18h<br />
                        Sábado: 8h às 13h<br />
                        Domingo: Fechado
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Triumph+São+José+do+Rio+Preto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 text-warm-white font-body font-semibold px-6 py-3 rounded-xl transition-all duration-300 overflow-hidden button-premium-shine button-ripple"
                  style={{
                    background: 'rgba(12, 15, 18, 0.5)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(243, 244, 242, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.5)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(243, 244, 242, 0.3), 0 12px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(243, 244, 242, 0.3)'
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.3)'
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.2)'
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  }}
                >
                  <svg className="w-5 h-5 text-warm-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span className="relative z-10">Abrir no Google Maps</span>
                </a>
                <a 
                  href="tel:+551733541300"
                  className="group inline-flex items-center justify-center gap-2 text-warm-white font-body font-semibold px-6 py-3 rounded-xl transition-all duration-300 overflow-hidden button-premium-shine button-ripple"
                  style={{
                    background: 'rgba(12, 15, 18, 0.3)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(243, 244, 242, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(243, 244, 242, 0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.4)'
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(243, 244, 242, 0.2), 0 12px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(243, 244, 242, 0.25)'
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(243, 244, 242, 0.2)'
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(243, 244, 242, 0.15)'
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  }}
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="relative z-10">Ligar Agora</span>
                </a>
              </div>
            </div>

            {/* Mapa */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-titanium-gray/20 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.4351508311493!2d-49.415341344982956!3d-20.854503788984484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bdb39357fc5ffd%3A0x1b2d87174d441f29!2sTriumph%20Euro%20Motors!5e0!3m2!1spt-BR!2sbr!4v1764262741455!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Localização da Concessionária Triumph Euro Motors em São José do Rio Preto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-titanium-gray/20">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-sm text-titanium-gray">
              © 2024 Scrambler 400X — Landing Page Conceitual
            </p>
            <a 
              href="https://github.com" 
              className="font-body text-sm text-titanium-gray hover:text-warm-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver repositório
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
