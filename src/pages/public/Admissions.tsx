import React from 'react';
import { useCms } from '../../context/CmsContext';
import { FileText, CheckCircle } from 'lucide-react';

export default function Admissions() {
  const { state } = useCms();
  
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <div className="bg-primary-900 text-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">Admissions</h1>
          <p className="text-primary-200 text-lg max-w-2xl">Join our vibrant learning community. Find all the information you need to apply.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto w-full py-16 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-serif font-bold text-primary-950 mb-6 uppercase flex items-center gap-3">
            <span className="w-8 h-1 bg-accent-500 inline-block"></span>
            Admission Details
          </h2>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {state.schoolInfo.admissionDetails}
            </p>
          </div>

          <h3 className="text-xl font-bold text-primary-900 mb-4 uppercase mt-12">Admission Process</h3>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
            {[
              { title: "Registration", desc: "Procure the registration form from the school office or download it online." },
              { title: "Submission", desc: "Submit the filled form along with necessary documents (Birth Certificate, Photos, previous report cards)." },
              { title: "Interaction", desc: "A brief interaction session with the child and parents." },
              { title: "Confirmation", desc: "Admission confirmation and fee payment." }
            ].map((step, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">
                  {idx + 1}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-gray-100 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-primary-50 p-6 rounded-xl border border-primary-100">
            <h3 className="text-lg font-bold text-primary-900 mb-4 uppercase">Eligibility Criteria</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-green-600 shrink-0" />
                <span className="text-sm text-gray-700">Pre-Nursery: 2.5 to 3.5 years as of April 1st</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-green-600 shrink-0" />
                <span className="text-sm text-gray-700">Nursery: 3.5 to 4.5 years as of April 1st</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-green-600 shrink-0" />
                <span className="text-sm text-gray-700">Grade 1: 5.5 to 6.5 years as of April 1st</span>
              </li>
            </ul>
          </div>

          <div className="bg-accent-50 p-6 rounded-xl border border-accent-200">
            <h3 className="text-lg font-bold text-accent-900 mb-4 uppercase">Important Documents</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-800">
                <FileText size={16} className="text-accent-600" /> Date of Birth Certificate
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-800">
                <FileText size={16} className="text-accent-600" /> Aadhar Card (Child & Parents)
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-800">
                <FileText size={16} className="text-accent-600" /> 4 Passport size photographs
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-800">
                <FileText size={16} className="text-accent-600" /> Previous School Transfer Certificate
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
