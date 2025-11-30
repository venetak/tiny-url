import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import axios from '../api/axios';

interface Url {
  shorturl: string;
  longurl: string;
  shortcode: string;
  createdat?: string;
}

// Pagination removed; show all URLs

const UrlTable: React.FC<{ newUrl?: Url }> = ({ newUrl }) => {
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchUrls();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (newUrl) {
      setUrls(prev => [newUrl, ...prev]);
    }
  }, [newUrl]);

  const fetchUrls = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/urls`);
      setUrls(res.data.data || []);
    } catch (err: any) {
      message.error('Failed to fetch URLs');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Short URL',
      dataIndex: 'shorturl',
      key: 'shorturl',
      render: (text: string) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
    },
    {
      title: 'Long URL',
      dataIndex: 'longurl',
      key: 'longurl',
      render: (text: string) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
    },
    {
      title: 'Created At',
      dataIndex: 'createdat',
      key: 'createdat',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={urls.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
      rowKey={record => record.shortcode}
      loading={loading}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: urls.length,
        onChange: (page) => setCurrentPage(page),
        showSizeChanger: false,
      }}
    />
  );
};

export default UrlTable;
