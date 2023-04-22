import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react';
import { NFC, Ndef, NFCOriginal } from '@awesome-cordova-plugins/nfc';
import { IonButton, IonFabButton, IonHeader, IonInput, IonText, IonList } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import { TextHelper } from '@awesome-cordova-plugins/nfc';
import ReadNfc from '../components/ReadNfc'
import WriteNfc from '../components/WriteNfc'
import Keys from '../components/Keys'
import styles from '../styles/Home.module.css'
import {writeDataToPreferences, readDataFromPreferences, deleteAllDataFromPreferences, deleteDataFromPreferences, readAllDataFromPreferences} from "../util/storage.service"
// import styles from '../styles/global.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

	const [popup, setPopup] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [inputKey, setInputKey] = useState('');
	const [isInputInvalid, setIsInputInvalid] = useState(false);
	const [keys, setKeys] = useState({ keys: [], values: [] });

	useEffect(() => {
		const fetchData = async () => {
		  const data = await readAllDataFromPreferences();
		  setKeys(data);
		};
		fetchData();
	  }, []);

	const handleAddKey = async() =>{

		if(inputValue.length < 12 || inputKey <= 0)
			setIsInputInvalid(true);
		else{
			setIsInputInvalid(false);
			await writeDataToPreferences(inputKey, inputValue)
			const data = await readAllDataFromPreferences();
      		setKeys(data);
			setPopup(false);
			setInputKey('');
			setInputValue('');
		}
	}

	const handleDeleteAll = async() =>{
		await deleteAllDataFromPreferences();
    	setKeys({ keys: [], values: [] });
	}

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="stylesheet" href="../styles/global.css" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{popup && <div className='absolute h-screen w-screen opacity-50 bg-black z-10'></div>}
				{popup &&<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col
				 bg-white rounded-lg shadow-md h-1/3 w-2/3 justify-center z-20 items-center' id="popup">
				 		<div className='flex flex-col w-full px-4'>
							<h2 className='text-violet-900'>Name:</h2>
							<IonInput placeholder='My Home'maxlength='32'
							value={inputKey} onIonChange={(e) => setInputKey(e.target.value)}></IonInput>
							<h2 className='text-violet-900'>Code:</h2>
							<IonInput placeholder='123456789ABC'maxlength='12'
							value={inputValue} onIonChange={(e) => setInputValue(e.target.value)}></IonInput>
							{isInputInvalid && <h2 className='text-red-500'>Error, below 12 digits</h2>}
						 </div>
						<div className='flex flex-row'>
							<IonButton color="dark-purple"  onClick={()=>{setPopup(false); setIsInputInvalid(false); setInputKey(''); setInputValue('');}}>Cancel</IonButton>
							<IonButton color="dark-purple" onClick={handleAddKey}>Add Key</IonButton>

						</div>
					</div>
					}

			<div className='flex flex-col items-center h-screen w-screen'>
				<h1 className='text-purple-dark text-2xl font-semibold py-3' id="lol">RemarNFC</h1>
				<div className='border border-violet-500 w-screen items-center justify-center overflow-auto h-screen'>
					<IonList>
						{keys.values.map((item)=>(

							<Keys obj={{key:item.key, value:item.value}}></Keys>
						))}
					</IonList>
				</div>
				<div className='flex flex-row h-1/4 items-center'>
					<IonFabButton className='text-[40px] left' color="dark-purple" onClick={handleDeleteAll}
					> <span class="mb-0">-</span></IonFabButton>
					<IonFabButton className='text-[40px]' color="dark-purple" 
					onClick={
						()=>{setPopup(true)}}
						>  <span class="mb-0">+</span>
					</IonFabButton>
				</div>
			</div>

		</>
	)
}

//USE THIS CODE NFC PLUGIN https://github.com/escully27/phonegap-nfc-android-12/blob/master/src/android/src/com/chariotsolutions/nfc/plugin/NfcPlugin.java
