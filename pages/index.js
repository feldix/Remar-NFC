import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react';
import { NFC, Ndef, NFCOriginal } from '@awesome-cordova-plugins/nfc';
import { IonButton, IonFabButton, IonHeader, IonInput, IonText } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import { TextHelper } from '@awesome-cordova-plugins/nfc';
import ReadNfc from '../components/ReadNfc'
import WriteNfc from '../components/WriteNfc'
import styles from '../styles/Home.module.css'
// import styles from '../styles/global.css'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

	const [isPopup, setIsPopup] = useState(false);
	const handleNewButton = () =>{
		setIsPopup(true);
	}
	const handleCancelButton = () =>{
		setIsPopup(false);
	}
	const handleAddKeyButton = () =>{
		setIsPopup(false);
	}

	useEffect(() => {
		let popup = document.getElementById("popup");
		if(isPopup)
			popup.className.replace("invisible", "visible");
		
		else
			popup.className.replace("visible", "invisible");

		
	}, [isPopup]);
	return (
		<>
			<Head>
			<title>Create Next App</title>
			<meta name="description" content="Generated by create next app" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="stylesheet" href="../styles/global.css"/>
			<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className='flex flex-col items-center h-screen text-center'>
			<h1 className='text-purple-dark text-2xl font-semibold py-3'  id="lol">Welcome to RemarNFC</h1>
			<meta name="description" content="Generated by create next app" />
			<div className='flex flex-col items-end h-screen w-screen'>
			<IonFabButton className='text-[40px] sticky top-[85%] right-[10%] ' color="dark-purple" onClick={()=>{alert("hi")}}>  <span class="mb-2">+</span>
</IonFabButton>
			</div>
			</div>
			
		</>
	)
}

//USE THIS CODE NFC PLUGIN https://github.com/escully27/phonegap-nfc-android-12/blob/master/src/android/src/com/chariotsolutions/nfc/plugin/NfcPlugin.java
