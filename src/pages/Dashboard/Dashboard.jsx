import React, { useState, useEffect } from 'react';
import useStatusLog from '../../hooks/useStatusLog';
import useConnection from '../../hooks/useConnection';
import DashboardStepper from '../../components/Steps/DashboardStepper';
import Step1 from '../../components/Steps/Step1';
import Step2 from '../../components/Steps/Step2';
import Step3 from '../../components/Steps/Step3';
import Step4 from '../../components/Steps/Step4';
import './Dashboard.css';
import preferencesService from '../../services/preferencesService';
import scheduleService from "../../services/scheduleService";


const Dashboard = () => {
    const { statusLines, addStatus } = useStatusLog();
    const { connectData, isConnected, isConnecting, checkStatus, handleConnect } = useConnection({ addStatus });
    const [isLoading, setIsLoading] = useState(false);
    const [previewPosts, setPreviewPosts] = useState([]);
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        topics: '',
        publishStatus: 'publish',
        days: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        },
        startImmediately: false
    });

    const publishStatusOptions = [
        { value: 'draft', label: 'Draft' },
        { value: 'publish', label: 'Publish' }
    ];

    useEffect(() => {
        const initCheck = async () => {
            addStatus("Initializing connection check...");
            await checkStatus();
        };
        initCheck();
    }, [checkStatus]);

    useEffect(() => {
        if (isConnected) {
            setStep(2);
        }
    }, [isConnected]);

    const onFieldChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const onDayChange = (day) => {
        setFormData(prev => ({
            ...prev,
            days: {
                ...prev.days,
                [day]: !prev.days[day]
            }
        }));
    };

    const goNext = async () => {
        if (step === 2) {
            try {
                setIsLoading(true);
                addStatus('Saving publishing preferences...');

                const dayKeyToNum = {
                    monday: 1,
                    tuesday: 2,
                    wednesday: 3,
                    thursday: 4,
                    friday: 5,
                    saturday: 6,
                    sunday: 1,
                };
                const selectedDays = Object.entries(formData.days)
                    .filter(([, checked]) => checked)
                    .map(([key]) => dayKeyToNum[key]);

                const payload = {
                    username: connectData.username,
                    webUrl: connectData.webUrl,
                    days: Object.entries(formData.days)
                        .filter(([, checked]) => checked)
                        .map(([day]) =>
                            ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
                                .indexOf(day) + 1
                        ),
                    publishStatus: formData.publishStatus.toUpperCase(),
                    startNow: formData.startImmediately
                };


                const { ok, data, status } = await preferencesService.savePreferences(payload);
                console.log("Saving preferences payload:", payload);

                if (!ok) {
                    addStatus(`Failed to save preferences (status ${status}).`);
                    setIsLoading(false);
                    return;
                }
                addStatus('Preferences saved.');
            } catch (err) {
                addStatus(`Error saving preferences: ${err.message}`);
                setIsLoading(false);
                return;
            }
            setIsLoading(false);
        }
        setStep(prev => Math.min(prev + 1, 4));
    };
    const goPrev = () => setStep(prev => Math.max(prev - 1, 1));

    const onAddTask = async () => {
        try {
            setIsLoading(true);
            addStatus("Generating preview posts...");

            const payload = {
                username: connectData.username,
                webUrl: connectData.webUrl,
                topics: formData.topics,
                toneId: null,
            };

            const { ok, data, message } = await scheduleService.generateSchedule(payload);
            console.log("Schedule response:", data);

            if (!ok) {
                addStatus(`❌ ${message}`);
                setIsLoading(false);
                return;
            }

            addStatus(` ${message} (${data.count} posts generated)`);
            setPreviewPosts(data.scheduledPosts || []);
            setStep(4);

        } catch (err) {
            console.error("Error creating schedule:", err);
            addStatus(`Error creating schedule: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="dashboard">
            <h1>Locomote</h1>
            <p className="subtitle">Set up your automated content publishing in just 3 simple steps</p>

            {/* Stepper UI */}
            <DashboardStepper activeStep={step - 1} />

            {/* Step Content */}
            {step === 1 && (
                <section>
                    <Step1
                        addStatus={addStatus}
                        connectData={connectData}
                        isConnected={isConnected}
                        isConnecting={isConnecting}
                        handleConnect={handleConnect}
                    />
                    {isConnected && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
                            <button onClick={goNext} className="lc-next-btn">Next</button>
                        </div>
                    )}
                </section>
            )}

            {step === 2 && (
                <section>
                    <Step2
                        formData={formData}
                        onFieldChange={onFieldChange}
                        onDayChange={onDayChange}
                        publishStatusOptions={publishStatusOptions}
                    />
                    <div className="lc-step-buttons">
                        <button onClick={goPrev} className="lc-prev-btn">Back</button>
                        <button onClick={goNext} className="lc-next-btn">Next</button>
                    </div>
                </section>
            )}

            {step === 3 && (
                <section>
                    <Step3
                        formData={formData}
                        onFieldChange={onFieldChange}
                        isConnected={isConnected}
                    />
                    <div className="lc-step-buttons">
                        <button onClick={goPrev} className="lc-prev-btn">Back</button>
                        {/* <button onClick={onAddTask} disabled={isLoading} className="lc-submit-btn"> */}
                        <button onClick={goNext} disabled={isLoading} className="lc-submit-btn">
                            {isLoading ? "Creating Task..." : "Create Task"}
                        </button>
                    </div>
                </section>
            )}

            {step === 4 && (
                <section>
                    <Step4/>
                </section>
            )}


        </div>
    );
};

export default Dashboard;
