import { IPost } from "./Main";
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import React, { useEffect, useState } from "react";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
    post: IPost;
}

interface Likes {
    userId: string;
}

export const Post = (props: Props) => {
    const { post } = props;
    const likeRef = collection(db, "likes");
    const [likeCount, setLikeCount] = useState<Likes[] | null>(null);
    const likeRec = query(likeRef, where("postId", '==', post.id));
    const [user] = useAuthState(auth);

    const getLikes = async () => {
        const likeData = await getDocs(likeRec);
        setLikeCount(likeData.docs.map((doc) => ({ userId: doc.data().userid })));
    };

    const addLikes = async () => {
        await addDoc(likeRef, { userId: user?.uid, postId: post.id });
    };

    const hasUserLiked = likeCount?.find((like) => like.userId === user?.uid);
    console.log(hasUserLiked);

    useEffect(() => {
        getLikes();
    }, []);

    return (
        <div>
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="description">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <h2>~{post.username ? post.username : "Unknown"}</h2>
                <button style={{ border: "none", background: "none" }} onClick={addLikes}>
                    {hasUserLiked ? <ThumbsDown color="black" size={15} strokeWidth={3} /> : <ThumbsUp color="black" size={15} strokeWidth={3} />}
                </button>
                {likeCount && <p>{likeCount.length}</p>}
            </div>
        </div>
    );
};
