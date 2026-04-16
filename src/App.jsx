import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Componente de Login
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular login
    localStorage.setItem('authToken', 'simulated-token');
    localStorage.setItem('userEmail', email);
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <h1>🔒 Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

// Componente de Dashboard
function Dashboard() {
  const [activeTab, setActiveTab] = useState('instagram');
  const [platformCredentials, setPlatformCredentials] = useState({
    instagram: { apiKey: '', apiSecret: '', accessToken: '' },
    tiktok: { clientKey: '', clientSecret: '', accessToken: '' },
    facebook: { pageId: '', accessToken: '' }
  });
  const [isConfigured, setIsConfigured] = useState(false);
  const [publishData, setPublishData] = useState({
    text: '',
    image: null,
    caption: ''
  });
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState(null);

  useEffect(() => {
    // Verificar se as credenciais estão configuradas
    const hasCredentials = Object.values(platformCredentials).some(platform => 
      Object.values(platform).some(value => value !== '')
    );
    setIsConfigured(hasCredentials);
  }, [platformCredentials]);

  const handleCredentialChange = (platform, field, value) => {
    setPlatformCredentials(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value
      }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPublishData(prev => ({ ...prev, image: file }));
    }
  };

  const handlePublish = async () => {
    if (!publishData.text.trim() || !publishData.image) {
      alert('Por favor, preencha todos os campos e selecione uma imagem!');
      return;
    }

    setIsPublishing(true);
    setPublishResult(null);

    try {
      // Simular publicação (substituir por chamadas reais às APIs)
      await new Promise(resolve => setTimeout(resolve, 2000));

      setPublishResult({
        success: true,
        message: 'Publicação simulada com sucesso!',
        platform: activeTab,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      setPublishResult({
        success: false,
        message: 'Erro ao publicar: ' + error.message,
        platform: activeTab
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSaveCredentials = () => {
    // Salvar credenciais no localStorage
    localStorage.setItem('platformCredentials', JSON.stringify(platformCredentials));
    alert('Credenciais guardadas com sucesso!');
    setIsConfigured(true);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>📱 Plataformas</h2>
        <ul>
          <li
            className={activeTab === 'instagram' ? 'active' : ''}
            onClick={() => setActiveTab('instagram')}
          >
            Instagram
          </li>
          <li
            className={activeTab === 'tiktok' ? 'active' : ''}
            onClick={() => setActiveTab('tiktok')}
          >
            TikTok
          </li>
          <li
            className={activeTab === 'facebook' ? 'active' : ''}
            onClick={() => setActiveTab('facebook')}
          >
            Meta Business
          </li>
        </ul>
      </div>

      <div className="main-content">
        <h1>📊 Dashboard - {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>

        {!isConfigured ? (
          <div className="credentials-section">
            <h2>🔑 Configurar Credenciais</h2>
            <p>Por favor, configure as credenciais da API para {activeTab}:</p>

            <div className="credential-form">
              {activeTab === 'instagram' && (
                <>
                  <div className="form-group">
                    <label>API Key:</label>
                    <input
                      type="text"
                      value={platformCredentials.instagram.apiKey}
                      onChange={(e) => handleCredentialChange('instagram', 'apiKey', e.target.value)}
                      placeholder="Instagram API Key"
                    />
                  </div>
                  <div className="form-group">
                    <label>API Secret:</label>
                    <input
                      type="password"
                      value={platformCredentials.instagram.apiSecret}
                      onChange={(e) => handleCredentialChange('instagram', 'apiSecret', e.target.value)}
                      placeholder="Instagram API Secret"
                    />
                  </div>
                  <div className="form-group">
                    <label>Access Token:</label>
                    <input
                      type="text"
                      value={platformCredentials.instagram.accessToken}
                      onChange={(e) => handleCredentialChange('instagram', 'accessToken', e.target.value)}
                      placeholder="Instagram Access Token"
                    />
                  </div>
                </>
              )}

              {activeTab === 'tiktok' && (
                <>
                  <div className="form-group">
                    <label>Client Key:</label>
                    <input
                      type="text"
                      value={platformCredentials.tiktok.clientKey}
                      onChange={(e) => handleCredentialChange('tiktok', 'clientKey', e.target.value)}
                      placeholder="TikTok Client Key"
                    />
                  </div>
                  <div className="form-group">
                    <label>Client Secret:</label>
                    <input
                      type="password"
                      value={platformCredentials.tiktok.clientSecret}
                      onChange={(e) => handleCredentialChange('tiktok', 'clientSecret', e.target.value)}
                      placeholder="TikTok Client Secret"
                    />
                  </div>
                  <div className="form-group">
                    <label>Access Token:</label>
                    <input
                      type="text"
                      value={platformCredentials.tiktok.accessToken}
                      onChange={(e) => handleCredentialChange('tiktok', 'accessToken', e.target.value)}
                      placeholder="TikTok Access Token"
                    />
                  </div>
                </>
              )}

              {activeTab === 'facebook' && (
                <>
                  <div className="form-group">
                    <label>Page ID:</label>
                    <input
                      type="text"
                      value={platformCredentials.facebook.pageId}
                      onChange={(e) => handleCredentialChange('facebook', 'pageId', e.target.value)}
                      placeholder="Facebook Page ID"
                    />
                  </div>
                  <div className="form-group">
                    <label>Access Token:</label>
                    <input
                      type="text"
                      value={platformCredentials.facebook.accessToken}
                      onChange={(e) => handleCredentialChange('facebook', 'accessToken', e.target.value)}
                      placeholder="Facebook Access Token"
                    />
                  </div>
                </>
              )}

              <button onClick={handleSaveCredentials} className="save-button">
                Guardar Credenciais
              </button>
            </div>
          </div>
        ) : (
          <div className="publish-section">
            <h2>📝 Criar Publicação</h2>

            <div className="form-group">
              <label>Texto da Publicação:</label>
              <textarea
                value={publishData.text}
                onChange={(e) => setPublishData(prev => ({ ...prev, text: e.target.value }))}
                placeholder="Escreva o texto que deseja publicar..."
                rows={4}
              />
            </div>

            <div className="form-group">
              <label>Imagem:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {publishData.image && (
                <div className="image-preview">
                  <p>📷 Imagem selecionada: {publishData.image.name}</p>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Legenda (opcional):</label>
              <input
                type="text"
                value={publishData.caption}
                onChange={(e) => setPublishData(prev => ({ ...prev, caption: e.target.value }))}
                placeholder="Legenda opcional para a publicação"
              />
            </div>

            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="publish-button"
            >
              {isPublishing ? 'Publicando...' : 'Publicar'}
            </button>

            {publishResult && (
              <div className={`publish-result ${publishResult.success ? 'success' : 'error'}`}>
                <h3>{publishResult.success ? '✅ Sucesso!' : '❌ Erro'}</h3>
                <p>{publishResult.message}</p>
                <p><small>Plataforma: {publishResult.platform}</small></p>
                <p><small>Data: {new Date(publishResult.timestamp).toLocaleString()}</small></p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Componente principal
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar se o utilizador está autenticado
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        <header>
          <h1>🚀 Social Media Publisher</h1>
          {isAuthenticated && (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </header>

        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <LoginPage />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;