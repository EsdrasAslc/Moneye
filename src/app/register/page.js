'use client';

import { useState } from "react";
import EmailForm from './emailForm';
import InfoForm from './infoForm';
import "@/app/register/register-style.css";

export default function Register() {
    const [step, setStep] = useState(1);
    const [userId, setUserId] = useState(null); 
  
    function nextStep(id = null) {
      if (id) {
        setUserId(id); 
      }
      setStep(step + 1); 
    }
  
    return (
      <main>
        <section>
          {step === 1 && <EmailForm nextStep={nextStep} />}
          {step === 2 && <InfoForm userId={userId} nextStep={nextStep} />}
        </section>
      </main>
  );
}
