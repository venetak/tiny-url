import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import axios from '../api/axios';

interface ShortenResponse {
  status: string;
  message: string;
  data?: {
    shorturl: string;
    longurl: string;
    shortcode: string;
  };
  error?: string;
}

const UrlShortener: React.FC<{ onAdd: (url: any) => void }> = ({ onAdd }) => {
  const [longUrl, setLongUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!longUrl) {
      message.error('Please enter a URL');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('/api/shorten', { longUrl });
      const data: ShortenResponse = res.data;
      if (data.status === 'error') {
        message.error(data.error || 'Failed to shorten URL');
      } else {
        message.success('Short URL generated!');
        onAdd(data.data);
        setLongUrl('');
      }
    } catch (err: any) {
      message.error(err?.response?.data?.error || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
      <Input
        value={longUrl}
        onChange={e => setLongUrl(e.target.value)}
        placeholder="Enter URL to shorten"
        style={{ flex: 1 }}
      />
      <Button type="primary" loading={loading} onClick={handleShorten}>
        Shorten
      </Button>
    </div>
  );
};

export default UrlShortener;
