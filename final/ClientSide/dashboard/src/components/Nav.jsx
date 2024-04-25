import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mypic from '../assets/profile.png';

const Nav = () => {
    let auth = localStorage.getItem('user')
    auth = JSON.parse(auth)
    const [name, setName] = useState('');
    useEffect(() => {
        if (auth && auth.result && auth.result.uname) {
            setName(auth.result.uname);
        }
    }, [auth]);

    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        navigate('/Login')
    }

    const [path, setPath] = useState('');
    useEffect(() => {
        if (auth && auth.result && auth.result.profile) {
            const fromDB = auth.result.profile.replace(/\\/g, '/').replace('../SERVER-SIDE/public', '');
            // useEffect(() => {
            if (fromDB === null || fromDB === '' || fromDB === 'No File') {
                setPath('');
            } else {
                setPath("http://localhost:7007" + fromDB);
            }
            console.log(path);
            // }, []);
        }

    }, [auth]);

    // http://localhost:7007/uploads/profile-1713941128456.jpg

    return (
        <div className='NavBar-container '>
            <ul className='navbaritems  NavBar '>
                <div className='navbar-left-items'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/Project'>Project</Link></li>
                    {/* <li><Link to='/Task'>Task</Link></li>
                    <li><Link to='/Logs'>Log</Link></li> */}
                </div>
                <div className='navbar-right-items'>
                    {auth ? <>
                        {auth.result.urole == 1 ?
                            <div className='d-flex gap-3'>
                                <li ><Link to='/SignUp'>Add User</Link></li>
                                <li ><Link to='/add-new-project'>Add-project</Link></li>

                            </div>
                            : <></>
                        }
                        {/* <p>{path}</p> */}
                        <img src={path || mypic} alt='Profile' style={{ height: "25px", width: "25px", borderRadius: "5em", marginTop: "7px" }} />

                        <Link to='/EditDetails' style={{ color: "Black", textDecoration: "None", fontSize: "24px" }}>Welcome {name}</Link>

                        <li><Link onClick={handleLogout} to='/Login' className='text-danger'>Logout</Link></li>
                    </>

                        : <>
                            <li><Link to='/Login'>Login</Link></li></>
                    }

                </div>
            </ul>
        </div>
    )
}

export default Nav;