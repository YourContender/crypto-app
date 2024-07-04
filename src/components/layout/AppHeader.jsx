import React, { useEffect, useState } from 'react'
import { Layout, Select, Space, Button, Modal } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import CoinInfoModal from '../CoinInfoModal';

const headerStyle = {
    width: '100%',    
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

export const AppHeader = () => {
    const [select, setSelect] = useState(false);
    const [modal, setModal] = useState(false);
    const [coin, setCoin] = useState(false);
    const { crypto } = useCrypto();

    useEffect(() => {
        const keypress = (event) => {
            if (event.key === '/') {
                setSelect((prev) => !prev);
            }
        }
        
        document.addEventListener('keypress', keypress);
        return () => document.removeEventListener('keypress', keypress);
    }, [])

    function handleSelect(value) {
        setModal(true);
        setCoin(crypto.find((c) => c.id === value))
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{ width: '250px' }}
                onSelect={handleSelect}
                onClick={() => setSelect((prev) => !prev)}
                open={select}
                value="press / to open"
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={(option) => (
                <Space>
                    <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/> {option.data.label}
                </Space>
                )}
            />

            <Button type="primary">Add Asset</Button>

            <Modal 
                open={modal} 
                footer={null}
                onCancel={() => setModal(false)}
            >
                <CoinInfoModal coin={coin}/>
            </Modal>
        </Layout.Header>
    )
}
