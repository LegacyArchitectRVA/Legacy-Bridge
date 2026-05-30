import React, { useState } from 'react';
import { Copy, Image, Type, User, MessageSquare, ChevronDown, ChevronUp, Bold, Italic, Strikethrough, Code, Quote, Type as TypeIcon, CaseUpper, CaseLower, Underline, AlertTriangle, Sparkles, Globe, Layers, Sun, Moon, AlertCircle, X, Send } from 'lucide-react';

const colors = {
  background: '#0f0f23',
  surface: '#1a1b2e',
  surfaceHover: '#252848',
  border: '#2d3154',
  textPrimary: '#ffffff',
  textSecondary: '#a0a4c8',
  textMuted: '#6c7090',
  accent: '#7c3aed',
  accentHover: '#9d50ff',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#06b6d4',
  gradientPrimary: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
};

const generationStyles = {
  genz: {
    name: 'Gen Z',
    icon: '👾',
    transform: (text: string) => {
      const slang = ['fr', 'no cap', 'slay', 'rizz', 'gyatt', 'sigma', 'based', 'vibes'];
      const randomSlang = slang[Math.floor(Math.random() * slang.length)];
      let result = text
        .replace(/very/g, 'hella')
        .replace(/cool/g, 'fire')
        .replace(/good/g, 'solid')
        .replace(/bad/g, 'mid')
        .replace(/friend/g, 'bestie')
        .replace(/\bto\b/g, '2')
        .replace(/\bfor\b/g, '4')
        .replace(/\byou\b/g, 'u');
      if (!result.match(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}]/u) && Math.random() > 0.5) {
        result += ' ' + ['💀', '🔥', '✨', '😭'][Math.floor(Math.random() * 4)];
      }
      if (Math.random() > 0.7) {
        result = randomSlang + ' ' + result;
      }
      return result;
    }
  },
  millennial: {
    name: 'Millennial',
    icon: '🥑',
    transform: (text: string) => {
      const phrases = ['Adulting', 'Can we talk?', 'On fleek', 'Squad goals'];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      let result = text
        .replace(/work/g, 'hustle')
        .replace(/tired/g, 'exhausted')
        .replace(/money/g, 'guac');
      if (Math.random() > 0.8) {
        result = randomPhrase + ': ' + result;
      }
      return result;
    }
  },
  genx: {
    name: 'Gen X',
    icon: '🎸',
    transform: (text: string) => {
      const phrases = ['Whatever', 'Not it', 'Back in my day'];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      let result = text
        .replace(/amazing/g, 'okay')
        .replace(/wonderful/g, 'fine')
        .replace(/love/g, 'tolerate');
      if (Math.random() > 0.6) {
        result = randomPhrase + '. ' + result;
      }
      return result;
    }
  },
  boomer: {
    name: 'Boomer',
    icon: '👴',
    transform: (text: string) => {
      let result = text
        .replace(/u\b/g, 'you')
        .replace(/\bur\b/g, 'your')
        .replace(/\b2\b/g, 'to')
        .replace(/\b4\b/g, 'for')
        .replace(/\br\b/g, 'are')
        .replace(/btw/g, 'by the way')
        .replace(/thx/g, 'thank you')
        .replace(/pls/g, 'please')
        .replace(/omg/g, 'Oh my goodness')
        .replace(/lol/g, 'That is amusing');
      if (!result.endsWith('.') && !result.endsWith('!') && !result.endsWith('?')) {
        result += '.';
      }
      return result.charAt(0).toUpperCase() + result.slice(1);
    }
  },
  corporate: {
    name: 'Corporate',
    icon: '💼',
    transform: (text: string) => {
      const buzzwords = ['synergy', 'leverage', 'low-hanging fruit', 'circle back', 'bandwidth', 'pivot'];
      const randomBuzzword = buzzwords[Math.floor(Math.random() * buzzwords.length)];
      let result = text
        .replace(/good/g, 'optimal')
        .replace(/bad/g, 'suboptimal')
        .replace(/do/g, 'action')
        .replace(/use/g, 'utilize');
      if (Math.random() > 0.5) {
        result = 'Let\'s ' + randomBuzzword + ' to ' + result;
      }
      return result;
    }
  },
  developer: {
    name: 'Developer',
    icon: '💻',
    transform: (text: string) => {
      const terms = ['404', 'null', 'undefined', 'recursion', 'segfault'];
      const randomTerm = terms[Math.floor(Math.random() * terms.length)];
      let result = text
        .replace(/problem/g, 'bug')
        .replace(/fix/g, 'patch')
        .replace(/works/g, 'compiles')
        .replace(/easy/g, 'trivial');
      if (Math.random() > 0.6) {
        result = result + ' // TODO: ' + randomTerm;
      }
      return result;
    }
  }
};

const platforms = [
  { id: 'twitter', name: 'Twitter/X', icon: '🐦', maxLength: 280, charLimit: 280, supportsLineBreaks: true, supportsImages: true },
  { id: 'facebook', name: 'Facebook', icon: '📘', maxLength: 63206, charLimit: 63206, supportsLineBreaks: true, supportsImages: true },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', maxLength: 3000, charLimit: 3000, supportsLineBreaks: true, supportsImages: true },
  { id: 'instagram', name: 'Instagram', icon: '📷', maxLength: 2200, charLimit: 2200, supportsLineBreaks: true, supportsImages: true },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', maxLength: 150, charLimit: 150, supportsLineBreaks: true, supportsImages: false },
  { id: 'reddit', name: 'Reddit', icon: '🔴', maxLength: 40000, charLimit: 40000, supportsLineBreaks: true, supportsImages: true },
  { id: 'threads', name: 'Threads', icon: '🧵', maxLength: 500, charLimit: 500, supportsLineBreaks: true, supportsImages: true },
  { id: 'discord', name: 'Discord', icon: '💬', maxLength: 2000, charLimit: 2000, supportsLineBreaks: true, supportsImages: true },
  { id: 'slack', name: 'Slack', icon: '📋', maxLength: 4000, charLimit: 4000, supportsLineBreaks: true, supportsImages: true },
];

const formatText = (text: string, platformId: string): string => {
  if (!text) return '';
  const platform = platforms.find(p => p.id === platformId);
  if (!platform) return text;
  let formatted = text;
  switch (platformId) {
    case 'twitter':
      formatted = formatted.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
      break;
    case 'tiktok':
      formatted = formatted.trim();
      if (formatted.length > 150) formatted = formatted.substring(0, 147) + '...';
      if (!formatted.includes('#') && formatted.length < 150) formatted += ' #viral';
      break;
    case 'instagram':
      formatted = formatted.replace(/\n\n+/g, '\n\n');
      if (!formatted.includes('#') && formatted.length < 2100) formatted += '\n\n#photo #instagood';
      break;
    case 'linkedin':
      formatted = formatted.replace(/\n/g, '\n\n');
      break;
    case 'reddit':
      formatted = formatted.replace(/\n\n+/g, '\n\n');
      break;
    default:
      formatted = formatted.replace(/\n\n+/g, '\n\n');
  }
  if (platform.charLimit && formatted.length > platform.charLimit) {
    formatted = formatted.substring(0, platform.charLimit - 3) + '...';
  }
  return formatted;
};

const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const result = document.execCommand('copy');
    document.body.removeChild(textArea);
    return result;
  } catch (error) {
    return false;
  }
};

const RenderIcon: React.FC<{ icon: any, size?: number, style?: React.CSSProperties }> = ({ icon, size = 20, style }) => {
  if (typeof icon === 'string') {
    return <span style={{ fontSize: `${size}px`, ...style }}>{icon}</span>;
  }
  return React.createElement(icon, { size, style });
};

const PlatformSelector: React.FC<{ selectedPlatform: string; setSelectedPlatform: (p: string) => void }> = ({ selectedPlatform, setSelectedPlatform }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = platforms.find(p => p.id === selectedPlatform);
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex', alignItems: 'center', gap: '10px', background: colors.surfaceHover,
          color: colors.textPrimary, border: `1px solid ${colors.border}`, borderRadius: '8px',
          padding: '12px 16px', fontSize: '14px', cursor: 'pointer', width: '100%',
          justifyContent: 'space-between', transition: 'all 0.2s'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <RenderIcon icon={selected?.icon} size={20} />
          <span>{selected?.name || 'Select Platform'}</span>
        </div>
        {isOpen ? <ChevronUp size={18} style={{ color: colors.textMuted }} /> : <ChevronDown size={18} style={{ color: colors.textMuted }} />}
      </button>
      {isOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px',
          background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: '8px',
          padding: '8px', zIndex: 1000, maxHeight: '300px', overflowY: 'auto', boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
        }}>
          {platforms.map((p) => (
            <button key={p.id} onClick={() => { setSelectedPlatform(p.id); setIsOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                background: selectedPlatform === p.id ? colors.surfaceHover : 'transparent', border: 'none',
                padding: '10px 12px', borderRadius: '6px', cursor: 'pointer', color: colors.textPrimary,
                fontSize: '14px', textAlign: 'left', transition: 'background 0.2s'
              }}
            >
              <RenderIcon icon={p.icon} size={20} />
              <span>{p.name}</span>
              <span style={{ marginLeft: 'auto', fontSize: '11px', color: colors.textMuted }}>
                {p.charLimit.toLocaleString()} chars
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const FormatButton: React.FC<{ icon: any; label: string; onClick: () => void }> = ({ icon: Icon, label, onClick }) => (
  <button onClick={onClick}
    style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
      background: colors.surfaceHover, color: colors.textSecondary, border: `1px solid ${colors.border}`,
      borderRadius: '8px', padding: '10px 6px', cursor: 'pointer', fontSize: '11px',
      transition: 'all 0.2s', minWidth: '60px', fontWeight: 500
    }}
    title={label}
  >
    {typeof Icon === 'string' ? <span style={{ fontSize: '18px' }}>{Icon}</span> : <Icon size={18} />}
    <span>{label}</span>
  </button>
);

const GenerationalTranslator: React.FC<{ text: string; setText: (t: string) => void }> = ({ text, setText }) => {
  const [selectedGen, setSelectedGen] = useState('genz');
  const [translated, setTranslated] = useState('');
  const [translating, setTranslating] = useState(false);
  const gens = Object.entries(generationStyles).map(([id, s]) => ({ id, name: s.name, icon: s.icon }));

  const translate = () => {
    if (!text) return;
    setTranslating(true);
    setTimeout(() => {
      const style = generationStyles[selectedGen as keyof typeof generationStyles];
      setTranslated(style.transform(text));
      setTranslating(false);
    }, 500);
  };

  return (
    <div style={{ background: colors.surface, borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ color: colors.textPrimary, margin: 0, fontSize: '18px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={20} style={{ color: colors.accent }} /> Generational Translator
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: colors.textMuted }}>Adapt content for different audiences</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={translate} disabled={translating || !text}
            style={{
              background: translating ? colors.surfaceHover : colors.accent, color: translating ? colors.textMuted : colors.background,
              border: 'none', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontWeight: 500,
              cursor: translating || !text ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            {translating ? <div style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: colors.textPrimary, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> : <Sparkles size={14} />}
            Translate
          </button>
          <button onClick={() => translated && setText(translated)} disabled={!translated}
            style={{
              background: !translated ? colors.surfaceHover : colors.success, color: !translated ? colors.textMuted : colors.background,
              border: 'none', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontWeight: 500,
              cursor: !translated ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <Copy size={14} /> Apply
          </button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        {gens.map((g) => (
          <button key={g.id} onClick={() => setSelectedGen(g.id)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
              background: selectedGen === g.id ? colors.accent : colors.surfaceHover,
              color: selectedGen === g.id ? colors.background : colors.textPrimary,
              border: `1px solid ${selectedGen === g.id ? colors.accent : colors.border}`, borderRadius: '10px',
              padding: '16px 12px', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s', fontWeight: 500
            }}
          >
            <span style={{ fontSize: '24px' }}>{g.icon}</span>
            <span>{g.name}</span>
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: colors.textSecondary, fontWeight: 500 }}>Original</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..."
            style={{ width: '100%', minHeight: '150px', background: colors.surfaceHover, color: colors.textPrimary,
              border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '16px', fontSize: '15px',
              fontFamily: 'inherit', resize: 'vertical', lineHeight: 1.6 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: colors.textSecondary, fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RenderIcon icon={generationStyles[selectedGen as keyof typeof generationStyles].icon} size={16} /> {generationStyles[selectedGen as keyof typeof generationStyles].name}
          </label>
          <div style={{ width: '100%', minHeight: '150px', background: colors.surfaceHover, color: colors.textPrimary,
            border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '16px', fontSize: '15px',
            fontFamily: 'inherit', whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflowY: 'auto', lineHeight: 1.6
          }}>
            {translated || 'Translation appears here...'}
          </div>
        </div>
      </div>
    </div>
  );
};
