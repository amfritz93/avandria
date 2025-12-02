import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCharacterCreationData, createHero, selectSpecies, selectCallings, selectCreationDataLoading, selectIsCreating, selectCreateError } from '../../store/heroSlice';
import SpeciesSelection from './SpeciesSelection';
import CallingSelection from './CallingSelection';
import GenderSelection from './GenderSelection';
import NameInput from './NameInput';
import SkillTreeOverview from './SkillTreeOverview';
import CreationSummary from './CreationSummary';

const STEPS = [
  { id: 'species', title: 'Choose Your Species', subtitle: 'Select from 12 unique races' },
  { id: 'calling', title: 'Choose Your Calling', subtitle: 'Select your class and path' },
  { id: 'gender', title: 'Choose Your Identity', subtitle: 'Select your gender identity' },
  { id: 'name', title: 'Name Your Hero', subtitle: 'Give your hero a name' },
  { id: 'skills', title: 'Skill Tree Overview', subtitle: 'Spend your first skill point' },
  { id: 'summary', title: 'Review & Create', subtitle: 'Confirm your choices' }
];

const CharacterCreationWizard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const species = useSelector(selectSpecies);
  const callings = useSelector(selectCallings);
  const isLoading = useSelector(selectCreationDataLoading);
  const isCreating = useSelector(selectIsCreating);
  const createError = useSelector(selectCreateError);

  // Local wizard state
  const [currentStep, setCurrentStep] = useState(0);
  const [heroData, setHeroData] = useState({
    species: null,
    calling: null,
    genderIdentity: null,
    heroName: '',
    initialSkillBranch: null
  });

  // Fetch game data on mount
  useEffect(() => {
    if (species.length === 0 || callings.length === 0) {
      dispatch(fetchCharacterCreationData());
    }
  }, [dispatch, species.length, callings.length]);

  // Navigation handlers
  const canGoNext = () => {
    switch (STEPS[currentStep].id) {
      case 'species':
        return heroData.species !== null;
      case 'calling':
        return heroData.calling !== null;
      case 'gender':
        return heroData.genderIdentity !== null;
      case 'name':
        return heroData.heroName.trim().length >= 2 && heroData.heroName.trim().length <= 20;
      case 'skills':
        return heroData.initialSkillBranch !== null;
      case 'summary':
        return true;
      default:
        return false;
    }
  };

  const goNext = () => {
    if (currentStep < STEPS.length - 1 && canGoNext()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex) => {
    // Only allow going back to previous steps
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  // Update hero data
  const updateHeroData = (field, value) => {
    setHeroData(prev => ({ ...prev, [field]: value }));
  };

  // Create hero handler
  const handleCreate = async () => {
    const result = await dispatch(createHero({
      heroName: heroData.heroName.trim(),
      species: heroData.species,
      calling: heroData.calling,
      genderIdentity: heroData.genderIdentity
    }));

    if (createHero.fulfilled.match(result)) {
      // Success - navigate to dashboard or game
      navigate('/dashboard');
    }
  };

  // Get selected data for display
  const selectedSpecies = species.find(s => s.id === heroData.species);
  const selectedCalling = callings.find(c => c.id === heroData.calling);

  // Render step content
  const renderStepContent = () => {
    switch (STEPS[currentStep].id) {
      case 'species':
        return (
          <SpeciesSelection
            species={species}
            selectedSpecies={heroData.species}
            onSelect={(id) => updateHeroData('species', id)}
          />
        );
      case 'calling':
        return (
          <CallingSelection
            callings={callings}
            selectedCalling={heroData.calling}
            onSelect={(id) => updateHeroData('calling', id)}
            selectedSpecies={selectedSpecies}
          />
        );
      case 'gender':
        return (
          <GenderSelection
            selectedGender={heroData.genderIdentity}
            onSelect={(gender) => updateHeroData('genderIdentity', gender)}
          />
        );
      case 'name':
        return (
          <NameInput
            name={heroData.heroName}
            onChange={(name) => updateHeroData('heroName', name)}
            selectedSpecies={selectedSpecies}
            selectedCalling={selectedCalling}
          />
        );
      case 'skills':
        return (
          <SkillTreeOverview
            calling={heroData.calling}
            callingData={selectedCalling}
            selectedBranch={heroData.initialSkillBranch}
            onSelectBranch={(branch) => updateHeroData('initialSkillBranch', branch)}
          />
        );
      case 'summary':
        return (
          <CreationSummary
            heroData={heroData}
            selectedSpecies={selectedSpecies}
            selectedCalling={selectedCalling}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading character creation data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">Create Your Hero</h1>
          <p className="text-text-secondary">Begin your adventure in Avandria</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => goToStep(index)}
                  disabled={index > currentStep}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all
                    ${index === currentStep
                      ? 'bg-primary text-white'
                      : index < currentStep
                        ? 'bg-success text-white cursor-pointer hover:bg-success/80'
                        : 'bg-surface text-text-secondary cursor-not-allowed'
                    }`}
                >
                  {index < currentStep ? '✓' : index + 1}
                </button>
                {index < STEPS.length - 1 && (
                  <div className={`w-8 h-1 mx-1 ${index < currentStep ? 'bg-success' : 'bg-surface'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-text-primary">{STEPS[currentStep].title}</h2>
          <p className="text-text-secondary">{STEPS[currentStep].subtitle}</p>
        </div>

        {/* Step Content */}
        <div className="bg-surface rounded-lg p-6 mb-6 min-h-[400px]">
          {renderStepContent()}
        </div>

        {/* Error Display */}
        {createError && (
          <div className="bg-error/10 border border-error text-error rounded-lg p-4 mb-6 text-center">
            {createError}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={goBack}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-all
              ${currentStep === 0
                ? 'bg-surface text-text-secondary cursor-not-allowed'
                : 'bg-surface text-text-primary hover:bg-surface/80'
              }`}
          >
            Back
          </button>

          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={goNext}
              disabled={!canGoNext()}
              className={`px-6 py-3 rounded-lg font-semibold transition-all
                ${canGoNext()
                  ? 'bg-primary text-white hover:bg-primary/80'
                  : 'bg-surface text-text-secondary cursor-not-allowed'
                }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleCreate}
              disabled={isCreating || !canGoNext()}
              className={`px-8 py-3 rounded-lg font-semibold transition-all
                ${isCreating
                  ? 'bg-primary/50 text-white cursor-wait'
                  : 'bg-success text-white hover:bg-success/80'
                }`}
            >
              {isCreating ? 'Creating...' : 'Create Hero'}
            </button>
          )}
        </div>

        {/* Cancel Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancel and return to dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCreationWizard;
