import React,{useState} from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [username,setUsername] = useState()
    
    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            username,
        }
        axios.post("http://localhost:5000/users/add", user)
        .then(res => console.log(res.data))
        setUsername('')
    }


    return(
        <div>
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                </div>
                <div className="form-group">
                    <input 
                        type="submit" 
                        className="btn btn-primary"
                        value="Create User"/>
                </div>
            </form>
        </div>
    )
}

export default CreateUser;