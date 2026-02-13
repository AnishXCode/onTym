import {useState, useEffect} from "react";
import { getAuth } from "firebase/auth";
import { app } from "../auth/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {getDatabase, ref, set, get} from "firebase/database";
import "../App.css";
import { toast } from "react-toastify";

const Dashboard = () => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const realtimeDb = getDatabase(app);
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [firstCheck, setFirstCheck] = useState(false);
    const user = auth.currentUser;

    useEffect(() => {
        if(user) {
            const todosRef = ref(realtimeDb, `todos/${user.uid}`);
            get(todosRef).then((snapshot) => {
                if(snapshot.exists()) {
                    const data = snapshot.val();
                    console.log("Fetched Todos: ", data);
                    setTodos(data);
                }
                setFirstCheck(true);
            }).catch((error) => {
                console.error("Error fetching todos: ", error);
            })
        }
    }, [])

    useEffect(() => {
        if(user) { 
            uploadTodosToDb();
        }
    }, [todos]);

    async function uploadTodosToDb() {
        if(firstCheck === false) {
            return;
        }
        try {
            await set(ref(realtimeDb, `todos/${user.uid}`), todos);
            console.log("Todos updated successfully in Realtime Database");
        } catch (error) {
            console.error("Error updating todos: ", error);
        }
    }
    
    async function fetchUserData() {   
        console.log("Current User: ", user);
        if(user) {
            try {
                const userDocRef = doc(db, "users", user.uid);
                console.log("User Doc Ref: ", userDocRef);
                const userDocSnap = await getDoc(userDocRef);
                console.log("User Doc Snap: ", userDocSnap);
                if(userDocSnap.exists()) {
                    setUserData(userDocSnap.data());
                    console.log("User Data: ", userDocSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        } else {
            navigate("/login", {replace: true});
        }
        }

    useEffect(() => {
        fetchUserData();
    }, []);

    async function handleLogout() {
        try {
            await auth.signOut();
            navigate("/login", {replace: true});
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    }

    function handleAddTodo(e) {
        e.preventDefault();
        if (inputValue.trim()) {
            const newTodo = {
                id: Date.now(),
                text: inputValue,
                completed: false,
            };
            setTodos([...todos, newTodo]);
            setInputValue("");
        }
    }

    function handleEditTodo(id) {
        const newText = prompt("Enter new text for the task:");
        console.log("New Text: ", newText);
        if (newText !== null && newText.trim() !== "") {
            const oldText = todos.filter((todo) => todo.id === id)[0].text;
            if(oldText === newText) {
                toast.info("No changes made to the task", {
                    position: "top-center",
                    autoClose: 2000,
                });
                return;
            }
            const updatedText = todos.map((todo) => {
                return todo.id === id ? {...todo, text: newText} : todo;
            })
            console.log("Updated Todos: ", updatedText);
            setTodos(updatedText);
        }
    }

    function handleDeleteTodo(id) {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    function handleToggleTodo(id) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }

    return (
        <div className="dashboard-container">
            {userData ? (
                <div className="dashboard-content">
                    <div className="dashboard-header">
                        <h1>My To-Do List</h1>
                        <p className="welcome-text">Welcome, {userData.firstName}  {userData.lastName}!</p>
                    </div>

                    <form onSubmit={handleAddTodo} className="todo-form">
                        <div className="todo-input-group">
                            <input
                                type="text"
                                className="todo-input"
                                placeholder="Add a new task..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button type="submit" className="todo-add-btn">Add</button>
                        </div>
                    </form>

                    <div className="todos-list">
                        {todos.length === 0 ? (
                            <p className="empty-state">No tasks yet. Add one to get started!</p>
                        ) : (
                            todos.map((todo) => (
                                <div key={todo.id} className="todo-item">
                                    <input
                                        type="checkbox"
                                        className="todo-checkbox"
                                        checked={todo.completed}
                                        onChange={() => handleToggleTodo(todo.id)}
                                    />
                                    <span className={`todo-text ${todo.completed ? "completed" : ""}`}>
                                        {todo.text}
                                    </span>
                                    <button
                                        className="todo-edit-btn"
                                        onClick={() => handleEditTodo(todo.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="todo-delete-btn"
                                        onClick={() => handleDeleteTodo(todo.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="dashboard-footer">
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                </div>
            ) : (
                <p className="loading-text">Loading your data...</p>
            )}
        </div>
    )
}

export default Dashboard;