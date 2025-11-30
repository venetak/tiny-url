
import React, { useState } from 'react';
import { Layout, Typography, Card } from 'antd';
import UrlShortener from './components/UrlShortener';
import UrlTable from './components/UrlTable';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [newUrl, setNewUrl] = useState<any>(null);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px' }}>
        <Title level={2} style={{ margin: 0 }}>TinyURL Shortener</Title>
      </Header>
      <Content style={{ padding: '24px', maxWidth: 800, margin: '0 auto' }}>
        <Card>
          <UrlShortener onAdd={setNewUrl} />
          <UrlTable newUrl={newUrl} />
        </Card>
      </Content>
    </Layout>
  );
}

export default App;
