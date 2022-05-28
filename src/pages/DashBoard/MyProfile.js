import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import auth from '../../firebase.init';

const MyProfile = () => {
    const [user] = useAuthState(auth)
    const handleForm = e => {
        e.preventDefault()
        const phone = e.target.phone.value
        const facebook = e.target.facebook.value
        const github = e.target.github.value

        const profileInfo = {
            name: user.displayName,
            email: user.email,
            phone: phone,
            github: github,
            facebook: facebook
        }


        const email = user?.email
        if (email) {
            fetch(`/${email}`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(profileInfo),
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result) {
                        toast.success("Update Successfully")
                    }

                })
        }
    }


    return (
        <div class="card w-96 bg-base-100 shadow-xl">


            <form onSubmit={handleForm}>
                <div class="card-body items-center text-center">
                    <div class="avatar">
                        <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user.photoURL} alt="" />
                        </div>
                    </div>
                    <h2 class="card-title">{user.displayName}</h2>
                    <p>{user.email}</p>
                    <label>Phone:

                    </label>
                    <input name="number" className='border-2 border-black' type="number" />
                    <label>Facebook:

                    </label>
                    <input name="facebook" className='border-2 border-black' type="text" />
                    <label>Github:

                    </label>
                    <input name="github" className='border-2 border-black' type="text" />
                    <div class="card-actions">
                        <button class="btn btn-primary">update</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MyProfile;