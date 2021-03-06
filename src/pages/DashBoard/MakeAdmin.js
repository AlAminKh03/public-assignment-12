import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import useAdmin from '../../Hooks/useAdmin';
import Loading from '../Shared/Loading';

const MakeAdmin = () => {

    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch('https://nameless-bayou-10593.herokuapp.com/user')
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })
    }, [users])


    // const { data: users, isLoading } = useQuery('users', () => {
    //     fetch('https://nameless-bayou-10593.herokuapp.com/user')
    //         .then(res => res.json())
    // })
    // console.log(users)
    // if (isLoading) {
    //     return <Loading></Loading>
    // }
    const makeAdmin = email => {

        console.log(email)
        fetch(`https://nameless-bayou-10593.herokuapp.com/user/makeadmin/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('successfully made an admin')
            })
    }
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">

                <thead>
                    <tr>
                        <th>no</th>
                        <th>Email</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => <tr
                        key={user._id}>
                        <th>{index + 1}</th>
                        <td>{user.email}</td>
                        <td>

                            <button className='btn btn-xs' onClick={() => makeAdmin(user.email)}>Make Admin</button>
                        </td>

                    </tr>)}

                </tbody>
            </table>
        </div>
    );
};

export default MakeAdmin;