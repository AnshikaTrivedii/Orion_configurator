import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [showProfile, setShowProfile] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [likedProjects, setLikedProjects] = useState([]);
  const [aiQuery, setAiQuery] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hi! I am Orion AI. Ask me anything about our LED projects or products.' }
  ]);
  const [userInput, setUserInput] = useState('');
  const projectsRef = useRef(null);
  const aboutSectionRef = useRef(null);

  const handleNavClick = (section) => {
    setActiveSection(section);
    if (section !== 'profile') setShowProfile(false);
    if (section === 'about' && aboutSectionRef.current) {
      setTimeout(() => {
        aboutSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleScrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Realistic sample images from Orion LED Projects page (replace with your own if needed)
  const projectData = [
    {
      title: 'Corporate Project',
      image: 'https://orion-led.com/admin/upload/image_78276979.jpg',
      description: 'Custom LED solutions for corporate spaces, boardrooms, and lobbies.',
      details: 'Our corporate LED installations create a modern, dynamic environment for boardrooms, lobbies, and meeting spaces. We offer seamless integration and custom sizing.',
      tags: ['corporate', 'office', 'boardroom', 'lobby']
    },
    {
      title: 'DOOH Project',
      image: 'https://orion-led.com/admin/upload/image_72521410.jpg',
      description: 'Digital Out-of-Home advertising displays for high-traffic areas.',
      details: 'Our DOOH (Digital Out-of-Home) LED displays are designed for maximum visibility and durability, perfect for advertising in high-traffic public spaces.',
      tags: ['dooh', 'advertising', 'outdoor', 'public']
    },
    {
      title: 'Retail Project',
      image: 'https://orion-led.com/admin/upload/image_86727506.jpg',
      description: 'Engaging LED displays for retail stores and shopping malls.',
      details: 'Retail LED displays help brands stand out and attract customers with vibrant, customizable visuals. Ideal for malls, showrooms, and flagship stores.',
      tags: ['retail', 'mall', 'store', 'shopping']
    },
    {
      title: 'Entertainment Project',
      image: 'https://orion-led.com/admin/upload/image_76671442.jpg',
      description: 'Dynamic LED screens for events, concerts, and entertainment venues.',
      details: 'Entertainment venues benefit from our high-resolution LED screens, perfect for concerts, shows, and immersive experiences.',
      tags: ['entertainment', 'event', 'concert', 'venue']
    },
    {
      title: 'Hotel Project',
      image: 'https://orion-led.com/admin/upload/image_32607921.jpg',
      description: 'Elegant LED installations for hotels and hospitality.',
      details: 'Our hotel LED solutions add a touch of elegance and modernity to lobbies, conference halls, and event spaces.',
      tags: ['hotel', 'hospitality', 'lobby', 'conference']
    },
  ];

  // AI Project Recommender logic
  const handleAiRecommend = () => {
    if (!aiQuery) {
      setAiRecommendation([]);
      return;
    }
    const query = aiQuery.toLowerCase();
    const recommended = projectData.filter(project =>
      project.tags.some(tag => query.includes(tag))
    );
    setAiRecommendation(recommended.length ? recommended.map(p => p.title) : []);
  };

  // Like button logic
  const toggleLike = (title) => {
    setLikedProjects((prev) =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  // Animated project cards on scroll
  useEffect(() => {
    const cards = document.querySelectorAll('.project-card');
    const onScroll = () => {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
          card.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // AI Chat Widget logic (UI only, sample responses)
  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    setChatMessages(msgs => [...msgs, { sender: 'user', text: userInput }]);
    setTimeout(() => {
      setChatMessages(msgs => [...msgs, { sender: 'ai', text: 'Thank you for your question! Our team will get back to you soon.' }]);
    }, 800);
    setUserInput('');
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  const handleAddToDraft = (product) => {
    window.location.href = `/draft/${encodeURIComponent(product)}`;
  };

  const handleViewDetail = (product) => {
    window.location.href = `/detail/${encodeURIComponent(product)}`;
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-right">
          <button
            className="nav-btn"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            <span role="img" aria-label="profile">👤</span> Profile
          </button>
          <button
            className={`nav-btn${activeSection === 'about' ? ' active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            About Us
          </button>
          <button
            className={`nav-btn${activeSection === 'products' ? ' active' : ''}`}
            onClick={() => handleNavClick('products')}
          >
            Products
          </button>
          <button
            className={`nav-btn drafts-btn${activeSection === 'drafts' ? ' active' : ''}`}
            onClick={() => handleNavClick('drafts')}
          >
            <span role="img" aria-label="drafts">📝</span> Drafts
          </button>
        </div>
      </nav>
      <div className="profile-fixed-container">
        {showProfile && (
          <div className="profile-dropdown">
            <h3>User Profile</h3>
            <p>Name: John Doe</p>
            <p>Email: johndoe@example.com</p>
            {/* Add more profile details here */}
          </div>
        )}
      </div>
      {/* HERO SECTION */}
      <section className="hero-landing-section compact-hero">
        <div className="hero-content">
          <h1>Endless Possibilities with Orion LED</h1>
          <p>Leading LED display manufacturer in India, trusted since 2015. From highways to hotels, malls to metros—we light up spaces nationwide with custom, weatherproof LED screens.</p>
          <button className="hero-cta-btn" onClick={handleScrollToProjects}>View Projects</button>
        </div>
      </section>
      {/* OUR PRODUCTS SECTION */}
      <section className="products-carousel-section">
        <h2 className="products-carousel-title">Our Products</h2>
        <div className="products-carousel">
          <div className="carousel-track">
            <div className="product-card">
              <img src="/Bellatrix  SMD .png" alt="Orion Bellatrix Series" />
              <span>Orion Bellatrix Series</span>
              <div className="product-card-btns">
                <button className="add-btn" onClick={() => handleAddToDraft('Orion Bellatrix Series')}>Add</button>
                <button className="detail-btn" onClick={() => handleViewDetail('Orion Bellatrix Series')}>Detail</button>
              </div>
            </div>
            <div className="product-card">
              <img src="/Betelgeuse COB.png" alt="Orion Betelgeuse Series" />
              <span>Orion Betelgeuse Series</span>
              <div className="product-card-btns">
                <button className="add-btn" onClick={() => handleAddToDraft('Orion Betelgeuse Series')}>Add</button>
                <button className="detail-btn" onClick={() => handleViewDetail('Orion Betelgeuse Series')}>Detail</button>
              </div>
            </div>
            <div className="product-card">
              <img src="/Digital Standee .png" alt="Orion Digital Standee" />
              <span>Orion Digital Standee</span>
              <div className="product-card-btns">
                <button className="add-btn" onClick={() => handleAddToDraft('Orion Digital Standee')}>Add</button>
                <button className="detail-btn" onClick={() => handleViewDetail('Orion Digital Standee')}>Detail</button>
              </div>
            </div>
            <div className="product-card">
              <img src="/Flexible .png" alt="Orion Flexible Series" />
              <span>Orion Flexible Series</span>
              <div className="product-card-btns">
                <button className="add-btn" onClick={() => handleAddToDraft('Orion Flexible Series')}>Add</button>
                <button className="detail-btn" onClick={() => handleViewDetail('Orion Flexible Series')}>Detail</button>
              </div>
            </div>
            <div className="product-card">
              <img src="/Jumbo .png" alt="Orion Jumbo Series" />
              <span>Orion Jumbo Series</span>
              <div className="product-card-btns">
                <button className="add-btn" onClick={() => handleAddToDraft('Orion Jumbo Series')}>Add</button>
                <button className="detail-btn" onClick={() => handleViewDetail('Orion Jumbo Series')}>Detail</button>
              </div>
            </div>
            <div className="product-card">
              <img src="/Rental .png" alt="Orion Rental Series" />
              <span>Orion Rental Series</span>
              <div className="product-card-btns">
                <button className="add-btn" onClick={() => handleAddToDraft('Orion Rental Series')}>Add</button>
                <button className="detail-btn" onClick={() => handleViewDetail('Orion Rental Series')}>Detail</button>
              </div>
            </div>
            <div className="product-card">
              <img src="/Rigel .png" alt="Orion Rigel Series" />
              <span>Orion Rigel Series</span>
              <div className="product-card-btns">
                <button className="add-btn" onClick={() => handleAddToDraft('Orion Rigel Series')}>Add</button>
                <button className="detail-btn" onClick={() => handleViewDetail('Orion Rigel Series')}>Detail</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* PROJECTS SECTION */}
      <section className="projects-section" ref={projectsRef}>
        <h2>Our Projects</h2>
        {/* AI Project Recommender */}
        <div className="ai-recommender">
          <label htmlFor="ai-query">What type of space do you want to enhance?</label>
          <input
            id="ai-query"
            type="text"
            placeholder="e.g. office, mall, event, hotel, outdoor"
            value={aiQuery}
            onChange={e => setAiQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAiRecommend()}
          />
          <button className="ai-recommend-btn" onClick={handleAiRecommend}>Recommend</button>
        </div>
        {aiRecommendation.length > 0 && (
          <div className="ai-recommendation-result">
            <span>Recommended for you: </span>
            {aiRecommendation.map((title, idx) => (
              <span key={title} className="ai-recommend-highlight">{title}{idx < aiRecommendation.length - 1 ? ', ' : ''}</span>
            ))}
          </div>
        )}
        <div className="projects-grid">
          {projectData.map((project, idx) => {
            const isRecommended = aiRecommendation.includes(project.title);
            return (
              <div
                className={`project-card${isRecommended ? ' recommended' : ''}`}
                key={idx}
                onClick={() => openModal(project)}
              >
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <button
                  className={`like-btn${likedProjects.includes(project.title) ? ' liked' : ''}`}
                  onClick={e => { e.stopPropagation(); toggleLike(project.title); }}
                  aria-label={likedProjects.includes(project.title) ? 'Unlike' : 'Like'}
                >
                  {likedProjects.includes(project.title) ? '❤️' : '🤍'}
                </button>
              </div>
            );
          })}
        </div>
      </section>
      {/* MODAL POPUP FOR PROJECT DETAILS */}
      {modalOpen && selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.details}</p>
          </div>
        </div>
      )}
      {/* AI Chat Widget */}
      <div className={`ai-chat-widget${showChat ? ' open' : ''}`}> 
        {!showChat && (
          <button className="ai-chat-toggle" onClick={() => setShowChat(true)} title="Chat with Orion AI">💬</button>
        )}
        {showChat && (
          <div className="ai-chat-box">
            <div className="ai-chat-header">
              <span>Orion AI Assistant</span>
              <button className="ai-chat-close" onClick={() => setShowChat(false)}>&times;</button>
            </div>
            <div className="ai-chat-messages">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`ai-chat-msg ${msg.sender}`}>{msg.text}</div>
              ))}
            </div>
            <div className="ai-chat-input-row">
              <input
                type="text"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your question..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
      <main className="main-content">
        {activeSection === 'about' && (
          <section className="about-section enhanced-about" ref={aboutSectionRef}>
            <div className="about-content-wrapper">
              <div className="about-left">
                <h2>Who We Are</h2>
                <h3>We Deliver The Best Digital Signage Solutions</h3>
                <div className="about-stats">
                  <div className="stat">
                    <span className="stat-icon" role="img" aria-label="installations">🏢</span>
                    <span className="stat-number">100+</span>
                    <span className="stat-label">Installations</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon" role="img" aria-label="offices">📍</span>
                    <span className="stat-number">6</span>
                    <span className="stat-label">Offices in India</span>
                  </div>
                </div>
                <div className="about-narrative">
                  <p><strong>What's making you stop from creating unforgettable visual experiences that set your brand apart?</strong></p>
                  <p>Is it that you are still using the old traditional way of marketing your brand? Or do you feel that operating and managing digital LED screens can be complex for you?</p>
                  <p>But in today's fast-paced world, if you want your brand to outstand your competitors then our digital signage solutions can be the best choice for you.</p>
                  <p>We at <strong>Atenti Origins Photoelectricity Consort Private Limited (AOPCPL)</strong> provide a wide range of LED display solutions that will master you in the art of captivating audiences and transforming spaces. Our LED screens are the best in technology, hardware, and quality.</p>
                  <p>From airports, transportation, corporate offices, and malls to retail, hotels, and events, we provide tailor-made digital signage solutions of customized shapes and sizes for each client. Our expert engineers and designers work directly with you to make your vision a reality.</p>
                </div>
                <button className="about-cta-btn">Contact Us</button>
              </div>
              <div className="about-right">
                <img src="https://orion-led.com/assets/img/logo-white.png" alt="Company Team Logo" className="about-image" />
                <div className="about-timeline">
                  <h4>Milestones</h4>
                  <ul>
                    <li><span className="timeline-dot"></span> 2015: Company Founded</li>
                    <li><span className="timeline-dot"></span> 2017: 50+ Installations</li>
                    <li><span className="timeline-dot"></span> 2020: Expanded to 6 Offices</li>
                    <li><span className="timeline-dot"></span> 2023: 100+ Installations</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
        {activeSection === 'products' && (
          <section className="hero-section">
            {/* Products section content to be added later */}
            <div className="hero-placeholder">Products Section (Coming Soon)</div>
          </section>
        )}
        {activeSection === 'drafts' && (
          <section className="project-detail-section">
            <h2>Drafts</h2>
            {/* Drafts details to be added here */}
            <div className="project-placeholder">Drafts will appear here.</div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
