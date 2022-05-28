import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ManageOrder = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {

        fetch(`http://localhost:5000/orders`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {

                return res.json()
            })
            .then(data => {
                setOrders(data)
                console.log(data)
            })
    }
        , [])
    const handleDelete = id => {
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'DELETE',

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deleteCount > 0) {
                    toast.success('Order deleted')
                }
            })

    }
    return (
        <div class="overflow-x-auto">
            <table class="table w-full">

                <thead>
                    <tr>
                        <th>no</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                        <th>Ordered(piece)</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((a, index) => <tr
                        key={a._id}>
                        <th>{index + 1}</th>
                        <td>{a.name}</td>
                        <td>{a.totalPrice}</td>
                        <td><button onClick={() => handleDelete(a._id)}>delete</button></td>
                    </tr>)}

                </tbody>
            </table>
        </div>
    );
};

export default ManageOrder;