import { IPost } from "./Main";
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import React, { useEffect, useState } from "react";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";

interface Props {
    post: IPost;
}

interface Likes {
    LikeId: string;
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
        setLikeCount(likeData.docs.map((doc) => ({ userId: doc.data().userId, LikeId: doc.id })));
    };

    const AddLikes = async () => {
        try {
            if (user && !hasUserLiked) {
                const newDoc = await addDoc(likeRef, { userId: user?.uid, postId: post.id });
                setLikeCount((prev) => prev ? [...prev, { userId: user?.uid, LikeId: newDoc.id }] : [{ userId: user?.uid, LikeId: newDoc.id }]);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const RemoveLikes = async () => {
        try {
            const likeToDelete = query(likeRef, where("postId", '==', post.id), where("userId", '==', user?.uid));
            const likeToDeleteDocs = await getDocs(likeToDelete);
            const deleteDocRef = doc(db, "likes", likeToDeleteDocs.docs[0].id);
            const likeId = likeToDeleteDocs.docs[0].id;
            await deleteDoc(deleteDocRef);
            if (user) {
                setLikeCount((prev) => prev && prev.filter((like) => like.LikeId !== likeId));
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const hasUserLiked = likeCount?.find((like) => like.userId === user?.uid);

    useEffect(() => {
        getLikes();
    }, []);

    return (
        <div className="post-container">
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="description">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <div className="username">
                    <p>{post.username ? `${post.username}` : "Unknown"}</p>
                </div>
                <div className="likes">
                    <button style={{ border: "none", background: "none" }} onClick={hasUserLiked ? RemoveLikes : AddLikes}>
                        {hasUserLiked ? <ThumbsDown color="black" size={15} strokeWidth={4} /> : <ThumbsUp color="black" size={15} strokeWidth={4} />}
                    </button>
                    <p className="like-count">{likeCount ? likeCount.length : 0}</p>
                </div>
            </div>

        </div>
    );
};
