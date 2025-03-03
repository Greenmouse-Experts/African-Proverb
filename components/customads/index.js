import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AdsContext } from '@/context/adsContext';
import { useContext } from 'react';

const CustomAds = () => {
    const { adsVideo, adsImg } = useContext(AdsContext);
    const [showVideo, setShowVideo] = useState(false);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        if (adsVideo) {
            setShowVideo(true);
        }
        if (adsImg) {
            setShowImage(true);
        }
    }, [adsVideo, adsImg]);

    // Assuming binaryData contains the actual binary data of the video
    const videoUrl = `data:video/mp4;base64,${adsVideo?.data?.file}`;

    return (
        <div className='flex justify-center items-center'>
            {showVideo && (
                <div
                    className="overlay"
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        zIndex: 999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <video controls={true} autoPlay muted width="50%" height="50%">
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    <button
                        onClick={() => setShowVideo(false)}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            color: 'white',
                            right: '10px',
                            zIndex: 1000,
                        }}
                    >
                        Close Ads
                    </button>
                </div>
            )}


            {/* Overlay for Image */}
            {showImage && (
                <div
                    className="overlay"
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        zIndex: 999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {adsImg && (
                        <Image
                            alt="Ad Image"
                            src={`data:image/png;base64,${adsImg?.data?.file}`}
                            width={500}
                            height={500}
                        />
                    )}
                    <button
                        onClick={() => setShowImage(false)}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            color: 'white',
                            right: '10px',
                            zIndex: 1000,
                        }}
                    >
                        Close Ads
                    </button>
                </div>
            )}
        </div>
    );
};

export default CustomAds;
