import { useState } from 'react';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfileUpload = () => {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    setAnalyzing(true);
    
    // Simulate API call for NLP parsing
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        designation: "Under Secretary",
        department: "Ministry of Finance",
        experience: "8 years",
        extractedSkills: ["Policy Drafting", "Financial Analysis", "Team Management"]
      });
      toast.success("Profile analyzed successfully!");
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Complete Your Profile</h1>
        <p className="text-slate-600 mt-2">Upload your resume, e-HRMS dossier, or past training certificates to automatically build your competency profile.</p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm mb-8">
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gov-300 rounded-xl p-12 text-center hover:bg-gov-50 transition-colors cursor-pointer"
          onClick={() => document.getElementById('file-upload').click()}
        >
          <input type="file" id="file-upload" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
          <UploadCloud className="mx-auto h-12 w-12 text-gov-400 mb-4" />
          <h3 className="text-lg font-semibold text-slate-700">Click to upload or drag and drop</h3>
          <p className="text-sm text-slate-500 mt-2">PDF, DOCX up to 10MB</p>
          
          {file && (
            <div className="mt-4 inline-flex items-center space-x-2 bg-gov-100 text-gov-800 px-4 py-2 rounded-lg">
              <FileText size={18} />
              <span className="text-sm font-medium">{file.name}</span>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={handleAnalyze}
            disabled={!file || analyzing}
            className="bg-gov-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gov-700 disabled:opacity-50 transition-colors"
          >
            {analyzing ? 'Analyzing Document...' : 'Extract Competencies'}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="text-green-600" />
            <h3 className="text-lg font-bold text-green-900">Profile Built Successfully</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div><span className="text-slate-500 block">Designation</span><span className="font-semibold text-slate-800">{result.designation}</span></div>
            <div><span className="text-slate-500 block">Department</span><span className="font-semibold text-slate-800">{result.department}</span></div>
            <div><span className="text-slate-500 block">Experience</span><span className="font-semibold text-slate-800">{result.experience}</span></div>
          </div>
          
          <div>
            <span className="text-slate-500 block text-sm mb-2">Extracted Competencies</span>
            <div className="flex flex-wrap gap-2">
              {result.extractedSkills.map(skill => (
                <span key={skill} className="bg-white border border-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <button className="text-gov-600 font-semibold text-sm hover:underline">Proceed to Dashboard &rarr;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUpload;
