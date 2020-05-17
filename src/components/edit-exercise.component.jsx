import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios';

const EditExercise = (props) => {
    const [exerciseStates , setExerciseState] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    })

    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')

    useEffect(()=>{
        axios.get('http://localhost:5000/exercises/'+props.match.params.id)
        .then(response => {
            setExerciseState({
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)
            })
        })
        .catch(err => console.log(err))

        axios.get("http://localhost:5000/users")
        .then(response => {
            if (response.data.length > 0) {
                setUsers(response.data.map(user => user.username))
            }
        })
    },[])

    const onSubmit = (e) => {
        e.preventDefault();
        const exercise = {
            username: exerciseStates.username,
            description: exerciseStates.description,
            duration: exerciseStates.duration,
            date: exerciseStates.date,
        }
        console.log(exercise)
        axios.post('http://localhost:5000/exercises/update/'+ props.match.params.id ,exercise)
        .then(res => console.log(res.data));

        window.location = '/';
    }

    return(
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>Username: </label>
                    <select
                        required 
                        className='form-control' 
                        value={exerciseStates.username} 
                        onChange={(e) => setExerciseState({...exerciseStates,username: e.target.value})}
                        >
                        {
                            users.map((user) => {
                            return <option key={user} value={user}>{user}</option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text"
                        required
                        className="form-control"
                        value={exerciseStates.description}
                        onChange={(e) => setExerciseState({...exerciseStates,description: e.target.value})}
                        />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes)</label>
                    <input 
                        type="text"
                        required
                        className="form-control"
                        value={exerciseStates.duration}
                        onChange={(e) => setExerciseState({...exerciseStates,duration: e.target.value})}
                        />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <DatePicker
                        selected={exerciseStates.date}
                        onChange={(date) => setExerciseState({...exerciseStates,date})}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}

export default EditExercise;