import React, { useState, useEffect } from 'react';
import like from "../../public/icon/Frame.svg";
import notlike from "../../public/icon/Frame1.svg";
import unlike from "../../public/icon/Vector1.svg";
import notunlike from "../../public/icon/Vector.svg";
import DetailStyles from "@/styles/Detail.module.scss";
import Image from "next/image";
import axios from "axios";
import Cookies from 'js-cookie';

const Like = ({ data }) => {
    const BASE_URL = process.env.BASE_URL;
    const token = Cookies.get("userToken");
    const [reactionType, setReactionType] = useState(null);
    const [likeCount, setLikeCount] = useState(data?.number_of_likes);

    const handleReactionClick = async (newReactionType) => {
        try {
            const payload = {
                reactionType: newReactionType,
                proverbId: data.id,
            };

            const response = await axios.post(`${BASE_URL}/api/proverbs/like/like`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setReactionType(newReactionType);

                // Update the like count based on the reaction
                if (newReactionType === 'LIKE') {
                    setLikeCount(likeCount + 1);
                } else if (newReactionType === 'UNLIKE') {
                    setLikeCount(likeCount - 1);
                }
            } else {
                console.error('Failed to react to the proverb.');
            }
        } catch (error) {
            console.error('Error while reacting to the proverb:', error);
        }
    };

    useEffect(() => {
        const fetchLastAction = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/proverbs/like/lastaction/${data.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setReactionType(response.data.lastAction);
            } catch (error) {
                console.error('Error fetching last action:', error);
            }
        };

        fetchLastAction();
    }, []);

    return (
        <div className={DetailStyles["likecontainer"]}>
            <div className={DetailStyles["likestyle"]}>

                <Image
                    style={{ cursor: "pointer" }}
                    onClick={() => handleReactionClick(reactionType === 'LIKE' ? 'UNLIKE' : 'LIKE')}
                    width={"100%"}
                    height={"100%"}
                    alt={reactionType === 'LIKE' ? 'Liked' : 'Like'}
                    src={reactionType === 'LIKE' ? notunlike : unlike}
                />

                <span>{likeCount}</span>
            </div>
        </div>
    );
};

export default Like;
