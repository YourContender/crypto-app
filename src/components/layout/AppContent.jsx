import React from 'react';
import { Layout, Typography } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import AssetTable from './AssetTable';
import PortfolioChart from './PortfolioChart';

const contentStyle = {
    textAlign: 'center',
    minHeight: "calc(100vh - 60px)",
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#001529',
};

export const AppContent = () => {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, coin) => {
    acc[coin.id] = coin.price;
    return acc
  }, {})

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title 
        level={3}
        style={{textAlign: 'left', color: '#fff'}}
      >
        Portfolio: {assets
        .map(asset => {
          return asset.amount * cryptoPriceMap[asset.id]
        })
        .reduce((acc, v) => (acc += v), 0)
        .toFixed(2)}$
      </Typography.Title>
      <PortfolioChart/>
      <AssetTable/>
    </Layout.Content>
  )
}
