import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

function App({Component}){
    return (
        <>
            <Head>
                <title>이야기 터</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
                <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
            <AppLayout>
                <Component/>  
            </AppLayout>
        </>
    )
}


export default App