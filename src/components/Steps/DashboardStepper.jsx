import React from 'react';

const steps = [
    { number: 1, label: 'Connect', shortLabel: 'Step 1' },
    { number: 2, label: 'Frequency', shortLabel: 'Step 2' },
    { number: 3, label: 'Topics', shortLabel: 'Step 3' },
    { number: 4, label: 'Preview', shortLabel: 'Step 4' }
];

const DashboardStepper = ({ activeStep }) => {
    return (
        <div className="mb-12 mx-auto max-w-xl">
            <div className="flex items-center justify-center gap-2">
                {steps.map((step, index) => {
                    const isActive = index === activeStep;
                    const isCompleted = index < activeStep;
                    const isInactive = index > activeStep;

                    return (
                        <React.Fragment key={step.number}>
                            <div className="flex items-center gap-2">
                                <div
                                  className={[
                                    "w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold shadow",
                                    isCompleted && "bg-emerald-600 text-white",
                                    isActive && !isCompleted && "bg-blue-600 text-white",
                                    isInactive && "bg-gray-200 text-gray-400",
                                  ].filter(Boolean).join(' ')}
                                >
                                  {isCompleted ? '✓' : step.number}
                                </div>
                                <div className="flex flex-col gap-px">
                                    <span className={["text-xs font-medium", isActive ? "text-blue-600" : "text-gray-400"].join(' ')}>{step.shortLabel}</span>
                                    <span className={["text-sm font-semibold", isActive ? "text-gray-900" : "text-gray-400"].join(' ')}>{step.label}</span>
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={"w-20 h-0.5 " + (isCompleted ? "bg-blue-600" : "bg-gray-200")}></div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default DashboardStepper;
