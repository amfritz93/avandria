import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { CharacterCreationWizard } from '../components/characterCreation';

/**
 * Character Creation Page
 * Protected route that renders the character creation wizard
 * Redirects to landing if not authenticated
 */
const CharacterCreation = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Redirect to landing if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <CharacterCreationWizard />;
};

export default CharacterCreation;
