import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { authErrorMessage } from '../authErrors.js'

function RegisterPage() {
    const { register } = useAuth()  // Changed: only register, no login or loginWithGoogle
    const navigate = useNavigate()
    const location = useLocation()
    const goTo = location.state?.from ?? '/'
    const [name, setName] = useState('')  // Added: name state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)
    
    async function handleSubmit(event) {
        event.preventDefault()
        setError('')
        setBusy(true)
        
        // Added: check name length first
        if (name.trim().length < 3) {
            setError('Enter your name (at least 3 characters).')
            setBusy(false)
            return
        }
        
        try {
            // Changed: use register with name.trim(), email, password
            await register(name.trim(), email, password)
            navigate(goTo, { replace: true })
        } catch (err) {
            setError(authErrorMessage(err))
        } finally {
            setBusy(false)
        }
    }
    
    // Removed: handleGoogle function (no Google button)
    
    return (
        <section className="auth-page">
            <form className="card form" onSubmit={handleSubmit}>
                <h2>Create an account</h2>  {/* Changed heading */}
                
                {/* Added: name field */}
                <label htmlFor="name">Name</label>
                <input id="name" type="text" value={name}
                    onChange={(e) => setName(e.target.value)} required />
                
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} required />
                
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} required />
                
                {error && <p className="field-error" role="alert">{error}</p>}
                
                {/* Changed: button text */}
                <button type="submit" className="btn" disabled={busy}>
                    {busy ? 'Creating…' : 'Register'}
                </button>
                
                {/* Removed: Google button */}
                
                {/* Changed: link text and destination */}
                <p className="muted">Already registered? <Link to="/login"
                    state={location.state}>Log in</Link></p>
            </form>
        </section>
    )
}

export default RegisterPage