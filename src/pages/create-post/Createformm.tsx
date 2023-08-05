import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
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
        navigate("/");
    };


    return (
        <div className="create-post-page">
            <div className="create-form-container">
                <form onSubmit={handleSubmit(onCreatePost)}>
                    <div className="create-form-group">
                        <input
                            placeholder="Add a Title"
                            {...register('title')}
                            className="create-form-input"
                        />
                        {errors.title && <p className="create-form-error"> {errors.title.message} </p>}
                    </div>

                    <div className="create-form-group">
                        <textarea
                            placeholder="Add Description"
                            {...register('description')}
                            className="create-form-textarea"
                        />
                        {errors.description && <p className="create-form-error"> {errors.description.message} </p>}
                    </div>

                    <div className="create-form-submit-container">
                        <input type="submit" className="create-form-submit-button" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};