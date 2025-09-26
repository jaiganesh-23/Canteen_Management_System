import React, { useEffect }from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const CompleteProfilePage = () => {
    const query = useQuery();
    const email = query.get("email") || "";
    const name = query.get("name") || "";
    const role = query.get("role") || "";
    const navigate = useNavigate()
    
    useEffect(() => {
        if(role === "canteenOwner" || role === "staff") {
            navigate('/main-dashboard');
        }
    }, []);
    

  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [newRole, setNewRole] = React.useState('');
  const [canteenNames, setCanteenNames] = React.useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      console.log("Passwords do not match");
      return;
    }
    navigate('/main-dashboard');
    return;
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/register`, {
            email,
            name,
            password,
            newRole,
            canteenNames
        });
        if (response.data.success) {
            toast.success("Staff registered successfully as " + response.data.user.name);
            // Redirect to login page or dashboard
            navigate('/sign-in');
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error("Registration error:", error);
        // Handle error response from the server
        if (error.response && error.response.data && error.response.data.message) {
            // Use the server's error message (e.g., for 400 Bad Request)
            toast.error(error.response.data.message);
        }
        else {
            // Fallback for network or unknown errors
            toast.error("Something went wrong. Please try again.");
        }
        return;
    }
  }

return (
    <div className='register-staff-page'>
            <div className="register-staff-card">
                    <div className="register-staff-form">
                            <p className='register-staff-form-header'>Welcome to Canteen Pro</p>
                            <p className='register-staff-form-text'>Complete Your Profile Details before getting started</p>
                            <form onSubmit={handleSubmit}>
                                    <div className="register-staff-form-input">
                                            <Label htmlFor="password">Password</Label>
                                            <Input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="register-staff-form-input">
                                            <Label htmlFor="confirm-password">Confirm Password</Label>
                                            <Input type="password" id="confirm-password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                    <div className="register-staff-form-input">
                                            <Label htmlFor="role">Select Role</Label>
                                            <select name="role" id="role" value={newRole} onChange={() => setNewRole(e.target.value)}>
                                                <option value="" disabled>Select your role</option>
                                                <option value="staff">Staff</option>
                                                <option value="canteenOwner">Canteen Owner</option>
                                            </select>
                                    </div>
                                    <div className="register-staff-form-input">
                                            <Label htmlFor="canteen-name">Canteen Names(Not required if canteens are not created.)</Label>
                                            <Label htmlFor='canteen-name'>Seperate Canteen Names with comma.</Label>
                                            <Input
                                                type="text"
                                                id="canteen-name"
                                                placeholder="Enter your Canteen Names"
                                                value={canteenNames.join(',')}
                                                onChange={(e) => setCanteenNames(e.target.value.split(',').map(name => name.trim()))}
                                            />
                                    </div>
                                    <div className='register-staff-button-div'>   
                                            <Button type="submit" className='register-staff-form-button'>Complete Profile</Button>
                                    </div>
                            </form>
                    </div>
                    <div className="login-image">
                            <img src="/hero_image3.png" alt="Canteen Pro Software" />
                    </div>
            </div>
    </div>
    );
};

export default CompleteProfilePage;