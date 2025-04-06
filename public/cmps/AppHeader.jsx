const { NavLink, Link, useNavigate } = ReactRouterDOM
import { authService } from '../services/auth.service.js'
import { UserMsg } from './UserMsg.jsx'

export function AppHeader({ loggedinUser, setLoggedinUser }) {
    const navigate = useNavigate()

    function onLogout() {
        authService.logout()
            .then(() => {
                setLoggedinUser(null)
                navigate('/bug')
            })
            .catch(err => {
                console.log(err)
                alert("Couldn't logout")
            })
    }

    return (
        <header className="app-header main-content single-row">
            <h1>Miss Bug</h1>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/bug">Bugs</NavLink>
                <NavLink to="/about">About</NavLink>
                {
                    !loggedinUser ?
                        <NavLink to="/auth">Login</NavLink> :
                        <div className="user">
                            <Link to={`/user/${loggedinUser._id}`}>{loggedinUser.fullname}</Link>
                            <button onClick={onLogout}>Logout</button>
                        </div>
                }
            </nav>
            <UserMsg />
        </header>
    )
}
