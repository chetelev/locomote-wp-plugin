import React from 'react';

const steps = [
    { number: 1, label: 'Connect', shortLabel: 'Step 1' },
    { number: 2, label: 'Frequency', shortLabel: 'Step 2' },
    { number: 3, label: 'Topics', shortLabel: 'Step 3' },
    { number: 4, label: 'Preview', shortLabel: 'Step 4' }
];

const DashboardStepper = ({ activeStep }) => {
    return (
        <div className="custom-stepper">
            <div className="stepper-steps">
                {steps.map((step, index) => {
                    const isActive = index === activeStep;
                    const isCompleted = index < activeStep;
                    const isInactive = index > activeStep;

                    return (
                        <React.Fragment key={step.number}>
                            <div className="stepper-step">
                                <div className={`step-badge ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isInactive ? 'inactive' : ''}`}>
                                    {isCompleted ? '✓' : step.number}
                                </div>
                                <div className={`step-label-group ${isActive ? 'active' : ''}`}>
                                    <span className="step-number-label">{step.shortLabel}</span>
                                    <span className={`step-title ${isActive ? 'active' : ''}`}>{step.label}</span>
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`stepper-line ${isCompleted ? 'completed' : ''}`}></div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default DashboardStepper;
