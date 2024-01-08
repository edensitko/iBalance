import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import Home from '../../../pages/Home';
import Login from '../../../pages/login';
import SignUp from '../../../pages/signup';
import PageNotFound from '../../../pages/PageNotFound';
import { useAuthContext } from '../../../hooks/useAuthContext';
import Reports from '../../../pages/reports';

function MainRoutes(): JSX.Element {
    const { authIsReady, user } = useAuthContext();

    if (!authIsReady) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Routing ">

            <Routes>
                <Route
                    path="/"
                    element={user ? <Home /> : <Navigate to="/login" />}
                />
                <Route
                    path="/about"
                    element={user ? <Reports /> : <Navigate to="/login" />}
                />
                <Route
                    path="/login"
                    element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route
                    path="/signup"
                    element={!user ? <SignUp /> : <Navigate to="/" />}
                />
                <Route
                    path="*"
                    element={user ? <PageNotFound /> : <Navigate to="/" />}
                />
            </Routes>

        </div>
    );
}

export default MainRoutes;
