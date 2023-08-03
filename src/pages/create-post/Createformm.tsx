import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
interface createFormData {
    title: string;
    description: string;
}

export const CreateForm = () => {
    const [user] = useAuthState(auth);
    const schema = yup.object().shape({
        title: yup.string().required("You Must Add a title!"),
        description: yup.string().required("You Must Add Description Anna!"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<createFormData>({
        resolver: yupResolver(schema),
    });
    const postRef = collection(db, "posts");
    const onCreatePost = async (data: createFormData) => {
        await addDoc(postRef, {
            title: data.title,
            description: data.description,
            username: user?.displayName,
            userId: user?.uid,
        })
    };

    return (
        <div className="postingPage">
            <form onSubmit={handleSubmit(onCreatePost)}>
                <input placeholder="Title" {...register('title')} />
                <p style={{ color: "red" }}>{errors.title?.message}</p>
                <textarea placeholder="Description" {...register('description')} />
                <p style={{ color: "red" }}>{errors.description?.message}</p>
                <input type="submit" />
            </form>
        </div>
    );
};
